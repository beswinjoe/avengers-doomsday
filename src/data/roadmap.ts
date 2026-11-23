export interface RoadmapStep {
  id: string;
  stepNumber: number;
  title: string;
  releaseYear: string;
  universe: string;
  importance: string;
  description: string;
  logoUrl: string;
  direction: 'right' | 'down' | 'left';
  row: number;
  col: number; // 0, 1, 2
}

export const ROADMAP_DATA: RoadmapStep[] = [
  // Row 1 (Left to Right): X-Men -> X2 -> Cap 1 (down)
  {
    id: 'x-men',
    stepNumber: 1,
    title: 'X-Men',
    releaseYear: '2000',
    universe: 'Earth-10005 (Fox Universe)',
    importance: 'The Genesis of Live-Action Mutants',
    description: 'Introduces Patrick Stewart’s Charles Xavier, Hugh Jackman’s Wolverine, and James Marsden’s Cyclops. Establishes the foundational mutant universe that converges directly into Battleworld.',
    logoUrl: '/assets/roadmap/01-xmen.jpg',
    direction: 'right',
    row: 1,
    col: 0
  },
  {
    id: 'x-men-2',
    stepNumber: 2,
    title: 'X-Men 2 (X2: United)',
    releaseYear: '2003',
    universe: 'Earth-10005',
    importance: 'Mutant-Human War & Weapon X',
    description: 'Deepens the tragedy of mutant persecution and Stryker’s anti-mutant agenda, cementing Scott Summers and Logan as the core leaders whose reality will face multiversal collapse.',
    logoUrl: '/assets/roadmap/02-xmen2.jpg',
    direction: 'right',
    row: 1,
    col: 1
  },
  {
    id: 'cap-1',
    stepNumber: 3,
    title: 'Captain America: The First Avenger',
    releaseYear: '2011',
    universe: 'Earth-616 (Sacred Timeline)',
    importance: 'The Origin of Steve Rogers & The Tesseract',
    description: 'Steve Rogers takes the Super Soldier Serum to defeat Red Skull, recovering the Space Stone (Tesseract). Establishes the moral compass of the Avengers saga.',
    logoUrl: '/assets/roadmap/03-cap1.jpg',
    direction: 'down',
    row: 1,
    col: 2
  },

  // Row 2 (Right to Left): Avengers 1 <- Infinity War <- Endgame (down)
  {
    id: 'avengers-1',
    stepNumber: 4,
    title: 'The Avengers',
    releaseYear: '2012',
    universe: 'Earth-616',
    importance: 'Earth’s Mightiest Heroes Assemble',
    description: 'Iron Man, Captain America, Thor, Hulk, Black Widow, and Hawkeye unite to repel Loki’s Chitauri invasion in New York, putting Earth on the cosmic radar.',
    logoUrl: '/assets/roadmap/04-avengers1.jpg',
    direction: 'left',
    row: 2,
    col: 2
  },
  {
    id: 'avengers-infinity-war',
    stepNumber: 5,
    title: 'Avengers: Infinity War',
    releaseYear: '2018',
    universe: 'Earth-616',
    importance: 'The Inevitability of Thanos & Cosmic Collapse',
    description: 'Thanos collects all six Infinity Stones and wipes out half of all universal life with a snap of his fingers, demonstrating the fragility of universal balance.',
    logoUrl: '/assets/roadmap/05-infinitywar.jpg',
    direction: 'left',
    row: 2,
    col: 1
  },
  {
    id: 'avengers-endgame',
    stepNumber: 6,
    title: 'Avengers: Endgame',
    releaseYear: '2019',
    universe: 'Earth-616 & Divergent Timelines',
    importance: 'Quantum Time Heist & Tony Stark’s Sacrifice',
    description: 'The Avengers utilize the Quantum Realm to resurrect the fallen. Tony Stark sacrifices his life with the Nano Gauntlet—the heroic sacrifice whose face Victor von Doom now wears.',
    logoUrl: '/assets/roadmap/06-endgame.jpg',
    direction: 'down',
    row: 2,
    col: 0
  },

  // Row 3 (Left to Right): Loki -> Shang-Chi -> Spider-Man NWH (down)
  {
    id: 'loki',
    stepNumber: 7,
    title: 'Loki (Seasons 1 & 2)',
    releaseYear: '2021-2023',
    universe: 'Citadel at the End of Time / TVA',
    importance: 'Shattering of the Sacred Timeline',
    description: 'Sylvie executes He Who Remains, triggering infinite multiverse branches. Loki sacrifices his life to hold the branches together as the God of Stories at the center of Yggdrasil.',
    logoUrl: '/assets/roadmap/07-loki.jpg',
    direction: 'right',
    row: 3,
    col: 0
  },
  {
    id: 'shang-chi',
    stepNumber: 8,
    title: 'Shang-Chi and the Legend of the Ten Rings',
    releaseYear: '2021',
    universe: 'Earth-616 & Ta Lo',
    importance: 'Ancient Cosmic Tech & The Beacon',
    description: 'Shang-Chi claims the Ten Rings—mysterious ancient artifacts transmitting a powerful beacon outward across the multiverse, detected by Captain Marvel, Bruce Banner, and Wong.',
    logoUrl: '/assets/roadmap/08-shangchi.jpg',
    direction: 'right',
    row: 3,
    col: 1
  },
  {
    id: 'spiderman-nwh',
    stepNumber: 9,
    title: 'Spider-Man: No Way Home',
    releaseYear: '2021',
    universe: 'Earth-616, Earth-96283 & Earth-120703',
    importance: 'The First Multiversal Rift in Earth-616',
    description: 'Doctor Strange’s corrupted memory spell rips the fabric of space-time, pulling Peter Parkers and villains from alternate realities and proving the multiverse boundary is tearing.',
    logoUrl: '/assets/roadmap/09-spiderman-nwh.jpg',
    direction: 'down',
    row: 3,
    col: 2
  },

  // Row 4 (Right to Left): Wakanda Forever <- Multiverse of Madness <- Deadpool & Wolverine (down)
  {
    id: 'wakanda-forever',
    stepNumber: 10,
    title: 'Black Panther: Wakanda Forever',
    releaseYear: '2022',
    universe: 'Earth-616',
    importance: 'The Global Cold War for Vibranium & Talokan',
    description: 'Wakanda mourns King T’Challa as Shuri becomes the Black Panther. Namor’s underwater kingdom of Talokan emerges, setting up oceanic alliances for the incursion crisis.',
    logoUrl: '/assets/roadmap/10-wakanda-forever.jpg',
    direction: 'left',
    row: 4,
    col: 2
  },
  {
    id: 'multiverse-madness',
    stepNumber: 11,
    title: 'Doctor Strange in the Multiverse of Madness',
    releaseYear: '2022',
    universe: 'Earth-616 & Earth-838',
    importance: 'The Official Introduction of Incursions',
    description: 'Reed Richards and the Illuminati define Incursions: when reality boundaries decay, two universes collide and extinguish each other. Clea summons Strange to fix an active incursion.',
    logoUrl: '/assets/roadmap/11-multiverse-madness.jpg',
    direction: 'left',
    row: 4,
    col: 1
  },
  {
    id: 'deadpool-wolverine',
    stepNumber: 12,
    title: 'Deadpool & Wolverine',
    releaseYear: '2024',
    universe: 'Earth-10005 & The Void',
    importance: 'Anchor Beings & The Void Wasteland',
    description: 'Deadpool and Wolverine discover that realities die when their Anchor Beings fall. They battle Cassandra Nova in The Void—the dimensional scrapheap that Doom transforms into Battleworld.',
    logoUrl: '/assets/roadmap/12-deadpool-wolverine.jpg',
    direction: 'down',
    row: 4,
    col: 0
  },

  // Row 5 (Left to Right): Brave New World -> Thunderbolts* -> Fantastic 4 (down)
  {
    id: 'brave-new-world',
    stepNumber: 13,
    title: 'Captain America: Brave New World',
    releaseYear: 'February 2025',
    universe: 'Earth-616',
    importance: 'Celestial Adamantium & Red Hulk',
    description: 'President Thaddeus Ross transforms into Red Hulk amidst international conflict over Adamantium mined from the corpse of Celestial Tiamut, leaving global defense broken.',
    logoUrl: '/assets/roadmap/13-cap-bravenewworld.jpg',
    direction: 'right',
    row: 5,
    col: 0
  },
  {
    id: 'thunderbolts',
    stepNumber: 14,
    title: 'Thunderbolts*',
    releaseYear: 'May 2025',
    universe: 'Earth-616',
    importance: 'The Anti-Heroes & The Sentry',
    description: 'Yelena Belova, Bucky Barnes, Red Guardian, and US Agent are deployed on covert missions, unleashing Bob Reynolds (The Sentry)—the man with the power of a million exploding suns.',
    logoUrl: '/assets/roadmap/14-thunderbolts.jpg',
    direction: 'right',
    row: 5,
    col: 1
  },
  {
    id: 'fantastic-4',
    stepNumber: 15,
    title: 'The Fantastic Four: First Steps',
    releaseYear: 'July 2025',
    universe: 'Earth-828 (Retro-Future 1960s)',
    importance: 'The First Family & The Doom Rivalry',
    description: 'Reed Richards, Sue Storm, Johnny Storm, and Ben Grimm face Galactus in their alternate 1960s universe. Their reality faces terminal incursion, pushing them into collision with Doom.',
    logoUrl: '/assets/roadmap/15-fantastic4.jpg',
    direction: 'down',
    row: 5,
    col: 2
  },

  // Terminus (Destination): AVENGERS: DOOMSDAY
  {
    id: 'doomsday',
    stepNumber: 16,
    title: 'Avengers: Doomsday',
    releaseYear: 'December 17, 2026',
    universe: 'All Universes Colliding // Battleworld',
    importance: 'The Culmination of the Multiverse Saga',
    description: 'All 15 paths converge. As the multiverse collapses in final catastrophic incursion, Victor von Doom activates the Multiversal Siphon, forging existence into his own eternal realm: Battleworld.',
    logoUrl: '/assets/roadmap/16-doomsday.jpg',
    direction: 'down',
    row: 6,
    col: 1
  }
];
