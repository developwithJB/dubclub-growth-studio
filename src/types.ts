export type PlayStatus = "Needs Review" | "Needs More Detail" | "Active" | "Line-sensitive";

export type StructuredPlay = {
  id: string;
  source: "brunson" | "lakers";
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
  responsiblePlayNote: string;
  suggestedSendTime: string;
  audienceSegment: string;
  businessGoal: string;
};

export type InboxPlay = {
  id: string;
  capper: string;
  pick: string;
  unit: string;
  playableTo: string;
  note: string;
  status: PlayStatus;
};
