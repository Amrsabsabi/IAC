import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: "Instagram",
      link: "https://www.instagram.com/iacharity.ar/",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm5.5-2.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      link: "https://www.facebook.com/iaccharity.ar",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.7V4.9c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5V11H7v3h2.8v8h3.7Z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      link: "https://www.youtube.com/@iaccharity",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M21.6 7.2s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.8 4 12 4 12 4h0s-3.8 0-6.7.2c-.4.1-1.3.1-2.1.9-.6.6-.8 2.1-.8 2.1S2 9 2 10.9v1.8c0 1.9.4 3.7.4 3.7s.2 1.5.8 2.1c.8.8 1.9.8 2.4.9 1.8.2 6.4.2 6.4.2s3.8 0 6.7-.2c.4-.1 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.4-1.8.4-3.7v-1.8c0-1.9-.4-3.7-.4-3.7ZM10 14.8V8.9l5.2 3-5.2 2.9Z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/company/iaccharity/",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M6.9 8.8H3.5V21h3.4V8.8ZM5.2 3a2 2 0 1 0 0 4.1 2 2 0 0 0 0-4.1ZM21 14.1c0-3.3-1.8-5.5-4.6-5.5-2.1 0-3.1 1.2-3.6 2V8.8H9.4V21h3.4v-6.1c0-1.6.3-3.1 2.3-3.1 1.9 0 1.9 1.8 1.9 3.2v6h3.4v-6.9H21Z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#155541] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="mb-5 text-2xl font-bold">{t("footer.title")}</h2>
          <p className="max-w-md leading-8 text-white/85">{t("footer.text")}</p>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-bold">{t("footer.addressTitle")}</h3>
          <p className="leading-8 text-white/85">
            {t("footer.title")}
            <br />
            {t("footer.address")}
            <br />
            IAC 1427
          </p>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-bold">{t("footer.contactTitle")}</h3>
          <p className="leading-8 text-white/85">
            +963989826345
            <br />
            iaccharitysy@outlook.com
          </p>

          <div className="mt-6 flex gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-all duration-300 hover:scale-110 hover:bg-[#D6B390] hover:text-[#155541]"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#124838]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-white/80 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>{t("footer.rights")}</p>
          <p>العربية | English</p>
        </div>
      </div>
    </footer>
  );
}