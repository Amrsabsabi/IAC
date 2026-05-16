import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

export default function DonorDashboard() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { signOut } = useClerk();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [fullName, setFullName] = useState(
    user?.fullName || user?.username || ""
  );
  const [phone, setPhone] = useState(user?.phoneNumbers?.[0]?.phoneNumber || "");
  const [address, setAddress] = useState("");
  const [saving, setSaving] = useState(false);

  const donations = [
    {
      id: 1,
      amount: 100,
      status: "مكتمل",
      date: "2026-05-10",
      campaign: "حملة الغذاء",
    },
    {
      id: 2,
      amount: 50,
      status: "قيد المعالجة",
      date: "2026-05-08",
      campaign: "حملة الأيتام",
    },
  ];

  const campaigns = [
    {
      id: 1,
      title: "حملة دعم الأسر المحتاجة",
      location: "دمشق",
      image: "/Home/food.JPG",
    },
    {
      id: 2,
      title: "حملة كسوة الأطفال",
      location: "حلب",
      image: "/Home/child.jpg",
    },
  ];

  const displayName =
    fullName ||
    user?.fullName ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress ||
    "Donor";

  const displayEmail = user?.primaryEmailAddress?.emailAddress || "";
  const firstLetter = displayName?.charAt(0)?.toUpperCase() || "D";
  const totalDonated = donations.reduce((sum, item) => sum + item.amount, 0);

  async function handleSaveProfile() {
    if (!user) return;

    setSaving(true);

    try {
      await user.update({
        firstName: fullName.split(" ")[0] || fullName,
        lastName: fullName.split(" ").slice(1).join(" ") || "",
        unsafeMetadata: {
          phone,
          address,
        },
      });

      alert("تم حفظ التعديلات بنجاح");
    } catch (error) {
      alert(error.message || "حدث خطأ أثناء حفظ البيانات");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await signOut();
    navigate("/");
  }

  return (
    <main className="min-h-screen bg-[#F5F7F6]" dir="rtl">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-l border-white/10 bg-[#155541] p-6 text-white lg:flex">
          <div className="mb-12 border-b border-white/10 pb-8">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl font-bold text-[#155541]">
                {firstLetter}
              </div>

              <div>
                <h2 className="text-xl font-bold">{displayName}</h2>
                <p className="mt-1 text-sm text-white/70">Donor Account</p>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full rounded-2xl px-5 py-4 text-right font-semibold transition ${
                activeTab === "dashboard" ? "bg-white/10" : "hover:bg-white/10"
              }`}
            >
              لوحة التحكم
            </button>

            <button
              onClick={() => setActiveTab("donations")}
              className={`w-full rounded-2xl px-5 py-4 text-right transition ${
                activeTab === "donations" ? "bg-white/10" : "hover:bg-white/10"
              }`}
            >
              التبرعات
            </button>

            <button
              onClick={() => navigate("/campaigns")}
              className="w-full rounded-2xl px-5 py-4 text-right transition hover:bg-white/10"
            >
              الحملات
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full rounded-2xl px-5 py-4 text-right transition ${
                activeTab === "profile" ? "bg-white/10" : "hover:bg-white/10"
              }`}
            >
              الملف الشخصي
            </button>

            <button className="w-full rounded-2xl px-5 py-4 text-right transition hover:bg-white/10">
              الإعدادات
            </button>
          </nav>

          <div className="mt-auto pt-6">
            <button
              onClick={handleLogout}
              className="w-full rounded-2xl bg-white px-5 py-4 font-bold text-[#155541] transition hover:opacity-90"
            >
              تسجيل الخروج
            </button>
          </div>
        </aside>

        <div className="flex-1 p-4 md:p-8">
          <section className="rounded-[32px] bg-gradient-to-l from-[#155541] to-[#2E7D61] p-8 text-white shadow-lg">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-white/70">
              Donor Dashboard
            </p>

            <h1 className="text-4xl font-bold">مرحباً {displayName}</h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/85">
              يمكنك من خلال هذه الصفحة متابعة مساهماتك، مراجعة التبرعات السابقة،
              وإدارة بيانات حسابك بسهولة.
            </p>
          </section>

          <div className="mt-5 grid gap-3 lg:hidden">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`rounded-2xl px-4 py-3 font-bold ${
                  activeTab === "dashboard"
                    ? "bg-[#155541] text-white"
                    : "bg-white text-[#155541]"
                }`}
              >
                الرئيسية
              </button>

              <button
                onClick={() => setActiveTab("donations")}
                className={`rounded-2xl px-4 py-3 font-bold ${
                  activeTab === "donations"
                    ? "bg-[#155541] text-white"
                    : "bg-white text-[#155541]"
                }`}
              >
                التبرعات
              </button>

              <button
                onClick={() => setActiveTab("profile")}
                className={`rounded-2xl px-4 py-3 font-bold ${
                  activeTab === "profile"
                    ? "bg-[#155541] text-white"
                    : "bg-white text-[#155541]"
                }`}
              >
                الملف
              </button>

              <button
                onClick={handleLogout}
                className="rounded-2xl bg-white px-4 py-3 font-bold text-red-600"
              >
                خروج
              </button>
            </div>
          </div>

          {(activeTab === "dashboard" || activeTab === "donations") && (
            <section className="mt-8 grid gap-5 md:grid-cols-3">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">إجمالي التبرعات</p>
                <h2 className="mt-4 text-4xl font-bold text-[#155541]">
                  ${totalDonated}
                </h2>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">عدد عمليات التبرع</p>
                <h2 className="mt-4 text-4xl font-bold text-[#155541]">
                  {donations.length}
                </h2>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">الحملات المدعومة</p>
                <h2 className="mt-4 text-4xl font-bold text-[#155541]">2</h2>
              </div>
            </section>
          )}

          {activeTab === "profile" && (
            <section className="mt-8 rounded-[32px] bg-white p-8 shadow-sm">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#155541]">
                  الملف الشخصي
                </h2>
                <p className="mt-2 text-gray-500">
                  يمكنك عرض وتعديل البيانات الشخصية المرتبطة بحساب المتبرع.
                </p>
              </div>

              <div className="mb-8 flex flex-col gap-6 rounded-3xl bg-[#F8FAF9] p-6 md:flex-row md:items-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#155541] text-4xl font-bold text-white">
                  {firstLetter}
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#155541]">
                    {displayName}
                  </h3>
                  <p className="mt-2 text-gray-500">{displayEmail}</p>
                  <p className="mt-2 text-sm font-semibold text-[#155541]">
                    Donor Account
                  </p>
                </div>
              </div>

              <form className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-semibold text-[#155541]">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-2xl border px-5 py-4 outline-none focus:ring-2 focus:ring-[#155541]"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-[#155541]">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    value={displayEmail}
                    disabled
                    className="w-full rounded-2xl border bg-gray-100 px-5 py-4 text-gray-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-[#155541]">
                    رقم الهاتف
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09xxxxxxxx"
                    className="w-full rounded-2xl border px-5 py-4 outline-none focus:ring-2 focus:ring-[#155541]"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-[#155541]">
                    نوع الحساب
                  </label>
                  <input
                    type="text"
                    value="donor"
                    disabled
                    className="w-full rounded-2xl border bg-gray-100 px-5 py-4 text-gray-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block font-semibold text-[#155541]">
                    العنوان
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="أدخل العنوان"
                    className="w-full rounded-2xl border px-5 py-4 outline-none focus:ring-2 focus:ring-[#155541]"
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="rounded-2xl bg-[#155541] px-8 py-4 font-bold text-white transition hover:opacity-90 disabled:opacity-60"
                  >
                    {saving ? "جاري الحفظ..." : "حفظ التعديلات"}
                  </button>
                </div>
              </form>
            </section>
          )}

          {activeTab === "dashboard" && (
            <section className="mt-8 rounded-[32px] bg-white p-8 shadow-sm">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#155541]">
                  حملات مقترحة
                </h2>
                <p className="mt-2 text-gray-500">
                  حملات متاحة حالياً يمكنك المساهمة في دعمها.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="overflow-hidden rounded-3xl border border-gray-100 bg-white transition hover:shadow-lg"
                  >
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="h-56 w-full object-cover"
                    />

                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-[#155541]">
                        {campaign.title}
                      </h3>

                      <p className="mt-3 text-gray-500">{campaign.location}</p>

                      <button
                        onClick={() => navigate("/campaigns")}
                        className="mt-6 w-full rounded-2xl bg-[#155541] py-4 font-semibold text-white transition hover:opacity-90"
                      >
                        التبرع للحملة
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {(activeTab === "dashboard" || activeTab === "donations") && (
            <section className="mt-8 rounded-[32px] bg-white p-8 shadow-sm">
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-[#155541]">
                    سجل التبرعات
                  </h2>
                  <p className="mt-2 text-gray-500">
                    عرض آخر عمليات التبرع المسجلة على الحساب.
                  </p>
                </div>

                <button
                  onClick={() => navigate("/donate")}
                  className="rounded-2xl bg-[#FDBB2D] px-6 py-4 font-bold text-[#155541] transition hover:opacity-90"
                >
                  تبرع جديد
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-y-4">
                  <thead>
                    <tr className="text-right text-gray-500">
                      <th className="pb-3 font-medium">الحملة</th>
                      <th className="pb-3 font-medium">التاريخ</th>
                      <th className="pb-3 font-medium">المبلغ</th>
                      <th className="pb-3 font-medium">الحالة</th>
                    </tr>
                  </thead>

                  <tbody>
                    {donations.map((donation) => (
                      <tr key={donation.id} className="rounded-2xl bg-[#F8FAF9]">
                        <td className="rounded-r-2xl px-5 py-5 font-semibold text-[#155541]">
                          {donation.campaign}
                        </td>

                        <td className="px-5 py-5 text-gray-600">
                          {donation.date}
                        </td>

                        <td className="px-5 py-5 font-bold text-[#155541]">
                          ${donation.amount}
                        </td>

                        <td className="rounded-l-2xl px-5 py-5">
                          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                            {donation.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}