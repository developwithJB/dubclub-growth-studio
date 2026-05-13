import type { GrowthPack, InboxPlay, StructuredPlay } from "../types";

const brunsonInput =
  "Brunson o24.5 PRA 1u, still good to 26.5. Knicks pace spot, usage bump if Hart sits.";

export const examples = {
  strong: brunsonInput,
  hype: "Hammer Lakers ML tonight. Lock."
};

export function generateStructuredPlay(rawInput: string): StructuredPlay {
  const normalized = rawInput.toLowerCase();

  if (normalized.includes("lakers") || normalized.includes("lock")) {
    return {
      id: "lakers-moneyline",
      source: "lakers",
      pick: "Lakers Moneyline",
      sport: "NBA",
      market: "Moneyline",
      unitSize: "Missing",
      playableTo: "Missing",
      reasoning: "Missing",
      missingDetails: ["Unit size", "odds/line", "opponent", "reasoning", "playable-to number"],
      riskFlag: 'Hype-heavy language. Avoid "lock" claims.',
      qualityScore: 38,
      status: "Needs More Detail",
      suggestedRewrite:
        "Lakers ML is my lean tonight. Waiting for final number before posting as an official play."
    };
  }

  return {
    id: "jalen-brunson-pra",
    source: "brunson",
    player: "Jalen Brunson",
    pick: "Over 24.5 PRA",
    sport: "NBA",
    market: "Player Prop",
    unitSize: "1u",
    playableTo: "26.5",
    reasoning: "Knicks pace spot and possible usage bump if Josh Hart sits.",
    missingDetails: ["Odds", "opponent", "game time"],
    riskFlag: "Injury-dependent angle. Confirm Hart status before publishing.",
    qualityScore: 82,
    status: "Needs Review"
  };
}

export function generateGrowthPack(play: StructuredPlay): GrowthPack {
  if (play.source === "lakers") {
    return {
      dubClubPost:
        'Not ready to publish as an official play. Lakers ML needs unit size, opponent, price, playable-to number, and reasoning before subscribers can act. Suggested creator note: "Lakers ML is my lean tonight. Waiting for final number before posting as an official play."',
      pushNotification:
        "Draft held for review: Lakers ML needs more detail before sending to subscribers.",
      xTeaser:
        "Leaning Lakers ML, but holding until the final number and official staking note are ready.",
      discordSms:
        "Lakers ML is only a lean right now. Waiting on price, opponent context, and unit size before making it official.",
      shortFormHook:
        "Held draft: do not record as an official play until the number, opponent, unit size, and reasoning are complete.",
      shortFormScript:
        'Internal creator note only: "I lean Lakers ML tonight, but I am waiting for the final number before making this official."',
      shortFormCaption:
        "Lean only, not an official play. Waiting for final price, staking, and reasoning before posting to subscribers.",
      audioRead:
        "Hold this as a lean. Do not send a voice note until the play has unit size, price, opponent context, and a playable-to number.",
      responsiblePlayNote:
        "Avoid lock language. Confirm your own number and only play within your unit plan.",
      suggestedSendTime:
        "Do not send yet. Add price, unit size, opponent, and reasoning first.",
      audienceSegment:
        "No blast recommended until the play is complete.",
      businessGoal:
        "Protect subscriber trust by slowing down hype-heavy posts before they become paid plays."
    };
  }

  return {
    dubClubPost:
      "Official Play: Jalen Brunson Over 24.5 PRA - 1u. Playable to 26.5. Like the Knicks pace environment and Brunson usage profile, with added upside if Josh Hart sits. Confirm final injury status before tailing.",
    pushNotification:
      "New 1u NBA prop: Brunson Over 24.5 PRA. Playable to 26.5. Check Hart status before tailing.",
    xTeaser:
      "NBA prop added for subscribers: Brunson PRA angle with a playable-to number and injury-status note. Full card is live inside DubClub.",
    discordSms:
      "Added: Brunson Over 24.5 PRA, 1u. Playable to 26.5. Usage angle improves if Hart sits. Confirm your line before placing.",
    shortFormHook:
      "Brunson PRA prop is live: playable-to number matters, and Hart injury news is the swing factor.",
    shortFormScript:
      "Quick NBA prop for subscribers: Jalen Brunson Over 24.5 PRA for 1u, playable to 26.5. I like the Knicks pace setup and Brunson's usage profile. If Josh Hart sits, that usage angle gets even cleaner. Confirm the injury report and your own line before tailing.",
    shortFormCaption:
      "Brunson PRA angle is live for subscribers. 1u, playable to 26.5. Check Hart status and confirm your number before tailing.",
    audioRead:
      "I added Jalen Brunson Over 24.5 PRA for 1u, playable to 26.5. The setup is pace plus usage, with extra upside if Hart sits. Confirm the final injury report and make sure your number is still in range.",
    responsiblePlayNote:
      "Bet responsibly. Confirm your own line and only play within your unit plan.",
    suggestedSendTime:
      "45-60 minutes before tip, after injury news updates.",
    audienceSegment:
      "NBA prop subscribers + recently active tailers.",
    businessGoal:
      "Drive subscriber action while keeping the pick clear, line-sensitive, and trustworthy."
  };
}

export function playToInboxCard(play: StructuredPlay): InboxPlay {
  if (play.source === "lakers") {
    return {
      id: play.id,
      capper: "FirstBasketMan",
      pick: play.pick,
      unit: play.unitSize,
      playableTo: play.playableTo,
      note: "Draft needs more detail before this should be sent as an official play.",
      status: play.status
    };
  }

  return {
    id: play.id,
    capper: "FirstBasketMan",
    pick: "Jalen Brunson Over 24.5 PRA",
    unit: "1u",
    playableTo: "26.5",
    note: "Pace spot with usage upside if Hart sits.",
    status: "Active"
  };
}

export const fallbackInboxPlay: InboxPlay = {
  id: "fallback-brunson",
  capper: "FirstBasketMan",
  pick: "Jalen Brunson Over 24.5 PRA",
  unit: "1u",
  playableTo: "26.5",
  note: "Pace spot with usage upside if Hart sits.",
  status: "Active"
};

export const mockInboxPlays: InboxPlay[] = [
  {
    id: "mets-f5",
    capper: "FirstBasketMan",
    pick: "Mets F5 -0.5",
    unit: "0.75u",
    playableTo: "-135",
    note: "Weather risk if wind shifts.",
    status: "Line-sensitive"
  },
  {
    id: "aces-team-total",
    capper: "CourtEdge",
    pick: "Aces Team Total Over 86.5",
    unit: "1u",
    playableTo: "88.5",
    note: "Pace edge and matchup advantage.",
    status: "Active"
  }
];
