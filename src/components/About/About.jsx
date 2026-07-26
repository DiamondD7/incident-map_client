import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <div style={{ marginTop: "20px" }}>
      <Helmet>
        <title>Hotspots New Zealand - About Us</title>
        <meta
          name="description"
          content="Abous us Hotspots NZ - Find Food Places Deals In New Zealand."
        />
      </Helmet>

      <h1>About us</h1>
      <p style={{ marginTop: "10px" }}>
        <strong style={{ color: "#FA6737" }}>Hotspots</strong> is a discovery
        platform built to connect people with the best food spots around them.{" "}
        <br />
        <br /> We combine curated locations, aesthetic experiences, and time
        based deals into a single app,this makes it easier to decide where to go
        faster. <br /> <br /> Beyond discovery, Hotspots supports local
        businesses by helping them attract customers during quiet hours.
        <br />
        <br /> Our goal is simple:
        <br /> make everyday decisions better for people, and more impactful for
        businesses.
      </p>
    </div>
  );
};

export default About;
