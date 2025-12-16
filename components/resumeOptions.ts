import { FontFamilyId, TemplateStyle, ThemeOverrides } from './ResumePreview';

export type TemplateOption = { id: TemplateStyle; name: string; description: string; badge: string };

export const templates: TemplateOption[] = [
  {
    id: 'modern',
    name: 'Moderno',
    description: 'Cintillo sólido, acentos en azul y jerarquía clara.',
    badge: 'Recomendado',
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    description: 'Diseño aireado en blanco y negro con tipografía elegante.',
    badge: 'Ligero',
  },
  {
    id: 'contrast',
    name: 'Alto contraste',
    description: 'Gradiente vibrante y sidebar oscuro para destacar.',
    badge: 'Creativo',
  },
  {
    id: 'elegant',
    name: 'Elegante',
    description: 'Tonos vino y rosa pálido para un look sofisticado.',
    badge: 'Premium',
  },
  {
    id: 'vibrant',
    name: 'Vibrante',
    description: 'Gradientes multicolor y energía juvenil.',
    badge: 'Colorido',
  },
  {
    id: 'technical',
    name: 'Tech',
    description: 'Oscuro con acentos neón para roles digitales.',
    badge: 'Digital',
  },
];

export const templateThemeDefaults: Record<TemplateStyle, Required<ThemeOverrides>> = {
  modern: {
    accentColor: '#2563eb',
    headerBgColor: '#0f172a',
    headerTextColor: '#bfdbfe',
    bodyFont: 'inter',
  },
  minimal: {
    accentColor: '#1f2937',
    headerBgColor: '#ffffff',
    headerTextColor: '#2563eb',
    bodyFont: 'playfair',
  },
  contrast: {
    accentColor: '#fef08a',
    headerBgColor: '#0f172a',
    headerTextColor: '#fef08a',
    bodyFont: 'inter',
  },
  elegant: {
    accentColor: '#be123c',
    headerBgColor: '#f8fafc',
    headerTextColor: '#9d174d',
    bodyFont: 'source-serif',
  },
  vibrant: {
    accentColor: '#22d3ee',
    headerBgColor: '#0f172a',
    headerTextColor: '#cffafe',
    bodyFont: 'poppins',
  },
  technical: {
    accentColor: '#7c3aed',
    headerBgColor: '#0a0f1f',
    headerTextColor: '#7dd3fc',
    bodyFont: 'inter',
  },
};

export const themePresets: {
  id: string;
  name: string;
  accentColor: string;
  headerBgColor: string;
  headerTextColor: string;
  bodyFont: FontFamilyId;
}[] = [
  {
    id: 'atlantic',
    name: 'Atlántico',
    accentColor: '#0ea5e9',
    headerBgColor: '#0f172a',
    headerTextColor: '#bae6fd',
    bodyFont: 'inter',
  },
  {
    id: 'sunset',
    name: 'Atardecer',
    accentColor: '#fb923c',
    headerBgColor: '#1c1917',
    headerTextColor: '#fed7aa',
    bodyFont: 'playfair',
  },
  {
    id: 'forest',
    name: 'Bosque',
    accentColor: '#22c55e',
    headerBgColor: '#0b1725',
    headerTextColor: '#bbf7d0',
    bodyFont: 'lato',
  },
  {
    id: 'sand',
    name: 'Arena',
    accentColor: '#d97706',
    headerBgColor: '#fffbeb',
    headerTextColor: '#92400e',
    bodyFont: 'source-serif',
  },
];
