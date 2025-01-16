import React from "react";
import "../styles/PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <div className="privacy-policy-header">
        <h1>Privacy Policy</h1>
        <p>
          At Evotto Pvt. Ltd. (“we,” “our,” or “us”), we are committed to protecting
          the privacy of our users (“you,” “your”). This Privacy Policy explains how
          we collect, use, disclose, and safeguard your information when you visit
          our website, <a href="https://evotto.in">evotto.in</a>, and use our services.
        </p>
      </div>

      <div className="privacy-policy-section">
        <h2>1. Information We Collect</h2>
        <h3>1.1 Personal Information:</h3>
        <ul>
          <li>Name</li>
          <li>Contact information (email, phone number, address)</li>
          <li>Payment details (when required)</li>
          <li>Identification documents</li>
        </ul>
        <h3>1.2 Non-Personal Information:</h3>
        <ul>
          <li>Browser type and version</li>
          <li>IP address</li>
          <li>Pages visited on our website</li>
          <li>Referring websites or search engines</li>
          <li>Cookies and tracking technologies</li>
        </ul>
        <h3>1.3 Information from Third Parties:</h3>
        <p>
          Information shared by vendors, partners, or external authentication
          services (e.g., Google, Facebook login).
        </p>
      </div>

      <div className="privacy-policy-section">
        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect for purposes including, but not limited to:</p>
        <ul>
          <li>Providing and improving our services.</li>
          <li>Processing transactions.</li>
          <li>Verifying user identity and ensuring platform security.</li>
          <li>Personalizing user experience and marketing communications.</li>
          <li>Responding to customer support inquiries.</li>
        </ul>
      </div>

      <div className="privacy-policy-section">
        <h2>3. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies, web beacons, and similar technologies to:
        </p>
        <ul>
          <li>Enhance website functionality.</li>
          <li>Monitor website performance.</li>
          <li>Analyze visitor behavior.</li>
        </ul>
        <p>
          You can control cookies via your browser settings. However, disabling cookies
          may limit website functionality.
        </p>
      </div>

      <div className="privacy-policy-section">
        <h2>4. Sharing of Information</h2>
        <p>We may share your information in the following scenarios:</p>
        <ul>
          <li>With vendors and partners to provide requested services.</li>
          <li>For legal purposes, such as complying with regulations or court orders.</li>
          <li>During business transfers (e.g., mergers or acquisitions).</li>
        </ul>
        <p>We do not sell or share your personal information with third parties for their direct marketing purposes.</p>
      </div>

      <div className="privacy-policy-section">
        <h2>5. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your information.
          However, no method of transmission over the internet is 100% secure. We
          encourage you to take precautions to protect your personal information.
        </p>
      </div>

      <div className="privacy-policy-section">
        <h2>6. Your Rights</h2>
        <p>Depending on your location, you may have the following rights:</p>
        <ul>
          <li>Access your personal information.</li>
          <li>Request correction or deletion of your data.</li>
          <li>Opt-out of marketing communications.</li>
          <li>Withdraw consent for data processing.</li>
        </ul>
        <p>To exercise your rights, contact us at <a href="mailto:evotto.service@gmail.com">evotto.service@gmail.com</a>.</p>
      </div>

      <div className="privacy-policy-section">
        <h2>7. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. We are not responsible
          for the privacy practices of these external websites.
        </p>
      </div>

      <div className="privacy-policy-section">
        <h2>8. Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. Changes will be effective
          immediately upon posting on this page.
        </p>
      </div>

      <div className="privacy-policy-footer">
        <h2>9. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or our data practices,
          please contact us at:
        </p>
        <p>
          <strong>Evotto Pvt. Ltd.</strong><br />
          Email: <a href="mailto:evotto.service@gmail.com">evotto.service@gmail.com</a><br />
          Phone: 7077829595<br />
          Address: D/3 Plot 103/765 Brahman, Mahal, Kendrapara, Kendrapara, Orissa, India, 754210
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
