import { Helmet } from "react-helmet-async";

const AboutThisVersion = () => {
  return (
    <div style={{ marginTop: "20px", height: "90dvh", overflow: "auto" }}>
      <Helmet>
        <title>Hotspots NZ - About This Version</title>
        <meta
          name="description"
          content="About this version of Hotspots New Zealand Auckland"
        />
      </Helmet>

      <h1>About This Version</h1>
      <div>
        <p>
          Welcome to Hotspots 👋 <br />
          <br /> Hotspots is currently in its early stage, and we are working
          hard to build a better way for you to discover cafes, restaurants, and
          local spots around you. <br />
          <br /> This version is our first step towards making it easier to find
          places worth visiting. From hidden gems to spots offering special
          deals and promotions.
        </p>
        <br />
        <h3>Whats coming next</h3>
        <p>
          Hotspots is always improving. We are working on bringing more
          features, such as: <br />
          <br /> - A dedicated mobile app
          <br /> - More ways to discover food spots
          <br /> - Personalised recommendations and updates
          <br /> - More local businesses and exclusive offers
        </p>

        <br />
        <h3>A note from the founder</h3>
        <p>
          Hi there, you are using Hotspots during its early phases. Some
          features may still be limited, and you may notice a lot of changes as
          I continue improving your experience.
          <br />
          <br /> Your feedback really help shape what Hotspots becomes. Every
          suggestion and visit helps us build a better platform for discovering
          local hotspots. <br />
          <br /> Thank you so much, appreciate it <br /> -💎
        </p>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default AboutThisVersion;
