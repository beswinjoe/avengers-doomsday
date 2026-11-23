import { CharacterProfile } from '../types';

export const CHARACTERS_DATABASE: CharacterProfile[] = [
  {
    id: 'doctor-doom',
    name: 'Victor von Doom',
    alias: 'DOCTOR DOOM',
    affiliation: 'LATVERIA / GOD EMPEROR',
    status: 'OFFICIALLY CONFIRMED — SDCC 2024 HALL H',
    actor: 'Robert Downey Jr.',
    universe: 'Earth-Latveria / Multiverse Nexus',
    threatClass: 'UNIVERSAL / BEYOND',
    bio: 'Monarch of Latveria, supreme master of both advanced quantum physics and arcane sorcery. Officially unveiled by Kevin Feige and the Russo Brothers at San Diego Comic-Con Hall H, Robert Downey Jr. returns to Marvel Studios to headline Avengers: Doomsday as the definitive Victor von Doom.',
    quote: '"I was not born to rule. I rule because there is no other mind capable of preserving existence from its own madness."',
    abilities: [
      'Master of Advanced Sorcery & Arcane Rituals',
      'Genius-Level Intellect beyond Earth-616 parameters',
      'Titanium Micro-Fusion Exoskeleton',
      'Multiverse Incursion Siphoning',
      'Latverian Doombot Legion Automation'
    ],
    equipment: [
      'Forged Titanium Mask & Hooded Cloak',
      'Arcane Siphon Gauntlets',
      'Micro-Fusion Arc Reactor Core',
      'Time-Platform Anchor Relic'
    ],
    dossierNotes: 'Officially revealed on stage in Hall H by Kevin Feige and directors Anthony and Joe Russo on July 27, 2024. Robert Downey Jr. will lead both Avengers: Doomsday (2026) and Avengers: Secret Wars.',
    image: '/assets/doom-clean.jpg',
    themeColor: 'doom'
  },
  {
    id: 'reed-richards',
    name: 'Reed Richards',
    alias: 'MISTER FANTASTIC',
    affiliation: 'FANTASTIC FOUR',
    status: 'OFFICIALLY CONFIRMED — MARVEL STUDIOS CAST',
    actor: 'Pedro Pascal',
    universe: 'Earth-828 (1960s Retro-Futuristic)',
    threatClass: 'COSMIC',
    bio: 'The intellectual architect of Marvel’s First Family. Officially confirmed by Kevin Feige to transition directly from The Fantastic Four: First Steps into Avengers: Doomsday. Richards confronts the terrifying calculus of multiversal incursion collapse.',
    quote: '"We calculated every variable of the cosmos, yet failed to account for a man who treats universal collapse as his personal throne room."',
    abilities: [
      'Infinite Cellular Elasticity & Plasticity',
      'Multiversal Bridge Physics',
      'Sub-Atomic Particle Manipulation',
      'Theoretical Quantum Architecture'
    ],
    equipment: [
      'Unstable Molecule Uniform',
      'The Fantasticar Mark IV',
      'Cosmic Radiation Telemetry Bracer'
    ],
    dossierNotes: 'Officially confirmed by Marvel Studios. Pedro Pascal leads Marvel’s First Family alongside Vanessa Kirby, Joseph Quinn, and Ebon Moss-Bachrach directly into the Doomsday confrontation.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
    themeColor: 'silver'
  },
  {
    id: 'sue-storm',
    name: 'Susan Storm-Richards',
    alias: 'THE INVISIBLE WOMAN',
    affiliation: 'FANTASTIC FOUR',
    status: 'OFFICIALLY CONFIRMED — MARVEL STUDIOS CAST',
    actor: 'Vanessa Kirby',
    universe: 'Earth-828 (1960s Retro-Futuristic)',
    threatClass: 'OMEGA',
    bio: 'The formidable emotional core and deadliest defensive champion of the Fantastic Four. Sue commands psionic force fields capable of deflecting planetary-scale atmospheric reentry and cosmic radiation waves.',
    quote: '"Victor never builds a wall without planning to demolish everything on either side of it."',
    abilities: [
      'Total Photonic Invisibility',
      'Hyper-Dense Psionic Force-Field Projection',
      'Internal Force Bubble Disruption',
      'Cosmic Shielding'
    ],
    equipment: [
      'Unstable Molecule Environmental Suit',
      'Multiverse Beacon Locator'
    ],
    dossierNotes: 'Officially confirmed by Marvel Studios. Vanessa Kirby portrays Susan Storm, standing directly opposite Doom’s multiversal ambitions.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    themeColor: 'silver'
  },
  {
    id: 'johnny-storm',
    name: 'Johnny Storm',
    alias: 'THE HUMAN TORCH',
    affiliation: 'FANTASTIC FOUR',
    status: 'OFFICIALLY CONFIRMED — MARVEL STUDIOS CAST',
    actor: 'Joseph Quinn',
    universe: 'Earth-828 (1960s Retro-Futuristic)',
    threatClass: 'ALPHA',
    bio: 'The hot-headed, fearless aerial vanguard of the Fantastic Four. Harnessing plasma manipulation and supersonic flight, Johnny ignites the skies as planetary collisions begin to tear across the dimensional fabric.',
    quote: '"Flame on! Let’s see his armor stand up to super-nova heat."',
    abilities: [
      'Full-Body Plasma Transformation',
      'Supersonic Flight & Aerobatics',
      'Supernova Heat Generation',
      'Thermal Energy Absorption'
    ],
    equipment: [
      'Thermal-Resistant Unstable Molecule Weave',
      'Atmospheric Telemetry Communicator'
    ],
    dossierNotes: 'Officially confirmed by Marvel Studios. Joseph Quinn stars as Johnny Storm, bringing his intense dynamism directly into the Phase Six climax.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80',
    themeColor: 'crimson'
  },
  {
    id: 'ben-grimm',
    name: 'Ben Grimm',
    alias: 'THE THING',
    affiliation: 'FANTASTIC FOUR',
    status: 'OFFICIALLY CONFIRMED — MARVEL STUDIOS CAST',
    actor: 'Ebon Moss-Bachrach',
    universe: 'Earth-828 (1960s Retro-Futuristic)',
    threatClass: 'OMEGA',
    bio: 'The indomitable rock-armored powerhouse with a heart of gold. Mutated by cosmic radiation into an indestructible orange rock-like titan, Ben provides the raw physical frontline defense against Latveria’s mechanical legion.',
    quote: '"It’s clobberin’ time! Somebody tell Victor he’s in for a brawl."',
    abilities: [
      'Near-Invulnerable Rock-Like Dermis',
      'Superhuman Strength & Endurance',
      'Resistance to High-Impact Explosions',
      'Unwavering Combat Tenacity'
    ],
    equipment: [
      'Heavy-Duty Unstable Molecule Trousers',
      'Tactical Retinal Beacon'
    ],
    dossierNotes: 'Officially confirmed by Marvel Studios. Emmy winner Ebon Moss-Bachrach portrays Ben Grimm with performance capture.',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80',
    themeColor: 'silver'
  }
];
