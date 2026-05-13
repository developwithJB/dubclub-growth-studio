# DubClub Growth Studio

From raw capper signal to subscriber action.

[Live demo](https://developwithjb.github.io/dubclub-growth-studio/)

DubClub Growth Studio is a mobile-first founder-demo prototype for an AI-assisted creator growth workflow. It helps sports betting creators turn raw pick shorthand into structured play reviews, multi-channel growth assets, fan-facing updates, and lightweight performance insight.

The capper remains the source of truth. Growth Studio does not make picks, place bets, integrate with sportsbooks, or act as an odds engine. It improves structure, clarity, distribution, and learning around the capper's own signal.

## Product Thesis

DubClub already helps cappers monetize and distribute plays. Growth Studio moves one step upstream by helping creators prepare higher-quality posts before they reach subscribers.

The bet is not that AI helps cappers make better picks. The bet is that structured publishing helps cappers publish faster, fans act with more trust, and DubClub gets cleaner data for notifications, tailing, recaps, retention, and creator coaching.

## Current Demo Flow

1. **Studio**  
   Choose one of four read-only event-backed sample signals, generate a structured play review, then approve publishable reviews into Growth Pack.

2. **Growth Pack**  
   Convert one approved play into channel-ready assets for DubClub, push, X, Discord/SMS, YouTube Shorts, IG/TikTok, and audio.

3. **Trust Inbox**  
   Show how subscribers receive structured plays, confirm the line, and tail only publishable picks.

4. **Insights**  
   Close the loop with mock creator performance metrics, channel performance, and next-action coaching.

## Studio Samples

The prototype uses real event context with mocked pick lines and mocked AI behavior:

- **NBA Playoff Sample**: San Antonio at Minnesota, Game 6, Friday, May 15, 2026.
- **WNBA Sample**: Minnesota Lynx at Dallas Wings, Thursday, May 14, 2026.
- **NHL Playoff Sample**: Vegas Golden Knights at Anaheim Ducks, Game 6, Thursday, May 14, 2026.
- **Held MLB Hype Draft**: San Francisco Giants at Los Angeles Dodgers, Thursday, May 14, 2026.

Event schedules are used for demo context only. Pick lines, reasoning, quality scores, and generated content are deterministic mock data.

## Publishability Gate

The prototype uses a simple local rule:

```ts
qualityScore >= 70
```

Publishable plays show an `Approve & Build Growth Pack` action. Low-quality or hype-heavy drafts are held before Growth Pack delivery, Trust Inbox delivery, and fan tailing.

The MLB Dodgers hype draft is intentionally held because it lacks unit size, price, starting-pitcher context, reasoning, and a playable-to number.

## What The Prototype Demonstrates

- AI-assisted structuring without AI-generated picks.
- Human-in-the-loop capper review before distribution.
- A clear path from review approval into multi-channel growth assets.
- Fan-facing trust cards that only expose publishable plays.
- Channel-level growth thinking across text, audio, and short-form video.
- Strategic restraint: no backend, no auth, no sportsbook integrations, and no live odds infrastructure.

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

## Recommended Live Path

1. Open Studio.
2. Generate the NBA Playoff sample.
3. Review the quality score, event details, missing details, and risk flag.
4. Click `Approve & Build Growth Pack`.
5. Filter Growth Pack by short-form or audio to show multi-channel actionability.
6. Open Trust Inbox and tail a publishable play.
7. Open Insights and show the creator performance loop.
8. Return to Studio, generate the Held MLB Hype Draft, and show that Growth Studio blocks incomplete/hype-heavy content before fan delivery.

## Full Overview

See [EXECUTIVE_OVERVIEW.md](./EXECUTIVE_OVERVIEW.md) for the deeper product and technical explanation.
