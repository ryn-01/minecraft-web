import { useState } from "react";
import creeperImage from "../assets/images/icons/creeper.webp";
import linuxIcon from "../assets/images/icons/icons8-linux-96.webp";
import macosIcon from "../assets/images/icons/icons8-macos-96.webp";
import windowsIcon from "../assets/images/icons/icons8-windows-96.webp";
import FooterSection from "../components/FooterSection";
import "./downloadPage.css";
import Navbar from "../components/navbar";

type Platform = {
  name: string;
  subtitle: string;
  details: string;
  iconSrc: string;
  className: string;
};

const platforms: Platform[] = [
  {
    name: "Windows",
    subtitle: "Windows 10 or later",
    details: "Intel Core i3 · 4 GB RAM · 2 GB storage",
    iconSrc: windowsIcon,
    className: "windows",
  },
  {
    name: "macOS",
    subtitle: "macOS 12 Monterey or later",
    details: "Apple Silicon or Intel · 4 GB RAM · 2 GB storage",
    iconSrc: macosIcon,
    className: "macos",
  },
  {
    name: "Linux",
    subtitle: "64-bit Ubuntu 20.04+ or equivalent",
    details: "OpenGL 3.3 · 4 GB RAM · 2 GB storage",
    iconSrc: linuxIcon,
    className: "linux",
  },
];

const requirements = [
  ["Minimum", "4 GB RAM · 2 GB storage", "Intel Core i3 or equivalent"],
  ["Recommended", "8 GB RAM · 4 GB storage", "Intel Core i5 / Apple M1"],
  ["Graphics", "OpenGL 3.3 compatible", "Broadband internet for multiplayer"],
];

export default function DownloadPage() {
  const [score, setScore] = useState(0);
  const [targetPosition, setTargetPosition] = useState({ top: 42, left: 50 });

  const moveTarget = () => {
    setScore((currentScore) => currentScore + 1);
    setTargetPosition({
      top: 18 + Math.round(Math.random() * 64),
      left: 12 + Math.round(Math.random() * 76),
    });
  };

  const resetGame = () => {
    setScore(0);
    setTargetPosition({ top: 42, left: 50 });
  };

  return (
    <div className="app-shell">
      <div className="app-navbar">
        <Navbar activeLabel="Download" />
      </div>

      <main className="download-page">
        <video
          className="download-page__video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src="/videos/home/hero_bg_video.webm" type="video/webm" />
        </video>
        <div className="download-page__overlay" aria-hidden="true" />
        <div className="download-page__content">
          {/* hero */}
          <section className="download-hero" aria-labelledby="download-title">
            <p className="download-page__eyebrow">Choose your way to play</p>
            <h1 id="download-title">Start your next adventure</h1>
            <p>
              Download Minecraft and turn a blank world into something only you
              could build.
            </p>
            <a className="download-page__scroll-link" href="#platforms">
              Find your edition <span aria-hidden="true">↓</span>
            </a>
          </section>

          {/* platform section */}
          <section
            className="download-page__section"
            id="platforms"
            aria-labelledby="platform-title"
          >
            <div className="download-page__section-heading">
              <p className="download-page__eyebrow">
                One world, every platform
              </p>
              <h2 id="platform-title">Pick your block launcher</h2>
            </div>
            <div className="download-platforms">
              {platforms.map((platform) => (
                <article
                  className={`download-card download-card--${platform.className}`}
                  key={platform.name}
                >
                  <img
                    className="download-card__icon"
                    src={platform.iconSrc}
                    alt=""
                    aria-hidden="true"
                  />
                  <h3>{platform.name}</h3>
                  <p>{platform.subtitle}</p>
                  <small>{platform.details}</small>
                  <a
                    className="download-card__button"
                    href="#system-requirements"
                  >
                    Download <span aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section
            className="download-page__section download-info-grid"
            id="system-requirements"
            aria-labelledby="requirements-title"
          >
            <div>
              <p className="download-page__eyebrow">Before you build</p>
              <h2 id="requirements-title">System requirements</h2>
              <p className="download-page__muted">
                A little preparation keeps your adventures running smoothly.
                Choose the recommended setup for beautiful worlds and busy
                multiplayer servers.
              </p>
            </div>
            <div className="requirements-table">
              {requirements.map(([label, first, second]) => (
                <div className="requirements-row" key={label}>
                  <strong>{label}</strong>
                  <span>{first}</span>
                  <span>{second}</span>
                </div>
              ))}
            </div>
          </section>

          {/* compatibility */}
          <section
            className="download-page__section compatibility"
            aria-labelledby="compatibility-title"
          >
            <div>
              <p className="download-page__eyebrow">Built to play together</p>
              <h2 id="compatibility-title">Bring everyone along</h2>
            </div>
            <p className="download-page__muted">
              Play solo or invite your friends into the same creative universe.
              Cross-platform multiplayer works with Microsoft accounts, so your
              builds are ready wherever inspiration strikes.
            </p>
            <ul className="compatibility__list">
              <li>
                <span aria-hidden="true">✓</span> Cross-platform multiplayer
              </li>
              <li>
                <span aria-hidden="true">✓</span> Microsoft account support
              </li>
              <li>
                <span aria-hidden="true">✓</span> Controller and keyboard ready
              </li>
            </ul>
          </section>

          <section className="download-game" aria-labelledby="game-title">
            <div className="download-game__copy">
              <p className="download-page__eyebrow">While it downloads</p>
              <h2 id="game-title">Catch the creeper!</h2>
              <p>
                Click the block as it moves. How many can you catch before your
                next world loads?
              </p>
              <div className="download-game__score">
                Blocks caught <strong>{score}</strong>
              </div>
              <button
                className="download-game__reset"
                type="button"
                onClick={resetGame}
              >
                Reset challenge
              </button>
            </div>
            <div
              className="download-game__board"
              aria-label={`Click challenge board. ${score} blocks caught.`}
            >
              <button
                className="download-game__target"
                type="button"
                style={{
                  top: `${targetPosition.top}%`,
                  left: `${targetPosition.left}%`,
                }}
                onClick={moveTarget}
                aria-label="Catch the moving block"
              >
                <img src={creeperImage} alt="" aria-hidden="true" />
              </button>
            </div>
          </section>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
