import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Map as MapIcon, LayoutGrid } from "lucide-react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const [viewMode, setViewMode] = useState("map");

  const countriesData = [
    { id: "SYR", name: t("about.expansion.countries.syria"), img: "/aboutUs/syria_flag.webp" },
    { id: "JOR", name: t("about.expansion.countries.jordan"), img: "/aboutUs/j.svg" },
    { id: "PSE", name: t("about.expansion.countries.palestine"), img: "/aboutUs/flag.webp" },
    { id: "TUR", name: t("about.expansion.countries.turkey"), img: "/aboutUs/tur.png" },
    { id: "GBR", name: t("about.expansion.countries.uk"), img: "/aboutUs/uk.svg" },
    { id: "USA", name: t("about.expansion.countries.usa"), img: "/aboutUs/usa.webp" },
    { id: "ZAF", name: t("about.expansion.countries.southAfrica"), img: "/aboutUs/Flag_of_South_Africa.svg" },
  ];

  const highlightedIds = countriesData.map((d) => d.id);
  const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className={`overflow-x-hidden bg-white ${isAr ? "text-right" : "text-left"}`}
    >
      {/* HERO - نفس ServicesPage */}
      <section className="relative flex min-h-[400px] items-center overflow-hidden">

        <div
          className="absolute inset-0 animate-bg-zoom bg-cover bg-center"
          style={{ backgroundImage: "url('/aboutUs/DSC02508.JPG')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <div className={isAr ? "text-right" : "text-left"}>
            <h1 className="animate-fadeInText text-5xl font-extrabold leading-tight text-white md:text-7xl">
              {t("about.title")}
            </h1>

            <div
              className={`mt-6 h-1.5 w-20 rounded-full bg-yellow-500 animate-fadeInText ${isAr ? "mr-0" : "ml-0"
                }`}
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            />
          </div>
        </div>
      </section>

      {/* ABOUT INTRO */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
          <div
            className={`flex flex-col items-center gap-14 ${isAr ? "md:flex-row" : "md:flex-row-reverse"
              } md:gap-20`}
          >
            <div className="w-full md:w-[42%]">
              <div
                className={`flex min-h-[320px] flex-col justify-center rounded-[2rem] bg-[#1E5143] p-8 text-white shadow-2xl md:p-10 ${isAr ? "text-right" : "text-left"
                  }`}
              >
                <h2 className="mb-6 text-2xl font-bold leading-tight md:text-3xl">
                  {t("about.heading")}
                </h2>
                <p className="text-base font-light leading-8 opacity-90 md:text-lg">
                  {t("about.description")}
                </p>
              </div>
            </div>

            <div className="flex w-full justify-center md:w-[38%]">
              <div className="relative aspect-square w-[78%] max-w-[420px]">
                <div
                  className="absolute inset-0 rounded-[2.5rem] border border-[#1E5143]/10 bg-[#1E5143]/20"
                  style={{ transform: "rotate(-10deg) translate(-18px, -8px)", zIndex: 0 }}
                />
                <div
                  className="absolute inset-0 rounded-[2.5rem] border border-[#1E5143]/20 bg-[#1E5143]/40"
                  style={{ transform: "rotate(8deg) translate(14px, 6px)", zIndex: 5 }}
                />

                <div className="relative z-10 h-full w-full overflow-hidden rounded-[2.5rem] bg-white shadow-2xl">
                  <img
                    src="/aboutUs/phot.png"
                    alt="About IAC"
                    className="h-full w-full object-cover transition-transform duration-1000 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#1E5143]/5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPANSION */}
      <section className="bg-gray-50 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-10">
          <div className="mb-8 flex flex-col gap-6 md:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <div className={isAr ? "text-right" : "text-left"}>
              <h2 className="mb-2 text-3xl font-bold text-[#1E5143] md:text-4xl">
                {t("about.expansion.title")}
              </h2>
              <p className="text-gray-600">{t("about.expansion.subtitle")}</p>
            </div>

            <div className="flex w-full rounded-xl border border-gray-200 bg-white p-1 shadow-sm sm:w-auto">
              <button
                onClick={() => setViewMode("map")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 transition-all sm:flex-none ${viewMode === "map" ? "bg-[#1E5143] text-white" : "text-gray-500"
                  }`}
              >
                <MapIcon size={18} />
                <span>{isAr ? "خريطة" : "Map"}</span>
              </button>

              <button
                onClick={() => setViewMode("grid")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 transition-all sm:flex-none ${viewMode === "grid" ? "bg-[#1E5143] text-white" : "text-gray-500"
                  }`}
              >
                <LayoutGrid size={18} />
                <span>{isAr ? "شبكة" : "Grid"}</span>
              </button>
            </div>
          </div>

          {viewMode === "map" ? (
            <div className="overflow-hidden rounded-[1.5rem] border border-gray-100 bg-white p-2 shadow-xl md:rounded-[3rem] md:p-5">
              <div className="w-full overflow-x-auto">
                <div className="min-w-[620px] md:min-w-0">
                  <ComposableMap
                    projectionConfig={{ scale: 280, center: [10, 15] }}
                    className="h-auto w-full"
                  >
                    <Geographies geography={geoUrl}>
                      {({ geographies }) =>
                        geographies.map((geo) => {
                          const isHighlighted = highlightedIds.includes(geo.id);
                          const countryInfo = countriesData.find((c) => c.id === geo.id);

                          return (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              data-tooltip-id={isHighlighted ? "map-tooltip" : undefined}
                              data-tooltip-content={isHighlighted ? countryInfo?.name : undefined}
                              fill={isHighlighted ? "#1E5143" : "#E5E7EB"}
                              stroke="#FFFFFF"
                              strokeWidth={0.5}
                              style={{
                                default: { outline: "none" },
                                hover: {
                                  fill: isHighlighted ? "#2d7a65" : "#E5E7EB",
                                  outline: "none",
                                  cursor: isHighlighted ? "pointer" : "default",
                                },
                              }}
                            />
                          );
                        })
                      }
                    </Geographies>
                  </ComposableMap>
                </div>
              </div>

              <p className="mt-3 text-center text-xs text-gray-400 md:hidden">
                {isAr ? "اسحب الخريطة يميناً ويساراً" : "Swipe the map horizontally"}
              </p>

              <Tooltip
                id="map-tooltip"
                className="z-50 !rounded-lg !bg-[#1E5143] !px-4 !py-2 !font-bold !text-white shadow-xl"
              />
            </div>
          ) : (
            <div className="animate-[fadeSlider_.4s_ease] py-6 md:py-10">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                {countriesData.map((country) => (
                  <div
                    key={country.id}
                    className="flex h-full flex-col items-center rounded-[1.5rem] border border-gray-50 bg-white p-4 shadow-lg transition-transform hover:-translate-y-2"
                  >
                    <div className="mb-4 aspect-video w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                      <img
                        src={country.img}
                        alt={country.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="text-center text-xs font-bold text-[#1E5143] md:text-sm">
                      {country.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* GOALS */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="mb-20 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <GoalCard
              className="lg:col-span-4"
              image="/aboutUs/DJI_0302 (1).JPG"
              title={t("about.goals.betterPlace.title")}
              desc={t("about.goals.betterPlace.desc")}
              tall
              isAr={isAr}
            />

            <GoalCard
              className="lg:col-span-8"
              image="/aboutUs/IMG_9094.jpg"
              title={t("about.goals.sustainability.title")}
              desc={t("about.goals.sustainability.desc")}
              isAr={isAr}
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <GoalCard
              className="lg:col-span-8"
              image="/aboutUs/qq.jpg"
              title={t("about.goals.dignity.title")}
              desc={t("about.goals.dignity.desc")}
              isAr={isAr}
            />

            <GoalCard
              className="lg:col-span-4"
              image="/aboutUs/IMG_2532.JPG"
              title={t("about.goals.heroes.title")}
              desc={t("about.goals.heroes.desc")}
              tall
              isAr={isAr}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

function GoalCard({ image, title, desc, tall = false, className = "", isAr }) {
  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <div className="overflow-hidden rounded-[2rem] shadow-md">
        <img
          src={image}
          className={`w-full object-cover ${tall ? "aspect-[1/1.15]" : "aspect-[4/3] lg:aspect-[1.75/1]"
            }`}
          alt={title}
        />
      </div>

      <div className={`space-y-3 ${isAr ? "text-right" : "text-left"}`}>
        <h3 className="text-xl font-bold text-[#1E5143] md:text-2xl">
          {title}
        </h3>
        <p className="text-sm leading-7 text-gray-600 md:text-base">
          {desc}
        </p>
      </div>
    </div>
  );
}

export default AboutUs;