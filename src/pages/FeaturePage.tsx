import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import redstoneLampImage from '../assets/images/redstone_lamp.webp'
import redstoneLampLitImage from '../assets/images/redstone_lamp_lit.webp'
import Navbar from '../components/navbar'
import FooterSection from '../components/FooterSection'
import './featurePage.css'

gsap.registerPlugin(ScrollTrigger)

type SubItem = {
  id: string
  name: string
  badge: string
  description: string
  mediaSrc: string
  highlights: string[]
}

type FeatureCategory = {
  id: string
  tabLabel: string
  badge: string
  title: string
  summary: string
  subItems: SubItem[]
}

const featureCategories: FeatureCategory[] = [
  {
    id: 'dimensions',
    tabLabel: '01. Dimensions & Realms',
    badge: 'Multi-Realm Physics',
    title: 'Parallel Realities & Spatial Compression',
    summary:
      'Explore three distinct dimensions operating under unique atmospheric physics, environmental hazards, and coordinate scale ratios.',
    subItems: [
      {
        id: 'overworld',
        name: 'The Overworld',
        badge: 'Starting Realm',
        description:
          'A sun-drenched surface world spanning snowy peaks, dense jungles, deep oceans, and lush valleys. Gather essential materials, build home bases, and farm crops under a dynamic 20-minute day/night cycle.',
        mediaSrc: '/videos/dimensions/overworld_potrait.webm',
        highlights: [
          '384-Block Vertical Span (-64 to 320 Y-levels)',
          '50+ Unique Procedural Biomes & Ecosystems',
          'Dynamic Weather Systems (Rain, Thunder, Snow)',
        ],
      },
      {
        id: 'nether',
        name: 'The Nether',
        badge: 'Subterranean Hell',
        description:
          'A hazardous underworld choked with lava lakes, netherrack, and soul sand. Home to Piglins, Blazes, and Ghasts, it hides ancient debris for Netherite gear and Blaze Rods required to open End portals.',
        mediaSrc: '/videos/dimensions/nether_potrait.webm',
        highlights: [
          '1:8 Coordinate Ratio (1 Nether block = 8 Overworld blocks)',
          'Lava Navigation & Strider Riding',
          'Nether Fortresses & Bastion Remnants',
        ],
      },
      {
        id: 'the-end',
        name: 'The End',
        badge: 'Void Endgame',
        description:
          'A shattered archipelago suspended in an pitch-black void. Slay the Ender Dragon to earn the dragon egg and unlock outer islands packed with End Cities, Shulkers, and game-changing Elytra wings.',
        mediaSrc: '/videos/dimensions/end_potrait.webm',
        highlights: [
          'Ender Dragon Boss Encounter & Respawn Mechanics',
          'Outer End City Navigation & Void Hazards',
          'Shulker Box Crafting & Elytra Glider Acquisition',
        ],
      },
    ],
  },
  {
    id: 'gamemodes',
    tabLabel: '02. Gameplay Modes',
    badge: 'Player Agency',
    title: 'Tailored Sandbox Engine Rulesets',
    summary:
      'Choose your ideal playstyle—from tense survival combat and unconstrained architectural creation to unforgiving permadeath.',
    subItems: [
      {
        id: 'survival',
        name: 'Survival Mode',
        badge: 'The Classic Experience',
        description:
          'Start with empty hands. Punch trees, mine ores, manage hunger meters, and build shelters before dusk. Battle nocturnal monsters and progress through material tiers from wood to netherite.',
        mediaSrc: '/videos/about/chopping.webm',
        highlights: [
          'Health, Hunger, and Oxygen Management',
          'Full Crafting & Enchanting Progression Trees',
          'Mob Spawning & Nocturnal Defense Combat',
        ],
      },
      {
        id: 'creative',
        name: 'Creative Mode',
        badge: 'God-Mode Unlocked',
        description:
          'Unleash infinite architectural freedom. Access every block in the game instantly, fly seamlessly across the map, break blocks in a single click, and build megastructures without health or inventory limits.',
        mediaSrc: '/videos/about/building.webm',
        highlights: [
          'Infinite Resource Palette & Search Catalog',
          'Unrestricted Multi-Directional Flight',
          'Invulnerability & Instant 1-Hit Block Destruction',
        ],
      },
      {
        id: 'hardcore',
        name: 'Hardcore Mode',
        badge: 'One Life Only',
        description:
          'The ultimate survival test. Difficulty is permanently locked to Hard, health regen is strict, and a single fatal mistake permanently deletes your world. Make every single decision count.',
        mediaSrc: '/videos/about/warden.webm',
        highlights: [
          'Permadeath Engine (World Lock / Deletion on Death)',
          'Locked Hard Difficulty AI & Damage Scaling',
          'Ultimate Community Bragging Rights',
        ],
      },
    ],
  },
  {
    id: 'mobs',
    tabLabel: '03. Mobs & Ecosystems',
    badge: 'Dynamic AI Engine',
    title: 'Living Ecosystems & Reactive AI',
    summary:
      'Interact with a living world packed with gentle livestock, trading villagers, nocturnal hunters, and terrifying ancient bosses.',
    subItems: [
      {
        id: 'passive',
        name: 'Passive & Livestock Mobs',
        badge: 'Ecosystem & Trade',
        description:
          'Tame wolves as loyal companions, breed horses for speed and jump stats, farm cattle for leather, and trade emeralds with specialized Villager blacksmiths and librarians.',
        mediaSrc: '/videos/feature/mobs.webm',
        highlights: [
          'Animal Breeding & Genetic Inheritance Traits',
          'Villager Workplace & Levelled Trading Mechanics',
          'Pet Taming & Command Following (Wolves, Cats, Parrots)',
        ],
      },
      {
        id: 'hostile',
        name: 'Hostile Nocturnal Mobs',
        badge: 'Nocturnal Threats',
        description:
          'When light levels drop, dangerous creatures spawn. Dodge explosive Creeper blasts, block Skeleton arrows with shields, fend off swarming Zombies, and dodge Phantom attacks.',
        mediaSrc: '/videos/feature/attack.webm',
        highlights: [
          'Light-Level Dependent Spawning Rules (Light < 1)',
          'Pathfinding Navigation & Target Acquisition AI',
          'Armor & Weapon Equipment Randomization',
        ],
      },
      {
        id: 'bosses',
        name: 'Deep Dark & Boss Titans',
        badge: 'High-Tier Raids',
        description:
          'Face high-tier boss encounters. Venture into Ancient Cities to avoid triggering the acoustic Warden, summon the flying Wither, or defeat the Ender Dragon in her void nest.',
        mediaSrc: '/videos/about/warden.webm',
        highlights: [
          'The Warden: Sound & Vibration Acoustic Tracking AI',
          'The Wither: Multitarget Wither Skull Projectiles',
          'Ender Dragon: End Crystal Beam Regeneration Loops',
        ],
      },
    ],
  },
  {
    id: 'multiplayer',
    tabLabel: '04. Multiplayer & Realms',
    badge: 'Cross-Platform Network',
    title: 'Play Together on Any Platform',
    summary:
      'Join private squad worlds, compete in massive public server networks, or drop into local couch co-op seamlessly.',
    subItems: [
      {
        id: 'realms-item',
        name: 'Minecraft Realms',
        badge: 'Personal Cloud Server',
        description:
          'Your private, persistent world hosted in the cloud. Invite up to 10 friends to build, mine, and explore safely. Progress saves automatically, allowing squad members to play even when you are offline.',
        mediaSrc: '/videos/about/building.webm',
        highlights: [
          '24/7 Cloud Uptime & Automatic Point-in-Time Backups',
          'Zero-Config Invite-Only Whitelist Security',
          'Cross-Play Support (PC, Console, iOS, Android)',
        ],
      },
      {
        id: 'servers-item',
        name: 'Public Servers & Minigames',
        badge: 'Massive Online Hubs',
        description:
          'Connect to huge community networks. Battle thousands of players in Bedwars, conquer custom Skyblock worlds, build faction empires, or compete in seasonal ranked PvP arenas.',
        mediaSrc: '/videos/about/chopping.webm',
        highlights: [
          'Official Featured Partner Server Directory',
          'Custom Economy Loops, Plugins, and Leaderboards',
          'Seasonal Tournaments & Exclusive Cosmetic Rewards',
        ],
      },
      {
        id: 'coop-item',
        name: 'Cross-Platform Co-Op',
        badge: 'Local & Online Squads',
        description:
          'Play together across screens. Enjoy split-screen couch co-op on consoles or join local LAN worlds across Windows, mobile, and console devices with unified Microsoft accounts.',
        mediaSrc: '/videos/about/crafting.webm',
        highlights: [
          'Seamless Drop-In / Drop-Out LAN & World Hosting',
          'Unified Xbox Live & Microsoft Account Friend Lists',
          'Cross-Input Balance (Gamepad, Keyboard, Touch)',
        ],
      },
    ],
  },
  {
    id: 'redstone',
    tabLabel: '05. Redstone & Automation',
    badge: 'Turing-Complete',
    title: 'Digital Logic & Mechanical Engineering',
    summary:
      'Route power signals through repeaters, comparators, and pistons to build automated farms, secret vaults, or fully working in-game computers.',
    subItems: [
      {
        id: 'dust',
        name: 'Redstone Power & Signals',
        badge: 'Analog Power Transmission',
        description:
          'Redstone dust acts as electrical wiring within the voxel grid. Power travels up to 15 blocks from torches, levers, and pressure plates to activate doors, lamps, and dispensers.',
        mediaSrc: '/videos/feature/piston.webm',
        highlights: [
          '15-Level Signal Attenuation & Power Decay',
          'Power Sources: Levers, Buttons, Torches, Target Blocks',
          'Observer Block Update Detection (BUD Switches)',
        ],
      },
      {
        id: 'logic',
        name: 'Repeaters, Comparators & Gates',
        badge: 'Digital Logic Components',
        description:
          'Repeaters boost signal strength and introduce tick delays. Comparators measure inventory container capacities or compute signal subtraction, enabling AND, OR, XOR, and NAND gates.',
        mediaSrc: '/videos/feature/hopper.webm',
        highlights: [
          'Precision Sub-Tick Delay Configuration (1–4 ticks)',
          'Container Fullness Detection via Comparators',
          'Binary Logic Gate Construction & Clock Circuits',
        ],
      },
      {
        id: 'machinery',
        name: 'Pistons, Hoppers & Flying Machines',
        badge: 'Mechanical Automation',
        description:
          'Combine sticky pistons, slime blocks, and hoppers to construct fully self-harvesting sugarcane farms, automatic item sorters, hidden bookshelf staircases, and infinite flying machines.',
        mediaSrc: '/videos/feature/fly.webm',
        highlights: [
          'Sticky Piston Block Pushing & Pulling Mechanics',
          'Item Sorting Networks via Hopper Filters',
          'Slime Block Kinetic Motion Engines',
        ],
      },
    ],
  },
  {
    id: 'crafting-progression',
    tabLabel: '06. Crafting & Alchemy',
    badge: 'Progression Systems',
    title: 'Gear Tiering, Enchanting & Potions',
    summary:
      'Master resource processing, magical enchanting altars, and chemical brewing stands to maximize your power and survival potential.',
    subItems: [
      {
        id: 'tiers',
        name: 'Gear & Tool Progression',
        badge: 'Material Tiers',
        description:
          'Process raw ores in blast furnaces to progress through Wood, Stone, Iron, Diamond, and fireproof Netherite gear. Higher tiers dramatically increase mining speed, weapon damage, and durability.',
        mediaSrc: '/videos/feature/crafitng.webm',
        highlights: [
          '3x3 Crafting Recipe Matrix (1,000+ Combinations)',
          'Furnace Smelting & Blast Furnace Smelting Rates',
          'Smithing Table Netherite Upgrade Templates',
        ],
      },
      {
        id: 'enchanting',
        name: 'The Enchanting Table & Anvils',
        badge: 'Magic & Stat Buffs',
        description:
          'Surround an enchanting table with bookshelves to infuse gear with magical attributes. Combine enchanted books on anvils to stack Sharpness, Protection, Fortune, and Silk Touch.',
        mediaSrc: '/videos/feature/enchant.webm',
        highlights: [
          'Lapis Lazuli & XP Level Cost Requirements',
          'Treasure Enchants: Mending, Frost Walker, Soul Speed',
          'Anvil Repairing & Name Tag Customization',
        ],
      },
      {
        id: 'brewing',
        name: 'Alchemy & Potion Brewing',
        badge: 'Chemical Consumables',
        description:
          'Burn Blaze Powder in brewing stands to boil Nether Wart into potion bases. Distill Glowstone, Redstone, or Fermented Spider Eyes to craft Potions of Healing, Swiftness, and Invisibility.',
        mediaSrc: '/videos/feature/Potion.webm',
        highlights: [
          'Potion Modifiers: Extended Duration vs Tier II Strength',
          'Splash & Lingering Area-of-Effect Throwables',
          'Milk Bucket & Honey Status Effect Cures',
        ],
      },
    ],
  },
  {
    id: 'generation',
    tabLabel: '07. World Generation',
    badge: 'Noise Algorithms',
    title: 'Procedural Terrain & Cave Systems',
    summary:
      'Deterministic 64-bit seeds construct infinite worlds packed with subterranean caverns, mountains, and ancient structures.',
    subItems: [
      {
        id: 'noise',
        name: 'Multi-Noise Biome Blending',
        badge: '3D Noise Samplers',
        description:
          'The engine samples temperature, humidity, erosion, continentalness, and depth parameters simultaneously to construct natural mountain ranges, valleys, and jagged cliffside overhangs.',
        mediaSrc: '/videos/about/chopping.webm',
        highlights: [
          'Continuous 3D Perlin & Simplex Noise Function Sampling',
          'Smooth Biome Border Transitions',
          'Height Limit Scale (-64 Bedrock to 320 Sky Limit)',
        ],
      },
      {
        id: 'caverns',
        name: 'Lush Caves & Deep Dark Caverns',
        badge: 'Subterranean Aquifers',
        description:
          'Explore massive open cave systems. Mine through glowing Mossy Lush Caves, navigate jagged Dripstone Caverns, or descend into Sculk-infested Ancient Cities in the Deep Dark.',
        mediaSrc: '/videos/about/warden.webm',
        highlights: [
          'Volumetric Aquifers (Subterranean Water & Lava Lakes)',
          'Sculk Sensor Noise Detection Blocks',
          'Geode Amethyst Clusters & Deepslate Mineral Layers',
        ],
      },
      {
        id: 'structures',
        name: 'Procedural Dungeons & Strongholds',
        badge: 'Exploration Loot',
        description:
          'Follow Eyes of Ender to locate subterranean Strongholds, raid guarded Ocean Monuments with conduit power, loot Woodland Mansions, and explore sunken Shipwrecks for treasure maps.',
        mediaSrc: '/videos/about/building.webm',
        highlights: [
          'Eye of Ender Stronghold Trajectory Tracking',
          'Ocean Monument Elder Guardian Bosses & Sponge Loot',
          'Buried Treasure Maps & Shipwreck Exploration',
        ],
      },
    ],
  },
]

type LogicGate = 'AND' | 'OR' | 'XOR' | 'NAND'

type GameModeParam = {
  mode: string
  healthRegen: string
  flight: string
  blockBreaking: string
  permadeath: string
}

const gameModeMatrix: GameModeParam[] = [
  {
    mode: 'Survival',
    healthRegen: 'Hunger Dependent',
    flight: 'Elytra Only',
    blockBreaking: 'Tool Tier Restricted',
    permadeath: 'No (Respawnable)',
  },
  {
    mode: 'Creative',
    healthRegen: 'Instant / Invulnerable',
    flight: 'Full Flight (Noclip optional)',
    blockBreaking: 'Instant (1-Hit)',
    permadeath: 'No',
  },
  {
    mode: 'Hardcore',
    healthRegen: 'Hunger Dependent',
    flight: 'Elytra Only',
    blockBreaking: 'Tool Tier Restricted',
    permadeath: 'Yes (World Locked)',
  }
]

export default function FeaturePage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [activeCategoryIdx, setActiveCategoryIdx] = useState<number>(0)
  const [activeSubItemIdx, setActiveSubItemIdx] = useState<number>(0)

  // Interactive Redstone Simulator States
  const [inputA, setInputA] = useState<boolean>(true)
  const [inputB, setInputB] = useState<boolean>(false)
  const [selectedGate, setSelectedGate] = useState<LogicGate>('AND')

  const currentCategory = featureCategories[activeCategoryIdx] ?? featureCategories[0]
  const currentSubItem =
    currentCategory.subItems[activeSubItemIdx] ?? currentCategory.subItems[0]

  const handleCategoryChange = (index: number) => {
    setActiveCategoryIdx(index)
    setActiveSubItemIdx(0)
  }

  // Redstone Logic Output
  const computeLogicOutput = (): boolean => {
    switch (selectedGate) {
      case 'AND':
        return inputA && inputB
      case 'OR':
        return inputA || inputB
      case 'XOR':
        return inputA !== inputB
      case 'NAND':
        return !(inputA && inputB)
      default:
        return false
    }
  }

  const logicOutput = computeLogicOutput()

  useGSAP(
    () => {
      // Hero Entrance
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      gsap.set('.feature-hero__badge, .feature-hero__title, .feature-hero__description', {
        autoAlpha: 0,
        y: 28,
      })

      heroTl
        .to('.feature-hero__badge', { y: 0, autoAlpha: 1, duration: 0.5, delay: 0.1 })
        .to('.feature-hero__title', { y: 0, autoAlpha: 1, duration: 0.7 }, '-=0.3')
        .to('.feature-hero__description', { y: 0, autoAlpha: 1, duration: 0.6 }, '-=0.4')

      // ScrollTrigger Animations
      const sectionsToAnimate = [
        '.feature-deepdive__header',
        '.feature-simulator__header',
        '.feature-matrix__header',
        '.feature-specs h2',
      ]

      sectionsToAnimate.forEach((selector) => {
        gsap.from(selector, {
          scrollTrigger: {
            trigger: selector,
            start: 'top 85%',
            once: true,
          },
          y: 24,
          autoAlpha: 0,
          duration: 0.6,
          ease: 'power2.out',
        })
      })
    },
    { scope: pageRef },
  )

  return (
    <div className="app-shell" ref={pageRef}>
      <div className="app-navbar">
        <Navbar activeLabel="Feature" />
      </div>

      <main className="feature-page" id="feature-page">
        {/* Hero */}
        <section className="feature-hero" aria-labelledby="feature-hero-title">
          <video className="feature-hero__bg" autoPlay muted loop playsInline aria-hidden="true">
            <source src="/videos/about/hero_bg.webm" type="video/webm" />
          </video>
          <div className="feature-hero__overlay" aria-hidden="true" />

          <span className="feature-hero__eyebrow">Deep Tech & Systems</span>
          <h1 className="feature-hero__title" id="feature-hero-title">
            Under the Voxel Hood
          </h1>
          <p className="feature-hero__description">
            An in-depth breakdown of the systems, algorithms, and sandbox mechanics that turn simple blocks into infinite interactive worlds.
          </p>
        </section>

        {/*  BENTO STAGE FEATURE EXPLORER */}
        <section className="feature-deepdive" id="systems" aria-labelledby="deepdive-title">
          <div className="feature-deepdive__header">
            <span className="feature-deepdive__eyebrow">Interactive System Matrix</span>
            <h2 id="deepdive-title">Explore Core Engine Modules</h2>
            <p>Select a category on the left, then toggle sub-item modules to inspect mechanics in detail.</p>
          </div>

          <div className="feature-explorer">
            {/* Category Navigation */}
            <div className="feature-explorer__tabs" role="tablist" aria-label="Feature Categories">
              {featureCategories.map((cat, idx) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategoryIdx === idx}
                  className={`feature-explorer__tab${activeCategoryIdx === idx ? ' is-active' : ''}`}
                  onClick={() => handleCategoryChange(idx)}
                >
                  {cat.tabLabel}
                </button>
              ))}
            </div>

            {/* Main Stage Display */}
            <div className="feature-explorer__panel">
              <div className="category-header">
                <span className="category-header__badge">{currentCategory.badge}</span>
                <h3>{currentCategory.title}</h3>
                <p>{currentCategory.summary}</p>
              </div>

              {/* Segmented Sub-Nav Controls */}
              <div className="subitem-selector" role="tablist" aria-label={`${currentCategory.title} sub-items`}>
                {currentCategory.subItems.map((sub, idx) => (
                  <button
                    key={sub.id}
                    type="button"
                    role="tab"
                    aria-selected={activeSubItemIdx === idx}
                    className={`subitem-pill${activeSubItemIdx === idx ? ' is-active' : ''}`}
                    onClick={() => setActiveSubItemIdx(idx)}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>

              {/* Bento Spotlight Card Stage */}
              <article className="subitem-card">
                <div className="subitem-card__copy">
                  <span className="subitem-card__badge">{currentSubItem.badge}</span>
                  <h4>{currentSubItem.name}</h4>
                  <p>{currentSubItem.description}</p>

                  <ul className="subitem-card__list">
                    {currentSubItem.highlights.map((item, i) => (
                      <li key={i}>
                        <span className="subitem-card__check" aria-hidden="true">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="subitem-card__media">
                  <video key={currentSubItem.mediaSrc} autoPlay muted loop playsInline aria-label={`${currentSubItem.name} loop`}>
                    <source src={currentSubItem.mediaSrc} type="video/webm" />
                  </video>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* --- Redstone --- */}
        <section className="feature-simulator" aria-labelledby="simulator-title">
          <div className="feature-simulator__inner">
            <div className="feature-simulator__header">
              <span className="feature-simulator__eyebrow">Live Demonstration</span>
              <h2 id="simulator-title">Redstone Logic Gate Simulator</h2>
              <p>Test real-time digital logic routing as simulated inside Minecraft's Redstone engine.</p>
            </div>

            <div className="redstone-widget">
              <div className="redstone-widget__controls">
                <div className="redstone-widget__group">
                  <span className="redstone-widget__label">Select Gate Logic:</span>
                  <div className="redstone-widget__gate-buttons">
                    {(['AND', 'OR', 'XOR', 'NAND'] as LogicGate[]).map((gate) => (
                      <button
                        key={gate}
                        type="button"
                        className={`redstone-gate-btn${selectedGate === gate ? ' is-active' : ''}`}
                        onClick={() => setSelectedGate(gate)}
                      >
                        {gate}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="redstone-widget__inputs">
                  <button
                    type="button"
                    className={`redstone-toggle-btn${inputA ? ' is-powered' : ''}`}
                    onClick={() => setInputA(!inputA)}
                  >
                    Input Wire A: <strong>{inputA ? 'POWERED (15)' : 'OFF (0)'}</strong>
                  </button>

                  <button
                    type="button"
                    className={`redstone-toggle-btn${inputB ? ' is-powered' : ''}`}
                    onClick={() => setInputB(!inputB)}
                  >
                    Input Wire B: <strong>{inputB ? 'POWERED (15)' : 'OFF (0)'}</strong>
                  </button>
                </div>
              </div>

              <div className="redstone-widget__output-panel">
                <div className="redstone-widget__gate-badge">Active Gate: {selectedGate}</div>
                <div className={`redstone-lamp${logicOutput ? ' is-lit' : ''}`}>
                  <img
                    className="redstone-lamp__image"
                    src={logicOutput ? redstoneLampLitImage : redstoneLampImage}
                    alt={logicOutput ? 'Lit redstone lamp' : 'Unlit redstone lamp'}
                  />
                  <span className="redstone-lamp__status">
                    {logicOutput ? 'REDSTONE LAMP LIT' : 'NO SIGNAL OUTPUT'}
                  </span>
                </div>
                <p className="redstone-widget__explanation">
                  {selectedGate === 'AND' && 'AND Gate requires BOTH Input A and Input B to be powered.'}
                  {selectedGate === 'OR' && 'OR Gate activates if EITHER Input A or Input B receives a signal.'}
                  {selectedGate === 'XOR' && 'Exclusive OR activates ONLY when exactly one input is powered.'}
                  {selectedGate === 'NAND' && 'NAND Gate remains powered UNLESS both inputs are active.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Game Mode Engine  */}
        <section className="feature-matrix" aria-labelledby="matrix-title">
          <div className="feature-matrix__inner">
            <div className="feature-matrix__header">
              <span className="feature-matrix__eyebrow">Engine Rulesets</span>
              <h2 id="matrix-title">Game Mode Paradigm Comparison</h2>
              <p>How the underlying engine modifies physics, player state, and world permissions across game modes.</p>
            </div>

            <div className="matrix-table-wrapper">
              <table className="matrix-table">
                <thead>
                  <tr>
                    <th>Game Mode</th>
                    <th>Health & Regen State</th>
                    <th>Flight Capabilities</th>
                    <th>Block Interaction</th>
                    <th>Permadeath Rule</th>
                  </tr>
                </thead>
                <tbody>
                  {gameModeMatrix.map((row) => (
                    <tr key={row.mode}>
                      <td className="matrix-table__mode">{row.mode}</td>
                      <td>{row.healthRegen}</td>
                      <td>{row.flight}</td>
                      <td>{row.blockBreaking}</td>
                      <td>{row.permadeath}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* --- Technical Specification Grid --- */}
        <section className="feature-specs" aria-labelledby="specs-title">
          <div className="feature-specs__inner">
            <h2 id="specs-title">Sandbox Engine Highlights</h2>

            <div className="feature-specs__grid">
              <div className="spec-card">
                <div className="spec-card__number">60 FPS</div>
                <h4>Procedural Chunk Rendering</h4>
                <p>Terrain is divided into 16×16×384 vertical chunks, asynchronously generated using noise algorithms for seamless world expansion.</p>
              </div>

              <div className="spec-card">
                <div className="spec-card__number">20 TPS</div>
                <h4>Server Tick Rate Logic</h4>
                <p>Game state updates, entity positions, and scheduled block ticks execute on a synchronized 50ms loop.</p>
              </div>

              <div className="spec-card">
                <div className="spec-card__number">∞</div>
                <h4>Seed-Based Determinism</h4>
                <p>Entering a 64-bit numerical seed reconstructs every mountain, cave system, and structure identically across platforms.</p>
              </div>

              <div className="spec-card">
                <div className="spec-card__number">NBT</div>
                <h4>Named Binary Tag Storage</h4>
                <p>Tree-structured binary format used to store entity attributes, item lore, and block state data efficiently.</p>
              </div>

              <div className="spec-card">
                <div className="spec-card__number">0–15</div>
                <h4>Light Level Propagation</h4>
                <p>Voxel light engine calculates light decay step-by-step from sunlight and emissive blocks like glowstone and torches.</p>
              </div>

              <div className="spec-card">
                <div className="spec-card__number">1:8</div>
                <h4>Spatial Dimension Ratio</h4>
                <p>Navigating 1 meter in the Nether compresses 8 meters of Overworld distance, enabling long-range fast-travel networks.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  )
}