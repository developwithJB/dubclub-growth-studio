export type PlayStatus = "Needs Review" | "Needs More Detail" | "Active" | "Line-sensitive";

export type PlaySource = "nba-playoff" | "wnba" | "nhl-playoff" | "mlb-hype";
export type CapperId = "greeklocks" | "propgeekzeke" | "theparlayplug" | "skohty";
export type AgentStyle = "proof-first" | "sharp-breakdown" | "high-energy" | "premium-minimal";
export type MirrorVoice = "original" | CapperId;
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

export type StructuredPlay = {
  id: string;
  source: PlaySource;
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
  capperId: CapperId;
  capper: string;
  pick: string;
  unit: string;
  playableTo: string;
  note: string;
  status: PlayStatus;
};
