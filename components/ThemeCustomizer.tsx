import React from 'react';
import { HiOutlineCheckCircle, HiOutlineSparkles, HiOutlineSwatch } from 'react-icons/hi2';
import { FONT_OPTIONS, FontFamilyId, ThemeOverrides } from './ResumePreview';

interface ThemeCustomizerProps {
  themeOverrides: Required<ThemeOverrides>;
  isAiLayoutActive: boolean;
  onFontChange: (fontId: FontFamilyId) => void;
  onResetTheme: () => void;
}

const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  themeOverrides,
  isAiLayoutActive,
  onFontChange,
  onResetTheme,
}) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 font-serif mb-1">3. Personaliza tu look</h2>
        <p className="text-slate-600 text-sm">
          La IA ajusta el tono, los colores y la estructura por ti. Si necesitas cambios, vuelve a pedirlos en el prompt; aquí solo
          eliges la tipografía que refleje tu voz.
        </p>
      </div>
      {isAiLayoutActive && (
        <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
          Activa “Aplicar plantillas editables” para modificar estas opciones
        </span>
      )}
      <button
        type="button"
        onClick={onResetTheme}
        className="text-xs font-semibold text-pr-blue hover:text-pr-dark-blue underline underline-offset-4 whitespace-nowrap ml-4"
      >
        Restablecer
      </button>
    </div>

    <div className="mb-8">
      <div className="flex items-start gap-3 p-4 rounded-lg border border-blue-100 bg-blue-50/70">
        <div className="p-2 bg-white rounded-md text-pr-blue shadow-sm">
          <HiOutlineSparkles className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-800">Edición guiada por IA</p>
          <p className="text-sm text-slate-600">
            Para cualquier ajuste de contenido o tono, escribe nuevas indicaciones en el panel de entrada. El sistema regenerará la
            versión con tus cambios y mantendrá la coherencia visual.
          </p>
        </div>
      </div>
    </div>

    <div className="mb-8">
      <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
        <HiOutlineSwatch className="w-4 h-4 text-pr-blue" />
        Tipografía (tu única elección manual)
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FONT_OPTIONS.map((font) => (
          <button
            key={font.id}
            type="button"
            onClick={() => onFontChange(font.id)}
            className={`flex items-center justify-between gap-3 p-4 rounded-lg border-2 transition-all ${
              themeOverrides.bodyFont === font.id
                ? 'border-pr-blue bg-blue-50/50 shadow-md'
                : 'border-slate-200 bg-white hover:border-pr-blue/30 hover:shadow-sm'
            }`}
          >
            <div className="flex flex-col text-left">
              <span className={`${font.className} text-base font-semibold`}>{font.label}</span>
              <span className="text-xs font-normal text-slate-500 mt-0.5">{font.description}</span>
            </div>
            {themeOverrides.bodyFont === font.id && <HiOutlineCheckCircle className="w-5 h-5 text-pr-blue flex-shrink-0" />}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default ThemeCustomizer;
