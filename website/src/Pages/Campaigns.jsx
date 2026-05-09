import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../services/api";

export default function Campaigns() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const [dbCampaigns, setDbCampaigns] = useState([]);

  const staticOldCampaigns = [
    { slug: "food-basket", image: "/campaigns/food_basket.jpeg" },
    { slug: "fast-food-kitchens", image: "/campaigns/kitchen.jpg" },
    { slug: "eid-adha-sacrifices", image: "/campaigns/Ada7i.jpeg" },
    { slug: "ramadan-market", image: "/campaigns/ramadan_market.jpeg" },
    { slug: "football-academy", image: "/campaigns/Football1_1.jpg" },
    { slug: "swimming-academy", image: "/campaigns/Swim1_1.jpg" },
    { slug: "chess-academy", image: "/campaigns/Chess1_1.png" },
    { slug: "eid-activities", image: "/campaigns/eid.jpg" },
    { slug: "sakienh-campaign", image: "/campaigns/sakienh1.JPG" },
    { slug: "winter-assistance", image: "/campaigns/winter1.jpg" },
    { slug: "monthly-sponsorships", image: "/campaigns/sponsorships.jpeg" },
    { slug: "joy-for-orphan", image: "/campaigns/orphan.jpeg" },
    { slug: "earthquake-response", image: "/campaigns/earthquake.jpeg" },
  ];

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const res = await api.get("/campaigns");

        const formatted = res.data.campaigns.map((campaign) => ({
          slug: campaign.slug,
          type: campaign.type,
          image: campaign.hero_image || "/campaigns/ramadan_market.jpeg",
          title: isAr ? campaign.title_ar : campaign.title_en,
          description: isAr ? campaign.description_ar : campaign.description_en,
          target_amount: Number(campaign.target_amount || 0),
          raised_amount: Number(campaign.raised_amount || 0),
          currency: campaign.currency || "USD",
          progress: Number(campaign.progress || 0),
          isFromDb: true,
        }));

        setDbCampaigns(formatted);
      } catch (error) {
        console.log(error);
      }
    };

    getCampaigns();
  }, [isAr]);

  const oldCampaignsFromStatic = staticOldCampaigns.map((campaign) => ({
    ...campaign,
    type: "old",
    title: t(`campaigns.items.${campaign.slug}.title`),
    description: t(`campaigns.items.${campaign.slug}.description`),
    target_amount: 0,
    raised_amount: 0,
    currency: "USD",
    progress: 100,
    isFromDb: false,
  }));

  const allCampaigns = [...dbCampaigns, ...oldCampaignsFromStatic];

  const currentCampaigns = allCampaigns.filter(
    (campaign) => campaign.type === "current"
  );

  const upcomingCampaigns = allCampaigns.filter(
    (campaign) => campaign.type === "upcoming"
  );

  const oldCampaigns = allCampaigns.filter((campaign) => campaign.type === "old");

  return (
    <main className="bg-white" dir={isAr ? "rtl" : "ltr"}>
      <section className="relative flex min-h-[400px] items-center overflow-hidden">
        <div
          className="absolute inset-0 animate-bg-zoom bg-cover bg-center"
          style={{ backgroundImage: "url('/campaigns/ramadan_market.jpeg')" }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <div className={isAr ? "text-right" : "text-left"}>
            <h1 className="animate-fadeInText text-5xl font-extrabold leading-tight text-white md:text-7xl">
              {t("campaigns.pageTitle")}
            </h1>

            <div
              className={`mt-6 h-1.5 w-20 rounded-full bg-[#FDBB2D] animate-fadeInText ${
                isAr ? "mr-0" : "ml-0"
              }`}
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl space-y-20">
          <CampaignSlider
            title={isAr ? "الحملات الحالية" : "Current Campaigns"}
            campaigns={currentCampaigns}
            emptyText={isAr ? "لا توجد حملات حالية" : "No current campaigns"}
            isAr={isAr}
          />

          <CampaignSlider
            title={isAr ? "الحملات القادمة" : "Upcoming Campaigns"}
            campaigns={upcomingCampaigns}
            emptyText={isAr ? "لا توجد حملات قادمة" : "No upcoming campaigns"}
            isAr={isAr}
          />

          <CampaignSlider
            title={t("campaigns.old")}
            campaigns={oldCampaigns}
            emptyText={isAr ? "لا توجد حملات سابقة" : "No old campaigns"}
            isAr={isAr}
          />
        </div>
      </section>
    </main>
  );
}

function CampaignSlider({ title, campaigns, emptyText, isAr }) {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 3 >= campaigns.length ? 0 : prev + 3));
  };

  const prev = () => {
    setIndex((prev) =>
      prev - 3 < 0 ? Math.max(campaigns.length - 3, 0) : prev - 3
    );
  };

  const visibleCampaigns = campaigns.slice(index, index + 3);

  useEffect(() => {
    setIndex(0);
  }, [campaigns.length]);

  return (
    <section>
      <h2 className="mb-8 text-3xl font-bold text-[#3C3C3C]">{title}</h2>

      {campaigns.length === 0 ? (
        <div className="rounded-2xl bg-[#F4F7F6] p-10 text-center text-[#5A4B3C]">
          {emptyText}
        </div>
      ) : (
        <div className="relative">
          {campaigns.length > 3 && (
            <>
              <button
                onClick={prev}
                className="absolute left-[-25px] top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#155541] shadow-lg ring-1 ring-black/10 transition hover:bg-[#155541] hover:text-white"
                aria-label="Previous"
              >
                <svg
                  className="h-6 w-6"
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
                onClick={next}
                className="absolute right-[-25px] top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#155541] shadow-lg ring-1 ring-black/10 transition hover:bg-[#155541] hover:text-white"
                aria-label="Next"
              >
                <svg
                  className="h-6 w-6"
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
            </>
          )}

          <div key={index} className="animate-[fadeSlider_.4s_ease]">
            <div className="grid gap-8 px-10 sm:grid-cols-2 lg:grid-cols-3">
              {visibleCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.slug}
                  campaign={campaign}
                  isAr={isAr}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function CampaignCard({ campaign, isAr }) {
  const showDonationBar = campaign.type === "current" || campaign.type === "upcoming";

  const calculatedProgress =
    campaign.target_amount > 0
      ? Math.min((campaign.raised_amount / campaign.target_amount) * 100, 100)
      : 0;

  const buttonText =
    campaign.type === "old"
      ? isAr
        ? "عرض الحملة"
        : "View Campaign"
      : isAr
      ? "تبرع الآن"
      : "Donate Now";

  return (
    <article className="group flex min-h-[600px] flex-col overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-black/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <Link to={`/campaigns/${campaign.slug}`}>
        <img
          src={campaign.image}
          alt={campaign.title}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "/campaigns/ramadan_market.jpeg";
          }}
        />
      </Link>

      {showDonationBar && (
        <div className="px-6 pt-5">
          <div className="mb-2 flex justify-between gap-3 text-sm font-bold text-[#5A4B3C]">
            <span>
              {isAr ? "تم جمع:" : "Raised:"} {campaign.currency}{" "}
              {campaign.raised_amount.toLocaleString()}
            </span>
            <span>
              {isAr ? "الهدف:" : "Target:"} {campaign.currency}{" "}
              {campaign.target_amount.toLocaleString()}
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-[#155541]"
              style={{ width: `${calculatedProgress}%` }}
            />
          </div>

          <p className="mt-2 text-sm font-semibold text-[#155541]">
            {Math.round(calculatedProgress)}%
          </p>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-4 text-2xl font-bold text-[#3C3C3C]">
          {campaign.title}
        </h3>

        <p className="mb-8 flex-1 leading-8 text-[#5A4B3C]">
          {campaign.description}
        </p>

        <Link
          to={`/campaigns/${campaign.slug}`}
          className="mt-auto block rounded-xl border border-[#155541] px-5 py-4 text-center font-bold text-[#155541] transition hover:bg-[#155541] hover:text-white"
        >
          {buttonText}
        </Link>
      </div>
    </article>
  );
}