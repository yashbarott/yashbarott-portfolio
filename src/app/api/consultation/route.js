import { NextResponse } from "next/server";

const requiredFields = ["project", "goal", "contact"];

function fallbackBrief(answers) {
  const project = String(answers.project || "").trim();
  const goal = String(answers.goal || "").trim();
  const stage = String(answers.stage || "").trim();
  const ecommerce = /shopify|ecommerce|store|sell/i.test(`${project} ${stage}`);
  const app = /app|portal|tool/i.test(`${project} ${stage}`);
  const type = app ? "custom digital tool" : ecommerce ? "ecommerce experience" : "website experience";
  return { title: project.split(/[.!?]/)[0]?.slice(0, 70) || "New digital project", overview: project || "A new digital experience for the client’s business.", goal: goal || "Clarify the business goal during the discovery call.", audience: answers.audience || "To be confirmed", solution: `A focused ${type} shaped around the audience, content, and outcome described.`, technology: answers.platform || "Recommend after reviewing content, integrations, and long-term ownership needs.", features: app ? ["Core user workflow", "Responsive interface", "Secure data and integration planning"] : ecommerce ? ["Conversion-focused storefront", "Product discovery experience", "Mobile-first checkout journey"] : ["Clear information architecture", "Responsive visual design", "Conversion-focused contact journey"], recommendations: ["Plan the mobile experience early", "Set one primary conversion action", "Keep analytics and SEO in scope from the start"], complexity: app ? "Complex" : ecommerce ? "Large" : "Medium", timeline: answers.timeline || "To be confirmed", budget: answers.budget || "To be confirmed", openQuestions: ["Existing brand assets and content readiness", "Required integrations and analytics", "Launch decision-maker and review process"] };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const answers = body?.answers && typeof body.answers === "object" ? body.answers : {};
    if (requiredFields.some((field) => typeof answers[field] !== "string" || !answers[field].trim())) return NextResponse.json({ error: "Please complete the required project details." }, { status: 400 });
    if (process.env.OPENAI_API_KEY) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }, body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4o-mini", temperature: 0.3, response_format: { type: "json_object" }, messages: [{ role: "system", content: "You are a senior digital consultant. Return valid JSON with title, overview, goal, audience, solution, technology, features (array), recommendations (array), complexity, timeline, budget, and openQuestions (array). Never invent confirmed requirements; label uncertainty in openQuestions." }, { role: "user", content: JSON.stringify(answers) }] }) });
      if (response.ok) { const result = await response.json(); return NextResponse.json({ brief: JSON.parse(result.choices?.[0]?.message?.content || "{}") }); }
    }
    return NextResponse.json({ brief: fallbackBrief(answers) });
  } catch { return NextResponse.json({ error: "Unable to prepare the brief right now." }, { status: 500 }); }
}