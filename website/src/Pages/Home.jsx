import { useState } from "react";
import { useTranslation } from "react-i18next";
import AnimatedCounter from "../components/AnimatedCounter";

export default function Home() {
  const [teamIndex, setTeamIndex] = useState(0);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const cards = [
    { title: t("home.cards.orphans.title"), text: t("home.cards.orphans.text"), image: "/Home/child.jpg" },
    { title: t("home.cards.food.title"), text: t("home.cards.food.text"), image: "/Home/food.JPG" },
    { title: t("home.cards.activities.title"), text: t("home.cards.activities.text"), image: "/Home/swim.jpg" },
    { title: t("home.cards.emergency.title"), text: t("home.cards.emergency.text"), image: "/Home/emergency.JPG" },
  ];

  const steps = [
    { number: "1", title: t("home.steps.browse.title"), text: t("home.steps.browse.text") },
    { number: "2", title: t("home.steps.signin.title"), text: t("home.steps.signin.text") },
    { number: "3", title: t("home.steps.donate.title"), text: t("home.steps.donate.text") },
    { number: "4", title: t("home.steps.join.title"), text: t("home.steps.join.text") },
  ];

  const stats = [
    { label: t("home.stats.syria"), value: 100000 },
    { label: t("home.stats.centers"), value: 8 },
    { label: t("home.stats.families"), value: 13440 },
    { label: t("home.stats.meals"), value: 229500 },
    { label: t("home.stats.eid"), value: 24000 },
    { label: t("home.stats.winter"), value: 48000 },
    { label: t("home.stats.baskets"), value: 240000 },
    { label: t("home.stats.adahi"), value: 36000 },
  ];


  const team = [
    { name: t("home.teamNames.omari"), role: t("home.team.omari"), image: "/team_member/mutasem.jpeg" },
    { name: t("home.teamNames.mutasem"), role: t("home.team.mutasem"), image: "/team_member/mutasem.jpeg" },
    { name: t("home.teamNames.muhammad"), role: t("home.team.muhammad"), image: "/team_member/muhammad.jpeg" },
    { name: t("home.teamNames.malaz"), role: t("home.team.malaz"), image: "/team_member/malaz.jpeg" },
    { name: t("home.teamNames.amr"), role: t("home.team.amr"), image: "/team_member/Amr.jpeg" },
    { name: t("home.teamNames.ghufran"), role: t("home.team.ghufran"), image: "/team_member/ghufran.jpeg" },
    { name: t("home.teamNames.bayan"), role: t("home.team.bayan"), image: "/team_member/bayan.jpeg" },
    { name: t("home.teamNames.haya"), role: t("home.team.haya"), image: "/team_member/haya.jpeg" },
  ];
  const nextTeam = () => {
    setTeamIndex((prev) => (prev + 1 >= team.length ? 0 : prev + 1));
  };

  const prevTeam = () => {
    setTeamIndex((prev) => (prev - 1 < 0 ? team.length - 1 : prev - 1));
  };



  return (
    <main>

      <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center text-center text-white overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center animate-bg-zoom"
          style={{ backgroundImage: "url('/Home/Hero.jpeg')" }}
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-5xl px-4 animate-[heroFade_.9s_ease-out]">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-7xl">
            {t("home.title")}
          </h1>

          <p className="mb-2 text-xl font-medium md:text-3xl">
            {t("home.subtitle1")}
          </p>

          <p className="mb-2 text-xl font-medium md:text-3xl">
            {t("home.subtitle2")}
          </p>

          <p className="mb-8 text-xl font-medium md:text-3xl">
            {t("home.subtitle3")}
          </p>

          <a
            href="/campaigns"
            className="inline-block rounded-md bg-[#FDBB2D] px-8 py-4 text-lg font-bold text-[#155541] shadow-lg transition hover:scale-105 hover:opacity-90"
          >
            {t("home.button")}
          </a>
        </div>
      </section>

      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h2 className="mb-3 text-3xl font-bold text-[#155541] md:text-4xl">
              {t("home.campaignTitle")}
            </h2>
            <p className="text-lg text-[#3C3C3C]">{t("home.campaignSubtitle")}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, index) => (
              <article
                key={index}
                className="overflow-hidden rounded-xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <img src={card.image} alt={card.title} className="h-56 w-full object-cover" />
                <div className="p-5">
                  <h3 className="mb-3 text-xl font-bold text-[#155541]">{card.title}</h3>
                  <p className="leading-7 text-[#5A4B3C]">{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-6xl text-center">

          <p className="mb-12 font-bold text-[#3C3C3C]">
            {t("home.stepsTitle")}
          </p>

          <div className="relative">

            <div className="hidden md:block absolute top-8 inset-x-[12%] h-[2px] bg-gray-300 z-0"></div>

            <div className="relative z-10 grid gap-10 md:grid-cols-4">
              {steps.map((step) => (
                <div key={step.number} className="text-center">

                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#155541] text-2xl font-bold text-white">
                    {step.number}
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-[#155541]">
                    {step.title}
                  </h3>

                  <p className="mx-auto max-w-xs leading-7 text-[#5A4B3C]">
                    {step.text}
                  </p>

                </div>
              ))}
            </div>

          </div>

        </div>
      </section>
      <section className="bg-gradient-to-r from-[#155541] to-[#5A4B3C] px-4 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div className="rounded-xl bg-white p-8 shadow-xl">
            <h2 className="mb-4 text-2xl font-bold text-[#155541]">{t("home.adahi.title")}</h2>
            <p className="leading-8 text-[#5A4B3C]">{t("home.adahi.text")}</p>
          </div>

          <img
            src="/Home/adahi.jpg"
            alt={t("home.adahi.title")}
            className="h-[360px] w-full rounded-xl object-cover shadow-xl"
          />
        </div>
      </section>

      <section className="bg-white px-4 py-20 text-center">
        <h2 className="mb-12 text-2xl font-bold text-[#3C3C3C]">{t("home.galleryTitle")}</h2>



        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {["/Home/box_cam.jpg", "/Home/sponge.jpg", "/Home/kid_box.JPG", "/Home/smily_kid.jpg", "/Home/boxes.jpg"].map(
            (img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                className={`w-full rounded-xl object-cover shadow-md ${index === 1
                  ? "md:row-span-2 h-[540px]"
                  : "h-64"
                  }`}
              />
            )
          )}
        </div>
      </section>

      <section className="bg-white px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <div key={index} className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
              <h3 className="mb-8 text-lg font-bold text-[#155541]">{item.label}</h3>
              <p className="text-4xl font-bold text-[#C19A5B]">
                <AnimatedCounter target={item.value} />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#F4F7F6] px-4 py-24 text-center">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[#EAEEED]">
          <div className="absolute left-0 top-10 h-32 w-full rounded-[50%] border-t-4 border-[#155541]/70" />
          <div className="absolute left-0 top-16 h-32 w-full rounded-[50%] border-t-4 border-[#155541]/25" />
          <div className="absolute left-0 top-24 h-32 w-full rounded-[50%] border-t-4 border-[#155541]/20" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <span className="mb-4 inline-block rounded-full bg-[#155541]/10 px-5 py-2 text-sm font-bold text-[#155541]">
            IAC Team
          </span>

          <h2 className="mb-10 text-4xl font-bold text-[#3C3C3C]">
            {t("home.teamTitle")}
          </h2>

          <div className="relative min-h-[620px]">


            <button
              onClick={prevTeam}
              className="absolute left-4 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#155541] shadow-lg ring-1 ring-black/10 transition hover:bg-[#155541] hover:text-white"
              aria-label="Previous"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextTeam}
              className="absolute right-4 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#155541] shadow-lg ring-1 ring-black/10 transition hover:bg-[#155541] hover:text-white"
              aria-label="Next"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div key={teamIndex} className="animate-[fadeTeam_.45s_ease] px-16">
              <img
                src={team[teamIndex].image}
                alt={team[teamIndex].name}
                className="mx-auto mb-8 h-[420px] w-[420px] rounded-full object-cover object-top shadow-xl ring-4 ring-white"
              />

              <h3 className="text-xl font-bold text-[#155541]">
                {team[teamIndex].name}
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-lg leading-8 text-[#5A4B3C]">
                “{team[teamIndex].role}”
              </p>
            </div>

            <div dir="ltr" className="mt-12 flex justify-center gap-3">
              {team.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTeamIndex(index)}
                  className={`h-3 w-3 rounded-full transition ${index === teamIndex ? "scale-125 bg-black" : "bg-[#858989]"
                    }`}
                  aria-label={`Go to member ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}