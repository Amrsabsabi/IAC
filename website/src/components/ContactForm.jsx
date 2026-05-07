import { useState } from "react";
import { useTranslation } from "react-i18next";

function ContactForm() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email_from: "",
    company: "",
    subject: "",
    description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Contact form data:", {
      ...formData,
      email_to: "iaccharitysy@gmail.com",
    });

    alert(t("contact.success"));
  }

  return (
    <div className="contactFormBox">
      <p className="leadText">
        {t("contact.intro1")}
        <br />
        {t("contact.intro2")}
      </p>

      <form className="contactForm" onSubmit={handleSubmit}>
        <div className="formGrid">
          <div className="formGroup">
            <label htmlFor="name">{t("contact.name")} *</label>
            <input
              id="name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="phone">{t("contact.phone")}</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="email_from">{t("contact.email")} *</label>
            <input
              id="email_from"
              type="email"
              name="email_from"
              required
              value={formData.email_from}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="company">{t("contact.company")}</label>
            <input
              id="company"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup fullWidth">
            <label htmlFor="subject">{t("contact.subject")} *</label>
            <input
              id="subject"
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup fullWidth">
            <label htmlFor="description">{t("contact.question")} *</label>
            <textarea
              id="description"
              name="description"
              rows="8"
              required
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="submitRow fullWidth">
            <button type="submit">{t("contact.submit")}</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;