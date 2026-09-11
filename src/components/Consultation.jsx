"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clipboard, LoaderCircle, MessageCircle, Sparkles, X } from "lucide-react";

const baseQuestions = [
  { id: "project", label: "What are you looking to build?", placeholder: "A new website for my construction company...", type: "textarea" },
  { id: "stage", label: "Is this a new project or an improvement to something existing?", type: "options", options: ["A brand-new website", "A redesign", "An ecommerce store", "A web app or custom tool", "I am not sure yet"] },
  { id: "goal", label: "What should this project help your business do better?", placeholder: "Generate more qualified enquiries and make us look more established...", type: "textarea" },
  { id: "audience", label: "Who is the experience for?", placeholder: "Homeowners looking for a reliable local contractor...", type: "text" },
];

const followUps = {
  ecommerce: { id: "products", label: "What will you sell, and roughly how many products will launch with the store?", placeholder: "Handmade furniture, around 40 products...", type: "text" },
  redesign: { id: "improve", label: "What would you most like to improve?", type: "options", options: ["Visual design", "Speed and performance", "SEO", "Lead generation", "All of these"] },
  app: { id: "workflow", label: "What should people be able to do inside the tool?", placeholder: "Create an account, upload files, and track project progress...", type: "textarea" },
};

const optionalQuestions = [
  { id: "platform", label: "Do you have a preferred platform or technology?", placeholder: "WordPress, Shopify, or open to a recommendation...", type: "text" },
  { id: "timeline", label: "When would you ideally like to launch?", type: "options", options: ["As soon as possible", "Within 4–6 weeks", "Within 6–10 weeks", "I am flexible", "I am just exploring"] },
  { id: "budget", label: "What investment range feels realistic for this project?", type: "options", options: ["Under $1,500", "$1,500–$3,000", "$3,000–$5,000", "$5,000–$10,000", "Not sure yet"] },
  { id: "contact", label: "Where should I send your project brief?", placeholder: "you@company.com", type: "email" },
];

function openConsultation() { window.dispatchEvent(new CustomEvent("open-consultation")); }

function classifyProject(value) {
  const text = value.toLowerCase();
  if (text.includes("shopify") || text.includes("ecommerce") || text.includes("store") || text.includes("sell")) return "ecommerce";
  if (text.includes("redesign") || text.includes("existing") || text.includes("wordpress")) return "redesign";
  if (text.includes("app") || text.includes("portal") || text.includes("tool")) return "app";
  return "website";
}

function buildFallbackBrief(answers) {
  const type = classifyProject(`${answers.project || ""} ${answers.stage || ""}`);
  const featureMap = {
    ecommerce: ["Conversion-focused storefront", "Product discovery and product detail experience", "Mobile-first checkout journey"],
    redesign: ["Experience and visual redesign", "Responsive performance improvements", "Clearer conversion paths"],
    app: ["Core user workflow", "Responsive interface", "Secure data and integration planning"],
    website: ["Clear information architecture", "Responsive visual design", "Conversion-focused contact journey"],
  };
  return {
    title: answers.project?.split(/[.!?]/)[0]?.slice(0, 70) || "New digital project",
    overview: answers.project || "A new digital experience for the client’s business.",
    goal: answers.goal || "Clarify the business goal during the discovery call.",
    audience: answers.audience || "To be confirmed",
    solution: `A ${type === "website" ? "focused, conversion-ready website" : `${type} experience`} shaped around the audience, content, and outcome you described.`,
    technology: answers.platform || "Recommend after reviewing content, integrations, and long-term ownership needs.",
    features: featureMap[type],
    recommendations: ["Plan the mobile experience early", "Set one primary conversion action", "Keep analytics and SEO in scope from the start"],
    complexity: type === "app" ? "Complex" : type === "ecommerce" ? "Large" : "Medium",
    timeline: answers.timeline || "To be confirmed",
    budget: answers.budget || "To be confirmed",
    openQuestions: ["Existing brand assets and content readiness", "Required integrations and analytics", "Launch decision-maker and review process"],
  };
}

export default function Consultation() {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [brief, setBrief] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("open-consultation", handleOpen);
    return () => window.removeEventListener("open-consultation", handleOpen);
  }, []);

  const questions = useMemo(() => {
    const projectType = classifyProject(`${answers.project || ""} ${answers.stage || ""}`);
    return [...baseQuestions, ...(followUps[projectType] ? [followUps[projectType]] : []), ...optionalQuestions];
  }, [answers.project, answers.stage]);
  const current = questions[step];
  const progress = Math.min(((step + 1) / questions.length) * 100, 100);

  function close() {
    setOpen(false);
    setTimeout(() => { setStep(0); setAnswers({}); setBrief(null); setSubmitted(false); }, 250);
  }
  function updateAnswer(value) { setAnswers((previous) => ({ ...previous, [current.id]: value })); }
  async function next() {
    if (!answers[current.id]?.trim()) return;
    if (step < questions.length - 1) { setStep((previous) => previous + 1); return; }
    setLoading(true);
    try {
      const response = await fetch("/api/consultation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ answers }) });
      const data = await response.json();
      setBrief(data.brief || buildFallbackBrief(answers));
    } catch { setBrief(buildFallbackBrief(answers)); } finally { setLoading(false); }
  }
  function submitLead() {
    setSubmitted(true);
    const subject = encodeURIComponent(`Project brief: ${brief?.title || "New project"}`);
    const body = encodeURIComponent(`Hi Yash,\n\nI reviewed my project brief and would like to continue.\n\nProject: ${brief?.title}\nGoal: ${brief?.goal}\nTimeline: ${brief?.timeline}\nBudget: ${brief?.budget}\n\nPlease let me know the next step.`);
    window.location.href = `mailto:yashb0227@gmail.com?subject=${subject}&body=${body}`;
  }

  if (!open) return null;
  return (
    <div className="consultation-shell fixed inset-0 z-[300] flex items-end justify-center bg-black/80 p-0 backdrop-blur-md sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="consultation-title">
      <div className="consultation-panel relative flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden border border-white/15 bg-[#111] text-white shadow-2xl shadow-black sm:max-h-[90vh] sm:rounded-[2rem]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-8 sm:py-5"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-fire text-black"><Sparkles size={17} /></span><span className="font-head text-sm font-bold tracking-tight">Project strategist</span></div><button type="button" onClick={close} aria-label="Close project strategist" className="rounded-full p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"><X size={20} /></button></div>
        <div className="overflow-y-auto px-5 py-8 sm:px-14 sm:py-12">
          {!brief && !submitted && <><div className="mb-10"><div className="mb-4 flex items-center justify-between text-[0.68rem] font-bold uppercase tracking-[0.2em] text-gray-500"><span>Discovery / {String(step + 1).padStart(2, "0")}</span><span>{Math.round(progress)}%</span></div><div className="h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-red-fire transition-all duration-500" style={{ width: `${progress}%` }} /></div></div><p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-red-fire">Let&apos;s work together</p><h2 id="consultation-title" className="mb-8 max-w-2xl font-head text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.98] tracking-tight">{step === 0 ? "Tell me what you’re imagining." : "Let’s make the idea more concrete."}</h2><div className="mb-10"><label htmlFor={`answer-${current.id}`} className="mb-4 block text-xl font-medium leading-snug text-white sm:text-2xl">{current.label}</label>{current.type === "options" ? <div className="grid gap-3 sm:grid-cols-2">{current.options.map((option) => <button key={option} type="button" onClick={() => updateAnswer(option)} className={`consultation-option ${answers[current.id] === option ? "consultation-option-active" : ""}`}>{option}<span>{answers[current.id] === option ? <Check size={16} /> : <ArrowRight size={16} />}</span></button>)}</div> : current.type === "textarea" ? <textarea id={`answer-${current.id}`} value={answers[current.id] || ""} onChange={(event) => updateAnswer(event.target.value)} placeholder={current.placeholder} rows={4} autoFocus className="consultation-input resize-none" /> : <input id={`answer-${current.id}`} type={current.type} value={answers[current.id] || ""} onChange={(event) => updateAnswer(event.target.value)} placeholder={current.placeholder} autoFocus className="consultation-input" />}</div><div className="flex items-center justify-between gap-4"><button type="button" onClick={() => setStep((previous) => Math.max(0, previous - 1))} disabled={step === 0} className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-white disabled:opacity-0"><ArrowLeft size={16} /> Back</button><button type="button" onClick={next} disabled={!answers[current.id]?.trim() || loading} className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:bg-red-fire disabled:cursor-not-allowed disabled:opacity-40">{loading ? <>Preparing brief <LoaderCircle size={16} className="animate-spin" /></> : <>Continue <ArrowRight size={16} /></>}</button></div></>}
          {brief && !submitted && <div className="consultation-reveal"><p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-red-fire">Your project brief</p><h2 className="mb-4 font-head text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none tracking-tight">Here&apos;s what I understood.</h2><p className="mb-8 max-w-xl text-gray-400">This is a working brief, not a fixed quote. You can refine the details together during the next conversation.</p><div className="grid gap-3 sm:grid-cols-2">{[["Project", brief.title], ["Goal", brief.goal], ["Suggested approach", brief.solution], ["Platform", brief.technology], ["Timeline", brief.timeline], ["Investment", brief.budget]].map(([label, value]) => <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gray-500">{label}</p><p className="text-sm leading-relaxed text-gray-200">{value}</p></div>)}</div><div className="mt-4 rounded-2xl border border-red-fire/30 bg-red-fire/10 p-5"><p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-red-fire">Key requirements</p><ul className="space-y-2 text-sm text-gray-200">{brief.features.map((feature) => <li key={feature} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-red-fire" />{feature}</li>)}</ul></div><div className="mt-8 flex flex-wrap gap-3"><button type="button" onClick={() => setBrief(null)} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold transition hover:border-white"><ArrowLeft size={16} /> Edit details</button><button type="button" onClick={submitLead} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-red-fire">Looks good <ArrowRight size={16} /></button></div></div>}
          {submitted && <div className="consultation-reveal py-8 text-center"><span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-fire text-black"><Check size={28} /></span><h2 className="mb-4 font-head text-4xl font-bold tracking-tight">Your brief is ready.</h2><p className="mx-auto mb-8 max-w-md text-gray-400">Your email app should open with the project context already written. I&apos;ll review it and come back with the most useful next step.</p><button type="button" onClick={close} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold transition hover:border-white"><MessageCircle size={16} /> Close consultation</button></div>}
        </div>
        {!brief && !submitted && <div className="flex items-center gap-2 border-t border-white/10 px-5 py-4 text-xs text-gray-500 sm:px-14"><Clipboard size={14} /> Your answers shape a private project brief. Nothing is sent until you confirm.</div>}
      </div>
    </div>
  );
}

export { openConsultation };