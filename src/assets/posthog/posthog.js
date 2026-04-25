import posthog from "posthog-js";

posthog.init(import.meta.env.VITE_POSTHOG_API_KEY, {
  api_host: "https://us.i.posthog.com",
});


export default posthog;