import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

interface InterviewMessage {
  role: 'user' | 'ai';
  text: string;
}

export const runtime = 'nodejs';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const buildHistoryContext = (history: InterviewMessage[]): string => {
  if (!history?.length) return '';
  const condensed = history
    .map((entry) => `${entry.role === 'user' ? 'Candidate' : 'Gemini'}: ${entry.text}`)
    .join('\n');
  return `\n\nConversation so far (keep style consistent):\n${condensed}`;
};

export async function POST(request: Request) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API Key is missing. Configure GEMINI_API_KEY or API_KEY in the environment.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const prompt: string = (body?.prompt ?? '').toString().trim();
    const history: InterviewMessage[] = Array.isArray(body?.history) ? body.history : [];

    if (!prompt) {
      return NextResponse.json({ error: 'Comparte tu pregunta para continuar la entrevista.' }, { status: 400 });
    }

    const historyContext = buildHistoryContext(history);
    const basePrompt = `Actúa como un entrevistador técnico bilingüe (Español neutro) que realiza entrevistas simuladas en vivo. 
Mantén un tono cálido y directo, ofrece seguimiento breve y una pregunta a la vez. 
Prioriza temas de experiencia laboral, proyectos y logro medibles. ${historyContext}\n\nÚltima entrada del candidato: ${prompt}`;

    const textResponse = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: basePrompt }],
        },
      ],
      config: {
        temperature: 0.8,
        maxOutputTokens: 250,
      },
    });

    const reply = textResponse.text?.trim();

    if (!reply) {
      return NextResponse.json({ error: 'No se pudo generar una respuesta.' }, { status: 500 });
    }

    const ttsResponse = await ai.models.generateContent({
      model: 'gemini-2.5-pro-preview-tts',
      contents: [{ parts: [{ text: reply }] }],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
          speakingRate: 1.08,
        },
      },
    });

    const audioBase64 = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    return NextResponse.json({ reply, audioBase64, voice: 'Kore' }, { status: 200 });
  } catch (error) {
    console.error('Interview mode error', error);
    return NextResponse.json(
      { error: 'No se pudo completar la interacción. Intenta nuevamente en unos segundos.' },
      { status: 500 }
    );
  }
}
