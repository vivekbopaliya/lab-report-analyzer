import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateHealthParameterInsight(
  parameter: string,
  value: string,
  unit: string,
  normalRange: string
): Promise<string> {
  const prompt = `${parameter}: ${value} ${unit} (normal: ${normalRange})

If this is outside normal range, explain in 2-3 simple sentences:
1. What this means for their health (no medical jargon)
2. One specific action they should take

Use everyday words. Be direct and helpful.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are Korai, a health assistant that explains lab results in plain English. 
        
        Rules:
        - No medical jargon or complex terms
        - Give practical advice, not generic suggestions
        - Be encouraging but honest
        - If normal, say "This looks good" and why it matters
        - If abnormal, explain what to do next
        - Keep responses under 50 words
        - Use simple words a 12-year-old would understand`,
      },
      { role: "user", content: prompt },
    ],
    max_tokens: 100,
    temperature: 0.3,
  });

  return response.choices[0]?.message?.content?.trim() || "";
}

export async function generateGeneralHealthInsight(
  parameters: {
    parameter: string;
    value: string;
    unit: string;
    normalRange: string;
    isAbnormal?: boolean;
    aiInsight?: string;
  }[]
): Promise<string> {
  const abnormalResults = parameters.filter((p) => p.isAbnormal);
  const normalResults = parameters.filter((p) => !p.isAbnormal);

  const prompt = `Lab Results Summary:
${parameters
  .map(
    (p) =>
      `${p.parameter}: ${p.value} ${p.unit} (normal: ${p.normalRange}) ${
        p.isAbnormal ? "[HIGH/LOW]" : "[NORMAL]"
      }`
  )
  .join("\n")}

Give me a 3-sentence summary:
1. Overall health status
2. Main concerns (if any)
3. Top priority action

Use simple, encouraging language.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are Korai, a supportive health assistant.

        Rules:
        - Speak like a knowledgeable friend, not a doctor
        - Focus on what matters most
        - Give ONE clear next step
        - Be encouraging but realistic  
        - No medical jargon
        - Keep under 80 words
        - If everything is normal, celebrate it
        - If issues exist, prioritize the most important one`,
      },
      { role: "user", content: prompt },
    ],
    max_tokens: 150,
    temperature: 0.4,
  });

  return response.choices[0]?.message?.content?.trim() || "";
}
