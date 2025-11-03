import Link from "next/link";

function Privacy() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm mb-6">Effective Date: November 2025</p>
      <p className="leading-relaxed">
        Welcome to <strong>Dopin</strong> (“we,” “us,” or “our”). Your privacy
        matters to us. This Privacy Policy explains how we collect, use,
        protect, and share your information when you use the Dopin mobile
        application, website, and related services (collectively, the
        “Service”).
      </p>
      <p className="mt-4">
        By using Dopin, you agree to this Privacy Policy and our{" "}
        <Link href="/terms" className="underline">
          Terms of Use
        </Link>
        .
      </p>

      <article className="space-y-10">
        <section className="pt-8">
          1. Information We Collect
          <p className="  mb-6">
            We collect only the information necessary to provide and secure our
            Service.
          </p>
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-medium   mb-2">
                a. Account Information
              </h3>
              <p className="mb-2">
                To create and verify your account, we collect:
              </p>
              <ul className="list-disc list-inside space-y-1  ">
                <li>
                  Phone Number: used for verification, login, and security.
                </li>
                <li>
                  Username &amp; Password: for identification and
                  authentication.
                </li>
              </ul>

              <p className="mt-4 mb-2">
                Optional data you may choose to share:
              </p>
              <ul className="list-disc list-inside space-y-1  ">
                <li>Profile photo, city, or short bio.</li>
                <li>Personal interests.</li>
                <li>Industry or field of work</li>
                <li>Education level</li>
                <li>Job title or role</li>
                <li>Languages spoken</li>
                <li>Home city or location</li>
                <li>
                  Relationship status (Single, In a Relationship, Married)
                </li>
                <li>Gender (Male, Female, Non-binary, Prefer not to say)</li>
              </ul>

              <p className="mt-4  ">
                Providing this information is entirely optional and can be
                edited or deleted at any time. We use it only to improve
                personalization (e.g., showing relevant events or Dopins nearby)
                — never for advertising, profiling, or selling user data.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium   mb-2">
                b. Content You Create
              </h3>
              <p className="mb-2">You may choose to share content such as:</p>
              <ul className="list-disc list-inside space-y-1  ">
                <li>Dopins: user-created events or activities.</li>
                <li>Chats and Messages: communication within Dopins.</li>
                <li>
                  Event Submissions: factual event data (title, date, time, and
                  location).
                </li>
              </ul>
              <p className="mt-3  ">
                Dopin does not collect or display copyrighted materials such as
                event images or full descriptive content from external sources.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium   mb-2">
                c. Automatically Collected Information
              </h3>
              <p className="mb-2">
                To ensure app security and performance, we collect:
              </p>
              <ul className="list-disc list-inside space-y-1  ">
                <li>
                  Device data (model, OS version, app version, IP, and
                  language).
                </li>
                <li>
                  Usage analytics (features used, frequency, engagement
                  metrics).
                </li>
                <li>Location data (only if you enable location access).</li>
              </ul>
              <p className="mt-3  ">
                We do not track your activities across other applications or
                websites.
              </p>
            </section>
          </div>
        </section>

        <section className="pt-8">
          2. How We Use Your Information
          <ul className="list-disc list-inside space-y-1   mb-4">
            <li>Verify and secure your account.</li>
            <li>
              Deliver Dopin’s core functions (creating, joining, and chatting
              within Dopins).
            </li>
            <li>Review and moderate event submissions.</li>
            <li>Prevent spam, abuse, and unauthorized access.</li>
            <li>Improve app performance and user experience.</li>
            <li>Comply with applicable legal and security obligations.</li>
          </ul>
          <p>
            We do not sell, rent, or trade your personal data to third parties.
          </p>
        </section>

        <section className="pt-8">
          3. Data Retention
          <ul className="list-disc list-inside space-y-2   mb-4">
            <li>
              <strong>Permanent Data:</strong> Factual event data and chat
              histories may be stored permanently to preserve continuity and
              community records.
            </li>
            <li>
              <strong>Account Deletion:</strong> When you delete your account,
              your personal identifiers (phone number, username, profile) are
              removed.
            </li>
          </ul>
          <p>
            Some anonymized data (e.g., event metadata, analytics, or safety
            logs) may remain for system integrity and fraud prevention.
          </p>
        </section>

        <section className="pt-8">
          4. Data Sharing and Disclosure
          <p className="  mb-6">
            We only share your data under specific and lawful conditions:
          </p>
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-medium   mb-2">
                a. Service Providers
              </h3>
              <p>
                We engage verified third-party providers for hosting, analytics,
                and security. These partners are contractually obligated to keep
                your data confidential and secure.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium   mb-2">
                b. Legal Compliance
              </h3>
              <ul className="list-disc list-inside space-y-1  ">
                <li>Comply with laws, court orders, or government requests.</li>
                <li>
                  Detect, prevent, or address fraudulent or illegal activity.
                </li>
                <li>
                  Protect the safety, rights, or property of users or Dopin LLC.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium   mb-2">
                c. Business Changes
              </h3>
              <p>
                If Dopin LLC is involved in a merger, acquisition, or
                restructuring, your data may be transferred in accordance with
                this Privacy Policy.
              </p>
            </section>
          </div>
        </section>

        <section className="pt-8">
          5. Security and Data Protection
          <ul className="list-disc list-inside space-y-1   mb-4">
            <li>Encrypted network communications (HTTPS/TLS).</li>
            <li>Encrypted storage of credentials.</li>
            <li>Access control and employee confidentiality agreements.</li>
            <li>Routine audits and system security assessments.</li>
          </ul>
          <p className="  mb-3">
            Although no platform is entirely immune from risk, Dopin follows
            recognized security standards to minimize any potential breach or
            misuse.
          </p>
          <p>
            In the event of a data breach, we will notify affected users and
            relevant authorities as required by law.
          </p>
        </section>

        <section className="pt-8">
          6. Your Privacy Rights
          <ul className="list-disc list-inside space-y-1   mb-4">
            <li>Access or export your data.</li>
            <li>Request correction or deletion of personal information.</li>
            <li>Restrict certain data processing activities.</li>
            <li>
              Withdraw consent for optional data features (like location).
            </li>
          </ul>
          <p>
            To exercise these rights, contact
            <a
              href="mailto:privacy@dopin.io"
              className="text-indigo-600 hover:underline"
            >
              privacy@dopin.io
            </a>
            . We verify all requests before action to protect your account
            security.
          </p>
        </section>

        <section className="pt-8">
          7. Age Restriction
          <p>Dopin is designed for users 18 years and older.</p>
          <p>We do not knowingly collect data from minors.</p>
          <p>
            If we learn that data from a user under 18 was collected, it will be
            deleted immediately.
          </p>
        </section>

        <section className="pt-8">
          8. External Links and Submissions
          <p>
            Dopin may allow users to include links to external websites or
            third-party event pages.
          </p>
          <p>
            These external sites are not owned or operated by Dopin, and their
            data practices are not covered by this Privacy Policy.
          </p>
          <p>
            We recommend reviewing their respective policies before sharing
            personal information or RSVPs through those links.
          </p>
        </section>

        <section className="pt-8">
          9. International Data Transfers
          <p>
            Dopin LLC is based in the United States. By using Dopin, you
            acknowledge that your information may be processed in the U.S. or
            other jurisdictions where our partners operate.
          </p>
          <p>
            We implement appropriate safeguards for cross-border data transfers,
            consistent with international privacy standards.
          </p>
        </section>

        <section className="pt-8">
          10. Changes to This Policy
          <p>
            We may update this Privacy Policy periodically. When we make
            significant changes, we will notify users within the app or via an
            in-app notice.
          </p>
          <p>
            The “Effective Date” at the top of this page reflects the latest
            version.
          </p>
          <p>
            Continued use of Dopin after updates means you agree to the revised
            terms.
          </p>
        </section>

        <section className="pt-8">
          11. Contact
          <p>For questions, concerns, or data requests, please contact:</p>
          <address className="not-italic   space-y-1">
            <p>
              <strong>Dopin LLC</strong>
            </p>
            <p>San Francisco, California, USA</p>
            <p>
              Email:{" "}
              <a
                href="mailto:privacy@dopin.io"
                className="text-indigo-600 hover:underline"
              >
                privacy@dopin.io
              </a>
            </p>
            <p>
              Website:
              <a
                href="https://www.dopin.io"
                target="_blank"
                className="text-indigo-600 hover:underline"
              >
                www.dopin.io
              </a>
            </p>
          </address>
        </section>
      </article>
    </div>
  );
}

export default Privacy;
