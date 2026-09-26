import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/navbar";
import FooterSection from "../components/FooterSection";
import CommunityGallery from "../sections/CommunityGallery";
import AdventureSection from "../sections/AdventureSection";
import "./communityPage.css";

gsap.registerPlugin(ScrollTrigger);

const communityStats = [
  { value: "140M+", label: "Monthly Active Players" },
  { value: "1B+", label: "Hours Watched Content" },
  { value: "10M+", label: "Discord Squad Members" },
  { value: "500K+", label: "Custom Community Realms" },
];

const upcomingEvents = [
  {
    date: "OCT 12",
    tag: "Global Tournament",
    title: "Bedwars World Championship",
    description:
      "128 squads battle across 4 brackets for the seasonal trophy and exclusive in-game capes.",
  },
  {
    date: "NOV 05",
    tag: "Buildathon",
    title: "Mega City Build Showcase",
    description:
      "A 72-hour non-stop co-op building event open to all server creators and builders.",
  },
  {
    date: "DEC 01",
    tag: "Community Meetup",
    title: "MineCon Digital Summit",
    description:
      "Live developer Q&A, community mod showcases, and future update roadmaps.",
  },
];

export default function CommunityPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Hero Entrance
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      gsap.set(
        ".community-hero__badge, .community-hero__title, .community-hero__description, .community-stats__card",
        {
          autoAlpha: 0,
          y: 24,
        },
      );

      heroTl
        .to(".community-hero__badge", {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          delay: 0.1,
        })
        .to(
          ".community-hero__title",
          { y: 0, autoAlpha: 1, duration: 0.7 },
          "-=0.35",
        )
        .to(
          ".community-hero__description",
          { y: 0, autoAlpha: 1, duration: 0.6 },
          "-=0.45",
        )
        .to(
          ".community-stats__card",
          { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1 },
          "-=0.2",
        );

      // ScrollTrigger for Events
      gsap.from(".event-card", {
        scrollTrigger: {
          trigger: ".community-events",
          start: "top 80%",
          once: true,
        },
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
        <Navbar activeLabel="Community" />
      </div>

      <main className="community-page" id="community-page">
        {/*Hero*/}
        <section
          className="community-hero"
          aria-labelledby="community-hero-title"
        >
          <video
            className="community-hero__bg"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          >
            <source src="/videos/about/hero_bg.webm" type="video/webm" />
          </video>
          <div className="community-hero__overlay" aria-hidden="true" />

          <span className="community-hero__eyebrow">Global Player Hub</span>
          <h1 className="community-hero__title" id="community-hero-title">
            Built by Millions, Shared Together
          </h1>
          <p className="community-hero__description">
            Step into the largest sandbox community on the planet. Discover
            player creations, join official events, and build your legacy with
            friends.
          </p>
        </section>

        {/*Stats*/}
        <section className="community-stats" aria-label="Community Statistics">
          <div className="community-stats__inner">
            {communityStats.map((stat) => (
              <div className="community-stats__card" key={stat.label}>
                <span className="community-stats__value">{stat.value}</span>
                <span className="community-stats__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Events */}
        <section className="community-events" aria-labelledby="events-title">
          <div className="community-events__inner">
            <header className="community-events__header">
              <span className="community-events__eyebrow">
                Mark Your Calendar
              </span>
              <h2 id="events-title">Upcoming Community Events</h2>
              <p>
                Participate in seasonal buildathons, PvP tournaments, and live
                digital conventions.
              </p>
            </header>

            <div className="community-events__grid">
              {upcomingEvents.map((evt) => (
                <article className="event-card" key={evt.title}>
                  <div className="event-card__date">{evt.date}</div>
                  <span className="event-card__tag">{evt.tag}</span>
                  <h3>{evt.title}</h3>
                  <p>{evt.description}</p>
                  <a className="event-card__link" href="#community">
                    Join Event <span aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CommunityGallery />
        <AdventureSection/>

        {/*Social*/}
        <section className="community-join" aria-labelledby="join-title">
          <div className="community-join__inner">
            <span className="community-join__badge">Connect & Chat</span>
            <h2 id="join-title">Find Your Squad Today</h2>
            <p>
              Whether you need redstone engineers for your survival server or
              building buddies for a megastructure, our official Discord channel
              is active 24/7.
            </p>
            <div className="community-join__actions">
              <a
                className="button button--primary"
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
              >
                Join Official Discord
              </a>
              <a className="button button--secondary" href="#gallery">
                Explore Gallery
              </a>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
