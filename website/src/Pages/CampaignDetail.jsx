import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { campaignsData } from "../data/campaignsData";

export default function CampaignDetail() {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const lang = i18n.language === "ar" ? "ar" : "en";

  const campaign = campaignsData.find((item) => item.id === id);
  const [galleryIndex, setGalleryIndex] = useState(0);

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

  const getValue = (value) => {
    if (typeof value === "string") return value;
    return value?.[lang] || "";
  };

  const infoItems = [
    {
      label: lang === "ar" ? "تاريخ البداية" : "Start Date",
      value: getValue(campaign.startDate),
    },
    {
      label: lang === "ar" ? "تاريخ الانتهاء" : "End Date",
      value: getValue(campaign.endDate),
    },
    {
      label: lang === "ar" ? "المستفيدين" : "Beneficiaries",
      value: getValue(campaign.beneficiaries),
    },
    {
      label: lang === "ar" ? "عدد المستفيدين" : "Number of Beneficiaries",
      value: getValue(campaign.beneficiariesNumber),
    },
    {
      label: lang === "ar" ? "المكان" : "Location",
      value: getValue(campaign.location),
    },
  ];

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
              {campaign.title[lang]}
            </h1>

            <p className="mb-10 text-lg leading-9 text-[#5A4B3C]">
              {campaign.description[lang]}
            </p>

            <div className="mb-3 flex justify-between text-[#5A4B3C]">
              <span>{lang === "ar" ? "تم الانتهاء" : "Completed"}</span>
              <span>{campaign.progress}%</span>
            </div>

            <div className="h-4 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-[#D6B390]"
                style={{ width: `${campaign.progress}%` }}
              />
            </div>
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

          {gallery.length > 0 && (
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
                    aria-label="Previous image"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={nextImage}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#155541] shadow ring-1 ring-black/10 transition hover:bg-[#155541] hover:text-white"
                    aria-label="Next image"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                <div dir="ltr" className="flex gap-2">
                  {gallery.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setGalleryIndex(index)}
                      className={`h-3 w-3 rounded-full transition ${index === galleryIndex
                          ? "scale-125 bg-black"
                          : "bg-[#858989]"
                        }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
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