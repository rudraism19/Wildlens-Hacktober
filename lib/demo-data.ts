import { NatureIdentification } from "./validation/schema";

export interface DemoItem {
  id: string;
  thumbnail: string;
  image: string;
  data: NatureIdentification;
}

export const DEMO_DISCOVERIES: DemoItem[] = [
  {
    id: "demo-peepal-tree",
    thumbnail: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=600&q=80",
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1200&q=80",
    data: {
      name: "Peepal Tree",
      scientificName: "Ficus religiosa",
      category: "Tree",
      confidence: 0.94,
      description:
        "A magnificent sacred fig tree native to the Indian subcontinent, renowned for distinct cordate (heart-shaped) leaves with elongated drip tips that dance in the gentlest breeze.",
      interestingFact:
        "Peepal trees can release oxygen even during nighttime due to Crassulacean Acid Metabolism (CAM), making them ecologically vital urban canopy trees.",
      observationTip:
        "Look closely at the leaf apex: notice how the elongated 'drip tip' channels monsoonal rain droplets away from the blade surface.",
      safety: null,
      challenge: {
        title: "Leaf Silhouette Quest",
        instruction:
          "Put your phone away and search for another tree nearby whose leaves have a completely different shape (e.g. needle-like or lobed).",
        category: "Tree",
        rewardXp: 50,
        durationMinutes: 5,
        safetyReminder: "Stay on public footpaths and avoid thorny undergrowth.",
      },
      modelUsed: "Gemma 2 Open-Weight",
      provider: "gemma",
      isDemo: true,
    },
  },
  {
    id: "demo-indian-robin",
    thumbnail: "https://images.unsplash.com/photo-1522926197415-e6a0a323f136?auto=format&fit=crop&w=600&q=80",
    image: "https://images.unsplash.com/photo-1522926197415-e6a0a323f136?auto=format&fit=crop&w=1200&q=80",
    data: {
      name: "Indian Robin",
      scientificName: "Copsychus fulicatus",
      category: "Bird",
      confidence: 0.91,
      description:
        "A sprightly, curious passerine bird commonly spotted foraging on open scrublands, stones, and garden lawns, often cocking its tail vertically upright.",
      interestingFact:
        "The male has glossy black plumage with a chestnut-colored vent and distinct white shoulder patches revealed primarily during flight.",
      observationTip:
        "Observe its jerky tail-cocking motion — notice how it pauses between hops to survey ground insects.",
      safety: null,
      challenge: {
        title: "Silent Birdsong Listener",
        instruction:
          "Stand completely still for 45 seconds, close your eyes, and identify at least two distinct avian calls in your surroundings.",
        category: "Bird",
        rewardXp: 50,
        durationMinutes: 3,
        safetyReminder: "Keep a respectful distance (at least 15 feet) so as not to disturb nesting territory.",
      },
      modelUsed: "Gemma 2 Open-Weight",
      provider: "gemma",
      isDemo: true,
    },
  },
  {
    id: "demo-butterfly",
    thumbnail: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=600&q=80",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1200&q=80",
    data: {
      name: "Plain Tiger Butterfly",
      scientificName: "Danaus chrysippus",
      category: "Insect",
      confidence: 0.89,
      description:
        "A medium-sized, strikingly marked brush-footed butterfly with bright tawny orange wings bordered in black with white apical spots.",
      interestingFact:
        "Because its caterpillars feed on milkweed containing toxic cardiac glycosides, adults taste unpleasant to predators — an evolutionary defense called aposematism.",
      observationTip:
        "Watch its slow, buoyant, unhurried gliding flight pattern; it flies calmly because predators know its bright orange warning coloration.",
      safety: null,
      challenge: {
        title: "Pollinator Patience Walk",
        instruction:
          "Find a flowering shrub or garden bed. Put your phone in your pocket and observe which color blossoms pollinators visit most frequently.",
        category: "Insect",
        rewardXp: 50,
        durationMinutes: 4,
        safetyReminder: "Never attempt to grab or trap insects; admire their pollination role freely.",
      },
      modelUsed: "Gemma 2 Open-Weight",
      provider: "gemma",
      isDemo: true,
    },
  },
  {
    id: "demo-marigold",
    thumbnail: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=1200&q=80",
    data: {
      name: "French Marigold",
      scientificName: "Tagetes patula",
      category: "Flower",
      confidence: 0.95,
      description:
        "An aromatic flowering herbaceous plant celebrated for dense, warm golden-orange composite flower heads with velvety textured petals.",
      interestingFact:
        "Roots of marigolds exude alpha-terthienyl, a natural nematicide that repels harmful root-knot nematodes in companion planting.",
      observationTip:
        "Gently brush your fingers past the feather-divided leaves and sniff your fingertips — notice the distinctive pungent herbal scent.",
      safety: null,
      challenge: {
        title: "Color Spectrum Hunt",
        instruction:
          "Search the immediate outdoor perimeter for a wild flower or petal with a contrasting hue (cool blue, purple, or pure white).",
        category: "Flower",
        rewardXp: 50,
        durationMinutes: 5,
        safetyReminder: "Do not pluck flowers in public parks or nature preserves. Appreciate them in place.",
      },
      modelUsed: "Gemma 2 Open-Weight",
      provider: "gemma",
      isDemo: true,
    },
  },
];
