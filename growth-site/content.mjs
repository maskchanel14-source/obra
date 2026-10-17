import { WORKFLOWS } from './data/workflows.mjs';
import { SECTORS } from './data/sectors.mjs';
import { CHECKS } from './data/checks.mjs';

export { WORKFLOWS, SECTORS };

export const SITE = {
  name: 'Balcão',
  url: 'https://balcao-guias.vercel.app',
  language: 'pt-BR',
  description: 'Roteiros práticos para organizar o atendimento no WhatsApp de pequenos negócios brasileiros.',
  published: '2026-10-17'
};

export const HOME = {
  url: '/',
  keyword: 'como organizar o atendimento no WhatsApp Business para pequenos negócios',
  title: 'Atendimento no WhatsApp para pequenos negócios | Balcão',
  description: 'Organize o atendimento no WhatsApp com roteiros reais para pequenos negócios: primeira resposta, agendamento, cobrança e pós-venda, sem perder o toque humano.'
};

if (SECTORS.length !== 11 || WORKFLOWS.length !== 9) {
  throw new Error('The editorial matrix must remain 11 sectors by 9 workflows.');
}
for (const sector of SECTORS) {
  const missing = WORKFLOWS.filter(({ id }) => !sector.scenarios[id]);
  if (missing.length || Object.keys(sector.scenarios).length !== 9) {
    throw new Error(`${sector.slug} has missing or extra scenarios: ${missing.map(({ id }) => id).join(', ')}`);
  }
  if (WORKFLOWS.some(({ id }) => !CHECKS[sector.slug]?.[id])) {
    throw new Error(`${sector.slug} needs an individual rehearsal for every workflow.`);
  }
}

export const GUIDES = SECTORS.flatMap((sector) => WORKFLOWS.map((workflow) => {
  const slug = `${workflow.id}-${sector.slug}`;
  return {
    slug,
    url: `/guias/${slug}/`,
    keyword: `${workflow.keyword} para ${sector.search}`,
    title: sector.slug === 'assistencia-tecnica-celulares'
      ? `${workflow.label} no WhatsApp para assistência de celulares | Balcão`
      : `${workflow.headline} para ${sector.search} | Balcão`,
    description: `${workflow.label} para ${sector.search}: ${sector.scenarios[workflow.id].scene}`,
    sector,
    workflow,
    scenario: { ...sector.scenarios[workflow.id], check: CHECKS[sector.slug][workflow.id] }
  };
}));

export const KEYWORDS = [
  { keyword: HOME.keyword, url: '/', segment: 'Pequenos negócios', job: 'Guia essencial', intent: 'informacional com intenção de ferramenta' },
  ...GUIDES.map(({ keyword, url, sector, workflow }) => ({
    keyword, url, segment: sector.label, job: workflow.label,
    intent: 'informacional com intenção de ferramenta'
  }))
];
