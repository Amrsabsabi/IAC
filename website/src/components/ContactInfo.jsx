import { useTranslation } from "react-i18next";

function ContactInfo() {
  const { t } = useTranslation();

  return (
    <aside className="contactInfo">
      <h5>{t("contact.infoTitle")}</h5>

      <ul>
        <li>📍 {t("contact.address")}</li>
        <li>📞 {t("contact.phoneNumber")}</li>
        <li>
          ✉️{" "}
          <a href={`mailto:${t("contact.emailAddress")}`}>
            {t("contact.emailAddress")}
          </a>
        </li>
      </ul>

      <img src="/icon/iaccc.png" alt="International Aid Charity logo" />
    </aside>
  );
}

export default ContactInfo;