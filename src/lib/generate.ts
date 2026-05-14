import type {
  AgentCreativeOption,
  AgentStyle,
  CapperId,
  CapperProfile,
  GrowthPack,
  InboxPlay,
  PlaySource,
  SocialClipFormat,
  StructuredPlay,
  StructuredPlayLeg
} from "../types";

export const capperProfiles: Record<CapperId, CapperProfile> = {
  greeklocks: {
    id: "greeklocks",
    name: "GreekLocks",
    handle: "@greeklocks",
    avatarFallback: "GL",
    avatarUrl: "https://dubclub.win/api/asset/ET8aJE52_400x400.jpg",
    bannerUrl: "https://dubclub.win/iv/2byat/",
    bannerStyle: "linear-gradient(135deg, #05111f 0%, #063f73 45%, #05050a 100%)",
    avatarStyle: "linear-gradient(135deg, #2ee9ff 0%, #293bff 52%, #020611 100%)",
    tags: ["Pioneer", "Legend", "Third-Party Tracked", "Trending"],
    joined: "Dec 2022",
    subscribers: "48K",
    rating: "5.0",
    reviews: "4 reviews",
    bio: "GreekLocks on Twitter. I know ball. I cap most sports.",
    planName: "GreekLocks's Plays",
    price: "$35.00",
    interval: "2 Weeks",
    dailyPrice: "$1.23/Day",
    delivery: ["Discord", "Push", "Email"]
  },
  propgeekzeke: {
    id: "propgeekzeke",
    name: "PROP GEEK ZEKE",
    handle: "@propgeekzeke",
    avatarFallback: "PGZ",
    bannerStyle: "linear-gradient(135deg, #101614 0%, #173d27 38%, #6be847 100%)",
    avatarStyle: "linear-gradient(135deg, #d9fff0 0%, #53d66b 48%, #0c1610 100%)",
    tags: ["Third-Party Tracked", "Prop Specialist"],
    joined: "Apr 2022",
    subscribers: "30K+",
    rating: "4.9",
    reviews: "96 reviews",
    bio: "$1M+ in winnings using math-backed strategies and publicly tracked results.",
    planName: "PGZ Sports Picks",
    price: "$29.99",
    interval: "Month",
    dailyPrice: "$1.00/Day",
    delivery: ["DubClub", "Push", "Discord"]
  },
  theparlayplug: {
    id: "theparlayplug",
    name: "THEPARLAYPLUG",
    handle: "@theparlayplug",
    avatarFallback: "PP",
    bannerStyle: "linear-gradient(135deg, #101010 0%, #24332f 42%, #cbd7dc 100%)",
    avatarStyle: "linear-gradient(135deg, #111 0%, #3e5750 52%, #f4f4f4 100%)",
    tags: ["Third-Party Tracked", "Trending"],
    joined: "Jan 2023",
    subscribers: "18K",
    rating: "5.0",
    reviews: "10 reviews",
    bio: "Be Bettor. Line-sensitive plays with direct subscriber delivery.",
    planName: "TheParlayPlug Plays",
    price: "$24.99",
    interval: "Month",
    dailyPrice: "$0.83/Day",
    delivery: ["DubClub", "Push", "Email"]
  },
  skohty: {
    id: "skohty",
    name: "SKOHTY",
    handle: "@skohty",
    avatarFallback: "SK",
    bannerStyle: "linear-gradient(135deg, #2a063f 0%, #e100ff 42%, #ff1678 100%)",
    avatarStyle: "linear-gradient(135deg, #ffe8d7 0%, #f0c59f 48%, #3a2117 100%)",
    tags: ["Pioneer", "Most Engaged", "Third-Party Tracked"],
    joined: "Sep 2022",
    subscribers: "22K",
    rating: "5.0",
    reviews: "53 reviews",
    bio: "23 Year Old Sports Betting Millionaire. High-engagement picks and community-first delivery.",
    planName: "Skohty's Plays",
    price: "$39.99",
    interval: "Month",
    dailyPrice: "$1.33/Day",
    delivery: ["DubClub", "Push", "Discord"]
  }
};

const nbaPlayoffInput =
  "Wemby o35.5 PRA 1u, playable to 37.5. Spurs-Wolves G6, usage + rim pressure edge, Minnesota may send doubles late.";
const wnbaInput =
  "Collier o19.5 points 1u, playable to 21.5. Lynx at Wings, early-season usage edge, Dallas frontcourt still settling.";
const wnbaSheetInput = "LVA - A'ja Wilson +500 FD .25u\nATL - Angel Reese +600 DK .2u";
const nhlPlayoffInput =
  "VGK/Ducks u6.5 0.75u, playable to 6. Game 6 closeout pace, tighter neutral zone, special teams risk.";
const mlbHypeInput = "Hammer Dodgers ML tomorrow vs Giants. Lock.";

export const examples = {
  nbaPlayoff: nbaPlayoffInput,
  wnba: wnbaInput,
  wnbaSheet: wnbaSheetInput,
  nhlPlayoff: nhlPlayoffInput,
  mlbHype: mlbHypeInput,
  strong: nbaPlayoffInput,
  hype: mlbHypeInput
};

const playCopy = {
  "nba-playoff": {
    id: "spurs-wolves-wemby-pra",
    eventLabel: "San Antonio at Minnesota, Game 6",
    eventDate: "Fri, May 15, 2026",
    capperId: "greeklocks",
    note: "Game 6 usage and rim pressure angle."
  },
  wnba: {
    id: "lynx-wings-collier-points",
    eventLabel: "Minnesota Lynx at Dallas Wings",
    eventDate: "Thu, May 14, 2026",
    capperId: "propgeekzeke",
    note: "Usage edge against a Dallas frontcourt still settling."
  },
  "wnba-sheet": {
    id: "wnba-longshot-sheet",
    eventLabel: "WNBA futures and longshot sheet",
    eventDate: "Thu, May 14, 2026",
    capperId: "propgeekzeke",
    note: "Two-play longshot slate from model-vs-book comparison."
  },
  "nhl-playoff": {
    id: "golden-knights-ducks-under",
    eventLabel: "Vegas Golden Knights at Anaheim Ducks, Game 6",
    eventDate: "Thu, May 14, 2026",
    capperId: "theparlayplug",
    note: "Closeout-game pace angle with special teams risk."
  },
  "mlb-hype": {
    id: "dodgers-giants-hype",
    eventLabel: "San Francisco Giants at Los Angeles Dodgers",
    eventDate: "Thu, May 14, 2026",
    capperId: "greeklocks",
    note: "Draft needs price, starters, reasoning, and playable-to number before it can ship."
  }
} satisfies Record<
  PlaySource,
  { id: string; eventLabel: string; eventDate: string; capperId: CapperId; note: string }
>;

const visualLegs = {
  wemby: {
    id: "wemby-pra",
    team: "SAS",
    teamName: "San Antonio Spurs",
    teamColor: "#8a8d8f",
    teamLogoUrl: "https://a.espncdn.com/i/teamlogos/nba/500/sa.png",
    player: "Victor Wembanyama",
    playerInitials: "VW",
    playerImageUrl: "https://a.espncdn.com/i/headshots/nba/players/full/5104157.png",
    pick: "Over 35.5 PRA",
    odds: "Line 35.5",
    book: "Market",
    unitSize: "1u",
    league: "NBA",
    market: "Player Prop",
    playType: "PRA prop",
    riskNote: "Playoff defensive adjustments and foul trouble can swing PRA props.",
    missingContext: ["Odds", "injury report"]
  },
  collier: {
    id: "collier-points",
    team: "MIN",
    teamName: "Minnesota Lynx",
    teamColor: "#00a94f",
    teamLogoUrl: "https://a.espncdn.com/i/teamlogos/wnba/500/min.png",
    player: "Napheesa Collier",
    playerInitials: "NC",
    playerImageUrl: "https://a.espncdn.com/i/headshots/wnba/players/full/3917450.png",
    pick: "Over 19.5 Points",
    odds: "Line 19.5",
    book: "Market",
    unitSize: "1u",
    league: "WNBA",
    market: "Player Prop",
    playType: "Points prop",
    riskNote: "Early-season rotations can be volatile. Confirm starters before publishing.",
    missingContext: ["Odds", "starting lineup confirmation"]
  },
  aja: {
    id: "aja-wilson-longshot",
    team: "LVA",
    teamName: "Las Vegas Aces",
    teamColor: "#c5b358",
    teamLogoUrl: "https://a.espncdn.com/i/teamlogos/wnba/500/lv.png",
    player: "A'ja Wilson",
    playerInitials: "AW",
    playerImageUrl: "https://a.espncdn.com/i/headshots/wnba/players/full/3149391.png",
    pick: "A'ja Wilson +500",
    odds: "+500",
    book: "FD",
    unitSize: ".25u",
    league: "WNBA",
    market: "Awards / Futures",
    playType: "Longshot position",
    riskNote: "Longshot odds are volatile. Confirm price and market availability before posting.",
    missingContext: ["Model fair price", "market close timing"]
  },
  reese: {
    id: "angel-reese-longshot",
    team: "ATL",
    teamName: "Atlanta Dream",
    teamColor: "#e31837",
    teamLogoUrl: "https://a.espncdn.com/i/teamlogos/wnba/500/atl.png",
    player: "Angel Reese",
    playerInitials: "AR",
    playerImageUrl: "https://a.espncdn.com/i/headshots/wnba/players/full/4433402.png",
    pick: "Angel Reese +600",
    odds: "+600",
    book: "DK",
    unitSize: ".2u",
    league: "WNBA",
    market: "Awards / Futures",
    playType: "Longshot position",
    riskNote: "Longshot odds are volatile. Confirm price and market availability before posting.",
    missingContext: ["Model fair price", "market close timing"]
  },
  vgkDucks: {
    id: "vgk-ducks-under",
    team: "VGK",
    teamName: "Vegas Golden Knights",
    teamColor: "#b4975a",
    teamLogoUrl: "https://a.espncdn.com/i/teamlogos/nhl/500/vgk.png",
    opponentLogoUrl: "https://a.espncdn.com/i/teamlogos/nhl/500/ana.png",
    player: "VGK/Ducks",
    playerInitials: "U6",
    pick: "Under 6.5",
    odds: "Total 6.5",
    book: "Market",
    unitSize: "0.75u",
    league: "NHL",
    market: "Game Total",
    playType: "Total",
    riskNote: "Special teams variance can break an under quickly. Confirm goalie news.",
    missingContext: ["Odds", "goalie confirmation"]
  },
  dodgers: {
    id: "dodgers-ml",
    team: "LAD",
    teamName: "Los Angeles Dodgers",
    teamColor: "#005a9c",
    teamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/lad.png",
    opponentLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/sf.png",
    player: "Dodgers",
    playerInitials: "LA",
    pick: "Dodgers Moneyline",
    odds: "Missing",
    book: "Missing",
    unitSize: "Missing",
    league: "MLB",
    market: "Moneyline",
    playType: "Moneyline",
    riskNote: 'Hype-heavy language. Avoid "lock" claims.',
    missingContext: [
      "Unit size",
      "price",
      "starting pitchers",
      "lineup/weather context",
      "reasoning",
      "playable-to price"
    ]
  }
} satisfies Record<string, StructuredPlayLeg>;

export function generateStructuredPlay(rawInput: string): StructuredPlay {
  const normalized = rawInput.toLowerCase();

  if (normalized.includes("a'ja") || normalized.includes("angel reese") || normalized.includes("lva -")) {
    return {
      id: playCopy["wnba-sheet"].id,
      source: "wnba-sheet",
      format: "slate",
      eventLabel: playCopy["wnba-sheet"].eventLabel,
      eventDate: playCopy["wnba-sheet"].eventDate,
      pick: "Two-Play WNBA Longshot Slate",
      sport: "WNBA",
      market: "Awards / Futures",
      unitSize: ".45u total",
      playableTo: "Listed prices",
      reasoning:
        "Capper sheet shows two small-unit longshot positions from a model-vs-book comparison: A'ja Wilson +500 on FD and Angel Reese +600 on DK.",
      missingDetails: ["Model fair odds", "market close timing", "availability by book"],
      riskFlag:
        "Longshot markets are volatile and low-hit-rate by nature. Confirm prices before publishing.",
      qualityScore: 76,
      status: "Needs Review",
      legs: [visualLegs.aja, visualLegs.reese]
    };
  }

  if (normalized.includes("dodgers") || normalized.includes("lock")) {
    return {
      id: playCopy["mlb-hype"].id,
      source: "mlb-hype",
      format: "single",
      eventLabel: playCopy["mlb-hype"].eventLabel,
      eventDate: playCopy["mlb-hype"].eventDate,
      pick: "Dodgers Moneyline",
      sport: "MLB",
      market: "Moneyline",
      unitSize: "Missing",
      playableTo: "Missing",
      reasoning: "Missing",
      missingDetails: [
        "Unit size",
        "price",
        "starting pitchers",
        "lineup/weather context",
        "reasoning",
        "playable-to price"
      ],
      riskFlag: 'Hype-heavy language. Avoid "lock" claims.',
      qualityScore: 36,
      status: "Needs More Detail",
      legs: [visualLegs.dodgers],
      suggestedRewrite:
        "Dodgers ML is a lean for Giants-Dodgers. Waiting for starting pitchers, final price, and unit size before posting as an official play."
    };
  }

  if (normalized.includes("vgk") || normalized.includes("ducks")) {
    return {
      id: playCopy["nhl-playoff"].id,
      source: "nhl-playoff",
      format: "single",
      eventLabel: playCopy["nhl-playoff"].eventLabel,
      eventDate: playCopy["nhl-playoff"].eventDate,
      pick: "Golden Knights/Ducks Under 6.5",
      sport: "NHL",
      market: "Game Total",
      unitSize: "0.75u",
      playableTo: "6",
      reasoning:
        "Game 6 closeout pace can tighten up, with both teams likely valuing neutral-zone control.",
      missingDetails: ["Odds", "goalie confirmation"],
      riskFlag: "Special teams variance can break an under quickly. Confirm goalie news.",
      qualityScore: 78,
      status: "Needs Review",
      legs: [visualLegs.vgkDucks]
    };
  }

  if (normalized.includes("collier") || normalized.includes("lynx")) {
    return {
      id: playCopy.wnba.id,
      source: "wnba",
      format: "single",
      eventLabel: playCopy.wnba.eventLabel,
      eventDate: playCopy.wnba.eventDate,
      player: "Napheesa Collier",
      pick: "Over 19.5 Points",
      sport: "WNBA",
      market: "Player Prop",
      unitSize: "1u",
      playableTo: "21.5",
      reasoning:
        "Collier usage should be stable early in the season, and Dallas' frontcourt rotation is still settling.",
      missingDetails: ["Odds", "starting lineup confirmation"],
      riskFlag: "Early-season rotations can be volatile. Confirm starters before publishing.",
      qualityScore: 80,
      status: "Needs Review",
      legs: [visualLegs.collier]
    };
  }

  return {
    id: playCopy["nba-playoff"].id,
    source: "nba-playoff",
    format: "single",
    eventLabel: playCopy["nba-playoff"].eventLabel,
    eventDate: playCopy["nba-playoff"].eventDate,
    player: "Victor Wembanyama",
    pick: "Over 35.5 PRA",
    sport: "NBA",
    market: "Player Prop",
    unitSize: "1u",
    playableTo: "37.5",
    reasoning:
      "Game 6 usage and rim-pressure profile create a strong PRA setup if Minnesota sends late doubles.",
    missingDetails: ["Odds", "injury report"],
    riskFlag: "Playoff defensive adjustments and foul trouble can swing PRA props.",
    qualityScore: 86,
    status: "Needs Review",
    legs: [visualLegs.wemby]
  };
}

export function generateGrowthPack(play: StructuredPlay): GrowthPack {
  const title = play.player ? `${play.player} ${play.pick}` : play.pick;

  if (play.format === "slate") {
    const slateList = play.legs?.map((leg) => `${leg.team} - ${leg.player} ${leg.odds} ${leg.book} ${leg.unitSize}`).join("; ");

    return {
      dubClubPost:
        `Official Slate: ${play.pick}. ${slateList}. Total exposure ${play.unitSize}. These are small-unit longshot positions from the model sheet; confirm prices before tailing.`,
      pushNotification:
        `New WNBA longshot slate: A'ja +500 FD and Angel Reese +600 DK. Total exposure ${play.unitSize}.`,
      xTeaser:
        "WNBA longshot slate is live for subscribers: two small-unit positions, book tags, and risk note included inside DubClub.",
      discordSms:
        `Added WNBA slate: ${slateList}. Longshot sizing only. Confirm your book price before placing.`,
      shortFormHook:
        "Two WNBA longshots from the model sheet: one slate, two books, controlled exposure.",
      shortFormScript:
        `Quick slate for subscribers: ${slateList}. The idea is not chasing lottery tickets; it is small-unit exposure where my model shows price value. Confirm each number before tailing.`,
      shortFormCaption:
        `WNBA longshot slate is live: ${slateList}. Small units, book-specific prices, and risk note inside DubClub.`,
      audioRead:
        `I added a two-play WNBA longshot slate: ${slateList}. Total exposure is ${play.unitSize}. These are low-hit-rate markets, so keep the sizing disciplined and confirm prices before tailing.`,
      responsiblePlayNote:
        "Longshots are volatile. Keep unit sizing small and confirm your own book price.",
      suggestedSendTime:
        "Send when both markets are available and prices are still within range.",
      audienceSegment:
        "WNBA subscribers + longshot/futures tailers.",
      businessGoal:
        "Package model-sheet edges into a clear slate without overselling low-probability outcomes."
    };
  }

  if (play.source === "mlb-hype") {
    return {
      dubClubPost:
        'Not ready to publish as an official play. Dodgers ML needs unit size, price, starting pitchers, lineup/weather context, reasoning, and a playable-to number before subscribers can act. Suggested creator note: "Dodgers ML is a lean for Giants-Dodgers. Waiting for starting pitchers, final price, and unit size before posting as an official play."',
      pushNotification:
        "Draft held for review: Dodgers ML needs more detail before sending to subscribers.",
      xTeaser:
        "Leaning Dodgers ML for Giants-Dodgers, but holding until starters, price, and official staking note are ready.",
      discordSms:
        "Dodgers ML is only a lean right now. Waiting on starters, price, lineup/weather context, and unit size before making it official.",
      shortFormHook:
        "Held draft: do not record Dodgers ML as an official play until the number, starters, unit size, and reasoning are complete.",
      shortFormScript:
        'Internal creator note only: "I lean Dodgers ML for Giants-Dodgers, but I am waiting for starters and the final price before making this official."',
      shortFormCaption:
        "Lean only, not an official play. Waiting for starters, final price, staking, and reasoning before posting to subscribers.",
      audioRead:
        "Hold this as a lean. Do not send a voice note until the play has unit size, price, starting pitcher context, and a playable-to number.",
      responsiblePlayNote:
        "Avoid lock language. Confirm your own number and only play within your unit plan.",
      suggestedSendTime:
        "Do not send yet. Add starters, price, unit size, weather/lineup context, and reasoning first.",
      audienceSegment:
        "No blast recommended until the play is complete.",
      businessGoal:
        "Protect subscriber trust by slowing down hype-heavy posts before they become paid plays."
    };
  }

  return {
    dubClubPost:
      `Official Play: ${title} - ${play.unitSize}. Playable to ${play.playableTo}. ${play.reasoning} Confirm your number before tailing.`,
    pushNotification:
      `New ${play.unitSize} ${play.sport} play: ${title}. Playable to ${play.playableTo}.`,
    xTeaser:
      `${play.sport} angle added for subscribers: ${title} with a playable-to number and risk note. Full card is live inside DubClub.`,
    discordSms:
      `Added: ${title}, ${play.unitSize}. Playable to ${play.playableTo}. ${play.riskFlag} Confirm your line before placing.`,
    shortFormHook:
      `${play.sport} play is live: ${title}. The playable-to number and risk note matter here.`,
    shortFormScript:
      `Quick ${play.sport} play for subscribers: ${title} for ${play.unitSize}, playable to ${play.playableTo}. ${play.reasoning} Confirm your number and the latest game context before tailing.`,
    shortFormCaption:
      `${title} is live for subscribers. ${play.unitSize}, playable to ${play.playableTo}. Confirm your number before tailing.`,
    audioRead:
      `I added ${title} for ${play.unitSize}, playable to ${play.playableTo}. ${play.reasoning} Confirm the latest game context and make sure your number is still in range.`,
    responsiblePlayNote:
      "Bet responsibly. Confirm your own line and only play within your unit plan.",
    suggestedSendTime:
      play.sport === "MLB" ? "60-90 minutes before first pitch." : "45-60 minutes before game time.",
    audienceSegment:
      `${play.sport} subscribers + recently active tailers.`,
    businessGoal:
      "Drive subscriber action while keeping the pick clear, line-sensitive, and trustworthy."
  };
}

export function getCapperProfileForPlay(play: StructuredPlay): CapperProfile {
  return capperProfiles[playCopy[play.source].capperId];
}

const agentStyleCopy: Record<
  AgentStyle,
  { label: string; hookLead: string; direction: string; visual: string }
> = {
  "proof-first": {
    label: "Proof-first",
    hookLead: "Show the number first",
    direction: "Lead with unit size, playable-to range, and the risk note before the punchline.",
    visual: "Clean card stack, verified pick badge, tight proof points."
  },
  "sharp-breakdown": {
    label: "Sharp breakdown",
    hookLead: "Break down the edge fast",
    direction: "Use a quick setup, one reason the line matters, and one watch-out before the CTA.",
    visual: "Split-screen capper take, matchup cue, line-sensitive label."
  },
  "high-energy": {
    label: "High-energy",
    hookLead: "Make the pick feel alive",
    direction: "Keep the pace urgent while avoiding lock language or guaranteed claims.",
    visual: "Bold kinetic type, fast cuts, neon green action prompts."
  },
  "premium-minimal": {
    label: "Premium minimal",
    hookLead: "Let the signal breathe",
    direction: "Use fewer words, more spacing, and a polished trust-first delivery.",
    visual: "Black canvas, green accent line, one stat, one play, one CTA."
  }
};

const socialFormatCopy: Record<
  SocialClipFormat,
  { label: string; reference: string; framing: string; motion: string }
> = {
  "face-cam-hook": {
    label: "Face-cam hook",
    reference: "Creator opens cold, then the play card snaps in.",
    framing: "Lead with a direct-to-camera hook before revealing the structured pick.",
    motion: "Face-cam intro, card overlay, playable-to callout."
  },
  "split-screen-breakdown": {
    label: "Split-screen breakdown",
    reference: "Capper take on one side, play evidence on the other.",
    framing: "Use a fast split-screen edit that pairs the capper take with the review card.",
    motion: "Side-by-side card, matchup cue, risk note slide."
  },
  "caption-first": {
    label: "Caption-first edit",
    reference: "Large subtitles carry the story even on mute.",
    framing: "Let bold captions explain the pick, then route serious tailers to DubClub.",
    motion: "Punchy text stack, jump cuts, green CTA label."
  },
  "proof-card-montage": {
    label: "Proof-card montage",
    reference: "Rapid proof points before the final card reveal.",
    framing: "Show unit, playable-to, market, and risk note as a quick proof sequence.",
    motion: "Four-card montage, final pick lockup, responsible-play tag."
  },
  "podcast-clip": {
    label: "Podcast-style clip",
    reference: "Audio-led trust clip with waveform and captions.",
    framing: "Build trust with a calm read and visual captions around the structured play.",
    motion: "Waveform, caption strip, play card reveal."
  }
};

export function generateAgentCreativeOptions(
  play: StructuredPlay,
  style: AgentStyle,
  clipFormat: SocialClipFormat,
  variant = 1
): AgentCreativeOption[] {
  const capperProfile = getCapperProfileForPlay(play);
  const styleCopy = agentStyleCopy[style];
  const formatCopy = socialFormatCopy[clipFormat];
  const title = play.player ? `${play.player} ${play.pick}` : play.pick;
  const unitLine =
    play.unitSize === "Missing" || play.playableTo === "Missing"
      ? "Details still missing before this can become subscriber-facing."
      : `${play.unitSize}, playable to ${play.playableTo}.`;
  const creativeLabel = `${styleCopy.label} / ${formatCopy.label}`;

  if (play.format === "slate") {
    const slateList = play.legs?.map((leg) => `${leg.player} ${leg.odds} ${leg.book}`).join(" + ") ?? title;
    const variantAngle =
      variant === 1
        ? "lead with the two prices"
        : variant === 2
          ? "lead with model-sheet discipline"
          : "lead with why small sizing matters";

    return [
      {
        id: "one-play-short",
        channel: "YouTube Shorts",
        title: "1-Play Short",
        eyebrow: `${creativeLabel} / Variant ${variant}`,
        hook: `Open with the strongest slate leg, then tease the full card.`,
        body: `${formatCopy.framing} Start with A'ja Wilson +500 FD, then point subscribers to the full WNBA slate. Angle: ${variantAngle}.`,
        caption: `${capperProfile.handle}: A'ja +500 FD leads today's WNBA longshot slate. Full card inside DubClub.`,
        cta: "Use This Short",
        doneLabel: "Short selected"
      },
      {
        id: "slate-video",
        channel: "IG/TikTok",
        title: "Slate Video",
        eyebrow: `${formatCopy.label} / multi-play slate`,
        hook: `Two WNBA longshots from one model sheet.`,
        body: `${formatCopy.motion} Package ${slateList} into a fast two-card sequence with unit chips and book tags.`,
        caption: `WNBA slate: ${slateList}. Small-unit exposure only. Confirm your book price before tailing.`,
        cta: "Queue Slate Video",
        doneLabel: "Slate video queued"
      },
      {
        id: "top-plays-recap",
        channel: "YouTube Shorts",
        title: "Top Plays Recap",
        eyebrow: `${styleCopy.label} / recap format`,
        hook: "Today's WNBA longshot sheet in under 30 seconds.",
        body: `Recap the why behind both legs, then close with total exposure ${play.unitSize} and longshot risk.`,
        caption: `Top WNBA plays from the sheet: ${slateList}. Full explanation inside DubClub.`,
        cta: "Use Recap",
        doneLabel: "Recap selected"
      },
      {
        id: "card-of-day",
        channel: "IG/TikTok",
        title: "Card of the Day",
        eyebrow: `${formatCopy.label} / hero card`,
        hook: "Make the slate instantly scannable.",
        body: `Hero the two legs as a single card: team badge, player initials, odds, book, and unit size. Keep the CTA simple: open DubClub for the official card.`,
        caption: `Card of the day: ${slateList}. Tap into DubClub for official sizing and notes.`,
        cta: "Use Card",
        doneLabel: "Card selected"
      }
    ];
  }

  return [
    {
      id: "youtube-short",
      channel: "YouTube Shorts",
      title: "YouTube Short Concept",
      eyebrow: creativeLabel,
      hook: `${styleCopy.hookLead}: ${play.sport} card is live.`,
      body: `${formatCopy.framing} ${title}. ${unitLine} ${styleCopy.direction}`,
      caption: `${capperProfile.handle}: ${title}. Full card, playable range, and risk note inside DubClub.`,
      cta: "Use This Short",
      doneLabel: "Short selected"
    },
    {
      id: "ig-tiktok",
      channel: "IG/TikTok",
      title: "IG/TikTok Cutdown",
      eyebrow: `${formatCopy.label} / social discovery`,
      hook: `${title} in one clean capper take.`,
      body: `${formatCopy.motion} Caption keeps the play clear and routes serious tailers back to DubClub.`,
      caption: `${play.sport} play from ${capperProfile.name}: ${unitLine} Confirm your number before tailing.`,
      cta: "Copy Caption",
      doneLabel: "Caption copied"
    },
    {
      id: "audio-read",
      channel: "Audio",
      title: "Audio Trust Read",
      eyebrow: `${formatCopy.label} / voice note`,
      hook: "Turn the card into a 30-second trust-building read.",
      body: `${capperProfile.name} opens with the pick, explains the why, then closes with the risk note: ${play.riskFlag}`,
      caption: `${title}. ${unitLine} Voice direction: calm, clear, and capper-approved.`,
      cta: "Save Audio Direction",
      doneLabel: "Audio direction saved"
    }
  ];
}

export function playToInboxCard(play: StructuredPlay): InboxPlay {
  const copy = playCopy[play.source];
  const profile = capperProfiles[copy.capperId];

  return {
    id: play.id,
    format: play.format,
    capperId: copy.capperId,
    capper: profile.name,
    pick: play.format === "slate" ? `${play.pick} (${play.legs?.length ?? 0} plays)` : play.player ? `${play.player} ${play.pick}` : play.pick,
    unit: play.unitSize,
    playableTo: play.playableTo,
    note: copy.note,
    status: play.status === "Needs Review" ? "Active" : play.status,
    leg: play.legs?.[0],
    legs: play.legs,
    proofBadges: profile.tags.includes("Third-Party Tracked")
      ? ["Third-Party Tracked"]
      : [profile.tags[0]],
    record: profile.id === "propgeekzeke" ? "4 years tracked" : "Verified card history",
    roi: profile.id === "propgeekzeke" ? "$1M+ winnings" : "Positive recent form",
    subscribers: profile.subscribers,
    recentForm: profile.id === "theparlayplug" ? "7-3 last 10" : "5-2 last 7"
  };
}

export const fallbackInboxPlay: InboxPlay = {
  id: "fallback-nba-playoff",
  format: "single",
  capperId: playCopy["nba-playoff"].capperId,
  capper: capperProfiles[playCopy["nba-playoff"].capperId].name,
  pick: "Victor Wembanyama Over 35.5 PRA",
  unit: "1u",
  playableTo: "37.5",
  note: playCopy["nba-playoff"].note,
  status: "Active",
  leg: visualLegs.wemby,
  legs: [visualLegs.wemby],
  proofBadges: ["Third-Party Tracked"],
  record: "Verified card history",
  roi: "Positive recent form",
  subscribers: capperProfiles[playCopy["nba-playoff"].capperId].subscribers,
  recentForm: "5-2 last 7"
};

export const mockInboxPlays: InboxPlay[] = [
  {
    id: "lynx-wings-fallback",
    format: "single",
    capperId: "propgeekzeke",
    capper: capperProfiles.propgeekzeke.name,
    pick: "Napheesa Collier Over 19.5 Points",
    unit: "1u",
    playableTo: "21.5",
    note: "Usage edge against a Dallas frontcourt still settling.",
    status: "Active",
    leg: visualLegs.collier,
    legs: [visualLegs.collier],
    proofBadges: ["Third-Party Tracked"],
    record: "4 years tracked",
    roi: "$1M+ winnings",
    subscribers: capperProfiles.propgeekzeke.subscribers,
    recentForm: "6-2 last 8"
  },
  {
    id: "vgk-ducks-fallback",
    format: "single",
    capperId: "theparlayplug",
    capper: capperProfiles.theparlayplug.name,
    pick: "Golden Knights/Ducks Under 6.5",
    unit: "0.75u",
    playableTo: "6",
    note: "Closeout pace angle with special teams risk.",
    status: "Line-sensitive",
    leg: visualLegs.vgkDucks,
    legs: [visualLegs.vgkDucks],
    proofBadges: ["Third-Party Tracked"],
    record: "Line-sensitive tracked",
    roi: "Positive recent form",
    subscribers: capperProfiles.theparlayplug.subscribers,
    recentForm: "7-3 last 10"
  }
];
