import {
  EnvelopeIcon,
  InstagramLogoIcon,
  TiktokLogoIcon,
} from "@phosphor-icons/react";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  return (
    <div style={{ marginTop: "20px" }}>
      <Helmet>
        <title>Hotspots NZ - Contact Us</title>
        <meta
          name="description"
          content="Hotspots NZ contact information. Contact us Hotspots."
        />
      </Helmet>

      <h1>Contact us</h1>
      <p>
        Feel free to message us on our socials if you have questions or feedback
        😊
      </p>
      <br />
      <p className="-display-flex-align-items-center -gap-5">
        <InstagramLogoIcon weight="fill" color="#FA6737" />{" "}
        <a href="https://www.instagram.com/_hotspotsnz/" target="_blank">
          @_hotspotsnz
        </a>
      </p>
      <p className="-display-flex-align-items-center -gap-5">
        <TiktokLogoIcon weight="fill" color="#FA6737" />{" "}
        <a href="https://www.tiktok.com/@__hotspots" target="_blank">
          @__hotspotsnz
        </a>
      </p>
    </div>
  );
};

export default ContactUs;
