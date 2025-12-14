'use client';

import React, { useState, useRef } from 'react';
import { Spinner } from './Spinner';
import * as mammoth from 'mammoth';
import { ResumeGenerationRequest } from '../types';
import { HiOutlineArrowUpTray, HiOutlineExclamationCircle, HiOutlineSparkles } from 'react-icons/hi2';

interface InputSectionProps {
  onGenerate: (payload: ResumeGenerationRequest) => Promise<void>;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ onGenerate, isLoading }) => {
  const [inputText, setInputText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobLink, setJobLink] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleGenerate = async () => {
    if (!inputText.trim() && !jobDescription.trim() && !jobLink.trim()) {
      setError("Comparte tu CV, descripción del puesto o enlace para personalizar el resultado.");
      return;
    }
    setError(null);
    await onGenerate({
      text: inputText.trim(),
      jobDescription: jobDescription.trim() || undefined,
      jobLink: jobLink.trim() || undefined,
    });
  };

  const processFile = (file: File) => {
    setError(null);
    
    if (file.name.endsWith('.docx')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        mammoth.extractRawText({ arrayBuffer: arrayBuffer })
          .then((result: any) => {
             const text = result.value; 
             setInputText(prev => prev + "\n\n" + text);
          })
          .catch((err: any) => {
            console.error(err);
            setError("Error al leer el archivo Word. Intenta copiar y pegar el texto.");
          });
      };
      reader.readAsArrayBuffer(file);
    } else if (file.type === "text/plain" || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setInputText(prev => prev + "\n\n" + content);
      };
      reader.onerror = () => {
        setError("Error al leer el archivo. Intenta copiar y pegar el texto.");
      };
      reader.readAsText(file);
    } else {
      setError("Formato no soportado directamente. Por favor copia y pega el contenido de tu PDF aquí.");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 font-serif mb-2">1. Ingresa tus datos</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Sube tu currículum actual (Word/Txt) o copia y pega el texto. Nuestra IA pule solo el contenido clave (resumen, logros y habilidades) y el diseño se mantiene con plantillas consistentes.
        </p>
      </div>

      <div className="flex-grow flex flex-col gap-4">
        <div
          className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-colors duration-200 ${dragActive ? 'border-pr-blue bg-blue-50' : 'border-gray-300 bg-slate-50'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
            <div className="text-center">
              <HiOutlineArrowUpTray className="mx-auto h-10 w-10 text-slate-400" aria-hidden="true" />
              <div className="mt-2 flex text-sm text-slate-600 justify-center">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-pr-blue hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pr-blue">
                  <span>Sube un archivo</span>
                   <input id="file-upload" name="file-upload" type="file" ref={fileInputRef} className="sr-only" accept=".txt,.md,.docx" onChange={handleFileUpload} />
                 </label>
                 <p className="pl-1">o arrastra y suelta</p>
               </div>
               <p className="text-xs text-slate-500">
                 DOCX, TXT hasta 5MB
               </p>
             </div>
        </div>

        <textarea
          className="w-full flex-grow min-h-[200px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pr-blue focus:border-transparent resize-none font-mono text-sm bg-white text-slate-800 placeholder-slate-400 shadow-inner"
          placeholder="O pega tu texto aquí...
Ejemplo:
Juan Pérez
Gerente de Ventas
Experiencia:
- 2019-2023: Lideré equipo de 10 personas en San Juan...
Educación:
- UPR Mayagüez, Ingeniería..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 border border-indigo-100 rounded-lg p-4 space-y-3 shadow-inner">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase font-bold text-pr-blue tracking-wide">Opcional</p>
              <h3 className="text-lg font-bold text-slate-800">Personaliza para tu próximo empleo</h3>
              <p className="text-sm text-slate-600">Agrega la descripción del puesto o el enlace de la vacante para adaptar el CV a esa oportunidad.</p>
            </div>
            <span className="text-[10px] uppercase bg-white text-pr-blue border border-pr-blue/30 rounded-full px-2 py-1 font-semibold">Mejor coincidencia</span>
          </div>

          <label className="block">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-slate-800">Descripción del puesto</span>
              <span className="text-[11px] text-slate-500">Pega el perfil completo</span>
            </div>
            <textarea
              className="w-full min-h-[110px] p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pr-blue focus:border-transparent text-sm text-slate-800 bg-white"
              placeholder="Ej. Buscamos un Gerente de Ventas con experiencia en SaaS, manejo de KPIs y liderazgo de equipos..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </label>

          <label className="block">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-slate-800">Enlace de la vacante</span>
              <span className="text-[11px] text-slate-500">LinkedIn, Indeed, etc.</span>
            </div>
            <input
              type="url"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pr-blue focus:border-transparent text-sm text-slate-800 bg-white"
              placeholder="https://www.linkedin.com/jobs/view/..."
              value={jobLink}
              onChange={(e) => setJobLink(e.target.value)}
            />
            <p className="text-xs text-slate-500 mt-1">Usaremos esta referencia para resaltar palabras clave; no inventaremos detalles que no compartas.</p>
          </label>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200 flex items-center gap-2 animate-pulse">
          <HiOutlineExclamationCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="mt-6 w-full py-4 px-6 bg-gradient-to-r from-pr-blue to-pr-dark-blue text-white rounded-lg font-bold shadow-md hover:shadow-lg transform active:scale-[0.99] transition-all duration-200 flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Spinner />
            <span>Optimizando con IA...</span>
          </>
        ) : (
          <>
            <HiOutlineSparkles className="w-6 h-6" />
            <span className="text-lg">Generar CV Profesional</span>
          </>
        )}
      </button>
    </div>
  );
};