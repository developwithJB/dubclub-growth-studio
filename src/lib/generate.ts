import type {
  AgentCreativeOption,
  AgentStyle,
  CapperId,
  CapperProfile,
  GrowthPack,
  InboxPlay,
  MirrorVoice,
  PlaySource,
  StructuredPlay
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
const nhlPlayoffInput =
  "VGK/Ducks u6.5 0.75u, playable to 6. Game 6 closeout pace, tighter neutral zone, special teams risk.";
const mlbHypeInput = "Hammer Dodgers ML tomorrow vs Giants. Lock.";

export const examples = {
  nbaPlayoff: nbaPlayoffInput,
  wnba: wnbaInput,
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

export function generateStructuredPlay(rawInput: string): StructuredPlay {
  const normalized = rawInput.toLowerCase();

  if (normalized.includes("dodgers") || normalized.includes("lock")) {
    return {
      id: playCopy["mlb-hype"].id,
      source: "mlb-hype",
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
      suggestedRewrite:
        "Dodgers ML is a lean for Giants-Dodgers. Waiting for starting pitchers, final price, and unit size before posting as an official play."
    };
  }

  if (normalized.includes("vgk") || normalized.includes("ducks")) {
    return {
      id: playCopy["nhl-playoff"].id,
      source: "nhl-playoff",
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
      status: "Needs Review"
    };
  }

  if (normalized.includes("collier") || normalized.includes("lynx")) {
    return {
      id: playCopy.wnba.id,
      source: "wnba",
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
      status: "Needs Review"
    };
  }

  return {
    id: playCopy["nba-playoff"].id,
    source: "nba-playoff",
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
    status: "Needs Review"
  };
}

export function generateGrowthPack(play: StructuredPlay): GrowthPack {
  const title = play.player ? `${play.player} ${play.pick}` : play.pick;

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

const mirrorVoiceCopy: Record<CapperId, string> = {
  greeklocks: "confident multi-sport capper voice",
  propgeekzeke: "math-backed product-demo voice",
  theparlayplug: "community-first line-sensitive voice",
  skohty: "high-engagement creator voice"
};

export function generateAgentCreativeOptions(
  play: StructuredPlay,
  style: AgentStyle,
  mirrorVoice: MirrorVoice
): AgentCreativeOption[] {
  const originalProfile = getCapperProfileForPlay(play);
  const mirroredProfile =
    mirrorVoice === "original" ? originalProfile : capperProfiles[mirrorVoice];
  const styleCopy = agentStyleCopy[style];
  const title = play.player ? `${play.player} ${play.pick}` : play.pick;
  const unitLine =
    play.unitSize === "Missing" || play.playableTo === "Missing"
      ? "Details still missing before this can become subscriber-facing."
      : `${play.unitSize}, playable to ${play.playableTo}.`;
  const voiceLabel =
    mirrorVoice === "original"
      ? `${originalProfile.name}'s existing voice`
      : `${mirroredProfile.name} style - ${mirrorVoiceCopy[mirroredProfile.id]}`;

  return [
    {
      id: "youtube-short",
      channel: "YouTube Shorts",
      title: "YouTube Short Concept",
      eyebrow: `${styleCopy.label} / ${voiceLabel}`,
      hook: `${styleCopy.hookLead}: ${play.sport} card is live.`,
      body: `${title}. ${unitLine} ${styleCopy.direction}`,
      caption: `${mirroredProfile.handle}: ${title}. Full card, playable range, and risk note inside DubClub.`,
      cta: "Use This Short",
      doneLabel: "Short selected"
    },
    {
      id: "ig-tiktok",
      channel: "IG/TikTok",
      title: "IG/TikTok Cutdown",
      eyebrow: `${styleCopy.label} / social discovery`,
      hook: `${title} in one clean capper take.`,
      body: `${styleCopy.visual} Caption keeps the play clear and routes serious tailers back to DubClub.`,
      caption: `${play.sport} play from ${mirroredProfile.name}: ${unitLine} Confirm your number before tailing.`,
      cta: "Copy Caption",
      doneLabel: "Caption copied"
    },
    {
      id: "audio-read",
      channel: "Audio",
      title: "Audio Trust Read",
      eyebrow: `${styleCopy.label} / voice note`,
      hook: "Turn the card into a 30-second trust-building read.",
      body: `${mirroredProfile.name} opens with the pick, explains the why, then closes with the risk note: ${play.riskFlag}`,
      caption: `${title}. ${unitLine} Voice direction: calm, clear, and capper-approved.`,
      cta: "Save Audio Direction",
      doneLabel: "Audio direction saved"
    }
  ];
}

export function playToInboxCard(play: StructuredPlay): InboxPlay {
  const copy = playCopy[play.source];

  return {
    id: play.id,
    capperId: copy.capperId,
    capper: capperProfiles[copy.capperId].name,
    pick: play.player ? `${play.player} ${play.pick}` : play.pick,
    unit: play.unitSize,
    playableTo: play.playableTo,
    note: copy.note,
    status: play.status === "Needs Review" ? "Active" : play.status
  };
}

export const fallbackInboxPlay: InboxPlay = {
  id: "fallback-nba-playoff",
  capperId: playCopy["nba-playoff"].capperId,
  capper: capperProfiles[playCopy["nba-playoff"].capperId].name,
  pick: "Victor Wembanyama Over 35.5 PRA",
  unit: "1u",
  playableTo: "37.5",
  note: playCopy["nba-playoff"].note,
  status: "Active"
};

export const mockInboxPlays: InboxPlay[] = [
  {
    id: "lynx-wings-fallback",
    capperId: "propgeekzeke",
    capper: capperProfiles.propgeekzeke.name,
    pick: "Napheesa Collier Over 19.5 Points",
    unit: "1u",
    playableTo: "21.5",
    note: "Usage edge against a Dallas frontcourt still settling.",
    status: "Active"
  },
  {
    id: "vgk-ducks-fallback",
    capperId: "theparlayplug",
    capper: capperProfiles.theparlayplug.name,
    pick: "Golden Knights/Ducks Under 6.5",
    unit: "0.75u",
    playableTo: "6",
    note: "Closeout pace angle with special teams risk.",
    status: "Line-sensitive"
  }
];
