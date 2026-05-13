import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  Bookmark,
  Captions,
  Check,
  Clapperboard,
  Clock,
  ClipboardCheck,
  Inbox,
  Lightbulb,
  Mic,
  Package,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Video,
  Wand2,
  Zap
} from "lucide-react";
import {
  examples,
  fallbackInboxPlay,
  generateGrowthPack,
  generateStructuredPlay,
  mockInboxPlays,
  playToInboxCard
} from "./lib/generate";
import type { InboxPlay, StructuredPlay } from "./types";

type Tab = "studio" | "growth" | "trust" | "insights";
type GrowthChannel =
  | "All"
  | "DubClub"
  | "Push"
  | "X"
  | "Discord"
  | "YouTube Shorts"
  | "IG/TikTok"
  | "Audio";

const tabs: Array<{ id: Tab; label: string; icon: typeof Wand2 }> = [
  { id: "studio", label: "Studio", icon: Wand2 },
  { id: "growth", label: "Growth Pack", icon: Package },
  { id: "trust", label: "Trust Inbox", icon: Inbox },
  { id: "insights", label: "Insights", icon: BarChart3 }
];

const growthChannels: GrowthChannel[] = [
  "All",
  "DubClub",
  "Push",
  "X",
  "Discord",
  "YouTube Shorts",
  "IG/TikTok",
  "Audio"
];

const brunsonDemoPlay = generateStructuredPlay(examples.strong);
const PUBLISHABLE_SCORE = 70;

const isPublishablePlay = (play: StructuredPlay | null | undefined) =>
  Boolean(play && play.qualityScore >= PUBLISHABLE_SCORE);

const playTitle = (play: StructuredPlay) => (play.player ? `${play.player} ${play.pick}` : play.pick);

const scoreTone = (score: number) =>
  score >= 70
    ? "border-dub-green/40 bg-dub-green/10 text-dub-green"
    : "border-dub-amber/50 bg-dub-amber/10 text-dub-amber";

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("studio");
  const [rawInput, setRawInput] = useState(examples.strong);
  const [play, setPlay] = useState<StructuredPlay | null>(null);
  const [tailedPlays, setTailedPlays] = useState<InboxPlay[]>([]);
  const [confirmationId, setConfirmationId] = useState<string | null>(null);

  const activeView = useMemo(() => {
    if (activeTab === "growth") {
      return <GrowthPackTab play={play} />;
    }

    if (activeTab === "trust") {
      return (
        <TrustInboxTab
          play={play}
          tailedPlays={tailedPlays}
          confirmationId={confirmationId}
          onTail={(inboxPlay) => {
            setTailedPlays((current) =>
              current.some((item) => item.id === inboxPlay.id) ? current : [...current, inboxPlay]
            );
            setConfirmationId(inboxPlay.id);
          }}
        />
      );
    }

    if (activeTab === "insights") {
      return <InsightsTab play={play} />;
    }

    return (
      <StudioTab
        rawInput={rawInput}
        play={play}
        onRawInputChange={(value) => {
          setRawInput(value);
          setPlay(null);
        }}
        onGenerate={() => setPlay(generateStructuredPlay(rawInput))}
      />
    );
  }, [activeTab, confirmationId, play, rawInput, tailedPlays]);

  return (
    <div className="h-dvh overflow-hidden bg-[#050506] text-white sm:flex sm:items-center sm:justify-center sm:p-5">
      <section className="relative mx-auto flex h-full min-h-0 w-full max-w-[430px] flex-col overflow-hidden bg-dub-ink sm:max-h-[900px] sm:rounded-[38px] sm:border sm:border-white/10 sm:shadow-2xl">
        <AppHeader />
        <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-5">
          {activeView}
        </main>
        <BottomTabs activeTab={activeTab} onChange={setActiveTab} />
      </section>
    </div>
  );
}

function AppHeader() {
  return (
    <header className="shrink-0 border-b border-dub-border/80 px-5 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="dub-logo shrink-0 bg-dub-green px-3 py-1 shadow-glow">
            <span className="text-[15px] font-black uppercase italic leading-none tracking-tight text-black">
              DUBCLUB
            </span>
          </div>
          <h1 className="truncate text-[18px] font-black leading-none tracking-tight text-white">
            Growth Studio
          </h1>
        </div>
        <button
          className="shrink-0 rounded-full p-1 text-white transition hover:bg-white/10"
          aria-label="Notifications"
          type="button"
        >
          <Bell size={22} strokeWidth={2.6} />
        </button>
      </div>
    </header>
  );
}

function ProductLoopMini() {
  const steps = ["Raw", "Review", "Pack", "Fan", "Insight"];

  return (
    <section className="rounded-2xl border border-white/10 bg-black/25 p-3">
      <div className="flex items-center justify-between gap-1">
        {steps.map((step, index) => (
          <div key={step} className="flex min-w-0 flex-1 items-center gap-1">
            <span
              className={`block min-w-0 flex-1 rounded-full px-2 py-1.5 text-center text-[10px] font-black uppercase tracking-[0.08em] ${
                index === 0 ? "bg-dub-green text-black" : "bg-white/8 text-white"
              }`}
            >
              {step}
            </span>
            {index < steps.length - 1 ? (
              <span className="shrink-0 text-[10px] font-black text-dub-muted">&rarr;</span>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function BottomTabs({ activeTab, onChange }: { activeTab: Tab; onChange: (tab: Tab) => void }) {
  return (
    <nav className="safe-bottom shrink-0 border-t border-dub-border/80 bg-[#0b0b0d]/95 px-3 pt-2 backdrop-blur">
      <div className="grid grid-cols-4 items-end gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`flex flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[10px] font-bold transition ${
                isActive ? "text-white" : "text-dub-muted hover:text-white"
              }`}
            >
              <span
                className={`grid h-10 w-10 place-items-center rounded-full border transition ${
                  isActive
                    ? "border-dub-green/60 bg-dub-green text-black shadow-glow"
                    : "border-transparent bg-transparent"
                }`}
              >
                <Icon size={21} strokeWidth={isActive ? 3 : 2.4} />
              </span>
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function StudioTab({
  rawInput,
  play,
  onRawInputChange,
  onGenerate
}: {
  rawInput: string;
  play: StructuredPlay | null;
  onRawInputChange: (value: string) => void;
  onGenerate: () => void;
}) {
  const reviewRef = useRef<HTMLDivElement | null>(null);
  const activeSample = rawInput === examples.hype ? "hype" : "strong";
  const sampleOptions = [
    {
      id: "strong",
      label: "Publishable prop sample",
      description: "Complete enough to become subscriber-ready.",
      value: examples.strong,
      tone: "green"
    },
    {
      id: "hype",
      label: "Held hype draft",
      description: "Shows how Growth Studio blocks weak inputs.",
      value: examples.hype,
      tone: "amber"
    }
  ];

  useEffect(() => {
    if (!play) {
      return;
    }

    requestAnimationFrame(() => {
      reviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [play]);

  return (
    <div className="space-y-4">
      <PageIntro
        title="Studio"
        subtitle="Pick a sample signal and generate the capper review."
        chip="Local sample workflow"
      />

      <section className="rounded-[24px] border border-dub-green/25 bg-[linear-gradient(145deg,rgba(54,255,34,0.20),rgba(23,23,25,0.92)_48%,rgba(5,5,6,0.98))] p-5 shadow-glow">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-dub-green">
          Growth Studio
        </p>
        <h2 className="mt-3 text-[34px] font-black leading-[0.96] tracking-tight text-white">
          Raw signal <span className="text-dub-green">&rarr;</span> trusted play card
        </h2>
        <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-stretch gap-2">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-dub-muted">
              Before
            </p>
            <p className="mt-2 text-sm font-black leading-tight text-white">Messy shorthand</p>
          </div>
          <div className="grid place-items-center text-dub-green">
            <Wand2 size={20} strokeWidth={3} />
          </div>
          <div className="rounded-2xl border border-dub-green/30 bg-dub-green/10 p-3">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-dub-green">
              After
            </p>
            <p className="mt-2 text-sm font-black leading-tight text-white">Capper review</p>
          </div>
        </div>
      </section>

      <ProductLoopMini />

      <section className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {sampleOptions.map((sample) => {
            const isSelected = activeSample === sample.id;
            const isAmber = sample.tone === "amber";

            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => onRawInputChange(sample.value)}
                className={`rounded-2xl border p-3 text-left transition ${
                  isSelected
                    ? isAmber
                      ? "border-dub-amber/65 bg-dub-amber/10"
                      : "border-dub-green/65 bg-dub-green/10 shadow-glow"
                    : "border-dub-border bg-dub-card hover:border-white/25"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[13px] font-black leading-tight text-white">{sample.label}</p>
                  <span
                    className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                      isSelected ? (isAmber ? "bg-dub-amber" : "bg-dub-green") : "bg-white/20"
                    }`}
                  />
                </div>
                <p className="mt-2 text-[11px] font-semibold leading-snug text-dub-muted">
                  {sample.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-dub-border bg-dub-card p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-dub-muted">
              Selected raw signal
            </p>
            <span className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[10px] font-black text-dub-muted">
              Read-only
            </span>
          </div>
          <p className="mt-3 text-[15px] font-black leading-relaxed text-white">{rawInput}</p>
          <p className="mt-3 text-xs font-bold text-dub-muted">
            This prototype uses local sample signals only.
          </p>
        </div>

        <button
          type="button"
          onClick={onGenerate}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-dub-green px-4 py-4 text-[16px] font-black text-black shadow-glow transition hover:bg-white"
        >
          <Wand2 size={20} strokeWidth={2.8} />
          Generate Structured Play
        </button>
      </section>

      {play ? (
        <div ref={reviewRef} className="scroll-mt-4">
          <StructuredReviewCard play={play} />
        </div>
      ) : null}
    </div>
  );
}

function StructuredReviewCard({ play }: { play: StructuredPlay }) {
  const publishable = isPublishablePlay(play);

  return (
    <section
      className={`rounded-[22px] border p-4 ${
        !publishable
          ? "border-dub-amber/60 bg-[linear-gradient(145deg,rgba(255,189,61,0.16),rgba(34,27,16,0.94))]"
          : "border-dub-green/30 bg-[linear-gradient(145deg,rgba(54,255,34,0.09),rgba(23,23,25,0.98))]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={`text-xs font-black uppercase tracking-[0.2em] ${
              !publishable ? "text-dub-amber" : "text-dub-green"
            }`}
          >
            Structured Play Review
          </p>
          <h2 className="mt-2 text-[26px] font-black leading-tight tracking-tight text-white">
            {playTitle(play)}
          </h2>
          <StatusPill status={play.status} />
        </div>
        <div
          className={`rounded-[20px] border px-4 py-3 text-center ${scoreTone(play.qualityScore)}`}
        >
          <p className="text-[48px] font-black leading-none tracking-tight">{play.qualityScore}</p>
          <p className="mt-1 text-[10px] font-black uppercase tracking-[0.16em]">
            Quality Score
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {play.player ? <Field label="Player" value={play.player} /> : null}
        <Field label="Sport" value={play.sport} />
        <Field label="Market" value={play.market} />
        <Field label="Unit Size" value={play.unitSize} warn={play.unitSize === "Missing"} />
        <Field label="Playable To" value={play.playableTo} warn={play.playableTo === "Missing"} />
      </div>

      <div className="mt-4 rounded-xl border border-white/8 bg-black/25 p-3">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-dub-muted">Reasoning</p>
        <p
          className={`mt-2 text-sm font-semibold leading-relaxed ${
            play.reasoning === "Missing" ? "text-dub-amber" : "text-white"
          }`}
        >
          {play.reasoning}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-dub-muted">
          Missing Details
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {play.missingDetails.map((detail) => (
            <span
              key={detail}
              className={`rounded-full border px-3 py-1.5 text-xs font-black ${
                !publishable
                  ? "border-dub-amber/35 bg-dub-amber/10 text-dub-amber"
                  : "border-white/10 bg-dub-panel text-white"
              }`}
            >
              {detail}
            </span>
          ))}
        </div>
      </div>

      <div
        className={`mt-4 flex gap-3 rounded-xl border p-3 ${
          !publishable ? "border-dub-amber/40 bg-dub-amber/10" : "border-dub-green/30 bg-dub-green/10"
        }`}
      >
        {!publishable ? (
          <AlertTriangle className="mt-0.5 shrink-0 text-dub-amber" size={20} />
        ) : (
          <ShieldCheck className="mt-0.5 shrink-0 text-dub-green" size={20} />
        )}
        <div>
          <p className="text-sm font-black text-white">Risk flag</p>
          <p className="mt-1 text-sm leading-relaxed text-white/80">{play.riskFlag}</p>
        </div>
      </div>

      {!publishable ? (
        <div className="mt-4 rounded-xl border border-dub-amber/45 bg-dub-amber/10 p-3">
          <p className="text-sm font-black text-dub-amber">
            Draft held &mdash; needs more detail before fan delivery.
          </p>
          <p className="mt-1 text-sm font-semibold leading-relaxed text-white/80">
            This is not ready for subscribers. Add the missing details before Growth Studio sends it
            into fan-facing channels.
          </p>
        </div>
      ) : null}

      {!publishable ? (
        <div className="mt-4 flex gap-3 rounded-xl border border-dub-amber/40 bg-black/35 p-3">
          <AlertTriangle className="mt-0.5 shrink-0 text-dub-amber" size={20} />
          <div>
            <p className="text-sm font-black text-dub-amber">Tone warning</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-white/80">
              This reads like hype, not a subscriber-ready play. Add price, unit size, opponent,
              reasoning, and a playable-to number before publishing.
            </p>
          </div>
        </div>
      ) : null}

      {play.suggestedRewrite ? (
        <div className="mt-4 rounded-2xl border border-dub-amber/50 bg-dub-amber/10 p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-dub-amber">
            Suggested Rewrite
          </p>
          <p className="mt-2 text-[15px] font-black leading-relaxed text-white">
            {play.suggestedRewrite}
          </p>
        </div>
      ) : null}

      <p className="mt-4 rounded-2xl border border-white/10 bg-black/35 p-4 text-center text-[13px] font-black leading-relaxed text-white">
        The capper owns the play. Growth Studio improves structure, clarity, and distribution.
      </p>
    </section>
  );
}

function GrowthPackTab({ play }: { play: StructuredPlay | null }) {
  const displayPlay = play ?? brunsonDemoPlay;
  const publishable = isPublishablePlay(displayPlay);
  const pack = generateGrowthPack(displayPlay);
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [activeChannel, setActiveChannel] = useState<GrowthChannel>("All");

  const sections: Array<{
    title: string;
    eyebrow: string;
    cards: Array<{
      title: string;
      value: string;
      icon: JSX.Element;
      cta: string;
      doneLabel: string;
      channels: GrowthChannel[];
    }>;
  }> = [
    {
      title: "Text Delivery",
      eyebrow: "Subscriber and social distribution",
      cards: [
        {
          title: "DubClub Post",
          value: pack.dubClubPost,
          icon: <Send size={18} />,
          cta: "Queue DubClub Post",
          doneLabel: "Post queued",
          channels: ["DubClub"]
        },
        {
          title: "Push Notification",
          value: pack.pushNotification,
          icon: <Zap size={18} />,
          cta: "Schedule Push",
          doneLabel: "Push scheduled",
          channels: ["Push"]
        },
        {
          title: "X Teaser",
          value: pack.xTeaser,
          icon: <Sparkles size={18} />,
          cta: "Copy X Teaser",
          doneLabel: "Teaser copied",
          channels: ["X"]
        },
        {
          title: "Discord/SMS Blurb",
          value: pack.discordSms,
          icon: <Inbox size={18} />,
          cta: "Queue Blurb",
          doneLabel: "Blurb queued",
          channels: ["Discord"]
        }
      ]
    },
    {
      title: "Short-Form Video",
      eyebrow: "YouTube Shorts, IG Reels, and TikTok",
      cards: [
        {
          title: "Video Hook",
          value: pack.shortFormHook,
          icon: <Clapperboard size={18} />,
          cta: "Queue Short-Form",
          doneLabel: "Short-form queued",
          channels: ["YouTube Shorts", "IG/TikTok"]
        },
        {
          title: "30-Second Script",
          value: pack.shortFormScript,
          icon: <Video size={18} />,
          cta: "Copy Video Script",
          doneLabel: "Script copied",
          channels: ["YouTube Shorts", "IG/TikTok"]
        },
        {
          title: "Short-Form Caption",
          value: pack.shortFormCaption,
          icon: <Captions size={18} />,
          cta: "Copy Caption",
          doneLabel: "Caption copied",
          channels: ["YouTube Shorts", "IG/TikTok"]
        }
      ]
    },
    {
      title: "Audio",
      eyebrow: "Voice note or podcast-style read",
      cards: [
        {
          title: "30-Second Audio Read",
          value: pack.audioRead,
          icon: <Mic size={18} />,
          cta: "Save Audio Read",
          doneLabel: "Audio read saved",
          channels: ["Audio"]
        }
      ]
    },
    {
      title: "Ops",
      eyebrow: "Guardrails, timing, segment, and goal",
      cards: [
        {
          title: "Responsible Play Note",
          value: pack.responsiblePlayNote,
          icon: <ShieldCheck size={18} />,
          cta: "Attach Note",
          doneLabel: "Note attached",
          channels: []
        },
        {
          title: "Suggested Send Time",
          value: pack.suggestedSendTime,
          icon: <Clock size={18} />,
          cta: "Use Send Time",
          doneLabel: "Send time selected",
          channels: []
        },
        {
          title: "Audience Segment",
          value: pack.audienceSegment,
          icon: <Users size={18} />,
          cta: "Apply Segment",
          doneLabel: "Segment applied",
          channels: []
        },
        {
          title: "Business Goal",
          value: pack.businessGoal,
          icon: <Target size={18} />,
          cta: "Track Goal",
          doneLabel: "Goal tracked",
          channels: []
        }
      ]
    }
  ];
  const visibleSections = sections
    .map((section) => ({
      ...section,
      cards:
        activeChannel === "All"
          ? section.cards
          : section.cards.filter((card) => card.channels.includes(activeChannel))
    }))
    .filter((section) => section.cards.length > 0);
  const visibleAssetCount = visibleSections.reduce((total, section) => total + section.cards.length, 0);

  return (
    <div className="space-y-4">
      <PageIntro
        title="Growth Pack"
        subtitle="Turn one structured play into a full creator growth package."
        chip="Package once, distribute everywhere"
      />
      <GrowthSourceCard play={displayPlay} publishable={publishable} />
      <ChannelMixRow
        activeChannel={activeChannel}
        visibleAssetCount={visibleAssetCount}
        onChange={setActiveChannel}
      />
      <DoorDashAnalogyCard />
      {!publishable ? (
        <HeldDraftWarning>
          Draft held. Growth Studio will not generate subscriber-ready delivery until required
          details are added.
        </HeldDraftWarning>
      ) : null}
      {visibleSections.map((section) => (
        <GrowthSection key={section.title} title={section.title} eyebrow={section.eyebrow}>
          {section.cards.map((card) => (
            <GrowthCard
              key={card.title}
              {...card}
              actioned={completedActions.includes(`${displayPlay.id}:${card.title}`)}
              disabled={!publishable}
              lowQuality={!publishable}
              onAction={() => {
                const actionId = `${displayPlay.id}:${card.title}`;
                setCompletedActions((current) =>
                  current.includes(actionId) ? current : [...current, actionId]
                );
              }}
            />
          ))}
        </GrowthSection>
      ))}
    </div>
  );
}

function ChannelMixRow({
  activeChannel,
  visibleAssetCount,
  onChange
}: {
  activeChannel: GrowthChannel;
  visibleAssetCount: number;
  onChange: (channel: GrowthChannel) => void;
}) {
  return (
    <section className="rounded-2xl border border-dub-border bg-dub-card p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-dub-muted">
          Channel Mix
        </p>
        <p className="shrink-0 text-[11px] font-black text-dub-green">
          {visibleAssetCount} {visibleAssetCount === 1 ? "asset" : "assets"}
        </p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {growthChannels.map((channel) => {
          const isActive = activeChannel === channel;

          return (
            <button
            key={channel}
              type="button"
              onClick={() => onChange(channel)}
              className={`rounded-full border px-3 py-1.5 text-[11px] font-black transition ${
                isActive
                  ? "border-dub-green bg-dub-green text-black shadow-glow"
                  : "border-white/10 bg-black/25 text-white hover:border-dub-green/40"
              }`}
          >
            {channel}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs font-bold text-dub-muted">
        {activeChannel === "All"
          ? `Showing all ${visibleAssetCount} growth assets.`
          : `Showing ${visibleAssetCount} ${
              visibleAssetCount === 1 ? "asset" : "assets"
            } for ${activeChannel}.`}
      </p>
    </section>
  );
}

function GrowthSection({
  title,
  eyebrow,
  children
}: {
  title: string;
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-dub-green">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-xl font-black tracking-tight text-white">{title}</h2>
      </div>
      <div className="grid gap-3">{children}</div>
    </section>
  );
}

function GrowthSourceCard({
  play,
  publishable
}: {
  play: StructuredPlay;
  publishable: boolean;
}) {
  return (
    <section
      className={`rounded-2xl border p-4 ${
        publishable ? "border-dub-green/25 bg-dub-green/10" : "border-dub-amber/35 bg-dub-amber/10"
      }`}
    >
      <p className="text-xs font-black uppercase tracking-[0.18em] text-dub-muted">
        Generated from Studio
      </p>
      <div className="mt-2 flex items-center justify-between gap-3">
        <div>
          <p className="text-[16px] font-black leading-tight text-white">{playTitle(play)}</p>
          <p className="mt-1 text-xs font-bold text-dub-muted">
            Quality score {play.qualityScore} · {publishable ? "ready for action" : "held draft"}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${
            publishable ? "bg-dub-green text-black" : "bg-dub-amber text-black"
          }`}
        >
          {publishable ? "Actionable" : "Held"}
        </span>
      </div>
    </section>
  );
}

function DoorDashAnalogyCard() {
  return (
    <section className="rounded-2xl border border-dub-green/25 bg-dub-green/10 p-4">
      <div className="mb-2 flex items-center gap-2 text-dub-green">
        <Lightbulb size={18} />
        <p className="text-xs font-black uppercase tracking-[0.18em]">Creator OS angle</p>
      </div>
      <p className="text-[15px] font-semibold leading-relaxed text-white">
        Creators need more than a place to post. Growth Studio helps cappers package, distribute,
        and learn from their signal.
      </p>
    </section>
  );
}

function HeldDraftWarning({ children }: { children: string }) {
  return (
    <section className="flex gap-3 rounded-2xl border border-dub-amber/45 bg-dub-amber/10 p-4">
      <AlertTriangle className="mt-0.5 shrink-0 text-dub-amber" size={20} />
      <p className="text-sm font-black leading-relaxed text-white">{children}</p>
    </section>
  );
}

function GrowthCard({
  title,
  value,
  icon,
  cta,
  doneLabel,
  actioned,
  disabled,
  lowQuality,
  onAction
}: {
  title: string;
  value: string;
  icon: JSX.Element;
  cta: string;
  doneLabel: string;
  actioned: boolean;
  disabled: boolean;
  lowQuality: boolean;
  onAction: () => void;
}) {
  return (
    <article
      className={`rounded-2xl border p-4 ${
        lowQuality ? "border-dub-amber/30 bg-[#1c1710]" : "border-dub-border bg-dub-card"
      }`}
    >
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`grid h-8 w-8 place-items-center rounded-full ${
            lowQuality ? "bg-dub-amber/15 text-dub-amber" : "bg-dub-green/15 text-dub-green"
          }`}
        >
          {icon}
        </span>
        <h3 className="text-[15px] font-black text-white">{title}</h3>
      </div>
      <p className="text-sm font-semibold leading-relaxed text-white/82">{value}</p>
      <button
        type="button"
        onClick={onAction}
        disabled={disabled || actioned}
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black transition ${
          actioned
            ? "bg-dub-green text-black"
            : disabled
              ? "cursor-not-allowed border border-dub-amber/25 bg-dub-amber/10 text-dub-amber"
              : "bg-dub-green text-black shadow-glow hover:bg-white"
        }`}
      >
        {actioned ? <Check size={17} /> : null}
        {actioned ? doneLabel : disabled ? "Held for details" : cta}
      </button>
    </article>
  );
}

function TrustInboxTab({
  play,
  tailedPlays,
  confirmationId,
  onTail
}: {
  play: StructuredPlay | null;
  tailedPlays: InboxPlay[];
  confirmationId: string | null;
  onTail: (play: InboxPlay) => void;
}) {
  const currentPlayPublishable = isPublishablePlay(play);
  const heldDraft = play && !currentPlayPublishable ? play : null;
  const generatedInboxPlay = currentPlayPublishable && play ? playToInboxCard(play) : fallbackInboxPlay;
  const inboxPlays = [generatedInboxPlay, ...mockInboxPlays];

  return (
    <div className="space-y-5">
      <PageIntro
        title="Trust Inbox"
        subtitle="Show how the subscriber receives and acts on the play."
        chip="Fan-facing trust surface"
      />
      {heldDraft ? (
        <HeldDraftWarning>
          {`Latest draft held: ${heldDraft.pick} needs unit size, price, opponent, reasoning, and playable-to number before subscribers see it.`}
        </HeldDraftWarning>
      ) : null}
      <TrustActionGuide />

      <section className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-dub-green">
            Subscriber-ready
          </p>
          <h2 className="mt-1 text-xl font-black text-white">Available Plays</h2>
        </div>
        <span className="rounded-full border border-white/10 bg-dub-card px-3 py-1.5 text-xs font-black text-dub-muted">
          {inboxPlays.length} cards
        </span>
      </section>
      <div className="grid gap-3">
        {inboxPlays.map((inboxPlay, index) => {
          const isTailed = tailedPlays.some((item) => item.id === inboxPlay.id);

          return (
            <InboxCard
              key={inboxPlay.id}
              play={inboxPlay}
              sourceLabel={index === 0 ? "Generated from Studio" : "Capper update"}
              isTailed={isTailed}
              confirmed={confirmationId === inboxPlay.id}
              onTail={() => onTail(inboxPlay)}
            />
          );
        })}
      </div>

      <section className="rounded-2xl border border-dub-border bg-dub-card p-4">
        <div className="flex items-center gap-2">
          <Bookmark size={18} className="text-dub-green" />
          <h3 className="text-lg font-black text-white">Tailed Plays</h3>
        </div>
        {tailedPlays.length === 0 ? (
          <p className="mt-3 text-sm font-semibold text-dub-muted">
            Tail plays to save them here for easy access later.
          </p>
        ) : (
          <div className="mt-3 space-y-2">
            {tailedPlays.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-dub-green/20 bg-dub-green/10 px-3 py-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-dub-green">
                      {item.capper}
                    </p>
                    <p className="mt-1 text-sm font-black text-white">{item.pick}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-dub-green px-2.5 py-1 text-xs font-black text-black">
                    {item.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function TrustActionGuide() {
  const steps = ["Review card", "Confirm line", "Tail Pick"];

  return (
    <section className="rounded-2xl border border-dub-green/25 bg-dub-green/10 p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-dub-green">
        Fan action flow
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {steps.map((step, index) => (
          <div key={step} className="rounded-xl border border-white/10 bg-black/25 p-3 text-center">
            <p className="mx-auto grid h-7 w-7 place-items-center rounded-full bg-dub-green text-xs font-black text-black">
              {index + 1}
            </p>
            <p className="mt-2 text-[11px] font-black leading-tight text-white">{step}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm font-semibold leading-relaxed text-white/78">
        Fans only see structured, publishable plays. Held drafts stay internal until the capper adds
        the missing details.
      </p>
    </section>
  );
}

function InboxCard({
  play,
  sourceLabel,
  isTailed,
  confirmed,
  onTail
}: {
  play: InboxPlay;
  sourceLabel: string;
  isTailed: boolean;
  confirmed: boolean;
  onTail: () => void;
}) {
  const disabled = play.status === "Needs More Detail" || play.unit === "Missing" || play.playableTo === "Missing";

  return (
    <article className="rounded-2xl border border-dub-border bg-dub-card p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-dub-green/25 bg-dub-green/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-dub-green">
          {sourceLabel}
        </span>
        <StatusPill status={play.status} compact />
      </div>

      <div className="mt-4 flex min-w-0 items-center gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-dub-green text-xl font-black text-black">
          {play.capper.slice(0, 1)}
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-dub-muted">
            Capper
          </p>
          <p className="mt-1 truncate text-lg font-black leading-none text-white">{play.capper}</p>
        </div>
      </div>

      <h3 className="mt-4 text-[24px] font-black leading-tight tracking-tight text-white">
        {play.pick}
      </h3>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Field label="Unit Size" value={play.unit} warn={play.unit === "Missing"} />
        <Field label="Playable To" value={play.playableTo} warn={play.playableTo === "Missing"} />
      </div>

      <div className="mt-4 rounded-xl border border-white/8 bg-black/25 p-3">
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-dub-muted">
          Capper note
        </p>
        <p className="mt-2 text-sm font-semibold leading-relaxed text-white/82">{play.note}</p>
      </div>
      <p className="mt-3 rounded-xl border border-white/8 bg-black/20 px-3 py-2 text-xs font-black text-dub-muted">
        Confirm your line. Bet responsibly.
      </p>

      <button
        type="button"
        onClick={onTail}
        disabled={disabled || isTailed}
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black transition ${
          isTailed
            ? "bg-dub-green text-black"
            : disabled
              ? "cursor-not-allowed bg-dub-panel text-dub-muted"
              : "bg-dub-green text-black shadow-glow hover:bg-white"
        }`}
      >
        {isTailed ? <Check size={18} /> : <Plus size={18} />}
        {isTailed ? "Tailed" : "Tail Pick"}
      </button>

      {confirmed ? (
        <p className="mt-3 rounded-xl bg-dub-green/10 px-3 py-2 text-center text-xs font-black text-dub-green">
          Saved to Tailed Plays
        </p>
      ) : null}
    </article>
  );
}

function InsightsTab({ play }: { play: StructuredPlay | null }) {
  const heldDraft = play && !isPublishablePlay(play);
  const channelMetrics = [
    { label: "Push Open Rate", value: "32%", progress: 32 },
    { label: "X Teaser CTR", value: "11%", progress: 24 },
    { label: "Discord/SMS Replies", value: "4", progress: 36 },
    { label: "Short-Form Views", value: "1.8k", progress: 72 },
    { label: "Video Saves", value: "14", progress: 58 },
    { label: "Audio Completion", value: "46%", progress: 46 }
  ];

  const summaryMetrics = [
    ["Tails", "18"],
    ["Saves", "6"],
    ["Replies", "4"],
    ["Best Lever", "Short-form"]
  ];

  return (
    <div className="space-y-5">
      <PageIntro
        title="Insights"
        subtitle="Close the loop with creator performance insight."
        chip="Creator coaching layer"
      />
      {heldDraft ? (
        <HeldDraftWarning>
          Low-quality drafts are excluded from fan delivery metrics until completed.
        </HeldDraftWarning>
      ) : null}

      <section className="grid grid-cols-2 gap-3">
        {summaryMetrics.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-dub-border bg-dub-card p-4">
            <p className="text-[12px] font-black uppercase tracking-[0.14em] text-dub-muted">
              {label}
            </p>
            <p className="mt-2 text-[24px] font-black leading-none text-white">{value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-dub-border bg-dub-card p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-dub-muted">
              Channel Performance
            </p>
            <h2 className="mt-1 text-xl font-black text-white">Growth mix</h2>
          </div>
          <BarChart3 className="text-dub-green" size={22} />
        </div>
        <div className="grid gap-3">
          {channelMetrics.map((metric) => (
            <ChannelMetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-dub-green/30 bg-dub-green/10 p-4">
        <div className="mb-2 flex items-center gap-2 text-dub-green">
          <Sparkles size={18} />
          <p className="text-xs font-black uppercase tracking-[0.2em]">Recommendation</p>
        </div>
        <p className="text-[15px] font-semibold leading-relaxed text-white">
          Use push for urgency, short-form video for discovery, and audio notes for trust.
        </p>
      </section>

      <section className="rounded-2xl border border-dub-border bg-dub-card p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-dub-muted">Next Action</p>
        <p className="mt-2 text-lg font-black leading-tight text-white">
          Record a 30-second recap after result and clip it for Reels, TikTok, and Shorts.
        </p>
      </section>

      <section className="rounded-2xl border border-dub-border bg-dub-card p-4">
        <h3 className="text-lg font-black text-white">Why this matters</h3>
        <div className="mt-4 grid gap-3">
          {[
            "Structured plays make every channel easier to package.",
            "Short-form drives discovery while DubClub keeps the paid card trusted.",
            "Audio and recap assets help cappers build voice without becoming an odds engine."
          ].map((item) => (
            <div key={item} className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-dub-green" />
              <p className="text-sm font-semibold leading-relaxed text-white/82">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <BulletCard
        icon={<ClipboardCheck size={18} />}
        title="Tradeoffs I intentionally made"
        items={[
          "Avoided live odds infrastructure.",
          "Avoided sportsbook integrations.",
          "Avoided automated betting.",
          "Used mocked data to keep the prototype lightweight.",
          "Focused upstream on structured publishing because that improves tailing, recaps, notifications, and analytics later."
        ]}
      />

      <BulletCard
        icon={<Lightbulb size={18} />}
        title="What I would improve next"
        items={[
          "Connect to real DubClub publishing channels.",
          "Add capper-specific voice and templates.",
          "Add schema validation before publish.",
          "Add post-game recap generation.",
          "Connect performance data back into creator coaching.",
          "Explore integration with existing DubClub AI/analytics surfaces."
        ]}
      />

      <section className="rounded-2xl border border-white/10 bg-white p-4 text-center text-sm font-black leading-relaxed text-black">
        Raw Capper Signal &rarr; Structured Play &rarr; Growth Pack &rarr; Fan Trust Inbox &rarr;
        Tail Pick &rarr; Performance Insight.
      </section>
    </div>
  );
}

function ChannelMetricCard({
  label,
  value,
  progress
}: {
  label: string;
  value: string;
  progress: number;
}) {
  return (
    <article className="rounded-xl border border-white/8 bg-black/25 p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-black uppercase tracking-[0.12em] text-dub-muted">
          {label}
        </p>
        <p className="shrink-0 text-lg font-black leading-none text-white">{value}</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full bg-dub-green shadow-glow"
          style={{ width: `${progress}%` }}
        />
      </div>
    </article>
  );
}

function BulletCard({
  icon,
  title,
  items
}: {
  icon: JSX.Element;
  title: string;
  items: string[];
}) {
  return (
    <section className="rounded-2xl border border-dub-border bg-dub-card p-4">
      <div className="flex items-center gap-2 text-dub-green">
        {icon}
        <h3 className="text-lg font-black text-white">{title}</h3>
      </div>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-dub-green" />
            <p className="text-sm font-semibold leading-relaxed text-white/82">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PageIntro({
  title,
  subtitle,
  chip
}: {
  title: string;
  subtitle: string;
  chip: string;
}) {
  return (
    <section className="space-y-2">
      <h1 className="text-[30px] font-black leading-none tracking-tight text-white">{title}</h1>
      <p className="text-[14px] font-bold leading-snug text-dub-muted">{subtitle}</p>
      <span className="inline-flex rounded-full border border-dub-green/25 bg-dub-green/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-dub-green">
        {chip}
      </span>
    </section>
  );
}

function Field({ label, value, warn = false }: { label: string; value: string; warn?: boolean }) {
  return (
    <div className="rounded-xl border border-white/8 bg-black/25 p-3">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-dub-muted">{label}</p>
      <p className={`mt-1 text-sm font-black ${warn ? "text-dub-amber" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}

function StatusPill({
  status,
  compact = false
}: {
  status: StructuredPlay["status"] | InboxPlay["status"];
  compact?: boolean;
}) {
  const needsMore = status === "Needs More Detail";
  const lineSensitive = status === "Line-sensitive";
  const active = status === "Active";

  return (
    <span
      className={`mt-3 inline-flex rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] ${
        compact ? "mt-0 whitespace-nowrap" : ""
      } ${
        needsMore
          ? "border-dub-amber/50 bg-dub-amber/10 text-dub-amber"
          : lineSensitive
            ? "border-white/20 bg-white/10 text-white"
            : active
              ? "border-dub-green/40 bg-dub-green/10 text-dub-green"
              : "border-dub-green/30 bg-dub-green/10 text-dub-green"
      }`}
    >
      {status}
    </span>
  );
}

export default App;
