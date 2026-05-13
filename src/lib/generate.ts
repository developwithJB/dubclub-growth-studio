import type { GrowthPack, InboxPlay, PlaySource, StructuredPlay } from "../types";

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
    capper: "FirstBasketMan",
    note: "Game 6 usage and rim pressure angle."
  },
  wnba: {
    id: "lynx-wings-collier-points",
    eventLabel: "Minnesota Lynx at Dallas Wings",
    eventDate: "Thu, May 14, 2026",
    capper: "CourtEdge",
    note: "Usage edge against a Dallas frontcourt still settling."
  },
  "nhl-playoff": {
    id: "golden-knights-ducks-under",
    eventLabel: "Vegas Golden Knights at Anaheim Ducks, Game 6",
    eventDate: "Thu, May 14, 2026",
    capper: "IceTilt",
    note: "Closeout-game pace angle with special teams risk."
  },
  "mlb-hype": {
    id: "dodgers-giants-hype",
    eventLabel: "San Francisco Giants at Los Angeles Dodgers",
    eventDate: "Thu, May 14, 2026",
    capper: "FirstBasketMan",
    note: "Draft needs price, starters, reasoning, and playable-to number before it can ship."
  }
} satisfies Record<
  PlaySource,
  { id: string; eventLabel: string; eventDate: string; capper: string; note: string }
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

export function playToInboxCard(play: StructuredPlay): InboxPlay {
  const copy = playCopy[play.source];

  return {
    id: play.id,
    capper: copy.capper,
    pick: play.player ? `${play.player} ${play.pick}` : play.pick,
    unit: play.unitSize,
    playableTo: play.playableTo,
    note: copy.note,
    status: play.status === "Needs Review" ? "Active" : play.status
  };
}

export const fallbackInboxPlay: InboxPlay = {
  id: "fallback-nba-playoff",
  capper: playCopy["nba-playoff"].capper,
  pick: "Victor Wembanyama Over 35.5 PRA",
  unit: "1u",
  playableTo: "37.5",
  note: playCopy["nba-playoff"].note,
  status: "Active"
};

export const mockInboxPlays: InboxPlay[] = [
  {
    id: "lynx-wings-fallback",
    capper: "CourtEdge",
    pick: "Napheesa Collier Over 19.5 Points",
    unit: "1u",
    playableTo: "21.5",
    note: "Usage edge against a Dallas frontcourt still settling.",
    status: "Active"
  },
  {
    id: "vgk-ducks-fallback",
    capper: "IceTilt",
    pick: "Golden Knights/Ducks Under 6.5",
    unit: "0.75u",
    playableTo: "6",
    note: "Closeout pace angle with special teams risk.",
    status: "Line-sensitive"
  }
];
