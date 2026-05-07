import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLang = localStorage.getItem("lang") || "ar";

const resources = {
  ar: {
    translation: {
      nav: {
        home: "الرئيسية",
        campaigns: "الحملات",
        services: "الخدمات",
        about: "من نحن",
        contact: "تواصل معنا",
        links: "كل الروابط",
        language: "English",
      },

      home: {
        title: "مرحباً بكم في IAC",
        subtitle1: "نقدم المساعدة الإنسانية والدعم الطارئ",
        subtitle2: "للمحتاجين حول العالم",
        subtitle3: "ملتزمون بقيم التضامن والكرامة",
        button: "عرض الحملات",

        campaignTitle: "استكشف أحدث حملاتنا وتحديثاتنا",
        campaignSubtitle: "كن جزءاً من التغيير",

        cards: {
          orphans: {
            title: "كفالة الأيتام",
            text: "هدفنا هو دعم الأيتام بشكل مستمر من خلال الكفالة الشهرية أو إدخال الفرح إلى قلوبهم.",
          },
          food: {
            title: "المساعدات الغذائية",
            text: "تشمل توزيع السلال الغذائية، وتقديم الوجبات الجاهزة، والأضاحي، وأسواق رمضان للعائلات المحتاجة.",
          },
          activities: {
            title: "الأنشطة والفعاليات",
            text: "ننظم أنشطة متنوعة مثل احتفالات الأعياد ونوادي الشطرنج ودروس السباحة للأطفال والشباب.",
          },
          emergency: {
            title: "الاستجابة الطارئة",
            text: "نقدم الدعم الفوري للأسر المتضررة من الكوارث والأزمات.",
          },
        },

        stepsTitle: "ابقَ على تواصل وكن جزءاً من مهمتنا المستمرة",
        steps: {
          browse: { title: "تصفح", text: "اطلع على مشاريعنا وخدماتنا." },
          signin: { title: "سجّل الدخول", text: "ادخل بأمان إلى حسابك." },
          donate: { title: "تبرع", text: "ادعم المحتاجين واصنع فرقاً." },
          join: { title: "انضم إلينا", text: "كن جزءاً من فريق يحدث تغييراً على الأرض." },
        },

        adahi: {
          title: "الأضاحي",
          text: "تعكس حملة الأضاحي قيم العطاء والتكافل، حيث نسعى لإيصال لحوم الأضاحي إلى الأسر الأكثر احتياجاً وإدخال الفرح إلى قلوبهم.",
        },

        galleryTitle: "معاً نصنع فرقاً – من الميدان",
        stats: {
          syria: "عدد المستفيدين بسوريا",
          centers: "عدد المراكز",
          families: "عائلات مستفيدة",
          meals: "وجبة يومية",
          eid: "هدية عيد",
          winter: "مساعدات الشتاء",
          baskets: "سلل غذائية",
          adahi: "أضاحي",
        },

        teamTitle: "تعرف على فريقنا",
        teamNames: {
          omari: "محمد العمري",
          mutasem: "معتصم عبادي",
          muhammad: "محمد عبادي",
          malaz: "ملاذ لطفي",
          amr: "عمرو سبسبي",
          ghufran: "غفران سبيعي",
          bayan: "بيان رحيم",
          haya: "هيا سكر"
        },
        team: {
          omari: "رؤية قيادية وتوجيه المنظمة نحو الأمام",
          mutasem: "قيادة الاستراتيجية ودفع نجاح المؤسسة",
          muhammad: "دمج الخبرة التقنية مع مهارات التصوير الإبداعي",
          malaz: "ربط حلول التكنولوجيا مع الإدارة المالية",
          amr: "تطوير الحلول وتحسين الأداء الرقمي",
          ghufran: "إدارة وتحليل وتنظيم قواعد البيانات",
          bayan: "ضمان التشغيل الأفضل لجميع التقنيات",
          haya: "بناء الأنظمة وصيانة البنية التحتية التقنية"
        },
      },

      campaigns: {
        pageTitle: "حملاتنا",
        old: "حملاتنا السابقة",
        view: "عرض الحملة",
        items: {
          "food-basket": {
            title: "سلة غذائية",
            description: "خلف كل صندوق قصة أمل.",
          },
          "fast-food-kitchens": {
            title: "مطابخ ووجبات سريعة",
            description: "في قلب المناطق المتضررة من الزلزال وفي مخيمات النزوح في تركيا وشمال سوريا.",
          },
          "eid-adha-sacrifices": {
            title: "أضاحي عيد الأضحى",
            description: "في عيد الأضحى المبارك، ننوب عنكم في إيصال أضاحيكم إلى مستحقيها.",
          },
          "ramadan-market": {
            title: "سوق رمضان",
            description: "في قلب ريف دمشق، أردنا أن نجعل لرمضان طعماً مختلفاً هذا العام.",
          },
          "football-academy": {
            title: "أكاديمية كرة القدم",
            description: "في مؤسسة الإغاثة الدولية، نؤمن بأن الرياضة ليست مجرد نشاط ترفيهي، بل وسيلة فعّالة لبناء شخصية الطفل وتعزيز ثقته بنفسه.",
          },
          "swimming-academy": {
            title: "أكاديمية السباحة",
            description: "توفّر أنشطة السباحة للأطفال بيئة ممتعة وآمنة تساعدهم على بناء الثقة في الماء وتطوير مهارات حياتية أساسية.",
          },
          "chess-academy": {
            title: "أكاديمية الشطرنج",
            description: "تُعد فعالية الشطرنج مساحة لتنمية التفكير الاستراتيجي وتعزيز مهارات التركيز والصبر لدى الأطفال.",
          },
          "eid-activities": {
            title: "أنشطة العيد",
            description: "عيدكم مبارك وسعيد.. بفيض من الحب والأمل، شاركنا أطفالنا فرحة عيد الأضحى وعيد الفطر.",
          },
          "sakienh-campaign": {
            title: "حملة سكينة",
            description: "تقديم المساعدات الإغاثية للأهالي وسكان المخيمات الذين تضرروا من الزلزال الأخير.",
          },
          "winter-assistance": {
            title: "مساعدات الشتاء",
            description: "نقوم بتقديم مساعدات الشتاء للأسر المحتاجة.",
          },
          "emergency-response-fires": {
            title: "استجابة طارئة للحرائق",
            description: "نقوم بالاستجابة الطارئة للحرائق.",
          },
          "monthly-sponsorships": {
            title: "كفالات شهرية",
            description: "نقدم كفالات شهرية للأيتام تهدف إلى تأمين احتياجاتهم الأساسية.",
          },
          "joy-for-orphan": {
            title: "فرحة يتيم",
            description: "نسعى إلى إدخال الفرح إلى قلوب الأيتام.",
          },
          "earthquake-response": {
            title: "استجابة الزلزال",
            description: "استجبنا للزلزال من خلال تقديم الدعم العاجل للأسر المتضررة، والمساهمة في ترميم المنازل وتأمين الاحتياجات الأساسية للمتضررين.",
          },
        },
      },
      footer: {
        title: "مؤسسة الإغاثة الدولية",
        text: "منظمة إنسانية غير ربحية تهدف إلى تقديم الإغاثة والدعم للمجتمعات المحتاجة، مع التزامنا بالشفافية والمصداقية في إيصال المساعدات لمستحقيها.",
        addressTitle: "العنوان",
        address: "المنطقة الحرة - دمشق - سوريا",
        contactTitle: "تواصل معنا",
        rights: "© جميع الحقوق محفوظة - مؤسسة الإغاثة الدولية",
      },
      servicesPage: {
        pageTitle: "خدماتنا",
        emergencyTitle: "الاستجابة الطارئة",
        emergencyDesc: "نستجيب فوراً للطوارئ والكوارث بتقديم الدعم العاجل للأسر المتضررة.",
        fieldworkTitle: "العمل الميداني",
        fieldworkDesc: "ننفذ مبادرات ميدانية لتحسين البيئة والمجتمع وتنظيم الأنشطة التطوعية.",
        foodTitle: "الإغاثة الغذائية",
        foodDesc: "نقدم المساعدة الغذائية للأسر المحتاجة لضمان احتياجاتهم الأساسية.",
        quadTitle: "خدماتنا الإنسانية",
        quadDesc1: "نعمل على الاستجابة الفورية للطوارئ والكوارث وتقديم الدعم العاجل للأسر المتضررة في مختلف المناطق.",
        quadDesc2: "كما ننفذ المبادرات الميدانية ونوفر الإغاثة الغذائية للفئات الأكثر احتياجاً.",
        btnDiscover: "اكتشف حملاتنا"
      },
      about: {
        title: "حول مؤسسة الإغاثة",
        heading: "مؤسسة الإغاثة .. جسر من الأمل إلى عالم أفضل.",
        description: "في عالم مليء بالتحديات والأزمات، تقف مؤسسة الإغاثة الدولية كمنارة للأمل، مكرسة جهودها لتوفير الإغاثة والدعم للمجتمعات المهمشة والمنكوبة في جميع أنحاء العالم. نحن نؤمن بأن كل إنسان، بغض النظر عن خلفيته أو موقعه، يستحق فرصة للعيش بكرامة وأمان.",
        expansion: {
          title: "التوسع الدولي لمنظمتنا",
          subtitle: "تراخيص دولية ... تأثير بلا حدود",
          tagline: "من أجل الإنسان من كل مكان",
          countries: {
            syria: "سوريا",
            jordan: "الأردن",
            palestine: "فلسطين",
            turkey: "تركيا",
            uk: "بريطانيا",
            usa: "الولايات المتحدة",
            southAfrica: "جنوب افريقيا"
          }
        },
        goals: {
          betterPlace: {
            title: "لنصنع مكاناً أفضل.",
            desc: "لا حدود لعطائنا؛ نتحرك دولياً وفي عمق سوريا لنحول الأزمات إلى استقرار، نزرع الإغاثة والتعليم لنبني عالماً تصان فيه الكرامة الإنسانية للجميع."
          },
          sustainability: {
            title: "نحو تحويل الاستجابة إلى استدامة.. والأمل إلى واقع.",
            desc: "نحن نكرّس جهودنا في IAC لنكون جسراً يربط بين الموارد الإغاثية والاحتياجات الميدانية الأكثر إلحاحاً. عبر مزيجٍ من التدخل العاجل والتمكين التنموي، نعمل في سوريا وحول العالم لبناء أساس متين لحياةٍ تزدهر من جديد."
          },
          dignity: {
            title: "أفق بلا حواجز، حيث الكرامة حق مصان.",
            desc: "نطمح لترسيخ عالم تعلو فيه قيم الكرامة الإنسانية، وتتلاشى فيه فجوات الاحتياج؛ لتمكين كل فرد في المجتمعات المنسية من امتلاك زمام مستقبله."
          },
          heroes: {
            title: "أبطال الميدان: تضحيةٌ بلا حدود.",
            desc: "من أرض الميدان إلى جميع انحاء العالم، متطوعونا هم نبض الاستجابة. بجهودهم الصامتة وتضحياتهم الكبرى، ينسجون جسور الأمل."
          }
        }
      },
      contact: {
        title: "تواصل معنا",
        intro1: "تواصل معنا بخصوص أي شيء متعلق بشركتنا أو خدماتنا.",
        intro2: "سنبذل قصارى جهدنا للرد عليك في أقرب وقت ممكن.",
        name: "الاسم",
        phone: "رقم الهاتف",
        email: "البريد الإلكتروني",
        company: "الشركة",
        subject: "الموضوع",
        question: "السؤال",
        submit: "إرسال",
        success: "تم تجهيز رسالتك بنجاح.",
        infoTitle: "مؤسسة الإغاثة الدولية",
        address: "المنطقة الحرة - دمشق - سوريا",
        phoneNumber: "+963989826345",
        emailAddress: "iaccharitysy@outlook.com",
      },
    },
  },

  en: {
    translation: {
      nav: {
        home: "Home",
        campaigns: "Campaigns",
        services: "Services",
        about: "About Us",
        contact: "Contact Us",
        links: "All links",
        language: "العربية",
      },

      home: {
        title: "Welcome to IAC",
        subtitle1: "We provide humanitarian assistance and emergency support",
        subtitle2: "to those in need around the world",
        subtitle3: "committed to the values of solidarity and dignity.",
        button: "View Campaigns",

        campaignTitle: "Explore our latest campaigns and updates",
        campaignSubtitle: "Be part of the change",

        cards: {
          orphans: {
            title: "Sponsorship of Orphans",
            text: "Our goal is to continuously support orphans through monthly sponsorship or by bringing joy to their hearts.",
          },
          food: {
            title: "Food Assistance",
            text: "Includes distribution of food baskets, ready meals, Adahi, and Ramadan markets for needy families.",
          },
          activities: {
            title: "Activities & Events",
            text: "Various activities are organized such as holiday celebrations, chess clubs, and swimming lessons.",
          },
          emergency: {
            title: "Emergency Response",
            text: "We provide immediate support for families affected by disasters and crises.",
          },
        },

        stepsTitle: "Stay connected and be part of our ongoing mission",
        steps: {
          browse: { title: "Browse", text: "Check out our projects and services." },
          signin: { title: "Sign in", text: "Log in securely to your safe account." },
          donate: { title: "Donate", text: "Support those in need and make a difference." },
          join: { title: "Join us", text: "Be part of a team that makes changes on the ground." },
        },

        adahi: {
          title: "ADAHI",
          text: "The Qurbani campaign reflects the values of giving and solidarity, as we strive to deliver sacrificial meat to the most vulnerable families, bringing joy to their hearts and easing their hardships.",
        },

        galleryTitle: "Together making a difference – from the field",
        stats: {
          syria: "Beneficiaries in Syria",
          centers: "Number of Centers",
          families: "Beneficiary Families",
          meals: "Daily Meals",
          eid: "Eid Gifts",
          winter: "Winter Assistance",
          baskets: "Food Baskets",
          adahi: "ADAHI",
        },

        teamTitle: "Meet our team",
        teamNames: {
          omari: "Mohammed Omari",
          mutasem: "Mutasem Abbadi",
          muhammad: "Muhammad Abbadi",
          malaz: "Malaz Lutfi",
          amr: "Amr Sabsabi",
          ghufran: "Ghufran Sbiai",
          bayan: "Bayan Rheem",
          haya: "Haya Sukkar"
        },
        team: {
          omari: "A leadership vision and guiding the organization forward",
          mutasem: "Leading the strategy and driving organizational success",
          muhammad: "Combining technical expertise with creative photography skills",
          malaz: "Linking technology solutions with financial management",
          amr: "Developing solutions and improving digital performance",
          ghufran: "Managing, analyzing, and organizing data systems",
          bayan: "Ensuring optimal operation for all technologies",
          haya: "System building and technical infrastructure maintenance"
        },
      },
      campaigns: {
        pageTitle: "Our Campaigns",
        old: "Old Campaigns",
        view: "View Campaign",
        items: {
          "food-basket": {
            title: "Food Basket",
            description: "Behind every box is a story of hope.",
          },
          "fast-food-kitchens": {
            title: "Fast Food and Kitchens",
            description: "In the heart of the earthquake-affected areas and in the displacement camps in Turkey and northern Syria.",
          },
          "eid-adha-sacrifices": {
            title: "Eid al-Adha Sacrifices",
            description: "On the blessed occasion of Eid al-Adha, we act on your behalf to deliver your sacrificial offerings to those in need.",
          },
          "ramadan-market": {
            title: "Ramadan Market",
            description: "In the heart of the Damascus countryside, we wanted to give Ramadan a different flavor this year.",
          },
          "football-academy": {
            title: "Football Academy",
            description: "At the IAC, we believe that sports are more than just recreation—they are a powerful tool for building character and boosting children’s confidence.",
          },
          "swimming-academy": {
            title: "Swimming Academy",
            description: "Swimming activities provide children with a fun and safe environment to build confidence in the water while developing essential life skills.",
          },
          "chess-academy": {
            title: "Chess Academy",
            description: "Chess activity provides a space to develop strategic thinking and enhance children's concentration and patience.",
          },
          "eid-activities": {
            title: "Eid Activities",
            description: "Your Eid is blessed and happy. With an abundance of love and hope, we shared the joy of Eid al-Adha and Eid al-Fitr with our children.",
          },
          "sakienh-campaign": {
            title: "Sakienh Campaign",
            description: "Providing relief aid to the families and camp residents affected by the recent earthquake.",
          },
          "winter-assistance": {
            title: "Winter Assistance",
            description: "We provide winter aid to families in need.",
          },
          "emergency-response-fires": {
            title: "Emergency Response to Fires",
            description: "We carry out emergency responses to fires.",
          },
          "monthly-sponsorships": {
            title: "Monthly Sponsorships",
            description: "We provide monthly sponsorships for orphans aimed at covering their basic needs.",
          },
          "joy-for-orphan": {
            title: "Joy for an Orphan",
            description: "We strive to bring joy to the hearts of orphans.",
          },
          "earthquake-response": {
            title: "Earthquake Response",
            description: "We responded to the earthquake by providing urgent support to affected families, helping restore damaged homes, and securing essential needs for those impacted.",
          },
        },
      },
      servicesPage: {
        pageTitle: "Our Services",
        emergencyTitle: "Emergency Response",
        emergencyDesc: "We respond immediately to emergencies and disasters, providing urgent support to affected families.",
        fieldworkTitle: "Field Work",
        fieldworkDesc: "We implement field initiatives to improve the environment and society, organizing volunteer activities.",
        foodTitle: "Food Relief",
        foodDesc: "We provide food assistance to families in need to ensure their basic needs are met.",
        quadTitle: "Our Humanitarian Services",
        quadDesc1: "We work to provide immediate response to emergencies and disasters, offering urgent support to affected families in various regions.",
        quadDesc2: "We also implement field initiatives and provide food relief to the most vulnerable groups.",
        btnDiscover: "Discover Our Campaigns"
      },
      about: {
        title: "About IAC",
        heading: "Relief Foundation... A bridge of hope to a better world.",
        description: "In a world full of challenges and crises, International Aid Charity (IAC) stands as a beacon of hope, dedicated to providing relief and support to marginalized and disaster-stricken communities worldwide. We believe that every human being, regardless of their background or location, deserves a chance to live in dignity and safety.",
        expansion: {
          title: "Our International Expansion",
          subtitle: "International Licenses ... Boundless Impact",
          tagline: "For humans everywhere",
          countries: {
            syria: "Syria",
            jordan: "Jordan",
            palestine: "Palestine",
            turkey: "Turkey",
            uk: "United Kingdom",
            usa: "United States",
            southAfrica: "South Africa"
          }
        },
        goals: {
          betterPlace: {
            title: "Let's make it a better place.",
            desc: "Our giving knows no bounds; we act internationally and deep within Syria to transform crises into stability, planting relief and education to build a world where human dignity is preserved for all."
          },
          sustainability: {
            title: "Towards transforming response into sustainability.. and hope into reality.",
            desc: "At IAC, we dedicate our efforts to being a bridge connecting relief resources with the most urgent field needs. Through a blend of urgent intervention and developmental empowerment, we work in Syria and around the world to build a solid foundation for life to flourish anew."
          },
          dignity: {
            title: "A horizon without barriers, where dignity is a protected right.",
            desc: "We aspire to establish a world where human dignity prevails and needs gaps vanish, empowering every individual in forgotten communities to take charge of their future."
          },
          heroes: {
            title: "Field Heroes: Limitless Sacrifice.",
            desc: "From the field to all over the world, our volunteers are the pulse of the response. Through their silent efforts and great sacrifices, they weave bridges of hope."
          }
        }
      },
      contact: {
        title: "Contact us",
        intro1: "Contact us about anything related to our company or services.",
        intro2: "We'll do our best to get back to you as soon as possible.",
        name: "Name",
        phone: "Phone Number",
        email: "Email",
        company: "Company",
        subject: "Subject",
        question: "Question",
        submit: "Submit",
        success: "Your message has been prepared successfully.",
        infoTitle: "International Aid Charity",
        address: "Freezone - Damascus - Syria",
        phoneNumber: "+963989826345",
        emailAddress: "iaccharitysy@outlook.com",
      },
      footer: {
        title: "International Aid Charity",
        text: "It is a non-profit humanitarian organization aimed at providing relief and support to communities in need, with our commitment to transparency and credibility in delivering aid to those who deserve it.",
        addressTitle: "Address",
        address: "Freezone - Damascus - Syria",
        contactTitle: "Contact us",
        rights: "© International Aid Charity. All rights reserved.",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: savedLang,
  fallbackLng: "ar",
  interpolation: {
    escapeValue: false,
  },
});

document.documentElement.lang = savedLang;
document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  localStorage.setItem("lang", lng);
});

export default i18n;
