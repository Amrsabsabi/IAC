import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useClerk } from "@clerk/clerk-react";
import { useAppAuth } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { profile, isSignedIn, isAdmin, loading } = useAppAuth();

  const [open, setOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { t, i18n } = useTranslation();

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/campaigns", label: t("nav.campaigns") },
    { to: "/services", label: t("nav.services") },
    { to: "/about-us", label: t("nav.about") },
    { to: "/contact-us", label: t("nav.contact") },
  ];

  const dashboardPath = isAdmin ? "/admin/dashboard" : "/donor";
  const displayName = profile?.name || profile?.email || "Dashboard";

  const logout = async () => {
    await signOut();
    setOpen(false);
    navigate("/");
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
        setOpen(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`sticky top-0 z-50 bg-[#155541] text-white shadow-md transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src="/icon/iac_logo_with_name.png"
            alt="IAC Logo"
            className="h-14 w-auto object-contain"
          />
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-md px-5 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "border border-[#D6B390] text-[#D6B390]"
                    : "text-white hover:text-[#D6B390]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="rounded-md border border-white/30 px-4 py-2 text-sm font-semibold hover:border-[#D6B390] hover:text-[#D6B390]"
          >
            {t("nav.language")}
          </button>

          {!loading && isSignedIn ? (
            <>
              <NavLink
                to={dashboardPath}
                className="hidden rounded-md border border-[#D6B390] px-4 py-2 text-sm font-semibold text-[#D6B390] hover:bg-[#D6B390] hover:text-[#155541] md:block"
              >
                {displayName}
              </NavLink>

              <button
                onClick={logout}
                className="hidden rounded-md border border-white/30 px-4 py-2 text-sm font-semibold hover:border-red-300 hover:text-red-300 md:block"
              >
                Logout
              </button>
            </>
          ) : (
            !loading && (
              <NavLink
                to="/login"
                className="hidden rounded-md border border-white/30 px-4 py-2 text-sm font-semibold hover:border-[#D6B390] hover:text-[#D6B390] md:block"
              >
                Login
              </NavLink>
            )
          )}

          <a
            href="https://allmylinks.com/iaccharity"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-xl hover:border-[#D6B390] hover:text-[#D6B390]"
            title={t("nav.links")}
          >
            🔗
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="text-2xl md:hidden"
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <div className="bg-[#155541] px-4 pb-4 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="block border-b border-white/20 py-3"
            >
              {link.label}
            </NavLink>
          ))}

          <div className="mt-4 space-y-3">
            {!loading && isSignedIn ? (
              <>
                <NavLink
                  to={dashboardPath}
                  onClick={() => setOpen(false)}
                  className="block rounded-md border border-[#D6B390] px-4 py-3 text-center font-bold text-[#D6B390]"
                >
                  {displayName}
                </NavLink>

                <button
                  onClick={logout}
                  className="block w-full rounded-md border border-red-300 px-4 py-3 text-center font-bold text-red-300"
                >
                  Logout
                </button>
              </>
            ) : (
              !loading && (
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block rounded-md border border-white/30 px-4 py-3 text-center font-bold"
                >
                  Login
                </NavLink>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}