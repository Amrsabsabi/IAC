import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { campaignsData } from "../data/campaignsData";
import api from "../services/api";

export default function CampaignDetail() {
  const { id: slug } = useParams();
  const { i18n } = useTranslation();
  const lang = i18n.language === "ar" ? "ar" : "en";

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const getValue = (value) => {
    if (typeof value === "string") return value;
    return value?.[lang] || "";
  };

  useEffect(() => {
    const loadCampaign = async () => {
      setLoading(true);
      setGalleryIndex(0);

      const staticCampaign = campaignsData.find(
        (item) => item.id === slug || item.slug === slug
      );

      if (staticCampaign) {
        setCampaign({
          title: getValue(staticCampaign.title),
          description: getValue(staticCampaign.description),
          heroImage: staticCampaign.heroImage,
          progress: staticCampaign.progress || 100,
          type: staticCampaign.type || "old",
          gallery: staticCampaign.gallery || [],
          startDate: getValue(staticCampaign.startDate),
          endDate: getValue(staticCampaign.endDate),
          beneficiaries: getValue(staticCampaign.beneficiaries),
          beneficiariesNumber: getValue(staticCampaign.beneficiariesNumber),
          location: getValue(staticCampaign.location),
          target_amount: 0,
          raised_amount: 0,
          currency: "USD",
        });

        setLoading(false);
        return;
      }

      try {
        const res = await api.get(`/campaigns/${slug}`);
        const item = res.data.campaign;

        setCampaign({
          title: lang === "ar" ? item.title_ar : item.title_en,
          description:
            lang === "ar" ? item.description_ar : item.description_en,
          heroImage: item.hero_image || "/campaigns/ramadan_market.jpeg",
          progress: Number(item.progress || 0),
          type: item.type,
          gallery: item.gallery?.map((img) => img.image_url) || [],
          startDate: lang === "ar" ? item.start_date_ar : item.start_date_en,
          endDate: lang === "ar" ? item.end_date_ar : item.end_date_en,
          beneficiaries:
            lang === "ar" ? item.beneficiaries_ar : item.beneficiaries_en,
          beneficiariesNumber:
            lang === "ar"
              ? item.beneficiaries_number_ar
              : item.beneficiaries_number_en,
          location: lang === "ar" ? item.location_ar : item.location_en,
          target_amount: Number(item.target_amount || 0),
          raised_amount: Number(item.raised_amount || 0),
          currency: item.currency || "USD",
        });
      } catch (error) {
        console.log("Campaign detail error:", error.response?.data || error);
        setCampaign(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) loadCampaign();
  }, [slug, lang]);

  if (loading) {
    return (
      <main className="min-h-screen px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-[#155541]">Loading...</h1>
      </main>
    );
  }

  if (!campaign) {
    return (
      <main className="min-h-screen px-4 py-24 text-center">
        <h1 className="mb-6 text-3xl font-bold text-[#155541]">
          Campaign not found
        </h1>
        <Link to="/campaigns" className="text-[#155541] underline">
          Back to campaigns
        </Link>
      </main>
    );
  }

  const gallery = campaign.gallery || [];

  const nextImage = () => {
    setGalleryIndex((prev) => (prev + 1 >= gallery.length ? 0 : prev + 1));
  };

  const prevImage = () => {
    setGalleryIndex((prev) => (prev - 1 < 0 ? gallery.length - 1 : prev - 1));
  };

  const donationProgress =
    campaign.target_amount > 0
      ? Math.min((campaign.raised_amount / campaign.target_amount) * 100, 100)
      : 0;

  const infoItems = [
    {
      label: lang === "ar" ? "تاريخ البداية" : "Start Date",
      value: campaign.startDate,
    },
    {
      label: lang === "ar" ? "تاريخ الانتهاء" : "End Date",
      value: campaign.endDate,
    },
    {
      label: lang === "ar" ? "المستفيدين" : "Beneficiaries",
      value: campaign.beneficiaries,
    },
    {
      label: lang === "ar" ? "عدد المستفيدين" : "Number of Beneficiaries",
      value: campaign.beneficiariesNumber,
    },
    {
      label: lang === "ar" ? "المكان" : "Location",
      value: campaign.location,
    },
  ].filter((item) => item.value);

  return (
    <main className="bg-white" dir={lang === "ar" ? "rtl" : "ltr"}>
      <section
        className="relative min-h-[420px] bg-cover bg-center"
        style={{ backgroundImage: `url('${campaign.heroImage}')` }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none">
          <svg
            className="block h-20 w-full"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,30 C300,100 900,100 1440,40 L1440,120 L0,120 Z"
            />
          </svg>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
          <div>
            <h1 className="mb-8 text-4xl font-bold text-[#3C3C3C]">
              {campaign.title}
            </h1>

            <p className="mb-10 text-lg leading-9 text-[#5A4B3C]">
              {campaign.description}
            </p>

            {campaign.type !== "old" && (
              <>
                <div className="mb-3 flex justify-between text-[#5A4B3C]">
                  <span>
                    {lang === "ar" ? "تم جمع" : "Raised"}:{" "}
                    {campaign.currency} {campaign.raised_amount.toLocaleString()}
                  </span>
                  <span>
                    {lang === "ar" ? "الهدف" : "Target"}: {campaign.currency}{" "}
                    {campaign.target_amount.toLocaleString()}
                  </span>
                </div>

                <div className="h-4 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-[#D6B390]"
                    style={{ width: `${donationProgress}%` }}
                  />
                </div>

                <p className="mt-3 font-bold text-[#155541]">
                  {Math.round(donationProgress)}%
                </p>
              </>
            )}
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {infoItems.map((item) => (
              <div key={item.label} className="border-b border-gray-200 pb-6">
                <h3 className="mb-5 text-2xl font-semibold text-[#3C3C3C]">
                  {item.label} :
                </h3>
                <p className="text-lg leading-8 text-[#155541]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-4xl font-bold text-[#3C3C3C]">
            {lang === "ar"
              ? "شاهد المزيد حول المشروع :"
              : "See more about the project:"}
          </h2>

          {gallery.length > 0 ? (
            <div className="relative mx-auto max-w-3xl">
              <img
                key={galleryIndex}
                src={gallery[galleryIndex]}
                alt=""
                className="h-[420px] w-full rounded-xl object-cover shadow-xl animate-[fadeSlider_.4s_ease]"
              />

              <div dir="ltr" className="mt-6 flex items-center justify-between">
                <div className="flex gap-3">
                  <button
                    onClick={prevImage}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#155541] shadow ring-1 ring-black/10 transition hover:bg-[#155541] hover:text-white"
                  >
                    ‹
                  </button>

                  <button
                    onClick={nextImage}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#155541] shadow ring-1 ring-black/10 transition hover:bg-[#155541] hover:text-white"
                  >
                    ›
                  </button>
                </div>

                <div dir="ltr" className="flex gap-2">
                  {gallery.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setGalleryIndex(index)}
                      className={`h-3 w-3 rounded-full transition ${
                        index === galleryIndex
                          ? "scale-125 bg-black"
                          : "bg-[#858989]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              {lang === "ar" ? "لا توجد صور إضافية" : "No gallery images"}
            </p>
          )}

          <div className="mt-12 text-center">
            <Link
              to="/campaigns"
              className="inline-block rounded-xl border border-[#155541] px-8 py-4 font-bold text-[#155541] transition hover:bg-[#155541] hover:text-white"
            >
              {lang === "ar" ? "العودة إلى الحملات" : "Back to Campaigns"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}