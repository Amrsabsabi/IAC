import ContactHero from "../components/ContactHero.jsx";
import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";

function ContactUs() {
  return (
    <>
      <ContactHero />

      <section className="contactSection">
        <div className="container contactGrid">
          <ContactForm />
          <ContactInfo />
        </div>
      </section>
    </>
  );
}

export default ContactUs;