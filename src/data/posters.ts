export interface PosterItem {
  id: string;
  title: string;
  character: string;
  actor: string;
  category: 'ensemble' | 'doom' | 'avengers' | 'mutants' | 'first-family';
  categoryLabel: string;
  imageUrl: string;
  tagline: string;
  description: string;
  releaseDate: string;
}

export const POSTERS_DATA: PosterItem[] = [
  {
    id: 'poster-ensemble',
    title: 'Avengers: Doomsday Theatrical One-Sheet',
    character: 'Doctor Doom & The Multiversal Champions',
    actor: 'Robert Downey Jr., Chris Hemsworth, Chris Evans, Pedro Pascal & Ensemble',
    category: 'ensemble',
    categoryLabel: 'THEATRICAL ENSEMBLE',
    imageUrl: '/assets/posters/poster-doomsday-ensemble.jpg',
    tagline: 'ALL ROADS LEAD TO BATTLEWORLD',
    description: 'The monumental theatrical key art depicting Victor von Doom towering over collapsing cosmic realities as the Avengers, Fantastic Four, Thunderbolts, and X-Men collide across dying skies.',
    releaseDate: 'DECEMBER 17, 2026'
  },
  {
    id: 'poster-doom',
    title: 'The Sovereign of Latveria',
    character: 'Victor von Doom / Doctor Doom',
    actor: 'Robert Downey Jr.',
    category: 'doom',
    categoryLabel: 'DOCTOR DOOM',
    imageUrl: '/assets/posters/poster-doctor-doom-closeup.jpg',
    tagline: 'THERE IS ONLY DOOM',
    description: 'Cloaked in ceremonial emerald robes and forged titanium armor, Victor von Doom observes the crumbling multiverse, prepared to salvage reality under his singular, unyielding will.',
    releaseDate: 'DECEMBER 17, 2026'
  },
  {
    id: 'poster-cap-sam',
    title: 'The Sentinel of Liberty',
    character: 'Captain America',
    actor: 'Anthony Mackie',
    category: 'avengers',
    categoryLabel: 'AVENGERS',
    imageUrl: '/assets/posters/poster-captain-america-sam.jpg',
    tagline: 'ASSEMBLE THE BROKEN WORLDS',
    description: 'Sam Wilson leads a fractured Earth-616 defense, bearing the vibranium shield against celestial anomalies and multiversal incursion waves.',
    releaseDate: 'DECEMBER 17, 2026'
  },
  {
    id: 'poster-steve-nomad',
    title: 'The Worthy Return',
    character: 'Steve Rogers / Nomad',
    actor: 'Chris Evans',
    category: 'avengers',
    categoryLabel: 'AVENGERS',
    imageUrl: '/assets/posters/poster-steve-rogers-nomad.jpg',
    tagline: 'UNTIL THE VERY END',
    description: 'Steve Rogers returns from across divergent timelines, wielding the shattered, re-forged hammer Mjolnir in the fight against universal annihilation.',
    releaseDate: 'DECEMBER 17, 2026'
  },
  {
    id: 'poster-loki',
    title: 'The God of Stories',
    character: 'Loki Laufeyson',
    actor: 'Tom Hiddleston',
    category: 'mutants',
    categoryLabel: 'TVA & MULTIVERSE',
    imageUrl: '/assets/posters/poster-loki.jpg',
    tagline: 'HOLDING THE BRANCHES OF TIME',
    description: 'Bound to the throne at the Citadel, Loki holds the living threads of the multiversal tree Yggdrasil as Doom seeks to sever the timeline roots.',
    releaseDate: 'DECEMBER 17, 2026'
  },
  {
    id: 'poster-cyclops-optic',
    title: 'Leader of the Mutants',
    character: 'Cyclops',
    actor: 'James Marsden',
    category: 'mutants',
    categoryLabel: 'X-MEN',
    imageUrl: '/assets/posters/poster-cyclops-optic-blast.jpg',
    tagline: 'MUTANT SURVIVAL AT ALL COSTS',
    description: 'Scott Summers unleases full-intensity concussive ruby-quartz blasts in defense of mutantkind against invading incursion forces.',
    releaseDate: 'DECEMBER 17, 2026'
  },
  {
    id: 'poster-cyclops-wolverine',
    title: 'Unbreakable Brotherhood',
    character: 'Cyclops & Wolverine',
    actor: 'James Marsden & Hugh Jackman',
    category: 'mutants',
    categoryLabel: 'X-MEN',
    imageUrl: '/assets/posters/poster-cyclops-wolverine.jpg',
    tagline: 'ACROSS EVERY REALITY',
    description: 'The definitive X-Men battle team-up across the ruins of collapsing dimensions as Wolverine and Cyclops fight side by side.',
    releaseDate: 'DECEMBER 17, 2026'
  },
  {
    id: 'poster-cyclops-standing',
    title: 'Chrono-Tactician',
    character: 'Cyclops / Scott Summers',
    actor: 'James Marsden',
    category: 'mutants',
    categoryLabel: 'X-MEN',
    imageUrl: '/assets/posters/poster-cyclops-standing.jpg',
    tagline: 'STRATEGY IN THE FACE OF EXTINCTION',
    description: 'Wearing classic 90s gold and blue tactical armor, Cyclops coordinates multi-dimensional ground operations against Battleworld legions.',
    releaseDate: 'DECEMBER 17, 2026'
  },
  {
    id: 'poster-gambit-yelena',
    title: 'Kinetic Strike Team',
    character: 'Gambit & Yelena Belova',
    actor: 'Channing Tatum & Florence Pugh',
    category: 'mutants',
    categoryLabel: 'COVERT STRIKE',
    imageUrl: '/assets/posters/poster-gambit-yelena.jpg',
    tagline: 'A ROYAL FLUSH IN ANNIHILATION',
    description: 'The unexpected lethal duo combining charged kinetic bo staff strikes and Black Widow tactical weaponry amidst the smoking chassis of sentinels.',
    releaseDate: 'DECEMBER 17, 2026'
  },
  {
    id: 'poster-sue-namor',
    title: 'Sovereign Waters & Invisible Shields',
    character: 'Invisible Woman & Namor',
    actor: 'Vanessa Kirby & Tenoch Huerta',
    category: 'first-family',
    categoryLabel: 'THE FIRST FAMILY',
    imageUrl: '/assets/posters/poster-sue-storm-namor.jpg',
    tagline: 'DEFENDING EARTH-828',
    description: 'Sue Storm projects impenetrable psionic forcefields alongside Talokan’s feathered serpent god Namor in defense of the colliding oceans.',
    releaseDate: 'DECEMBER 17, 2026'
  },
  {
    id: 'poster-yelena',
    title: 'The Lethal Widow',
    character: 'Yelena Belova',
    actor: 'Florence Pugh',
    category: 'avengers',
    categoryLabel: 'THUNDERBOLTS*',
    imageUrl: '/assets/posters/poster-yelena-belova.jpg',
    tagline: 'SURVIVING THE END OF THE WORLD',
    description: 'Equipped with dual shock batons, Yelena navigates covert operations for the Thunderbolts* as multiversal chaos engulfs the globe.',
    releaseDate: 'DECEMBER 17, 2026'
  },
  {
    id: 'poster-bucky',
    title: 'The Congressman of War',
    character: 'Bucky Barnes / Winter Soldier',
    actor: 'Sebastian Stan',
    category: 'avengers',
    categoryLabel: 'THUNDERBOLTS*',
    imageUrl: '/assets/posters/poster-bucky-barnes.jpg',
    tagline: 'ONE LAST MISSION',
    description: 'Armed with advanced tactical armor and a newly forged vibranium cybernetic arm, Bucky Barnes stands on the front line of Earth’s defense.',
    releaseDate: 'DECEMBER 17, 2026'
  },
  {
    id: 'poster-antman-redguardian',
    title: 'Unlikely Giants',
    character: 'Ant-Man & Red Guardian',
    actor: 'Paul Rudd & David Harbour',
    category: 'avengers',
    categoryLabel: 'AVENGERS & THUNDERBOLTS*',
    imageUrl: '/assets/posters/poster-antman-redguardian.jpg',
    tagline: 'BIG HEROES. BIGGER APOCALYPSE.',
    description: 'Scott Lang uses quantum pym-particle sub-atomic scaling alongside Alexei Shostakov’s brute Soviet strength to hold the collapsing line.',
    releaseDate: 'DECEMBER 17, 2026'
  },
  {
    id: 'poster-ultron',
    title: 'The Re-Forged Machine',
    character: 'Ultron',
    actor: 'James Spader',
    category: 'doom',
    categoryLabel: 'SYNTHETIC THREAT',
    imageUrl: '/assets/posters/poster-ultron.jpg',
    tagline: 'STRINGS REMADE IN STEEL',
    description: 'Reconstructed within the digital ruins of VisionQuest, Ultron re-emerges with glowing crimson optic conduits, serving Doom’s algorithmic conquest.',
    releaseDate: 'DECEMBER 17, 2026'
  },
  {
    id: 'poster-vision',
    title: 'The Synthezoid Reborn',
    character: 'White Vision / Spectral Vision',
    actor: 'Paul Bettany',
    category: 'avengers',
    categoryLabel: 'SYNTHETIC ALLIES',
    imageUrl: '/assets/posters/poster-vision.jpg',
    tagline: 'MEMORY OF A GHOST',
    description: 'Synthesizing the memories of the Ship of Theseus, Vision restores his heroic green and gold mantle to confront his mechanical creator Ultron.',
    releaseDate: 'DECEMBER 17, 2026'
  }
];
