import { Metadata } from "next";
import { SITE_URL, BUSINESS } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy | Elite Chauffeurs Australia",
  description:
    "Privacy Policy for Elite Chauffeurs Australia — how we collect, use, and protect your personal information in our chauffeur booking platform and driver mobile app.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "25 June 2026";
const CONTACT_EMAIL = "bookings@elitechauffeurs.com.au";
const BUSINESS_NAME = "Elite Chauffeurs Australia";
const BUSINESS_ADDRESS = "Adelaide CBD, South Australia 5000";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 40 }}>
    <h2 style={{ color: "#C9A84C", fontSize: 20, fontWeight: 700, marginBottom: 14, borderBottom: "1px solid #2A2A30", paddingBottom: 10 }}>
      {title}
    </h2>
    <div style={{ color: "#A1A1AA", fontSize: 15, lineHeight: 1.8 }}>{children}</div>
  </section>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ marginBottom: 12 }}>{children}</p>
);

const UL = ({ items }: { items: string[] }) => (
  <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
    {items.map((item, i) => (
      <li key={i} style={{ marginBottom: 6 }}>{item}</li>
    ))}
  </ul>
);

export default function PrivacyPage() {
  return (
    <main style={{ background: "#09090B", minHeight: "100vh", color: "#E4E4E7" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#09090B 0%,#0D0D0F 100%)", borderBottom: "1px solid #2A2A30", padding: "60px 24px 40px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ color: "#C9A84C", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
            Legal
          </p>
          <h1 style={{ color: "#FFFFFF", fontSize: 36, fontWeight: 800, marginBottom: 12 }}>
            Privacy Policy
          </h1>
          <p style={{ color: "#71717A", fontSize: 14 }}>
            Last updated: {LAST_UPDATED} · {BUSINESS_NAME}
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>

        <Section title="1. About This Policy">
          <P>
            {BUSINESS_NAME} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your personal
            information in accordance with the <strong style={{ color: "#E4E4E7" }}>Australian Privacy Act 1988 (Cth)</strong> and
            the Australian Privacy Principles (APPs).
          </P>
          <P>
            This Privacy Policy explains how we collect, use, disclose, and store personal information
            obtained through our website, booking platform, driver mobile application, and customer
            mobile application (collectively, the &quot;Services&quot;).
          </P>
          <P>
            By using our Services, you agree to the collection and use of information as described in this policy.
          </P>
        </Section>

        <Section title="2. Information We Collect">
          <P><strong style={{ color: "#E4E4E7" }}>From Customers (passengers):</strong></P>
          <UL items={[
            "Full name and contact details (email address, phone number)",
            "Pickup and dropoff addresses",
            "Booking details (date, time, vehicle type, number of passengers)",
            "Payment information (processed securely — we do not store full card details)",
            "Flight number and special requests",
            "Account login credentials (email and password, stored encrypted)",
            "Trip history and receipts",
          ]} />

          <P><strong style={{ color: "#E4E4E7" }}>From Drivers:</strong></P>
          <UL items={[
            "Full name, email address, and phone number",
            "Driver's licence details and expiry date",
            "Vehicle registration, insurance, and roadworthy details",
            "GPS location data during active trips (used for dispatch and navigation)",
            "Bank account details for earnings payments",
            "Trip history, ratings, and performance statistics",
            "Profile photo (optional)",
          ]} />

          <P><strong style={{ color: "#E4E4E7" }}>Automatically collected:</strong></P>
          <UL items={[
            "Device type, operating system, and app version",
            "IP address and general location",
            "Usage data and app interaction logs",
            "Crash reports and error logs (for app improvement)",
          ]} />
        </Section>

        <Section title="3. How We Use Your Information">
          <P>We use the information we collect to:</P>
          <UL items={[
            "Process and confirm bookings",
            "Dispatch and connect drivers with passengers",
            "Send booking confirmations, receipts, and updates via email or SMS",
            "Calculate fares and process payments",
            "Track driver location during active trips for safety and dispatch",
            "Provide customer support",
            "Send important service notifications",
            "Improve and maintain our platform and apps",
            "Comply with legal obligations",
            "Issue GST-compliant tax invoices for corporate accounts",
          ]} />
          <P>
            We do <strong style={{ color: "#E4E4E7" }}>not</strong> sell, rent, or trade your personal
            information to third parties for marketing purposes.
          </P>
        </Section>

        <Section title="4. Location Data">
          <P>
            Our driver mobile application collects GPS location data when the driver is marked as
            online or on an active trip. This location data is used solely for:
          </P>
          <UL items={[
            "Displaying driver position to the passenger during an active trip",
            "Dispatch optimisation (matching nearest available driver to a booking)",
            "Navigation assistance",
          ]} />
          <P>
            Location tracking stops when the driver goes offline or the trip is completed.
            Location data is not shared with third parties beyond what is necessary to operate the service.
          </P>
          <P>
            Customers using our booking platform may allow location access to auto-fill their
            pickup address. This is optional — location permission can be denied without affecting
            the ability to book.
          </P>
        </Section>

        <Section title="5. Disclosure of Information">
          <P>We may share your information with:</P>
          <UL items={[
            "Drivers — passengers' name, phone number, and pickup/dropoff address are shared with the assigned driver to complete the booking",
            "Payment processors — to securely process credit/debit card transactions",
            "Cloud service providers — our platform runs on Supabase (database) and Vercel (hosting), both of which maintain their own privacy and security standards",
            "Email service providers — to send booking confirmations and receipts",
            "Push notification services — to send real-time alerts to drivers and passengers",
            "Legal authorities — if required by law, court order, or to protect the rights and safety of our users",
          ]} />
        </Section>

        <Section title="6. Data Storage &amp; Security">
          <P>
            Your data is stored securely on servers located in Australia and/or the United States
            (via our cloud infrastructure providers). We implement industry-standard security measures
            including:
          </P>
          <UL items={[
            "Encrypted data transmission (HTTPS/TLS)",
            "Encrypted password storage (bcrypt hashing)",
            "Row-level security policies on our database",
            "Access controls limiting who can view personal data",
          ]} />
          <P>
            While we take all reasonable steps to protect your data, no internet transmission is
            100% secure. In the event of a data breach that is likely to cause serious harm, we will
            notify affected individuals and the Office of the Australian Information Commissioner
            (OAIC) as required under the Notifiable Data Breaches scheme.
          </P>
        </Section>

        <Section title="7. Data Retention">
          <UL items={[
            "Booking and trip records are retained for 7 years for tax and legal compliance",
            "Account information is retained while your account is active",
            "Driver document records are retained for the duration of their engagement and 2 years after",
            "Location data from completed trips is retained for 90 days then deleted",
            "You may request deletion of your account at any time (see Section 9)",
          ]} />
        </Section>

        <Section title="8. Cookies &amp; Tracking">
          <P>
            Our website uses cookies and similar technologies to:
          </P>
          <UL items={[
            "Maintain your login session",
            "Remember your preferences",
            "Analyse website traffic and usage (via anonymised analytics)",
          ]} />
          <P>
            You can disable cookies in your browser settings, however some features of the website
            may not function correctly without them. We do not use cookies for third-party advertising.
          </P>
        </Section>

        <Section title="9. Your Rights">
          <P>Under Australian privacy law, you have the right to:</P>
          <UL items={[
            "Access the personal information we hold about you",
            "Request correction of inaccurate or outdated information",
            "Request deletion of your account and associated personal data",
            "Withdraw consent for location tracking (via app settings)",
            "Lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at www.oaic.gov.au",
          ]} />
          <P>
            To exercise any of these rights, contact us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "#C9A84C" }}>{CONTACT_EMAIL}</a>.
            We will respond within 30 days.
          </P>
        </Section>

        <Section title="10. Children's Privacy">
          <P>
            Our Services are not directed at children under the age of 13. We do not knowingly
            collect personal information from children. If you believe a child has provided us with
            personal information, please contact us immediately and we will delete it.
          </P>
        </Section>

        <Section title="11. Third-Party Links">
          <P>
            Our website and apps may contain links to third-party websites or services. We are not
            responsible for the privacy practices of those third parties. We encourage you to review
            their privacy policies before providing any personal information.
          </P>
        </Section>

        <Section title="12. Changes to This Policy">
          <P>
            We may update this Privacy Policy from time to time. When we do, we will update the
            &quot;Last updated&quot; date at the top of this page. For significant changes, we will notify
            users via email or an in-app notice. Continued use of our Services after changes
            constitutes acceptance of the updated policy.
          </P>
        </Section>

        <Section title="13. Contact Us">
          <P>
            If you have any questions, concerns, or complaints about this Privacy Policy or how
            we handle your personal information, please contact us:
          </P>
          <div style={{ background: "#111113", border: "1px solid #2A2A30", borderRadius: 12, padding: 24, marginTop: 8 }}>
            <p style={{ color: "#E4E4E7", fontWeight: 700, marginBottom: 8 }}>{BUSINESS_NAME}</p>
            <p style={{ color: "#71717A", marginBottom: 4 }}>{BUSINESS_ADDRESS}</p>
            <p style={{ color: "#71717A", marginBottom: 4 }}>
              Email:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "#C9A84C" }}>
                {CONTACT_EMAIL}
              </a>
            </p>
            <p style={{ color: "#71717A", marginBottom: 4 }}>Phone: {BUSINESS.phone}</p>
            <p style={{ color: "#71717A" }}>
              Website:{" "}
              <a href={SITE_URL} style={{ color: "#C9A84C" }}>
                {SITE_URL}
              </a>
            </p>
          </div>
        </Section>

      </div>
    </main>
  );
}
