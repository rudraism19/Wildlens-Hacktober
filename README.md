# WildLens 🌿
### AI-Powered Nature Exploration for the "Touch Grass" Challenge

> **“AI should make you curious about the real world, not keep you staring at a screen.”**
>
> *See nature. Understand it. Then put your phone away.*

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Gemma](https://img.shields.io/badge/Google-Gemma_2_Open--Weight-emerald?style=flat&logo=google)](https://ai.google.dev/gemma)
[![Gemini](https://img.shields.io/badge/Google-Gemini_1.5_Flash-blue?style=flat&logo=googlegemini)](https://ai.google.dev/)
[![PWA](https://img.shields.io/badge/PWA-Offline--First-orange?style=flat)](https://web.dev/progressive-web-apps/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Forest_Theme-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)

---

## 🌲 What is WildLens?

**WildLens** is an open-weight AI outdoor exploration companion built to address modern digital fatigue. Unlike generic chatbots or commercial plant identification apps that incentivize infinite scrolling, WildLens is engineered around a single physical loop:

$$\text{User Goes Outside} \longrightarrow \text{Camera Snapshot} \longrightarrow \text{Gemma AI Taxonomy} \longrightarrow \text{Quick Scientific Insight} \longrightarrow \mathbf{Phone\ In\ Pocket} \longrightarrow \text{Real-World Exploration Quest} \longrightarrow \text{Nature XP}$$

The app intentionally makes screen interaction as short and impactful as possible. Once an organism is identified, WildLens issues a safe physical quest (such as *"Close your eyes for 45 seconds and count bird calls"* or *"Find another tree with a contrasting leaf shape"*) and prompts the user to pocket their phone.

---

## 🚀 Key Problems & The WildLens Solution

| Problem in Current Nature Apps | WildLens Solution |
| :--- | :--- |
| **Endless Screen Scrolling** | **"Put Phone Away" Design**: Screens are short interaction points that trigger real-world sensory exploration. |
| **Cellular Deadzones in Nature** | **Offline-First PWA & IndexedDB**: Real forests lack 5G towers. Discoveries, local Gemma pipeline, and quests work with zero connection. |
| **Closed Proprietary Model Lock-in** | **Open-Weight Gemma First**: Built on Google's open-weight Gemma models with a provider abstraction for user freedom. |
| **Privacy Concerns with Geo-photos** | **Zero Telemetry / On-Device Preference**: Nature photos process locally when configured, with no mandatory accounts or tracking. |
| **Overconfidence & Toxic Foraging Risks** | **Conservative Epistemic Humility**: Never claims absolute certainty. Labels outputs *"Likely Peepal Tree"*, flags dangerous mushrooms/plants with biological disclaimers. |

---

## 🏛️ System Architecture

WildLens employs a clean provider abstraction (`AIProvider`) decoupling the user experience from the inference backend:

```mermaid
flowchart TD
    A["📷 Camera / Drag & Drop Image"] --> B["WildLens Viewfinder"]
    B --> C{"AI Provider Router"}
    
    subgraph OpenWeight ["Open-Weight & Local Tier"]
        C -->|"Default / Offline"| D["Gemma 2 Open-Weight"]
        D --> D1["Vision Feature Extraction"]
        D1 --> D2["Gemma Botanical Reasoning Engine"]
    end

    subgraph CloudTier ["Cloud Multimodal Tier"]
        C -->|"Cloud Toggle / API Configured"| E["Gemini 1.5 Flash API"]
        E --> E1["Server-side Secure Route /api/analyze"]
    end

    D2 --> F["Strict Zod Schema Validation"]
    E1 --> F
    
    F --> G["Nature Identification Card"]
    G --> H["Observation Tip ('Look Closer')"]
    G --> I["Ecological Fact ('Did You Know?')"]
    G --> J["Real-World Outdoor Challenge"]
    
    J --> K["📴 Put Phone Away Modal & Timer"]
    K --> L["User Explores Real World"]
    L --> M["+50 Nature XP Earned"]
    M --> N["IndexedDB Nature Passport Field Journal"]
```

---

## 🧠 Gemma Integration & Open-Weight Story

Google's **Gemma** open-weight model family is central to WildLens:

1. **Two-Stage Open-Weight Pipeline**:
   - **Stage 1: Vision Feature Extraction**: Analyzes dominant spectral signatures, edge frequencies, and botanical morphological profiles from raw pixel buffers.
   - **Stage 2: Gemma Structured Reasoning Engine**: Maps extracted characteristics to ecological taxonomy, generates verifiable physical observation tips, and crafts safe outdoor challenges.
2. **Endpoint Extensibility**:
   - WildLens connects directly to remote Gemma endpoints (`GEMMA_ENDPOINT_URL`), Hugging Face Inference (`google/gemma-2-9b-it`, `google/paligemma-3b-pt-448`), or local Ollama instances (`gemma2:9b`).
3. **Gemini Fallback**:
   - When configured with `GEMINI_API_KEY`, Google's `Gemini 1.5 Flash` provides cloud multimodal analysis. Secret keys are strictly quarantined in server-side Next.js route handlers (`/api/analyze` and `/api/challenge`) and never exposed in client bundles.
4. **Epistemic Humility**:
   - The model never claims omniscient certainty. Probabilistic language like *"Likely Indian Peepal"* (92% confidence) ensures biological accuracy and safety.

---

## 📴 Offline-First Resilience

Outdoor environments frequently have weak or non-existent cellular reception. WildLens treats offline operation as a first-class citizen:

- **Service Worker (`public/sw.js`)**: Caches critical UI shells, scripts, styles, and demo assets for offline loading.
- **IndexedDB Storage (`lib/storage/db.ts`)**: Persists the entire Nature Passport, user streak, total XP, and outdoor sessions locally.
- **Offline Banner**: Automatically detects network state transitions and clearly informs users:
  ```text
  OFFLINE MODE
  Your discoveries and challenges will continue to work locally.
  AI identification may be limited depending on the installed model.
  ```

---

## 🎮 Nature XP & Gamification

WildLens incorporates intentional, non-addictive gamification that rewards outdoor activity rather than screen engagement:

### XP Actions:
- **Identify Species**: `+25 XP`
- **Complete Challenge**: `+50 XP`
- **10-Minute Nature Session**: `+25 XP`
- **30-Minute Nature Session**: `+100 XP`
- **Discover New Category**: `+40 XP`

### Nature Levels:
- **Level 1 — Seedling** (0–99 XP)
- **Level 2 — Explorer** (100–249 XP)
- **Level 3 — Trail Seeker** (250–499 XP)
- **Level 4 — Naturalist** (500–999 XP)
- **Level 5 — Wild Guardian** (1000+ XP)

---

## 📱 Features Walkthrough

1. **Camera Scanner**:
   - Full-bleed mobile viewfinder with hardware camera flip (front/back).
   - Desktop drag-and-drop & gallery picker.
   - Subtle scanning sweep animation (no fake progress bars).
2. **Instant Demo Mode**:
   - Includes 4 curated discoveries (**Peepal Tree**, **Indian Robin**, **Plain Tiger Butterfly**, **French Marigold**) for instant testing without camera permissions or API keys.
3. **Nature Passport**:
   - Field journal cards featuring high-res imagery, taxonomic classification, confidence ratings, and quest completion seals.
   - Category filtering across 8 kingdoms/domains: *Trees, Plants, Flowers, Birds, Insects, Animals, Mushrooms, Rocks*.
4. **Nature Session Tracker**:
   - Dedicated outdoor timer tracking session duration, species found, and completed challenges.
   - Optional, privacy-preserving GPS distance tracking (strictly local, opt-in).
5. **Safety Architecture**:
   - Prominent cautionary alerts for fungi, stinging insects, and unfamiliar flora.
   - Global disclaimer: *"WildLens provides AI-assisted identification, not professional biological advice. Never ingest wild mushrooms or plants."*

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Actions, Route Handlers)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom Forest/Moss/Sage color system
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://motion.dev/) & Canvas Confetti
- **Validation**: [Zod](https://zod.dev/)
- **Local Database**: [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) via `idb`
- **AI Ecosystem**:
  - Google [Gemma](https://ai.google.dev/gemma) Open-Weight Models
  - Google [Gemini API](https://ai.google.dev/) via `@google/generative-ai`

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Configure your parameters:

```env
# Google Gemini API Key (Server-side only — never exposed to client)
GEMINI_API_KEY=your_api_key_here

# Default AI provider mode ("gemma" | "gemini")
NEXT_PUBLIC_AI_MODE=gemma

# Application Name
NEXT_PUBLIC_APP_NAME=WildLens

# Optional Gemma Endpoint (Hugging Face / Ollama / Local GPU)
GEMMA_ENDPOINT_URL=
GEMMA_API_TOKEN=
```

> **Note**: WildLens functions immediately out of the box using the local Gemma pipeline and Demo Discoveries even without an external API key!

---

## 💻 Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rudraism19/Wildlens-Hacktober.git
   cd Wildlens-Hacktober
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

5. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🔒 Privacy Guarantee

WildLens is built on a **privacy-first foundation**:
- No user account creation or tracking cookies required.
- Nature photos remain on device when local inference is used.
- Geolocation tracking is strictly opt-in and kept inside the local browser's memory.
- No personal data or telemetry is sold or transmitted to third-party ad networks.

---

## 📄 License & Attribution

Built for the **Touch Grass** Hackathon Challenge 2026.
Licensed under the [Apache 2.0 License](LICENSE).