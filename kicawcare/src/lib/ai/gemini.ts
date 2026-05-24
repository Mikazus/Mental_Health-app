import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeJournalSentiment(content: string) {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an expert psychological sentiment analyzer. 
Analyze the student's journal entry and return a JSON object with:
- sentimentScore: A float between -1.0 (extremely negative/distressed) and 1.0 (extremely positive/calm).
- severity: A string exact match of one of these values: NORMAL, MILD, MODERATE, SEVERE, CRITICAL.
- tags: An array of short string tags (e.g., ["Anxiety", "Academic Stress"]).

Journal: ${content}`,
        config: {
            responseMimeType: "application/json",
        }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("AI Sentiment Analysis Error:", error);
    return { sentimentScore: 0, severity: "NORMAL", tags: [] };
  }
}

export async function generateCounselorSummary(journals: string[], screeningScores: { phq9: number, gad7: number }) {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an AI assistant for a university counselor. 
Summarize the student's recent journals and screening scores into a concise briefing.
Highlight key risks, recurring themes, and actionable advice for the counselor preparing for the session.

Scores: PHQ9: ${screeningScores.phq9}, GAD7: ${screeningScores.gad7}. 
Journals: ${journals.join(" | ")}`
    });

    return response.text;
  } catch (error) {
    console.error("AI Summarization Error:", error);
    return "Summary generation failed.";
  }
}
