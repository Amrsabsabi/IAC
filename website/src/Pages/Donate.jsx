import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Donate() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  function handleSubmit(e) {
    e.preventDefault();

    alert("تم إرسال طلب التبرع بنجاح");
    navigate("/donor");
  }

  return (
    <main className="min-h-screen bg-[#F5F7F6] px-4 py-10" dir="rtl">
      <div className="mx-auto max-w-4xl">
        <section className="mb-8 rounded-[32px] bg-gradient-to-l from-[#155541] to-[#2E7D61] p-8 text-white">
          <h1 className="text-4xl font-bold">إتمام التبرع</h1>
          <p className="mt-4 max-w-2xl text-white/85">
            اختر قيمة التبرع وطريقة الدفع المناسبة لإكمال مساهمتك.
          </p>
        </section>

        <form
          onSubmit={handleSubmit}
          className="rounded-[32px] bg-white p-8 shadow-sm"
        >
          <div className="mb-6">
            <label className="mb-2 block font-semibold text-[#155541]">
              مبلغ التبرع
            </label>

            <input
              type="number"
              min="1"
              placeholder="أدخل المبلغ"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-2xl border px-5 py-4 outline-none focus:ring-2 focus:ring-[#155541]"
              required
            />
          </div>

          <div className="mb-8">
            <label className="mb-4 block font-semibold text-[#155541]">
              طريقة الدفع
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                { value: "card", label: "بطاقة مصرفية" },
                { value: "paypal", label: "PayPal" },
                { value: "bank", label: "تحويل بنكي" },
                { value: "contact", label: "الدفع عند التواصل" },
              ].map((method) => (
                <button
                  type="button"
                  key={method.value}
                  onClick={() => setPaymentMethod(method.value)}
                  className={`rounded-2xl border px-5 py-4 text-right font-semibold transition ${
                    paymentMethod === method.value
                      ? "border-[#155541] bg-[#155541] text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-[#155541]"
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[#F5F7F6] p-5">
            <p className="text-gray-600">ملخص التبرع</p>

            <div className="mt-4 flex justify-between font-bold text-[#155541]">
              <span>المبلغ</span>
              <span>{amount || 0} $</span>
            </div>

            <div className="mt-3 flex justify-between text-gray-600">
              <span>طريقة الدفع</span>
              <span>{paymentMethod}</span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-2xl bg-[#FDBB2D] px-6 py-4 font-bold text-[#155541] transition hover:opacity-90"
          >
            تأكيد التبرع
          </button>
        </form>
      </div>
    </main>
  );
}