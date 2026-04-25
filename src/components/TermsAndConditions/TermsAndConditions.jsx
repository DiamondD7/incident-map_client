import "../../styles/termsandconditionsstyles.css";
const TermsAndConditions = () => {
  return (
    <div className="termsandconditions__wrapper">
      <h1>Terms and Conditions - Hotspots</h1>
      <p>
        <strong>Effective Date: </strong>April 2026
      </p>
      <p>
        Welcome to Hotspots. By accessing or using our app and website, you
        agree to these Terms and Conditions.
        <br />
        <br />
        If you do not agree, please do not use Hotspots.
      </p>

      <div style={{ paddingLeft: "50px" }}>
        <br />
        <h2>1. About Hotspots</h2>
        <div className="information__wrapper">
          <p>
            Hotspots is a platform that helps users discover cafe and restaurant
            deals based on location. <br />
            We do not own, operate, or control the businesses listed on the
            platform.
          </p>
        </div>

        <br />
        <h2>2. Use of the Service</h2>
        <div className="information__wrapper">
          <p>By using Hotspots, you agree to:</p>
          <ul>
            <li>Use the service only for lawful purposes</li>
            <li>
              Not misuse, disrupt, or attempt to interfere with the platform
            </li>
            <li>Not attempt to gain unauthorized access to systems or data</li>
          </ul>
          <p>We may suspend or restrict access if these terms are violated.</p>
        </div>

        <br />
        <h2>3. Location Services</h2>
        <div className="information__wrapper">
          <p>
            Hotspots may request access to your device location to show nearby
            deals.
          </p>
          <ul>
            <li>Location access is optional</li>
            <li>
              If disabled, default content (e.g., Auckland CBD) will be shown
            </li>
            <li>
              We are not responsible for inaccuracies in location-based results
            </li>
          </ul>
        </div>

        <br />
        <h2>4. Accuracy of Information</h2>
        <div className="information__wrapper">
          <p>
            We aim to keep all promotions and business information accurate and
            up to date.
            <br />
            However:
          </p>

          <ul>
            <li>Deals may change or expire without notice</li>
            <li>
              Information provided by businesses may not always be accurate
            </li>
          </ul>

          <p>Hotspots is not responsible for:</p>
          <ul>
            <li>Incorrect listings</li>
            <li>Expired promotions</li>
            <li>User decisions based on displayed information</li>
          </ul>
        </div>

        <br />
        <h2>5. Third-Party Businesses</h2>
        <div className="information__wrapper">
          <p>Hotspots displays deals from third-party cafes and restaurants.</p>

          <ul>
            <li>
              We are not responsible for their products, services, or offers
            </li>
            <li>
              Any transactions or interactions are between you and the business
            </li>
          </ul>
        </div>

        <br />
        <h2>6. Intellectual Property</h2>
        <div className="information__wrapper">
          <p>
            All content on Hotspots, including branding, design, and features,
            is owned by or licensed to us.
            <br />
            You may not:
          </p>

          <ul>
            <li>Copy, reproduce, or distribute content without permission</li>
            <li>Reverse engineer or attempt to replicate the platform</li>
          </ul>
        </div>

        <br />
        <h2>7. Limitation of Liability</h2>
        <div className="information__wrapper">
          <p>
            To the fullest extent permitted by law: <br />
            Hotspots is not liable for:
          </p>
          <ul>
            <li>Hotspots is not liable for:</li>
            <li>Errors, interruptions, or downtime</li>
            <li>Issues arising from third-party businesses</li>
          </ul>
          <p>Use of the app is at your own risk.</p>
        </div>

        <br />
        <h2>8. Changes to the Service</h2>
        <div className="information__wrapper">
          <p>We may:</p>
          <ul>
            <li>Update, modify, or remove features at any time</li>
            <li>Suspend or discontinue the app without notice</li>
          </ul>
        </div>

        <br />
        <h2>9. Termination</h2>
        <div className="information__wrapper">
          <p>
            We reserve the right to suspend or terminate access to Hotspots if
            users violate these Terms.
          </p>
        </div>

        <br />
        <h2>10. Governing Law</h2>
        <div className="information__wrapper">
          <p>These Terms are governed by the laws of New Zealand.</p>
        </div>

        <br />
        <h2>11. Contact Us</h2>
        <div className="information__wrapper">
          <p>
            If you have any questions about these Terms, please contact us at:
            <br />
            <br /> Email: aaron.hotspotsnz@gmail.com
          </p>
        </div>
        <br />
        <p>
          <strong>
            By using Hotspots, you agree to these Terms and Conditions.
          </strong>
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
