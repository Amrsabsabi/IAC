import React from "react";
import { useTranslation } from "react-i18next";

const IMAGES = {
  hero: "/Services/1.jpeg",
  card_emergency: "/Services/4.jpg",
  card_fieldwork: "/Services/2.JPG",
  card_food: "/Services/5.jpg",
  quad1: "/Services/6.JPG",
  quad2: "/Services/7.jpg",
  quad3: "/Services/8.JPG",
  quad4: "/Services/9.jpeg",
};

const servicesData = [
  {
    titleKey: "servicesPage.emergencyTitle",
    descKey: "servicesPage.emergencyDesc",
    image: IMAGES.card_emergency,
  },
  {
    titleKey: "servicesPage.fieldworkTitle",
    descKey: "servicesPage.fieldworkDesc",
    image: IMAGES.card_fieldwork,
  },
  {
    titleKey: "servicesPage.foodTitle",
    descKey: "servicesPage.foodDesc",
    image: IMAGES.card_food,
  },
];

function ServiceCard({ item, index, t }) {
  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 opacity-0 animate-slideUp"
      style={{
        animationDelay: `${index * 0.2}s`,
        animationFillMode: "forwards",
      }}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
        <img
          src={item.image}
          alt={t(item.titleKey)}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
      </div>

      <div className="p-8 text-center relative bg-white">

        <div className="w-8 h-1 mx-auto rounded-full bg-yellow-600 mb-5 transform group-hover:w-16 transition-all duration-500"></div>

        <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-yellow-700 transition-colors duration-300">
          {t(item.titleKey)}
        </h3>

        <p className="text-gray-500 leading-relaxed text-sm">
          {t(item.descKey)}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-yellow-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
}

function QuadrantSection({ t }) {
  return (
    <section className="relative bg-gray-900 py-10 md:py-0 mb-10">

      <div className="grid grid-cols-2 gap-1 md:gap-2 opacity-80">
        <img src={IMAGES.quad1} className="h-[250px] md:h-[450px] w-full object-cover" alt="quad1" />
        <img src={IMAGES.quad2} className="h-[250px] md:h-[450px] w-full object-cover" alt="quad2" />
        <img src={IMAGES.quad3} className="h-[250px] md:h-[450px] w-full object-cover" alt="quad3" />
        <img src={IMAGES.quad4} className="h-[250px] md:h-[450px] w-full object-cover" alt="quad4" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] max-w-xl w-full p-10 md:p-12 text-center transform hover:-translate-y-2 transition-transform duration-500">

          <div className="w-12 h-1.5 mx-auto rounded-full bg-yellow-600 mb-6 opacity-80"></div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 tracking-tight">
            {t("servicesPage.quadTitle")}
          </h2>

          <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4 font-medium">
            {t("servicesPage.quadDesc1")}
          </p>

          <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-8">
            {t("servicesPage.quadDesc2")}
          </p>

          <a
            href="/campaigns"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-white font-bold bg-gray-900 hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-600/30 transform hover:-translate-y-1 transition-all duration-300"
          >
            {t("servicesPage.btnDiscover")}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="bg-slate-50 min-h-screen font-sans">

      <style>{`
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInSlow {
          0% { opacity: 0; transform: translateY(20px); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        @keyframes scaleBg {
          0% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .animate-slideUp {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-fadeInText {
          animation: fadeInSlow 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-bg-zoom {
          animation: scaleBg 10s ease-out forwards;
        }
      `}</style>

      <section className="relative min-h-[400px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 animate-bg-zoom"
          style={{
            backgroundImage: `url(${IMAGES.hero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"></div>

        <div className="relative max-w-6xl mx-auto px-6 w-full z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white animate-fadeInText leading-tight text-start">
              {t("servicesPage.pageTitle")}
            </h1>
            <div className="w-20 h-1.5 bg-yellow-500 mt-6 rounded-full animate-fadeInText" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}></div>
          </div>
        </div>
      </section>

      <section className="py-24 relative">

        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-gray-100 to-transparent"></div>

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 relative z-10">
          {servicesData.map((item, index) => (
            <ServiceCard key={index} item={item} index={index} t={t} />
          ))}
        </div>
      </section>


      <QuadrantSection t={t} />

    </div>
  );
}