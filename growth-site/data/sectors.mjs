import { beautySectors } from './sectors/beauty.mjs';
import { commerceSectors } from './sectors/commerce.mjs';
import { serviceSectors } from './sectors/services.mjs';

const phrasing = {
  'salao-de-beleza': ['no salão de beleza', 'a equipe do salão'],
  barbearia: ['na barbearia', 'a equipe da barbearia'],
  'pet-shop': ['no pet shop', 'a equipe do pet shop'],
  'oficina-mecanica': ['na oficina mecânica', 'a equipe da oficina'],
  restaurante: ['no restaurante', 'a equipe do restaurante'],
  'loja-de-roupas': ['na loja de roupas', 'a equipe da loja'],
  confeitaria: ['na confeitaria', 'a equipe da confeitaria'],
  floricultura: ['na floricultura', 'a equipe da floricultura'],
  'estudio-de-pilates': ['no estúdio de pilates', 'a equipe do estúdio'],
  'assistencia-tecnica-celulares': ['na assistência técnica de celulares', 'a equipe da assistência'],
  lavanderia: ['na lavanderia', 'a equipe da lavanderia']
};

export const SECTORS = [...beautySectors, ...commerceSectors, ...serviceSectors].map((sector) => ({
  ...sector,
  place: phrasing[sector.slug][0],
  team: phrasing[sector.slug][1]
}));
