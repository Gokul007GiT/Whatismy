import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Read the terms of service for using What Is My IP, our free IP lookup and network tools website.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">
        Terms of Service
      </h1>
      <p className="mb-10 text-sm text-muted-foreground">
        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using What Is My IP, you agree to be bound by these
            Terms of Service. If you do not agree with any part of these terms,
            please do not use our website.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            2. Use of the Service
          </h2>
          <p>
            What Is My IP provides free network information tools for
            personal and professional use. You agree to use this service
            responsibly and not for any unlawful purpose. You may not attempt
            to disrupt, reverse engineer, or abuse the service or its
            underlying infrastructure.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            3. Accuracy of Information
          </h2>
          <p>
            While we strive to provide accurate and up-to-date information, IP
            geolocation and network data are inherently approximate. We make no
            guarantees about the accuracy, completeness, or reliability of any
            information displayed on this site. You use this information at
            your own risk.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            4. Intellectual Property
          </h2>
          <p>
            The design, layout, and original content of this website are
            protected by intellectual property laws. You may not copy,
            reproduce, or distribute our content without prior written
            permission.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            5. Limitation of Liability
          </h2>
          <p>
            What Is My IP is provided on an &quot;as is&quot; and &quot;as
            available&quot; basis. To the fullest extent permitted by law, we
            shall not be liable for any direct, indirect, incidental, or
            consequential damages arising from your use of, or inability to
            use, this service.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            6. Third-Party Links
          </h2>
          <p>
            Our website may contain links to third-party websites or services.
            We are not responsible for the content, privacy practices, or
            terms of any third-party sites. Accessing them is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            7. Changes to These Terms
          </h2>
          <p>
            We reserve the right to modify these terms at any time. Updated
            terms take effect immediately upon posting to this page. Continued
            use of the service constitutes acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            8. Contact
          </h2>
          <p>
            Questions about these terms can be sent through our contact page.
          </p>
        </section>
      </div>
    </div>
  );
}
