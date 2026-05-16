import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAppAuth } from "../context/AuthContext";

export default function AdminHomeContent() {
  const navigate = useNavigate();
  const { getToken } = useAppAuth();

  const [form, setForm] = useState({
    home_hero_image: "",
    home_hero_title_ar: "",
    home_hero_title_en: "",
    home_hero_desc_ar: "",
    home_hero_desc_en: "",
  });

  const [heroFile, setHeroFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const getContent = async () => {
      try {
        const res = await api.get("/site-content");
        setForm((prev) => ({
          ...prev,
          ...res.data.content,
        }));
      } catch (error) {
        alert(error.response?.data?.message || "Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    getContent();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = await getToken();

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value || "");
      });

      if (heroFile) {
        formData.append("home_hero_image_file", heroFile);
      }

      await api.put("/site-content", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Home content updated successfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F4F7F6]">
        <p className="text-xl font-bold text-[#155541]">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F7F6] px-4 py-10">
      <form
        onSubmit={submit}
        className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl"
      >
        <h1 className="mb-8 text-3xl font-bold text-[#155541]">
          Edit Home Hero
        </h1>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block font-bold">Current Hero Image</label>

            {form.home_hero_image && (
              <img
                src={form.home_hero_image}
                alt="Home hero"
                className="mb-4 h-72 w-full rounded-2xl object-cover"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setHeroFile(e.target.files[0])}
              className="w-full rounded-xl border px-4 py-3"
            />

            {heroFile && (
              <p className="mt-2 text-sm font-bold text-[#155541]">
                Selected: {heroFile.name}
              </p>
            )}
          </div>

          <Input
            label="Title AR"
            name="home_hero_title_ar"
            value={form.home_hero_title_ar}
            onChange={handleChange}
          />

          <Input
            label="Title EN"
            name="home_hero_title_en"
            value={form.home_hero_title_en}
            onChange={handleChange}
          />

          <Textarea
            label="Description AR"
            name="home_hero_desc_ar"
            value={form.home_hero_desc_ar}
            onChange={handleChange}
          />

          <Textarea
            label="Description EN"
            name="home_hero_desc_en"
            value={form.home_hero_desc_en}
            onChange={handleChange}
          />
        </div>

        <div className="mt-8 flex gap-3">
          <button
            disabled={saving}
            className="rounded-xl bg-[#155541] px-8 py-3 font-bold text-white hover:bg-[#157C5B] disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/campaigns")}
            className="rounded-xl border border-[#155541] px-8 py-3 font-bold text-[#155541]"
          >
            Back
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