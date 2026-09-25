import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/navbar"; // Adjust path as needed
import FooterSection from "../components/FooterSection"; // Adjust path as needed
import FeatureSection from "../sections/FeatureSection"; // Import the pinned scrolling section you already built
import "./featurePage.css";

import DimensionSection from "../sections/DimensionSection";

gsap.registerPlugin(ScrollTrigger);

const mechanics = [
  {
    icon: "⚒",
    title: "Crafting & Smelting",
    description:
      "Combine resources in a crafting table to create tools, weapons, and armor. Smelt ores in a furnace to unlock stronger materials and survive longer in the wild.",
  },
  {
    icon: "⚡",
    title: "Redstone Engineering",
    description:
      "Mine redstone dust to build complex circuits, automated farms, hidden doors, and working calculators. The only limit to automation is your engineering skill.",
  },
  {
    icon: "♞",
    title: "Mobs & Ecosystems",
    description:
      "Interact with a living world. Tame wolves, breed livestock, trade with villagers, or defend your base against Creepers, Zombies, and Skeletons at night.",
  },
  {
    icon: "⌂",
    title: "Limitless Building",
    description:
      "Utilize hundreds of distinct blocks—from deepslate to glass to glazed terracotta—to design intricate architecture, sprawling cities, or cozy survival bases.",
  },
];

export default function FeaturePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Hero Entrance Animation
      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      gsap.set(
        ".feature-hero__eyebrow, .feature-hero__title, .feature-hero__description",
        { autoAlpha: 0, y: 30 },
      );

      heroTimeline
        .to(".feature-hero__eyebrow", {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          delay: 0.2,
        })
        .to(
          ".feature-hero__title",
          { y: 0, autoAlpha: 1, duration: 0.7 },
          "-=0.4",
        )
        .to(
          ".feature-hero__description",
          { y: 0, autoAlpha: 1, duration: 0.7 },
          "-=0.5",
        );

      // 2. Scroll Animations for Mechanics & Dimensions headers
      const headers = [
        ".feature-mechanics__header",
        ".feature-dimensions__header",
      ];

      headers.forEach((selector) => {
        gsap.from(`${selector} > *`, {
          scrollTrigger: {
            trigger: selector,
            start: "top 85%",
          },
          y: 20,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
        });
      });

      // 3. Staggered grid animations
      gsap.from(".mechanic-card", {
        scrollTrigger: { trigger: ".mechanics-grid", start: "top 80%" },
        y: 30,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".dimension-card", {
        scrollTrigger: { trigger: ".dimensions-grid", start: "top 80%" },
        y: 30,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: pageRef },
  );

  return (
    <div className="app-shell" ref={pageRef}>
      <div className="app-navbar">
        <Navbar activeLabel="Feature" />
      </div>

      <main className="feature-page" id="feature-page">
        {/* --- Hero Section --- */}
        <section className="feature-hero" aria-labelledby="feature-hero-title">
          <video
            className="feature-hero__bg"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          >
            {/* Replace with an appropriate features background video */}
            <source src="/videos/about/hero_bg.webm" type="video/webm" />
          </video>
          <div className="feature-hero__overlay" aria-hidden="true" />

          <p className="feature-hero__eyebrow">Endless Possibilities</p>
          <h1 className="feature-hero__title" id="feature-hero-title">
            Explore the Features
          </h1>
          <p className="feature-hero__description">
            Discover the core mechanics, infinite dimensions, and varied game
            modes that make Minecraft the ultimate sandbox experience.
          </p>
        </section>

        <section className="feature-mechanics" id="mechanics">
          <div className="feature-mechanics__header">
            <h2>Master the Mechanics</h2>
            <p>
              To survive and thrive, you must master the fundamental skills of
              the Minecraft universe.
            </p>
          </div>
          <div className="mechanics-grid">
            {mechanics.map((mechanic) => (
              <article className="mechanic-card" key={mechanic.title}>
                <span className="mechanic-card__icon" aria-hidden="true">
                  {mechanic.icon}
                </span>
                <h3>{mechanic.title}</h3>
                <p>{mechanic.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <FeatureSection />
      <DimensionSection />
      <FooterSection />
    </div>
  );
}
