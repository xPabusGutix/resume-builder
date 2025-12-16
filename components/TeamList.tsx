import React from 'react';

const teamMembers = [
  { id: 1, firstName: 'Cristian', lastName: 'Martínez', role: 'Fundador · Producto', focus: 'Experiencia de usuario' },
  { id: 2, firstName: 'Pablo', lastName: 'Gutiérrez', role: 'Ingeniero de Datos', focus: 'Infraestructura y APIs' },
  { id: 3, firstName: 'Yashira', lastName: 'Rivera', role: 'Diseño UX', focus: 'Narrativas visuales' },
  { id: 4, firstName: 'Melissa', lastName: 'Pérez', role: 'Marketing', focus: 'Comunidad y aliados' },
  { id: 5, firstName: 'Víctor', lastName: 'González', role: 'Ingeniero Fullstack', focus: 'Integraciones' },
  { id: 6, firstName: 'Elizabeth', lastName: 'Crespo', role: 'Talent Partner', focus: 'Programas de mentoría' },
  { id: 7, firstName: 'Alfredo', lastName: 'Colón', role: 'QA & Soporte', focus: 'Calidad y accesibilidad' },
];

const TeamList = () => (
  <div className="rounded-2xl bg-white/10 border border-white/15 shadow-2xl p-6 backdrop-blur">
    <div className="flex items-center justify-between mb-4">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-blue-100 font-semibold">Voluntariado</p>
        <h3 className="text-xl font-bold text-white">Conoce a quienes hacen esto posible</h3>
      </div>
      <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-white/10 border border-white/20 text-white">Equipo Code Gym</span>
    </div>
    <div className="grid sm:grid-cols-2 gap-4">
      {teamMembers.map((member) => (
        <div
          key={member.id}
          className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-4 shadow-inner hover:border-blue-200/70 hover:shadow-xl transition"
        >
          <div className="shrink-0 rounded-full w-12 h-12 bg-gradient-to-br from-blue-200 via-blue-400 to-indigo-500 text-slate-900 font-extrabold flex items-center justify-center">
            {member.firstName[0]}
            {member.lastName[0]}
          </div>
          <div className="flex-1 text-white">
            <p className="font-semibold text-lg leading-tight">
              {member.firstName} {member.lastName}
            </p>
            <p className="text-blue-100 text-sm">{member.role}</p>
            <p className="text-xs text-blue-50 mt-1">{member.focus}</p>
          </div>
          <span className="text-[10px] px-2 py-1 rounded-full bg-white/10 border border-white/20 text-blue-50">PR</span>
        </div>
      ))}
    </div>
  </div>
);

export default TeamList;
