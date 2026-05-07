import { useTranslation } from "react-i18next";
function ContactHero() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <section className="relative flex min-h-[400px] items-center overflow-hidden">
      <div
        className="absolute inset-0 animate-bg-zoom bg-cover bg-center"
        style={{ backgroundImage: "url('/ContactUs/contactHero.jpg')" }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className={isAr ? "text-right" : "text-left"}>

          <h1 className="animate-fadeInText text-5xl font-extrabold leading-tight text-white md:text-7xl">
            {t("contact.title")}
          </h1>


          <div
            className={`mt-6 h-1.5 w-20 rounded-full bg-yellow-500 animate-fadeInText ${isAr ? "mr-0" : "ml-0"
              }`}
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          />
        </div>
      </div>
    </section>
  );
}
export default ContactHero;


