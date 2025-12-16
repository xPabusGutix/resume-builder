import { ResumeData } from '../types';

const safeList = (items?: string[]) => items?.filter((item) => Boolean(item && item.trim().length > 0)) ?? [];

export const mergeResumeData = (incoming: ResumeData, current: ResumeData): ResumeData => ({
  ...current,
  ...incoming,
  personalInfo: {
    ...current.personalInfo,
    ...incoming.personalInfo,
  },
  summary: incoming.summary?.trim() || current.summary,
  experience:
    incoming.experience?.map((exp) => ({
      ...exp,
      description: safeList(exp.description),
    })) ?? current.experience,
  education: incoming.education ?? current.education,
  skills: safeList(incoming.skills) || current.skills,
  languages: safeList(incoming.languages) || current.languages,
  htmlResume: incoming.htmlResume?.trim() || current.htmlResume,
});
