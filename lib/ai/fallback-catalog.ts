import { NatureIdentification, NatureCategory } from "../validation/schema";

export interface SpeciesProfile {
  name: string;
  scientificName: string;
  category: NatureCategory;
  description: string;
  interestingFact: string;
  observationTip: string;
  keywords: string[];
  safety: {
    level: "safe" | "caution" | "danger";
    warning: string;
    advice: string;
  } | null;
  challenge: {
    title: string;
    instruction: string;
    durationMinutes: number;
    rewardXp: number;
    safetyReminder: string;
  };
}

export const NATURE_CATALOG: SpeciesProfile[] = [
  {
    name: "Corpse Flower (Rafflesia)",
    scientificName: "Rafflesia arnoldii",
    category: "Flower",
    description:
      "A rare, gigantic parasitic flowering plant renowned for producing the largest single flower in the world, with thick, fleshy red-and-white spotted lobes.",
    interestingFact:
      "Rafflesia has no true roots, stems, or leaves — it lives completely concealed inside tropical vines until a massive, cabbage-sized bud emerges and bursts into bloom.",
    observationTip:
      "Notice the five immense leathery petals dotted with pale, wart-like blotches and the deep central diaphragm well.",
    keywords: ["rafflesia", "corpse", "corpse flower", "red spotted", "giant flower", "arnoldii", "padma", "parasitic flower", "spotted flower", "fleshy flower"],
    safety: {
      level: "caution",
      warning: "Rare and protected rainforest organism",
      advice: "Do not touch or tread near the flower or surrounding vines. It produces a strong scent of decaying meat to attract pollinators.",
    },
    challenge: {
      title: "Symbiotic & Epiphytic Plant Hunt",
      instruction:
        "Put your phone away and search nearby trees for a plant that grows on another plant (such as mistletoe, moss, epiphytic orchids, or climbing ivy).",
      durationMinutes: 5,
      rewardXp: 50,
      safetyReminder: "Admire epiphytes from the ground; do not pull on tree branches.",
    },
  },
  {
    name: "Peepal Tree (Sacred Fig)",
    scientificName: "Ficus religiosa",
    category: "Tree",
    description:
      "A large dry season-deciduous or semi-evergreen tree with distinct heart-shaped leaves that flutter in gentle breezes.",
    interestingFact:
      "Peepal trees can release oxygen even during nighttime due to Crassulacean Acid Metabolism (CAM), making them ecologically vital urban canopy trees.",
    observationTip:
      "Look closely at the leaf apex: notice the elongated 'drip tip' that quickly channels rain away.",
    keywords: ["peepal", "ficus", "heart", "tree", "fig", "drip tip", "sacred fig"],
    safety: null,
    challenge: {
      title: "Leaf Silhouette Quest",
      instruction:
        "Put your phone away and search for another tree nearby whose leaves have a completely different shape (e.g. needle-like or lobed).",
      durationMinutes: 5,
      rewardXp: 50,
      safetyReminder: "Stay on public footpaths and avoid thorny undergrowth.",
    },
  },
  {
    name: "Neem Tree",
    scientificName: "Azadirachta indica",
    category: "Tree",
    description:
      "A fast-growing evergreen mahogany family tree with serrated pinnate leaflets, celebrated across traditional medicine for insecticidal and antimicrobial properties.",
    interestingFact:
      "Azadirachtin extracted from neem leaves and seeds disrupts insect hormones without harming beneficial pollinators like honeybees.",
    observationTip:
      "Observe the serrated margins along the curved sickle-shaped leaflets and crush a fallen leaf to smell its sharp herbal aroma.",
    keywords: ["neem", "azadirachta", "bitter", "medicinal", "compound leaf"],
    safety: null,
    challenge: {
      title: "Bark Texture Rubbing",
      instruction:
        "Find two trees with contrasting bark textures (one deeply fissured, one smooth). Touch both with your eyes closed for 15 seconds.",
      durationMinutes: 4,
      rewardXp: 50,
      safetyReminder: "Do not peel live bark off healthy trees.",
    },
  },
  {
    name: "Banyan Tree",
    scientificName: "Ficus benghalensis",
    category: "Tree",
    description:
      "An immense strangler fig renowned for sprawling aerial prop roots that grow downward into secondary trunks.",
    interestingFact:
      "A single mature Banyan tree can canopy over an entire acre, creating a micro-forest sustaining hundreds of avian and insect species.",
    observationTip:
      "Inspect the fibrous aerial roots hanging from high branches to see how they anchor into the soil.",
    keywords: ["banyan", "aerial roots", "prop roots", "strangler", "giant tree"],
    safety: null,
    challenge: {
      title: "Canopy Shadow Walk",
      instruction:
        "Pace out the circumference of the tree's shadow on the ground to estimate its true canopy footprint.",
      durationMinutes: 5,
      rewardXp: 50,
      safetyReminder: "Watch your footing around exposed roots and rocky ground.",
    },
  },
  {
    name: "French Marigold",
    scientificName: "Tagetes patula",
    category: "Flower",
    description:
      "A resilient annual flower with vibrant yellow, orange, and bronze composite flower heads and deeply divided aromatic foliage.",
    interestingFact:
      "Marigold roots release alpha-terthienyl, a compound that deters harmful nematodes and garden pests naturally.",
    observationTip:
      "Examine the composite bloom: what looks like one flower is actually dozens of tiny ray and disc florets working in unison.",
    keywords: ["marigold", "orange flower", "yellow flower", "tagetes", "garden bloom"],
    safety: null,
    challenge: {
      title: "Color Spectrum Hunt",
      instruction:
        "Put your phone away and search the outdoor perimeter for a wild petal with an opposite color temperature (cool purple or blue).",
      durationMinutes: 5,
      rewardXp: 50,
      safetyReminder: "Admire blooms in place without picking wild flora.",
    },
  },
  {
    name: "Shoeblackplant (Hibiscus)",
    scientificName: "Hibiscus rosa-sinensis",
    category: "Flower",
    description:
      "A tropical evergreen shrub boasting conspicuous, trumpet-shaped five-petaled blossoms with prominent staminal columns.",
    interestingFact:
      "The prominent staminal column fuses male filaments around the female pistil to optimize pollen transfer onto pollinating bird beaks.",
    observationTip:
      "Look at the red pistil extending far beyond the petals with five velvety stigma pads awaiting pollen.",
    keywords: ["hibiscus", "tropical flower", "trumpet", "staminal column", "red flower"],
    safety: null,
    challenge: {
      title: "Pollinator Pathway Watch",
      instruction:
        "Stand 6 feet away from the shrub and observe for 2 minutes without moving to see what insects visit the blossom.",
      durationMinutes: 3,
      rewardXp: 50,
      safetyReminder: "Do not disturb feeding bees or wasps.",
    },
  },
  {
    name: "Holy Basil (Tulsi)",
    scientificName: "Ocimum tenuiflorum",
    category: "Plant",
    description:
      "An aromatic perennial herbaceous plant with square stems, purplish leaves, and strongly fragrant floral spikes.",
    interestingFact:
      "Rich in eugenol and linalool, Tulsi has been cultivated across Asia for thousands of years as an adaptogenic healing herb.",
    observationTip:
      "Gently roll the square stem between two fingers to feel its distinctive 4-sided angular cross-section.",
    keywords: ["tulsi", "holy basil", "aromatic", "square stem", "herbal plant"],
    safety: null,
    challenge: {
      title: "Herbal Scent Blind Test",
      instruction:
        "Close your eyes, cup your hands over the leaves, and inhale deeply. Notice how many subtle aroma notes you can discern.",
      durationMinutes: 3,
      rewardXp: 50,
      safetyReminder: "Do not harvest or ingest leaves from unknown plants in urban areas.",
    },
  },
  {
    name: "Indian Robin",
    scientificName: "Copsychus fulicatus",
    category: "Bird",
    description:
      "A small, energetic insect-eating songbird frequently seen foraging on the ground with its tail cocked vertically.",
    interestingFact:
      "Males feature midnight black plumage with a chestnut undertail coverts, whereas females are soft earth-brown for nesting camouflage.",
    observationTip:
      "Watch for its sharp, twitching tail flicks whenever it pauses between hops.",
    keywords: ["robin", "bird", "cocked tail", "passerine", "songbird", "copsychus"],
    safety: null,
    challenge: {
      title: "Silent Birdsong Listener",
      instruction:
        "Remain motionless for 45 seconds and count how many different bird vocalizations you hear in the surrounding trees.",
      durationMinutes: 3,
      rewardXp: 50,
      safetyReminder: "Keep a distance of at least 15 feet to respect avian foraging territory.",
    },
  },
  {
    name: "Plain Tiger Butterfly",
    scientificName: "Danaus chrysippus",
    category: "Insect",
    description:
      "A widely distributed medium-sized milkweed butterfly with vivid tawny orange wings, bordered by dark chocolate margins and white spots.",
    interestingFact:
      "Larvae accumulate toxic cardenolides from host milkweeds, rendering adult butterflies unpalatable to predatory birds.",
    observationTip:
      "Notice its effortless, unhurried gliding motion — confident in its natural warning coloration.",
    keywords: ["butterfly", "tiger butterfly", "wings", "monarch", "insect", "chrysippus"],
    safety: null,
    challenge: {
      title: "Flutter Tracker",
      instruction:
        "Follow the flight trajectory of the next winged insect you see until it lands. Observe which plant it chooses.",
      durationMinutes: 4,
      rewardXp: 50,
      safetyReminder: "Do not attempt to catch or touch insect wings.",
    },
  },
  {
    name: "Western Honeybee",
    scientificName: "Apis mellifera",
    category: "Insect",
    description:
      "The premier social pollinator, featuring striped golden-amber and black abdomens with specialized pollen baskets on rear legs.",
    interestingFact:
      "Foragers communicate the direction and distance of floral nectar sources to hive mates using the intricate 'waggle dance'.",
    observationTip:
      "Observe the bright yellow pollen baskets (corbiculae) packed tightly onto their hind legs.",
    keywords: ["bee", "honeybee", "apis", "pollinator", "pollen basket"],
    safety: {
      level: "caution",
      warning: "Can sting if swatted, cornered, or near a nest.",
      advice: "Maintain a calm distance of 3-5 feet. Avoid sudden swatting motions.",
    },
    challenge: {
      title: "Floral Foraging Count",
      instruction:
        "Count how many individual flower heads one pollinator visits within 60 seconds without stepping closer.",
      durationMinutes: 3,
      rewardXp: 50,
      safetyReminder: "Do not touch, trap, or provoke stinging insects.",
    },
  },
  {
    name: "Wild Oyster Mushroom",
    scientificName: "Pleurotus ostreatus",
    category: "Mushroom",
    description:
      "A common edible gilled fungus that forms shelf-like clusters on decaying hardwood trees and fallen logs.",
    interestingFact:
      "Oyster mushrooms are carnivorous fungi: their mycelium secretes nematotoxins to paralyze and digest soil nematodes for nitrogen.",
    observationTip:
      "Examine the decurrent gills running seamlessly down into the stubby off-center stem.",
    keywords: ["mushroom", "fungus", "oyster mushroom", "shelf", "gills", "bracket"],
    safety: {
      level: "danger",
      warning: "AI identification is NOT biological verification. Never ingest wild mushrooms.",
      advice: "Never forage, touch, or ingest wild fungi based on an app. Many deadly toxic mushrooms closely resemble edible ones.",
    },
    challenge: {
      title: "Decomposer Detective",
      instruction:
        "Look around the ground or dead logs for signs of fungal decomposition: find a fallen twig showing wood rot.",
      durationMinutes: 4,
      rewardXp: 50,
      safetyReminder: "DO NOT TOUCH OR TASTE any wild mushroom.",
    },
  },
  {
    name: "Weathered Granite Boulder",
    scientificName: "Granitic Plutonic Rock",
    category: "Rock",
    description:
      "A coarse-grained intrusive igneous rock composed of interlocking crystals of quartz, feldspar, and biotite mica.",
    interestingFact:
      "Granite forms deep underground as molten magma cools slowly over millions of years, enabling visible mineral crystals to grow.",
    observationTip:
      "Spot the glassy transparent grains (quartz), pale blocky grains (feldspar), and shimmering dark flakes (biotite mica).",
    keywords: ["rock", "stone", "granite", "quartz", "mineral", "boulder", "pebble"],
    safety: null,
    challenge: {
      title: "Geology Crystal Hunter",
      instruction:
        "Find another rock nearby and compare mineral grain sizes: is it fine-grained like basalt or crystalline like granite?",
      durationMinutes: 4,
      rewardXp: 50,
      safetyReminder: "Do not lift heavy rocks that could pinch fingers or disrupt sheltering wildlife.",
    },
  },
];

export function findMatchingProfile(hint: string): SpeciesProfile {
  const lower = hint.toLowerCase();
  for (const profile of NATURE_CATALOG) {
    if (
      profile.keywords.some((kw) => lower.includes(kw)) ||
      lower.includes(profile.name.toLowerCase()) ||
      lower.includes(profile.category.toLowerCase())
    ) {
      return profile;
    }
  }

  // Fallback to random or primary entry
  return NATURE_CATALOG[0];
}
