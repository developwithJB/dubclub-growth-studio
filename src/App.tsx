import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
  CreditCard,
  Inbox,
  Mic,
  Package,
  Play,
  Plus,
  Radio,
  RefreshCw,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Users,
  Video,
  Wand2,
  Zap
} from "lucide-react";
import {
  capperProfiles,
  examples,
  fallbackInboxPlay,
  generateAgentCreativeOptions,
  generateGrowthPack,
  generateStructuredPlay,
  getCapperProfileForPlay,
  mockInboxPlays,
  playToInboxCard
} from "./lib/generate";
import type {
  AgentCreativeOption,
  AgentStyle,
  CapperProfile,
  InboxPlay,
  SocialClipFormat,
  StructuredPlay,
  StructuredPlayLeg
} from "./types";

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
  { id: "trust", label: "Capper Feed", icon: Inbox },
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

const agentStyles: Array<{ id: AgentStyle; label: string }> = [
  { id: "proof-first", label: "Proof-first" },
  { id: "sharp-breakdown", label: "Sharp breakdown" },
  { id: "high-energy", label: "High-energy" },
  { id: "premium-minimal", label: "Premium minimal" }
];

const socialClipFormats: Array<{ id: SocialClipFormat; label: string }> = [
  { id: "face-cam-hook", label: "Face-cam hook" },
  { id: "split-screen-breakdown", label: "Split-screen breakdown" },
  { id: "caption-first", label: "Caption-first edit" },
  { id: "proof-card-montage", label: "Proof-card montage" },
  { id: "podcast-clip", label: "Podcast-style clip" }
];

const defaultDemoPlay = generateStructuredPlay(examples.nbaPlayoff);
const PUBLISHABLE_SCORE = 70;

const isPublishablePlay = (play: StructuredPlay | null | undefined) =>
  Boolean(play && play.qualityScore >= PUBLISHABLE_SCORE);

const playTitle = (play: StructuredPlay) =>
  play.format === "slate" ? play.pick : play.player ? `${play.player} ${play.pick}` : play.pick;

const scoreTone = (score: number) =>
  score >= 70
    ? "border-dub-green/40 bg-dub-green/10 text-dub-green"
    : "border-dub-amber/50 bg-dub-amber/10 text-dub-amber";

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("studio");
  const [rawInput, setRawInput] = useState(examples.nbaPlayoff);
  const [play, setPlay] = useState<StructuredPlay | null>(null);
  const [tailedPlays, setTailedPlays] = useState<InboxPlay[]>([]);
  const [confirmationId, setConfirmationId] = useState<string | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [activeTab]);

  const activeView = useMemo(() => {
    if (activeTab === "growth") {
      return <GrowthPackTab play={play} />;
    }

    if (activeTab === "trust") {
      return (
        <CapperFeedTab
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
        onApprove={() => setActiveTab("growth")}
      />
    );
  }, [activeTab, confirmationId, play, rawInput, tailedPlays]);

  return (
    <div className="h-dvh overflow-hidden bg-[#050506] text-white sm:flex sm:items-center sm:justify-center sm:p-5">
      <section className="relative mx-auto flex h-full min-h-0 w-full max-w-[430px] flex-col overflow-hidden bg-dub-ink sm:max-h-[900px] sm:rounded-[38px] sm:border sm:border-white/10 sm:shadow-2xl">
        <AppHeader />
        <main
          ref={mainRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-5"
        >
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
    <section className="rounded-2xl border border-white/10 bg-black/25 p-2.5">
      <div className="flex items-center justify-between gap-1">
        {steps.map((step, index) => (
          <div key={step} className="flex min-w-0 flex-1 items-center gap-1">
            <span
              className={`block min-w-0 flex-1 rounded-full px-2 py-1.5 text-center text-[9px] font-black uppercase tracking-[0.08em] ${
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
  onGenerate,
  onApprove
}: {
  rawInput: string;
  play: StructuredPlay | null;
  onRawInputChange: (value: string) => void;
  onGenerate: () => void;
  onApprove: () => void;
}) {
  const reviewRef = useRef<HTMLDivElement | null>(null);
  const sampleOptions = [
    {
      id: "nba-playoff",
      label: "NBA Playoff",
      event: "Spurs at Timberwolves, Game 6",
      date: "Fri, May 15",
      value: examples.nbaPlayoff,
      sport: "NBA",
      tone: "green",
      status: "Publishable"
    },
    {
      id: "wnba-sheet",
      label: "FirstBasketMan Sheet",
      event: "Aces + Dream longshots",
      date: "Thu, May 14",
      value: examples.wnbaSheet,
      sport: "WNBA",
      tone: "green",
      status: "Slate"
    },
    {
      id: "nhl-playoff",
      label: "NHL Playoff",
      event: "Golden Knights at Ducks, Game 6",
      date: "Thu, May 14",
      value: examples.nhlPlayoff,
      sport: "NHL",
      tone: "green",
      status: "Publishable"
    },
    {
      id: "mlb-hype",
      label: "Held MLB Draft",
      event: "Giants at Dodgers",
      date: "Thu, May 14",
      value: examples.mlbHype,
      sport: "MLB",
      tone: "amber",
      status: "Held"
    }
  ];
  const activeSample =
    sampleOptions.find((sample) => sample.value === rawInput)?.id ?? sampleOptions[0].id;

  useEffect(() => {
    if (!play) {
      return;
    }

    requestAnimationFrame(() => {
      reviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [play]);

  return (
    <div className="space-y-3">
      <section className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-[28px] font-black leading-none tracking-tight text-white">Studio</h1>
          <p className="mt-1 text-[13px] font-bold leading-snug text-dub-muted">
            Pick a sample. Generate the review.
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-dub-green/25 bg-dub-green/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-dub-green">
          Local samples
        </span>
      </section>

      <section className="rounded-[22px] border border-dub-green/25 bg-[linear-gradient(145deg,rgba(54,255,34,0.18),rgba(23,23,25,0.92)_50%,rgba(5,5,6,0.98))] p-4 shadow-glow">
        <h2 className="text-[28px] font-black leading-none tracking-tight text-white">
          Raw signal <span className="text-dub-green">&rarr;</span> review card
        </h2>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-[0.1em]">
          <span className="min-w-0 rounded-full border border-white/10 bg-black/30 px-2.5 py-2 text-dub-muted">
            Shorthand
          </span>
          <Wand2 size={16} className="shrink-0 text-dub-green" strokeWidth={3} />
          <span className="min-w-0 rounded-full border border-dub-green/30 bg-dub-green/10 px-2.5 py-2 text-dub-green">
            Structured
          </span>
          <span className="min-w-0 rounded-full border border-white/10 bg-black/30 px-2.5 py-2 text-white">
            Actionable
          </span>
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
                  <p className="text-[14px] font-black leading-tight text-white">{sample.label}</p>
                  <span
                    className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                      isSelected ? (isAmber ? "bg-dub-amber" : "bg-dub-green") : "bg-white/20"
                    }`}
                  />
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  <span
                    className={`rounded-full px-2 py-1 text-[9px] font-black uppercase tracking-[0.08em] ${
                      isAmber ? "bg-dub-amber/15 text-dub-amber" : "bg-dub-green/15 text-dub-green"
                    }`}
                  >
                    {sample.sport}
                  </span>
                  <span className="rounded-full bg-white/8 px-2 py-1 text-[9px] font-black uppercase tracking-[0.08em] text-white">
                    {sample.date}
                  </span>
                  <span
                    className={`rounded-full px-2 py-1 text-[9px] font-black uppercase tracking-[0.08em] ${
                      isAmber ? "bg-dub-amber text-black" : "bg-dub-green text-black"
                    }`}
                  >
                    {sample.status}
                  </span>
                </div>
                <p className="mt-2 text-[11px] font-black leading-snug text-white">
                  {sample.event}
                </p>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onGenerate}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-dub-green px-4 py-3 text-[15px] font-black text-black shadow-glow transition hover:bg-white"
        >
          <Wand2 size={18} strokeWidth={2.8} />
          Generate Structured Play
        </button>

        <div className="rounded-2xl border border-dub-border bg-dub-card p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-dub-muted">
              Selected raw signal
            </p>
            <span className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[10px] font-black text-dub-muted">
              Read-only
            </span>
          </div>
          <p className="mt-2 text-[13px] font-black leading-relaxed text-white">{rawInput}</p>
          <p className="mt-2 text-[11px] font-bold text-dub-muted">
            Read-only local samples. Lines are mocked.
          </p>
        </div>
      </section>

      {play ? (
        <div ref={reviewRef} className="scroll-mt-4">
          <StructuredReviewCard play={play} onApprove={onApprove} />
        </div>
      ) : null}
    </div>
  );
}

function StructuredReviewCard({
  play,
  onApprove
}: {
  play: StructuredPlay;
  onApprove?: () => void;
}) {
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
            {play.format === "slate" ? "Structured Slate Review" : "Structured Play Review"}
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

      {play.legs?.length ? (
        <div className="mt-5">
          <PlayVisualRows legs={play.legs} />
        </div>
      ) : null}

      <div
        className={`mt-5 rounded-2xl border p-4 ${
          publishable ? "border-dub-green/35 bg-dub-green/10" : "border-dub-amber/45 bg-dub-amber/10"
        }`}
      >
        <p
          className={`text-xs font-black uppercase tracking-[0.18em] ${
            publishable ? "text-dub-green" : "text-dub-amber"
          }`}
        >
          Next step
        </p>
        <p className="mt-2 text-sm font-black leading-relaxed text-white">
          {publishable
            ? "Approved review unlocks Growth Pack assets."
            : "Missing detail blocks subscriber delivery."}
        </p>
        {publishable && onApprove ? (
          <button
            type="button"
            onClick={onApprove}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-dub-green px-4 py-3 text-sm font-black text-black shadow-glow transition hover:bg-white"
          >
            <Package size={18} strokeWidth={2.8} />
            Approve &amp; Build Growth Pack
          </button>
        ) : (
          <p className="mt-3 rounded-xl border border-dub-amber/35 bg-black/25 px-3 py-2 text-center text-xs font-black text-dub-amber">
            Draft held before Growth Pack
          </p>
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Field label="Event" value={play.eventLabel} />
        <Field label="Date" value={play.eventDate} />
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

function PlayVisualRows({
  legs,
  compact = false
}: {
  legs: StructuredPlayLeg[];
  compact?: boolean;
}) {
  return (
    <div className="grid gap-2">
      {legs.map((leg) => (
        <PlayVisualRow key={leg.id} leg={leg} compact={compact} />
      ))}
    </div>
  );
}

function PlayVisualRow({
  leg,
  compact = false
}: {
  leg: StructuredPlayLeg;
  compact?: boolean;
}) {
  const [teamImageFailed, setTeamImageFailed] = useState(false);
  const [opponentImageFailed, setOpponentImageFailed] = useState(false);
  const [playerImageFailed, setPlayerImageFailed] = useState(false);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
      <div className="flex items-center gap-3">
        <div
          className={`${compact ? "h-10 w-10 text-xs" : "h-12 w-12 text-sm"} relative grid shrink-0 place-items-center rounded-2xl border border-white/15 bg-white p-1 font-black text-black shadow-lg`}
          style={{ background: `linear-gradient(135deg, ${leg.teamColor}, #050506)` }}
        >
          {leg.teamLogoUrl && !teamImageFailed ? (
            <img
              src={leg.teamLogoUrl}
              alt={`${leg.teamName} logo`}
              className="h-full w-full object-contain drop-shadow"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setTeamImageFailed(true)}
            />
          ) : (
            leg.team
          )}
          {leg.opponentLogoUrl && !opponentImageFailed ? (
            <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full border border-white bg-white p-0.5 shadow">
              <img
                src={leg.opponentLogoUrl}
                alt="Opponent logo"
                className="h-full w-full object-contain"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setOpponentImageFailed(true)}
              />
            </span>
          ) : null}
        </div>
        <div
          className={`${compact ? "h-9 w-9 text-xs" : "h-11 w-11 text-sm"} grid shrink-0 place-items-center overflow-hidden rounded-full border-2 border-white bg-dub-green font-black text-black shadow-lg`}
        >
          {leg.playerImageUrl && !playerImageFailed ? (
            <img
              src={leg.playerImageUrl}
              alt={`${leg.player} headshot`}
              className="h-full w-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setPlayerImageFailed(true)}
            />
          ) : (
            leg.playerInitials
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className={`${compact ? "text-sm" : "text-base"} truncate font-black text-white`}>
            {leg.player}
          </p>
          <p className="mt-0.5 truncate text-xs font-bold text-dub-muted">
            {leg.teamName} · {leg.playType}
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <VisualChip label={leg.league} />
        <VisualChip label={leg.book} tone={leg.book === "Missing" ? "warn" : "default"} />
        <VisualChip label={leg.odds} tone={leg.odds === "Missing" ? "warn" : "default"} />
        <VisualChip label={leg.unitSize} tone={leg.unitSize === "Missing" ? "warn" : "green"} />
      </div>
    </div>
  );
}

function VisualChip({
  label,
  tone = "default"
}: {
  label: string;
  tone?: "default" | "green" | "warn";
}) {
  const classes =
    tone === "green"
      ? "bg-dub-green text-black"
      : tone === "warn"
        ? "border-dub-amber/40 bg-dub-amber/10 text-dub-amber"
        : "border-white/10 bg-white/8 text-white";

  return (
    <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black ${classes}`}>
      {label}
    </span>
  );
}

function GrowthPackTab({ play }: { play: StructuredPlay | null }) {
  const displayPlay = play ?? defaultDemoPlay;
  const publishable = isPublishablePlay(displayPlay);
  const pack = generateGrowthPack(displayPlay);
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [activeChannel, setActiveChannel] = useState<GrowthChannel>("All");
  const [agentStyle, setAgentStyle] = useState<AgentStyle>("proof-first");
  const [clipFormat, setClipFormat] = useState<SocialClipFormat>("face-cam-hook");
  const [creativeVariant, setCreativeVariant] = useState(1);
  const creativeOptions = generateAgentCreativeOptions(
    displayPlay,
    agentStyle,
    clipFormat,
    creativeVariant
  );
  const visibleCreativeOptions =
    activeChannel === "All"
      ? creativeOptions
      : creativeOptions.filter((option) => option.channel === activeChannel);

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
  const visibleAssetCount =
    visibleCreativeOptions.length +
    visibleSections.reduce((total, section) => total + section.cards.length, 0);

  return (
    <div className="space-y-4">
      <PageIntro
        title="Growth Pack"
        subtitle="Turn approved plays into a full creator growth package."
        chip="Package once, distribute everywhere"
      />
      <GrowthSourceCard play={displayPlay} publishable={publishable} />
      <ChannelMixRow
        activeChannel={activeChannel}
        visibleAssetCount={visibleAssetCount}
        onChange={setActiveChannel}
      />
      {(activeChannel === "All" || visibleCreativeOptions.length > 0) ? (
        <AIAgentLayer
          play={displayPlay}
          publishable={publishable}
          activeChannel={activeChannel}
          options={visibleCreativeOptions}
          agentStyle={agentStyle}
          clipFormat={clipFormat}
          creativeVariant={creativeVariant}
          completedActions={completedActions}
          onStyleChange={setAgentStyle}
          onClipFormatChange={setClipFormat}
          onRegenerate={() => setCreativeVariant((current) => (current % 3) + 1)}
          onAction={(optionId) => {
            const actionId = `${displayPlay.id}:agent:${optionId}`;
            setCompletedActions((current) =>
              current.includes(actionId) ? current : [...current, actionId]
            );
          }}
        />
      ) : null}
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

function AIAgentLayer({
  play,
  publishable,
  activeChannel,
  options,
  agentStyle,
  clipFormat,
  creativeVariant,
  completedActions,
  onStyleChange,
  onClipFormatChange,
  onRegenerate,
  onAction
}: {
  play: StructuredPlay;
  publishable: boolean;
  activeChannel: GrowthChannel;
  options: AgentCreativeOption[];
  agentStyle: AgentStyle;
  clipFormat: SocialClipFormat;
  creativeVariant: number;
  completedActions: string[];
  onStyleChange: (style: AgentStyle) => void;
  onClipFormatChange: (format: SocialClipFormat) => void;
  onRegenerate: () => void;
  onAction: (optionId: string) => void;
}) {
  const sourceProfile = getCapperProfileForPlay(play);
  const queueActionId = `${play.id}:agent:queue-creative`;
  const queueActioned = completedActions.includes(queueActionId);
  const visibleLabel =
    activeChannel === "All"
      ? `${options.length} creative options`
      : `${options.length} ${activeChannel} ${options.length === 1 ? "option" : "options"}`;

  return (
    <section
      className={`rounded-[28px] border p-4 ${
        publishable
          ? "border-dub-green/35 bg-[radial-gradient(circle_at_top_left,rgba(44,255,31,0.18),rgba(18,18,21,0.98)_42%)]"
          : "border-dub-amber/35 bg-[#1c1710]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2 text-dub-green">
          <Sparkles className="shrink-0" size={18} />
          <p className="truncate text-xs font-black uppercase tracking-[0.18em]">
            AI Agent Layer
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white">
          {visibleLabel}
        </span>
      </div>
      <div className="mt-4 max-w-none">
        <h2 className="text-[30px] font-black leading-[1.02] tracking-tight text-white">
          {play.format === "slate" ? "Build media from this slate" : "Build media from this play"}
        </h2>
        <p className="mt-3 text-[15px] font-semibold leading-relaxed text-white/75">
          Choose a clip format, review the draft, then queue the assets you want to use.
        </p>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-black/28 p-3">
        <div className="flex items-center gap-3">
          <CapperAvatar profile={sourceProfile} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-black text-white">
              Source play: {sourceProfile.name}
            </p>
            <p className="truncate text-xs font-bold text-dub-muted">
              Format reference controls hook, pacing, captions, thumbnail, and CTA pattern
            </p>
          </div>
        </div>
      </div>

      <AgentPicker
        label="Template style"
        icon={<SlidersHorizontal size={15} />}
        options={agentStyles}
        selected={agentStyle}
        onSelect={onStyleChange}
      />
      <AgentPicker
        label="Clip format"
        icon={<Clapperboard size={15} />}
        options={socialClipFormats}
        selected={clipFormat}
        onSelect={onClipFormatChange}
      />

      <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/25 p-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-dub-muted">
            Concept set
          </p>
          <p className="mt-1 text-sm font-black text-white">Variant {creativeVariant} of 3</p>
        </div>
        <button
          type="button"
          disabled={!publishable}
          onClick={onRegenerate}
          className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-[11px] font-black transition ${
            publishable
              ? "border-dub-green/35 bg-dub-green/10 text-dub-green hover:bg-dub-green hover:text-black"
              : "cursor-not-allowed border-dub-amber/25 bg-dub-amber/10 text-dub-amber"
          }`}
        >
          <RefreshCw size={14} strokeWidth={2.6} />
          Regenerate concepts
        </button>
      </div>

      {!publishable ? (
        <div className="mt-4 flex gap-3 rounded-2xl border border-dub-amber/35 bg-dub-amber/10 p-3">
          <AlertTriangle className="mt-0.5 shrink-0 text-dub-amber" size={19} />
          <div>
            <p className="text-sm font-black text-dub-amber">
              Creative generation held until the play has enough detail.
            </p>
            <p className="mt-1 text-xs font-bold leading-relaxed text-white/75">
              The agent can draft directions, but distribution remains blocked until the capper
              adds unit size, price, reasoning, and playable-to context.
            </p>
          </div>
        </div>
      ) : null}

      <div className="mt-4 grid gap-3">
        {options.map((option) => {
          const actionId = `${play.id}:agent:${option.id}`;

          return (
            <AgentCreativeCard
              key={option.id}
              option={option}
              profile={sourceProfile}
              play={play}
              disabled={!publishable}
              actioned={completedActions.includes(actionId)}
              onAction={() => onAction(option.id)}
            />
          );
        })}
      </div>

      <button
        type="button"
        disabled={!publishable || queueActioned}
        onClick={() => onAction("queue-creative")}
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black transition ${
          queueActioned
            ? "bg-dub-green text-black"
            : !publishable
              ? "cursor-not-allowed border border-dub-amber/25 bg-dub-amber/10 text-dub-amber"
              : "bg-white text-black hover:bg-dub-green"
        }`}
      >
        {queueActioned ? <Check size={17} /> : <Sparkles size={17} />}
        {queueActioned ? "Creative queued" : !publishable ? "Held for details" : "Queue Creative"}
      </button>
    </section>
  );
}

function AgentPicker<T extends AgentStyle | SocialClipFormat>({
  label,
  icon,
  options,
  selected,
  onSelect
}: {
  label: string;
  icon: JSX.Element;
  options: Array<{ id: T; label: string }>;
  selected: T;
  onSelect: (value: T) => void;
}) {
  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center gap-2 text-dub-muted">
        {icon}
        <p className="text-[10px] font-black uppercase tracking-[0.18em]">{label}</p>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {options.map((option) => {
          const isSelected = selected === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={`shrink-0 rounded-full border px-3 py-2 text-[11px] font-black transition ${
                isSelected
                  ? "border-dub-green bg-dub-green text-black shadow-glow"
                  : "border-white/10 bg-black/30 text-white hover:border-dub-green/40"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AgentCreativeCard({
  option,
  profile,
  play,
  disabled,
  actioned,
  onAction
}: {
  option: AgentCreativeOption;
  profile: CapperProfile;
  play: StructuredPlay;
  disabled: boolean;
  actioned: boolean;
  onAction: () => void;
}) {
  return (
    <article
      className={`overflow-hidden rounded-2xl border ${
        disabled ? "border-dub-amber/25 bg-black/30" : "border-white/10 bg-[#141416]"
      }`}
    >
      <AgentCreativeThumbnail option={option} profile={profile} play={play} disabled={disabled} />
      <div className="p-4">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-dub-green">
          {option.eyebrow}
        </p>
        <h3 className="mt-1 text-lg font-black text-white">{option.title}</h3>
        <p className="mt-2 text-sm font-black leading-relaxed text-white">{option.hook}</p>
        <p className="mt-2 text-xs font-semibold leading-relaxed text-white/70">{option.body}</p>
        <p className="mt-3 rounded-xl border border-white/10 bg-black/35 p-3 text-xs font-bold leading-relaxed text-white/80">
          {option.caption}
        </p>
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
          {actioned ? option.doneLabel : disabled ? "Held for details" : option.cta}
        </button>
      </div>
    </article>
  );
}

function AgentCreativeThumbnail({
  option,
  profile,
  play,
  disabled
}: {
  option: AgentCreativeOption;
  profile: CapperProfile;
  play: StructuredPlay;
  disabled: boolean;
}) {
  const title = playTitle(play);

  if (option.channel === "Audio") {
    return (
      <div className={`p-4 ${disabled ? "opacity-60" : ""}`}>
        <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,#050806,#142014)] p-4">
          <div className="flex items-center gap-3">
            <CapperAvatar profile={profile} size="sm" />
            <div>
              <p className="text-sm font-black text-white">{profile.name} Voice Read</p>
              <p className="text-xs font-bold text-dub-muted">30-second trust note</p>
            </div>
          </div>
          <div className="mt-5 flex h-14 items-end gap-1.5">
            {Array.from({ length: 24 }).map((_, index) => (
              <span
                key={index}
                className="w-full rounded-full bg-dub-green"
                style={{
                  height: `${22 + ((index * 17) % 34)}px`,
                  opacity: 0.45 + (index % 4) * 0.12
                }}
              />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-full bg-black/45 px-4 py-3">
            <div className="flex items-center gap-2 text-white">
              <Radio size={18} />
              <span className="text-xs font-black">Capper-approved read</span>
            </div>
            <span className="text-xs font-black text-dub-green">0:30</span>
          </div>
        </div>
      </div>
    );
  }

  if (option.channel === "IG/TikTok") {
    return (
      <div className={`flex justify-center p-4 ${disabled ? "opacity-60" : ""}`}>
        <div className="relative aspect-[9/16] w-[58%] min-w-[170px] overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,#2cff1f_0%,#0a130b_38%,#050505_100%)] p-4 shadow-2xl">
          <div className="absolute inset-x-4 top-4 flex items-center justify-between">
            <CapperAvatar profile={profile} size="sm" />
            <span className="rounded-full bg-black/60 px-2 py-1 text-[9px] font-black text-white">
              {play.sport}
            </span>
          </div>
          <div className="absolute inset-x-4 bottom-16">
            <p className="text-2xl font-black leading-tight text-white">{title}</p>
            <p className="mt-2 text-xs font-black text-dub-green">
              Playable to {play.playableTo}
            </p>
          </div>
          <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-black/70 p-3">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-dub-muted">
              Caption cue
            </p>
            <p className="mt-1 text-xs font-bold leading-snug text-white">
              Confirm your number before tailing.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 ${disabled ? "opacity-60" : ""}`}>
      <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,#030503,#071208_48%,#143316)] p-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <CapperAvatar profile={profile} size="sm" />
          <div>
            <p className="text-lg font-black text-white">{profile.name} Product Short</p>
            <p className="text-sm font-bold text-white/75">{profile.handle}</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          {["Unit", "Playable", "Risk", "DubClub"].map((label) => (
            <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-[9px] font-black uppercase tracking-[0.14em] text-dub-muted">
                {label}
              </p>
              <p className="mt-1 truncate text-xs font-black text-white">
                {label === "Unit"
                  ? play.unitSize
                  : label === "Playable"
                    ? play.playableTo
                    : label === "Risk"
                      ? "Reviewed"
                      : "Live"}
              </p>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid h-16 w-20 place-items-center rounded-2xl bg-red-600 text-white shadow-2xl">
            <Play size={34} fill="currentColor" />
          </span>
        </div>
        <div className="mt-5 flex items-center justify-end">
          <span className="rounded-full bg-black/70 px-4 py-2 text-sm font-black text-white">
            Watch on YouTube
          </span>
        </div>
      </div>
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
        <div className="flex shrink-0 flex-col items-end gap-2">
          <span
            className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${
              publishable ? "bg-dub-green text-black" : "bg-dub-amber text-black"
            }`}
          >
            {publishable ? "Actionable" : "Held"}
          </span>
          <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white">
            {play.format === "slate" ? "Slate / Multi-Play" : "Single Play"}
          </span>
        </div>
      </div>
      {play.legs?.length ? (
        <div className="mt-4">
          <PlayVisualRows legs={play.legs} compact />
        </div>
      ) : null}
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

function CapperFeedTab({
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
  const [selectedCapperId, setSelectedCapperId] = useState<InboxPlay["capperId"] | null>(null);
  const currentPlayPublishable = isPublishablePlay(play);
  const heldDraft = play && !currentPlayPublishable ? play : null;
  const generatedInboxPlay = currentPlayPublishable && play ? playToInboxCard(play) : fallbackInboxPlay;
  const inboxPlays = [generatedInboxPlay, ...mockInboxPlays];
  const selectedCapper = selectedCapperId ? capperProfiles[selectedCapperId] : null;

  useEffect(() => {
    document.querySelector("main")?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [selectedCapperId]);

  if (selectedCapper) {
    return <CapperDetailPage profile={selectedCapper} onBack={() => setSelectedCapperId(null)} />;
  }

  return (
    <div className="space-y-5">
      <PageIntro
        title="Capper Feed"
        subtitle="Subscriber-ready cards with proof, context, and tail actions."
        chip="Credibility + action"
      />
      {heldDraft ? (
        <HeldDraftWarning>
          {`Latest draft held: ${heldDraft.pick} needs unit size, price, event context, reasoning, and playable-to number before subscribers see it.`}
        </HeldDraftWarning>
      ) : null}
      <CapperFeedGuide />

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
              onViewCapper={() => setSelectedCapperId(inboxPlay.capperId)}
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
                  <div className="flex min-w-0 items-center gap-3">
                    <CapperAvatar profile={capperProfiles[item.capperId]} size="sm" />
                    <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-dub-green">
                      {item.capper}
                    </p>
                    <p className="mt-1 truncate text-sm font-black text-white">{item.pick}</p>
                    </div>
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

function CapperFeedGuide() {
  const steps = ["Check capper", "Confirm line", "Tail Pick"];

  return (
    <section className="rounded-2xl border border-dub-green/25 bg-dub-green/10 p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-dub-green">
        Feed flow
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
        Subscriber cards pair the play with capper proof, line context, and a clear action.
      </p>
    </section>
  );
}

function InboxCard({
  play,
  sourceLabel,
  onViewCapper,
  isTailed,
  confirmed,
  onTail
}: {
  play: InboxPlay;
  sourceLabel: string;
  onViewCapper: () => void;
  isTailed: boolean;
  confirmed: boolean;
  onTail: () => void;
}) {
  const disabled = play.status === "Needs More Detail" || play.unit === "Missing" || play.playableTo === "Missing";
  const profile = capperProfiles[play.capperId];

  return (
    <article className="rounded-2xl border border-dub-border bg-dub-card p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-dub-green/25 bg-dub-green/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-dub-green">
          {sourceLabel}
        </span>
        <StatusPill status={play.status} compact />
      </div>

      <button
        type="button"
        onClick={onViewCapper}
        className="mt-4 flex w-full min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3 text-left transition hover:border-dub-green/45 hover:bg-dub-green/5"
      >
        <CapperAvatar profile={profile} size="md" />
        <div className="min-w-0">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-dub-muted">
            Tap to view club
          </p>
          <p className="mt-1 truncate text-lg font-black leading-none text-white">{profile.name}</p>
          <p className="mt-1 text-xs font-bold text-dub-muted">{profile.handle}</p>
        </div>
        <span className="ml-auto shrink-0 text-lg font-black text-dub-green">&rarr;</span>
      </button>

      <div className="mt-4 flex flex-wrap gap-2">
        {(play.proofBadges ?? ["Third-Party Tracked"]).map((badge) => (
          <span
            key={badge}
            className="rounded-full border border-dub-green/25 bg-dub-green/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-dub-green"
          >
            {badge}
          </span>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          ["Record", play.record ?? "Tracked history"],
          ["ROI", play.roi ?? "Positive form"],
          ["Subscribers", play.subscribers ?? profile.subscribers],
          ["Recent Form", play.recentForm ?? "5-2 last 7"]
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-white/8 bg-black/25 p-3">
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-dub-muted">
              {label}
            </p>
            <p className="mt-1 text-xs font-black leading-tight text-white">{value}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-4 text-[24px] font-black leading-tight tracking-tight text-white">
        {play.pick}
      </h3>

      {play.legs?.length ? (
        <div className="mt-4">
          <PlayVisualRows legs={play.legs} compact />
        </div>
      ) : null}

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

function CapperAvatar({
  profile,
  size = "md"
}: {
  profile: CapperProfile;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = {
    sm: "h-9 w-9 rounded-xl text-[11px]",
    md: "h-12 w-12 rounded-2xl text-sm",
    lg: "h-20 w-20 rounded-3xl text-lg"
  }[size];

  return (
    <div
      className={`grid shrink-0 place-items-center overflow-hidden border-2 border-white bg-black font-black text-white shadow-lg ${sizeClass}`}
      style={{ background: profile.avatarStyle }}
    >
      {profile.avatarUrl ? (
        <img
          src={profile.avatarUrl}
          alt={profile.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        profile.avatarFallback
      )}
    </div>
  );
}

function CapperDetailPage({
  profile,
  onBack
}: {
  profile: CapperProfile;
  onBack: () => void;
}) {
  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={onBack}
        className="rounded-full border border-white/10 bg-dub-card px-4 py-2 text-sm font-black text-white transition hover:border-dub-green/40"
      >
        &larr; Back to Capper Feed
      </button>

      <section className="overflow-hidden rounded-[28px] border border-white/10 bg-[#f7f7f8] text-black">
        <div
          className="relative h-36 overflow-hidden"
          style={{ background: profile.bannerStyle }}
        >
          {profile.bannerUrl ? (
            <img
              src={profile.bannerUrl}
              alt={`${profile.name} profile banner`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-5 text-center">
              <p className="text-3xl font-black uppercase italic tracking-tight text-white drop-shadow">
                {profile.name}
              </p>
            </div>
          )}
        </div>

        <div className="px-5 pb-6 pt-0 text-center">
          <div className="-mt-10 flex justify-center">
            <CapperAvatar profile={profile} size="lg" />
          </div>
          <p className="mt-4 text-[11px] font-black uppercase tracking-[0.18em] text-[#787982]">
            {profile.handle}
          </p>
          <h2 className="mt-1 text-[32px] font-black leading-tight tracking-tight">
            {profile.name}
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2 text-sm font-black">
            <span className="text-[#f5a73d]">★★★★★</span>
            <span>{profile.rating}</span>
            <span className="font-bold text-[#747680]">· {profile.reviews}</span>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {profile.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#e0e1e5] bg-white px-3 py-1.5 text-[11px] font-black text-black shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 divide-x divide-[#d9dbe1]">
            <div>
              <p className="text-sm font-black text-[#747680]">Joined</p>
              <p className="mt-1 text-lg font-black">{profile.joined}</p>
            </div>
            <div>
              <p className="text-sm font-black text-[#747680]">Subscribers</p>
              <p className="mt-1 text-lg font-black">{profile.subscribers}</p>
            </div>
          </div>

          <button
            type="button"
            className="mt-6 rounded-xl bg-black px-5 py-3 text-lg font-black text-white"
          >
            Join from {profile.price}/{profile.interval}
          </button>
        </div>
      </section>

      <section className="rounded-[24px] border border-dub-border bg-dub-card p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-dub-muted">
          Which plan is right for you?
        </p>
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4">
          <div className="flex items-start gap-3">
            <CreditCard className="mt-1 text-dub-green" size={20} />
            <div>
              <h3 className="text-xl font-black text-white">{profile.planName}</h3>
              <p className="mt-3 text-sm font-bold text-dub-muted">Starting at</p>
              <p className="mt-1 text-[34px] font-black leading-none text-white">
                {profile.price}{" "}
                <span className="text-base font-black text-dub-muted">/ {profile.interval}</span>
              </p>
              <p className="mt-2 text-lg font-black text-dub-green">
                or as low as {profile.dailyPrice}
              </p>
            </div>
          </div>

          <div className="mt-5 border-t border-white/10 pt-4">
            <p className="text-sm font-black text-white">All access</p>
            <p className="mt-3 text-[11px] font-black uppercase tracking-[0.16em] text-dub-muted">
              Post delivery
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.delivery.map((channel) => (
                <span
                  key={channel}
                  className="rounded-xl border border-white/10 bg-dub-green px-3 py-2 text-xs font-black text-black"
                >
                  {channel}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border border-dub-border bg-dub-card p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-dub-muted">
          About {profile.name}
        </p>
        <p className="mt-3 text-sm font-semibold leading-relaxed text-white/82">{profile.bio}</p>
      </section>
    </div>
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
  const behaviorInsights = [
    ["Plays by League", "WNBA 42%"],
    ["Plays by Team", "LVA leads"],
    ["Plays by Player", "A'ja Wilson"],
    ["Best Market", "Player props"],
    ["Best Book", "FD"],
    ["Best Time to Post", "45m pre-tip"],
    ["Subscriber Response", "Push + Discord"]
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

      <section className="rounded-2xl border border-dub-green/35 bg-[linear-gradient(145deg,rgba(54,255,34,0.16),rgba(23,23,25,0.96))] p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-dub-green">
          Next Action
        </p>
        <p className="mt-2 text-[20px] font-black leading-tight text-white">
          Post a short recap tonight and save the best clip format for the next WNBA slate.
        </p>
        <p className="mt-2 text-sm font-semibold leading-relaxed text-white/78">
          Keep the capper moving with one concrete action instead of another analytics report.
        </p>
      </section>

      <section className="rounded-2xl border border-dub-border bg-dub-card p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-dub-muted">
              Capper Behavior
            </p>
            <h2 className="mt-1 text-xl font-black text-white">What is working</h2>
          </div>
          <Target className="text-dub-green" size={22} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {behaviorInsights.map(([label, value]) => (
            <div key={label} className="rounded-xl border border-white/8 bg-black/25 p-3">
              <p className="text-[9px] font-black uppercase tracking-[0.14em] text-dub-muted">
                {label}
              </p>
              <p className="mt-1 text-sm font-black leading-tight text-white">{value}</p>
            </div>
          ))}
        </div>
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
        <h3 className="text-lg font-black text-white">Why this matters</h3>
        <div className="mt-4 grid gap-3">
          {[
            "Structured plays make fan action easier to measure.",
            "Channel performance shows where each capper grows best.",
            "Cleaner publishing data improves tailing, recaps, notifications, and coaching."
          ].map((item) => (
            <div key={item} className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-dub-green" />
              <p className="text-sm font-semibold leading-relaxed text-white/82">{item}</p>
            </div>
          ))}
        </div>
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
