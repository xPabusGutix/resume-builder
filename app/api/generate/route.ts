import { NextResponse } from 'next/server';
import { generateResumeFromText } from '@/services/geminiService';
import { ResumeGenerationRequest } from '@/types';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { text, jobDescription, jobLink } = (await request.json()) as ResumeGenerationRequest;

    if (!text?.trim() && !jobDescription?.trim() && !jobLink?.trim()) {
      return NextResponse.json(
        { error: 'Comparte al menos tu CV, la descripción del puesto o un enlace de la vacante.' },
        { status: 400 }
      );
    }

    const resume = await generateResumeFromText({ text: text?.trim() || '', jobDescription, jobLink });
    return NextResponse.json(resume, { status: 200 });
  } catch (error) {
    console.error('Error generando el currículum', error);
    return NextResponse.json(
      { error: 'No se pudo generar el currículum. Inténtalo nuevamente más tarde.' },
      { status: 500 }
    );
  }
}
