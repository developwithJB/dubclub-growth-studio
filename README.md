# DubClub Growth Studio

From raw capper signal to subscriber action.

[Live demo](https://developwithjb.github.io/dubclub-growth-studio/)

DubClub Growth Studio is a mobile-first founder-demo prototype for an AI-assisted creator growth workflow. It helps sports betting creators turn raw pick shorthand into structured play cards, multi-channel subscriber content, fan-facing updates, and lightweight performance insight.

The capper remains the source of truth. Growth Studio does not make picks, place bets, integrate with sportsbooks, or act as an odds engine. It improves structure, clarity, distribution, and learning around the capper's own signal.

## Product Thesis

DubClub already helps cappers monetize and distribute plays. Growth Studio moves one step upstream by helping creators prepare higher-quality posts before they reach subscribers.

The bet is not that AI helps cappers make better picks. The bet is that structured publishing helps cappers publish faster, fans act with more trust, and DubClub gets cleaner data for notifications, tailing, recaps, retention, and creator coaching.

## Core Flow

1. **Studio**  
   Turn messy capper shorthand into a structured play review.

2. **Growth Pack**  
   Convert one structured play into a DubClub post, push notification, X teaser, Discord/SMS blurb, responsible play note, audience segment, send time, and business goal.

3. **Trust Inbox**  
   Show how subscribers receive structured plays and tail publishable picks.

4. **Insights**  
   Close the loop with creator performance metrics and next-action coaching.

## Publishability Gate

The prototype uses a simple local rule:

```ts
qualityScore >= 70
```

Publishable plays can enter the Growth Pack and Trust Inbox. Low-quality or hype-heavy drafts are held before fan delivery.

The default Brunson example is publishable. The Lakers "Hammer... Lock" example is intentionally held because it lacks unit size, price, opponent, reasoning, and a playable-to number.

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- Local state only
- Mock data only
- Deterministic local generation functions

No backend, auth, external APIs, live AI calls, sportsbook integrations, or odds infrastructure are included.

## AI-Assisted Development

This prototype was built quickly with Codex, iterating through product framing, UI structure, state management, and demo reliability.

The AI behavior is intentionally mocked with deterministic local functions instead of live model calls. That keeps the demo reliable, lightweight, and focused on the product workflow rather than API setup.

In production, the mocked generation layer would become an LLM-backed extraction and drafting system with schema validation, confidence scoring, capper review, and audit trails before publishing.

## Run Locally

```bash
npm install
npm run dev
```

Build check:

```bash
npm run build
```

## Demo Path

1. Open Studio.
2. Generate the default Brunson structured play.
3. Review the quality score, missing details, risk flag, and human review note.
4. Open Growth Pack and show the generated channel assets.
5. Open Trust Inbox and tail the Brunson play.
6. Open Insights and show the performance loop.
7. Return to Studio, generate the hype-heavy Lakers example, and show that Growth Studio holds the draft before fan delivery.

## Full Overview

See [EXECUTIVE_OVERVIEW.md](./EXECUTIVE_OVERVIEW.md) for the deeper product and technical explanation.
