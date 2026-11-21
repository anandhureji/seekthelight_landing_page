/**
 * ============================================================
 *  SEEK THE LIGHT — Site Configuration
 *  Edit everything here. No need to touch index.html or CSS.
 * ============================================================
 */

const CONFIG = {

  /* ----------------------------------------------------------
   *  BRAND
   * ---------------------------------------------------------- */
  brand: {
    name: "SEEK THE LIGHT",
    tagline: "We Believe",
    email: "wbelieve2027@gmail.com",
    copyright: "© 2025 SEEK THE LIGHT. All rights reserved.",
  },

  /* ----------------------------------------------------------
   *  GOOGLE FORM
   *  The custom form in form.js submits directly to this endpoint.
   *  This URL is also used as the "open in new tab" fallback link.
   * ---------------------------------------------------------- */
  formUrl: "https://docs.google.com/forms/d/e/1FAIpQLScFaWmabosviWpVfzsIX2c4RCvpjXCtiay1XCJBFGyPV_99GA/viewform",

  /* ----------------------------------------------------------
   *  BRAND STORY COPY
   * ---------------------------------------------------------- */
  story: {
    heading: "SEEK THE LIGHT",
    paragraphs: [
      "Everyone walks through dark stretches: the late nights, the doubt, the days when nothing seems to move. We started SEEK THE LIGHT for those moments.",
      "It began with a simple belief: light isn't something you wait for, it's something you go after. Every step forward, however small, is an act of seeking.",
      "We design streetwear for people who keep moving. Clean silhouettes, quality fabrics and quiet details. Nothing loud, because the message is already in the name. What you wear should feel like a reminder: keep going, keep growing, keep looking for what lights you up.",
      "We're just getting started, and we're building this with the people who'll wear it. Your voice shapes what comes next.",
    ],
    pullQuote: "Seek the light. Wear the journey.",
  },

  /* ----------------------------------------------------------
   *  COLLECTION PREVIEW
   *  image: path under /assets/products/ — swap in real photos here.
   *  price: set to null to hide the price range.
   * ---------------------------------------------------------- */
  products: [
    {
      id: "product-01",
      name: "DAWN HOODIE",
      description: "Heavyweight French terry. Dropped shoulders, clean lines.",
      price: "£85 – £95",
      image: null, // set to "/assets/products/product-01.jpg" when ready
    },
    {
      id: "product-02",
      name: "MERIDIAN TEE",
      description: "Heavyweight cotton. Oversized fit, minimal branding.",
      price: "£45 – £55",
      image: null,
    },
    {
      id: "product-03",
      name: "VIGIL CARGO",
      description: "Relaxed cargo pants. Tonal hardware, side pockets.",
      price: "£110 – £125",
      image: null,
    },
    {
      id: "product-04",
      name: "THRESHOLD JACKET",
      description: "Unlined shell. Clean silhouette, hidden zip.",
      price: "£145 – £165",
      image: null,
    },
    {
      id: "product-05",
      name: "LIGHT BEARER CAP",
      description: "6-panel structured cap. Embroidered wordmark.",
      price: "£35",
      image: null,
    },
    {
      id: "product-06",
      name: "PILLAR CREWNECK",
      description: "Mid-weight fleece. Boxy cut, tonal embroidery.",
      price: "£75 – £85",
      image: null,
    },
  ],

  /* ----------------------------------------------------------
   *  FEEDBACK SECTION
   * ---------------------------------------------------------- */
  feedback: {
    heading: "YOUR VOICE SHAPES WHAT COMES NEXT",
    body: "SEEK THE LIGHT is being built with the people who'll wear it. Tell us what you think — what you'd buy, what you'd change, and what you're looking for in a brand like this.",
    ctaLabel: "Give Feedback",
  },

  /* ----------------------------------------------------------
   *  FAQ
   * ---------------------------------------------------------- */
  faq: [
    {
      q: "When does SEEK THE LIGHT launch?",
      a: "We're targeting a launch in 2025. Follow our progress and share your thoughts in the survey below.",
    },
    {
      q: "Where do you ship?",
      a: "We plan to ship UK-wide at launch, with international shipping rolling out shortly after. Leave your location in the form and we'll factor it in.",
    },
    {
      q: "What sizes will you offer?",
      a: "XS through 3XL across all core pieces. Sizing feedback in the form directly shapes our grading, so tell us what you need.",
    },
    {
      q: "What are the price points?",
      a: "We're aiming for quality-first pricing — focused on heavyweight fabrics, clean silhouettes, and durability.",
    },
    {
      q: "How is my feedback used?",
      a: "Your responses are used only to shape the brand — product decisions, sizing, pricing, and priorities. We'll never sell your data or spam you. See the footer for our full privacy note.",
    },
  ],

  /* ----------------------------------------------------------
   *  ANALYTICS
   *  Paste your GA4 measurement ID or Plausible domain below
   *  and set enabled: true when you're ready to track.
   * ---------------------------------------------------------- */
  analytics: {
    enabled: false,
    provider: "ga4",           // "ga4" | "plausible"
    ga4MeasurementId: "G-XXXXXXXXXX",    // ← your GA4 ID
    plausibleDomain: "seekthelight.com", // ← your Plausible domain
  },

};

export default CONFIG;
