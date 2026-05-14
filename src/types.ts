export type PlayStatus = "Needs Review" | "Needs More Detail" | "Active" | "Line-sensitive";

export type PlaySource = "nba-playoff" | "wnba" | "wnba-sheet" | "nhl-playoff" | "mlb-hype";
export type PlayFormat = "single" | "slate";
export type CapperId = "greeklocks" | "propgeekzeke" | "theparlayplug" | "skohty";
export type AgentStyle = "proof-first" | "sharp-breakdown" | "high-energy" | "premium-minimal";
export type SocialClipFormat =
  | "face-cam-hook"
  | "split-screen-breakdown"
  | "caption-first"
  | "proof-card-montage"
  | "podcast-clip";
export type AgentCreativeChannel = "YouTube Shorts" | "IG/TikTok" | "Audio";

export type CapperProfile = {
  id: CapperId;
  name: string;
  handle: string;
  avatarFallback: string;
  avatarUrl?: string;
  bannerUrl?: string;
  bannerStyle: string;
  avatarStyle: string;
  tags: string[];
  joined: string;
  subscribers: string;
  rating: string;
  reviews: string;
  bio: string;
  planName: string;
  price: string;
  interval: string;
  dailyPrice: string;
  delivery: string[];
};

export type StructuredPlayLeg = {
  id: string;
  team: string;
  teamName: string;
  teamColor: string;
  teamLogoUrl?: string;
  opponentLogoUrl?: string;
  player: string;
  playerInitials: string;
  playerImageUrl?: string;
  pick: string;
  odds: string;
  book: string;
  unitSize: string;
  league: string;
  market: string;
  playType: string;
  riskNote: string;
  missingContext: string[];
};

export type StructuredPlay = {
  id: string;
  source: PlaySource;
  format: PlayFormat;
  eventLabel: string;
  eventDate: string;
  player?: string;
  pick: string;
  sport: string;
  market: string;
  unitSize: string;
  playableTo: string;
  reasoning: string;
  missingDetails: string[];
  riskFlag: string;
  qualityScore: number;
  status: PlayStatus;
  legs?: StructuredPlayLeg[];
  suggestedRewrite?: string;
};

export type GrowthPack = {
  dubClubPost: string;
  pushNotification: string;
  xTeaser: string;
  discordSms: string;
  shortFormHook: string;
  shortFormScript: string;
  shortFormCaption: string;
  audioRead: string;
  responsiblePlayNote: string;
  suggestedSendTime: string;
  audienceSegment: string;
  businessGoal: string;
};

export type AgentCreativeOption = {
  id: string;
  channel: AgentCreativeChannel;
  title: string;
  eyebrow: string;
  hook: string;
  body: string;
  caption: string;
  cta: string;
  doneLabel: string;
};

export type InboxPlay = {
  id: string;
  format?: PlayFormat;
  capperId: CapperId;
  capper: string;
  pick: string;
  unit: string;
  playableTo: string;
  note: string;
  status: PlayStatus;
  leg?: StructuredPlayLeg;
  legs?: StructuredPlayLeg[];
  proofBadges?: string[];
  record?: string;
  roi?: string;
  subscribers?: string;
  recentForm?: string;
};
