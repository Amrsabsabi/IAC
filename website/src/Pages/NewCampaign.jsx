import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function NewCampaign() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    slug: "",
    type: "current",
    title_ar: "",
    title_en: "",
    description_ar: "",
    description_en: "",
    target_amount: 0,
    raised_amount: 0,
    currency: "USD",
    start_date_ar: "",
    start_date_en: "",
    end_date_ar: "",
    end_date_en: "",
    beneficiaries_ar: "",
    beneficiaries_en: "",
    beneficiaries_number_ar: "",
    beneficiaries_number_en: "",
    location_ar: "",
    location_en: "",
  });

  const [heroImageFile, setHeroImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.set("target_amount", Number(form.target_amount));
      formData.set("raised_amount", Number(form.raised_amount));

      if (heroImageFile) {
        formData.append("hero_image_file", heroImageFile);
      }

      galleryFiles.forEach((file) => {
        formData.append("gallery_images", file);
      });

      await api.post("/admin/campaigns", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin/campaigns");
    } catch (error) {
      alert(error.response?.data?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F4F7F6] px-4 py-10">
      <form
        onSubmit={submit}
        className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl"
      >
        <h1 className="mb-8 text-3xl font-bold text-[#155541]">
          Add New Campaign
        </h1>

        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Slug"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
          />

          <div>
            <label className="mb-2 block font-bold">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3"
            >
              <option value="current">Current</option>
              <option value="upcoming">Upcoming</option>
              <option value="old">Old</option>
            </select>
          </div>

          <Input
            label="Title AR"
            name="title_ar"
            value={form.title_ar}
            onChange={handleChange}
            required
          />

          <Input
            label="Title EN"
            name="title_en"
            value={form.title_en}
            onChange={handleChange}
            required
          />

          <div>
            <label className="mb-2 block font-bold">Hero Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setHeroImageFile(e.target.files[0])}
              className="w-full rounded-xl border px-4 py-3"
            />

            {heroImageFile && (
              <p className="mt-2 text-sm text-[#155541]">
                Selected: {heroImageFile.name}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-bold">Currency</label>
            <select
              name="currency"
              value={form.currency}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="TRY">TRY</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-bold">
              Gallery Images max 3
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setGalleryFiles(Array.from(e.target.files).slice(0, 3))
              }
              className="w-full rounded-xl border px-4 py-3"
            />

            {galleryFiles.length > 0 && (
              <div className="mt-3 grid gap-2 text-sm text-[#155541]">
                {galleryFiles.map((file, index) => (
                  <p key={index}>
                    {index + 1}. {file.name}
                  </p>
                ))}
              </div>
            )}
          </div>

          <Input
            label="Target Amount"
            name="target_amount"
            type="number"
            min="0"
            value={form.target_amount}
            onChange={handleChange}
          />

          <Input
            label="Raised Amount"
            name="raised_amount"
            type="number"
            min="0"
            value={form.raised_amount}
            onChange={handleChange}
          />

          <Textarea
            label="Description AR"
            name="description_ar"
            value={form.description_ar}
            onChange={handleChange}
          />

          <Textarea
            label="Description EN"
            name="description_en"
            value={form.description_en}
            onChange={handleChange}
          />

          <Input
            label="Start Date AR"
            name="start_date_ar"
            value={form.start_date_ar}
            onChange={handleChange}
          />

          <Input
            label="Start Date EN"
            name="start_date_en"
            value={form.start_date_en}
            onChange={handleChange}
          />

          <Input
            label="End Date AR"
            name="end_date_ar"
            value={form.end_date_ar}
            onChange={handleChange}
          />

          <Input
            label="End Date EN"
            name="end_date_en"
            value={form.end_date_en}
            onChange={handleChange}
          />

          <Input
            label="Beneficiaries AR"
            name="beneficiaries_ar"
            value={form.beneficiaries_ar}
            onChange={handleChange}
          />

          <Input
            label="Beneficiaries EN"
            name="beneficiaries_en"
            value={form.beneficiaries_en}
            onChange={handleChange}
          />

          <Input
            label="Beneficiaries Number AR"
            name="beneficiaries_number_ar"
            value={form.beneficiaries_number_ar}
            onChange={handleChange}
          />

          <Input
            label="Beneficiaries Number EN"
            name="beneficiaries_number_en"
            value={form.beneficiaries_number_en}
            onChange={handleChange}
          />

          <Input
            label="Location AR"
            name="location_ar"
            value={form.location_ar}
            onChange={handleChange}
          />

          <Input
            label="Location EN"
            name="location_en"
            value={form.location_en}
            onChange={handleChange}
          />
        </div>

        <div className="mt-8 flex gap-3">
          <button
            disabled={loading}
            className="rounded-xl bg-[#155541] px-8 py-3 font-bold text-white hover:bg-[#157C5B] disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Campaign"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/campaigns")}
            className="rounded-xl border border-[#155541] px-8 py-3 font-bold text-[#155541]"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="mb-2 block font-bold">{label}</label>
      <input className="w-full rounded-xl border px-4 py-3" {...props} />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div className="md:col-span-2">
      <label className="mb-2 block font-bold">{label}</label>
      <textarea
        rows="4"
        className="w-full rounded-xl border px-4 py-3"
        {...props}
      />
    </div>
  );
}