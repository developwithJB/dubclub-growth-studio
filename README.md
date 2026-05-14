# DubClub Growth Studio

From raw capper signal to subscriber action.

[Live demo](https://developwithjb.github.io/dubclub-growth-studio/)

DubClub Growth Studio is a mobile-first founder-demo prototype for an AI-assisted creator growth workflow. It helps sports betting creators turn raw pick shorthand into structured play reviews, multi-channel growth assets, fan-facing updates, and lightweight performance insight.

The capper remains the source of truth. Growth Studio does not make picks, place bets, integrate with sportsbooks, or act as an odds engine. It improves structure, clarity, distribution, and learning around the capper's own signal.

## Product Thesis

DubClub already helps cappers monetize and distribute plays. Growth Studio moves one step upstream by helping creators prepare higher-quality posts before they reach subscribers.

The bet is not that AI helps cappers make better picks. The bet is that structured publishing helps cappers publish faster, fans act with more trust, and DubClub gets cleaner data for notifications, tailing, recaps, retention, and creator coaching.

## Short Review Guide For FirstBasketMan

Review this through the lens of a capper who has already sold on DubClub:

- **Studio**: starts with how cappers actually work: shorthand, sheet-style model outputs, line sensitivity, unit size, and risk notes. The AI does not make the pick; it turns the capper's own signal into a reviewable card or slate.
- **Growth Pack**: makes approved plays useful across DubClub, push, X, Discord/SMS, short-form video, and audio. The AI Agent Layer applies social clip formats to the structured play instead of copying another capper's content.
- **Capper Feed**: shows the subscriber experience: clean cards, capper proof, playable-to number, responsible-play reminder, and `Tail Pick`.
- **Insights**: shows the business loop: what drove opens, tails, saves, replies, short-form views, audio completion, and capper behavior trends.
- **Guardrail**: the held MLB hype draft shows the trust logic. Incomplete or hype-heavy content is blocked before it reaches fans.

The core question: would this help a real capper publish faster, look more professional, protect subscriber trust, and learn what actually drives paid fan action?

## Current Demo Flow

1. **Studio**  
   Choose one of four read-only event-backed sample signals, generate a structured play review, then approve publishable reviews into Growth Pack.

2. **Growth Pack**  
   Convert one approved play into channel-ready assets for DubClub, push, X, Discord/SMS, YouTube Shorts, IG/TikTok, and audio. A mocked AI Agent Layer can package the play into static creative concepts using template style and social clip format controls.

3. **Capper Feed**  
   Subscribers receive structured plays, review capper proof, confirm the line, open DubClub-style capper detail pages, and tail only publishable picks.

4. **Insights**  
   Close the loop with mock creator performance metrics, channel performance, and next-action coaching.

## Studio Samples

The prototype uses real event context with mocked pick lines and mocked AI behavior:

- **NBA Playoff Sample**: San Antonio at Minnesota, Game 6, Friday, May 15, 2026.
- **NHL Playoff Sample**: Vegas Golden Knights at Anaheim Ducks, Game 6, Thursday, May 14, 2026.
- **FirstBasketMan Sheet Sample**: a FirstBasketMan-style WNBA sheet with two mocked longshot positions: `LVA - A'ja Wilson +500 FD .25u` and `ATL - Angel Reese +600 DK .2u`.
- **Held MLB Hype Draft**: San Francisco Giants at Los Angeles Dodgers, Thursday, May 14, 2026.

Event schedules are used for demo context only. Pick lines, reasoning, quality scores, and generated content are deterministic mock data.

## Publishability Gate

The prototype uses a simple local rule:

```ts
qualityScore >= 70
```

Publishable plays show an `Approve & Build Growth Pack` action. Low-quality or hype-heavy drafts are held before Growth Pack delivery, Capper Feed delivery, and fan tailing.

The MLB Dodgers hype draft is intentionally held because it lacks unit size, price, starting-pitcher context, reasoning, and a playable-to number.

## What The Prototype Demonstrates

- AI-assisted structuring without AI-generated picks.
- Human-in-the-loop capper review before distribution.
- A clear path from review approval into multi-channel growth assets.
- Fan-facing capper cards that pair publishable plays with proof metadata and tail actions.
- Real team logos and player headshots in play cards for faster scanning.
- Channel-level growth thinking across text, audio, and short-form video.
- Mocked AI Agent creative packaging for YouTube Shorts, IG/TikTok, and audio reads.
- DubClub-inspired capper profile cards and detail pages using branded profile patterns.
- Sheet-style slate parsing that can package multiple plays into one review and one Growth Pack.
- Capper behavior insights such as plays by league, team, player, market, book, best post time, and subscriber response.
- Strategic restraint: no backend, no auth, no sportsbook integrations, and no live odds infrastructure.

## Product Boundaries And Next Steps

Intentional tradeoffs:

- Avoided live odds infrastructure.
- Avoided sportsbook integrations.
- Avoided automated betting.
- Used mocked data to keep the prototype lightweight.
- Focused upstream on structured publishing because that improves tailing, recaps, notifications, and analytics later.

What I would improve next:

- Connect to real DubClub publishing channels.
- Add capper-specific voice and templates.
- Add schema validation before publish.
- Add post-game recap generation.
- Connect performance data back into creator coaching.
- Explore integration with existing DubClub AI/analytics surfaces.

## AI Agent Layer

Growth Pack includes a local, deterministic AI Agent Layer that demonstrates how DubClub could help cappers become stronger creator-operators.

The agent can:

- Generate static creative concepts for YouTube Shorts, IG/TikTok, and audio reads.
- Use template styles such as `Proof-first`, `Sharp breakdown`, `High-energy`, and `Premium minimal`.
- Apply social clip format references such as `Face-cam hook`, `Split-screen breakdown`, `Caption-first edit`, `Proof-card montage`, and `Podcast-style clip`.
- Keep the capper approval step intact before any creative is queued.

These are thumbnail-style planning assets only. The prototype does not generate real media, call AI APIs, upload files, or publish externally.

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
6. In the AI Agent Layer, switch template style and clip format to show channel-native creative packaging.
7. Return to Studio, generate the FirstBasketMan Sheet Sample, approve it, and show slate-aware Growth Pack assets.
8. Open Capper Feed, tap a capper profile, return, and tail a publishable play.
9. Open Insights and show the creator performance loop plus capper behavior breakdowns.
10. Return to Studio, generate the Held MLB Hype Draft, and show that Growth Studio blocks incomplete/hype-heavy content before fan delivery.

## Full Overview

See [EXECUTIVE_OVERVIEW.md](./EXECUTIVE_OVERVIEW.md) for the deeper product and technical explanation.
