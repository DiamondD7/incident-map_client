import "../../styles/privacystyles.css";
const PrivacyPolicyContainer = () => {
  return (
    <div className="privacy-policy__wrapper">
      <h1>Privacy Policy - Hotspots</h1>
      <p>
        <strong>Effective Date: </strong>April 2026
      </p>
      <p>
        Hotspots (“we”, “our”, or “us”) respects your privacy. This Privacy
        Policy explains how we collect, use, and protect your information when
        you use our app and website.
      </p>

      <div style={{ paddingLeft: "50px" }}>
        <br />
        <h2>1. Information We Collect</h2>
        <div className="information__wrapper">
          <h4>a. Location Data (Optional)</h4>
          <p>
            Hotspots may request access to your device location to show nearby
            cafe and restaurant deals.
          </p>

          <ul>
            <li>This is completely optional</li>
            <li>
              If you allow access, we use your location only to display relevant
              deals near you
            </li>
            <li>If you deny access, the app will default to Auckland CBD</li>
          </ul>
          <p>We do not track your location continuously.</p>
          <br />
          <h4>b. Basic Technical Data</h4>
          <p>
            When you use Hotspots, We may automatically collect limited
            technical information such as IP address, browser type, and device
            type through standard server logs or third-party services.
          </p>
        </div>
        <br />
        <h2>2. How We Use Your Information</h2>
        <div className="information__wrapper">
          <p>We use your information to:</p>
          <ul>
            <li>Show nearby deals and map-based content</li>
            <li>Improve app performance and user experience</li>
            <li>Maintain and secure the platform</li>
          </ul>

          <p>We do not use your data for advertising or profiling.</p>
        </div>
        <br />
        <h2>3. Data Sharing</h2>
        <div className="information__wrapper">
          <p>
            We do not sell, rent, or share your personal information with third
            parties.
          </p>
          <p>Your data is only used internally to operate Hotspots.</p>
        </div>
        <br />
        <h2>4. Data Storage & Security</h2>
        <div className="information__wrapper">
          <p>
            We take reasonable steps to protect your data from unauthorized
            access, loss, or misuse.
          </p>
          <p>
            We only store data for as long as necessary to operate and improve
            the app.
          </p>
        </div>
        <br />
        <h2>5. Your Choices</h2>
        <div className="information__wrapper">
          <p>You have full control over your data:</p>
          <ul>
            <li>
              You can disable location access anytime in your browser or device
              settings
            </li>
            <li>
              You can continue using Hotspots without sharing your location
            </li>
          </ul>
        </div>
        <br />
        <h2>6. Third-Party Services</h2>
        <div className="information__wrapper">
          <p>
            Hotspots may use third-party services (such as maps or hosting
            providers) to operate the app. <br /> <br /> These services may
            process limited data as required to function, but we do not share
            personal data beyond what is necessary.
          </p>
        </div>
        <br />
        <h2>7. Updates to This Policy</h2>
        <div className="information__wrapper">
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated effective date.
          </p>
        </div>
        <br />
        <h2>8. Contact Us</h2>
        <div className="information__wrapper">
          <p>
            If you have any questions about this Privacy Policy, you can contact
            us at: <br />
            <br /> Email: aaron.hotspotsnz@gmail.com
          </p>
        </div>
        <br />
        <h2>9. Compliance with New Zealand Law</h2>
        <div className="information__wrapper">
          <p>
            Hotspots operates in accordance with the Privacy Act 2020 of New
            Zealand.
          </p>
          <br />
          <p>By using Hotspots, you agree to this Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyContainer;
