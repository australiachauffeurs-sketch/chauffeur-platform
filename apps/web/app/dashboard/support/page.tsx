"use client";
import { useState } from "react";

const FAQS = [
  { q:"How do I cancel a booking?", a:"You can cancel a booking up to 2 hours before the scheduled pickup time for free. Go to My Bookings, open the booking and click Cancel. Cancellations within 2 hours may incur a fee." },
  { q:"Will my driver wait if my flight is delayed?", a:"Yes! We track your flight in real time. If your flight is delayed, your driver will be informed and will wait at no extra charge for up to 60 minutes after landing." },
  { q:"Can I change my pickup address?", a:"Yes, contact our support team at least 2 hours before your booking and we will update the details. Changes cannot be made less than 2 hours before pickup." },
  { q:"How do I get a receipt?", a:"A receipt is automatically emailed to you after each completed trip. You can also view and download receipts from the booking details page." },
  { q:"What payment methods do you accept?", a:"We accept all major credit and debit cards (Visa, Mastercard, Amex) via Stripe. Corporate accounts can set up monthly invoicing." },
  { q:"Can I book for someone else?", a:"Absolutely. During booking, enter the passenger's name and contact details in the special requests field and we will ensure your driver is briefed." },
];

export default function SupportPage() {
  const [open, setOpen]       = useState<number | null>(null);
  const [form, setForm]       = useState({ subject: "", message: "", type: "general" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-2xl space-y-6 animate-fade-in">
      {/* Contact cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon:<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>, label:"Call Us",   val:"1800 ELITE",          sub:"24/7 · Free call",    href:"tel:1800358328"              },
          { icon:<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>, label:"Email",     val:"support@elite.com.au", sub:"Reply within 2 hours", href:"mailto:support@elite.com.au" },
          { icon:<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/></svg>, label:"Live Chat", val:"Chat Now",             sub:"Avg 3 min response",   href:"#chat"                       },
        ].map(c => (
          <a key={c.label} href={c.href}
            className="bg-white border border-gray-100 hover:border-[#C9A84C]/40 rounded-2xl p-5 text-center group transition-all duration-200 hover:shadow-md">
            <span className="block mb-2 text-[#C9A84C]">{c.icon}</span>
            <p className="text-gray-500 text-xs font-medium mb-1">{c.label}</p>
            <p className="text-gray-900 font-bold text-sm group-hover:text-[#C9A84C] transition-colors">{c.val}</p>
            <p className="text-gray-400 text-xs mt-0.5">{c.sub}</p>
          </a>
        ))}
      </div>

      {/* Submit a ticket */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <h3 className="text-gray-900 font-bold mb-5">Send a Message</h3>
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center"><svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg></div>
            <h4 className="text-gray-900 font-bold text-lg mb-2">Message Sent!</h4>
            <p className="text-gray-400 text-sm">We'll get back to you within 2 hours. Check your email for a confirmation.</p>
            <button onClick={() => { setSubmitted(false); setForm({ subject:"", message:"", type:"general" }); }}
              className="mt-5 text-sm text-[#C9A84C] font-semibold hover:underline">
              Send another message
            </button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
            <div>
              <label className="block text-gray-500 text-xs font-medium mb-1.5">Topic</label>
              <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#C9A84C]">
                <option value="general">General enquiry</option>
                <option value="booking">Booking issue</option>
                <option value="driver">Driver complaint</option>
                <option value="payment">Payment / refund</option>
                <option value="lost">Lost property</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-500 text-xs font-medium mb-1.5">Subject</label>
              <input type="text" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                placeholder="Brief description of your issue"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/10"
              />
            </div>
            <div>
              <label className="block text-gray-500 text-xs font-medium mb-1.5">Message</label>
              <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                rows={4} placeholder="Tell us what happened and how we can help…"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/10 resize-none"
              />
            </div>
            <button type="submit"
              className="font-bold py-3 px-6 rounded-xl text-sm text-black"
              style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}>
              Send Message →
            </button>
          </form>
        )}
      </div>

      {/* FAQs */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-50">
          <h3 className="text-gray-900 font-bold">Frequently Asked Questions</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {FAQS.map((faq, i) => (
            <div key={i}>
              <button
                className="w-full text-left px-6 py-4 flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-gray-800 font-semibold text-sm">{faq.q}</span>
                <span className={`text-[#C9A84C] text-xl flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {open === i && (
                <div className="px-6 pb-4">
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
