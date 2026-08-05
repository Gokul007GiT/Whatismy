import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read our privacy policy. We never log, store, or sell your IP information or browsing data.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">
        Privacy Policy
      </h1>
      <p className="mb-10 text-sm text-muted-foreground">
        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            1. Overview
          </h2>
          <p>
            What Is My IP is committed to protecting your privacy. This policy
            explains what information is processed when you use our website and
            how it is handled. By using this site, you agree to the practices
            described here.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            2. Information We Process
          </h2>
          <p className="mb-3">
            When you visit our website, we temporarily process the following
            information to display your network details:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Your public IP address</li>
            <li>Approximate geographic location derived from your IP</li>
            <li>ISP and ASN information associated with your IP</li>
            <li>Your browser user agent string</li>
          </ul>
          <p className="mt-3">
            This information is displayed to you in your browser and is not
            stored on our servers after the response is sent.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            3. Third-Party Services
          </h2>
          <p>
            To retrieve geolocation and network details, we send your IP
            address to a third-party IP lookup API. That provider may have its
            own privacy policy governing how it handles requests. We encourage
            you to review the policies of any third-party services we use.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            4. Cookies and Tracking
          </h2>
          <p>
            We do not use tracking cookies. A single functional preference may
            be stored to remember your light or dark theme choice. We do not
            use analytics, advertising, or cross-site tracking technologies.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            5. Data Retention
          </h2>
          <p>
            We do not retain your IP information. Each lookup is processed in
            real time and discarded immediately after the response is
            delivered. No historical logs of visitor IP addresses are kept.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            6. Children&apos;s Privacy
          </h2>
          <p>
            Our website is not directed at children under the age of 13. We do
            not knowingly collect information from children. If you believe a
            child has provided us with information, please contact us so we can
            take appropriate action.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            7. Changes to This Policy
          </h2>
          <p>
            We may update this privacy policy from time to time. Any changes
            will be posted on this page with an updated revision date. We
            encourage you to review this page periodically.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            8. Contact
          </h2>
          <p>
            If you have questions about this privacy policy, please reach out
            through our contact page.
          </p>
        </section>
      </div>
    </div>
  );
}
