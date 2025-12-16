import React from 'react';
import { TemplateStyle } from './ResumePreview';
import { templates, templateThemeDefaults } from './resumeOptions';

interface TemplateSelectorProps {
  selectedTemplate: TemplateStyle;
  isAiLayoutActive: boolean;
  onTemplateSelect: (templateId: TemplateStyle) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplate, isAiLayoutActive, onTemplateSelect }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 font-serif mb-1">2. Elige tu estilo</h2>
        <p className="text-slate-600 text-sm">Selecciona cómo quieres que se vea tu CV. Puedes cambiarlo cuando quieras.</p>
      </div>
      <span className="text-[10px] uppercase tracking-[0.15em] font-bold bg-pr-blue text-white px-3 py-1 rounded-full">Nuevo</span>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onTemplateSelect(template.id)}
          className={`text-left p-4 rounded-lg border transition-all duration-200 flex justify-between items-center gap-3 hover:-translate-y-[2px] ${
            selectedTemplate === template.id ? 'border-pr-blue bg-blue-50 shadow-md' : 'border-gray-200 bg-slate-50 hover:border-pr-blue/50'
          } ${isAiLayoutActive ? 'opacity-80' : ''}`}
        >
          <div>
            <p className="text-xs uppercase text-slate-500 font-semibold mb-1 flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white border text-[10px] font-bold text-slate-600">{template.badge}</span>
              Plantilla
            </p>
            <h3 className="text-lg font-bold text-slate-800">{template.name}</h3>
            <p className="text-sm text-slate-600">{template.description}</p>
          </div>
          <div
            className={`w-16 h-16 rounded-md border overflow-hidden ${
              selectedTemplate === template.id ? 'border-pr-blue bg-gradient-to-br from-pr-blue/20 to-pr-dark-blue/30' : 'border-slate-200 bg-white'
            }`}
          >
            <div className="h-1/2" style={{ background: templateThemeDefaults[template.id].headerBgColor }}></div>
            <div className="h-1/2" style={{ background: templateThemeDefaults[template.id].accentColor }}></div>
          </div>
        </button>
      ))}
    </div>
  </div>
);

export default TemplateSelector;
