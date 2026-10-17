import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { HOME, GUIDES, KEYWORDS, SECTORS, SITE, WORKFLOWS } from '../content.mjs';
import { escapeHtml as h, safeJson } from './html.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const requestedUrl = process.env.SITE_URL || SITE.url;
const parsedUrl = new URL(requestedUrl);
if (parsedUrl.protocol !== 'https:' || parsedUrl.pathname !== '/' || parsedUrl.search || parsedUrl.hash) {
  throw new Error('SITE_URL must be an HTTPS origin with no path, query or hash.');
}
const origin = parsedUrl.origin;
const links = JSON.parse(await readFile(path.join(root, 'data/affiliate-links.json'), 'utf8'));
const official = {
  make: 'https://www.make.com/integrations/whatsapp-business-cloud',
  n8n: 'https://n8n.io/integrations/whatsapp-business-cloud/'
};
for (const key of Object.keys(official)) {
  if (typeof links[key] !== 'string' || (links[key] && !/^https:\/\/[^\s]+$/.test(links[key]))) {
    throw new Error(`data/affiliate-links.json: ${key} must be empty or an HTTPS URL`);
  }
}
if (GUIDES.length + 1 !== 100 || new Set(KEYWORDS.map(({ keyword }) => keyword)).size !== 100) {
  throw new Error('Expected exactly 100 distinct keyword/page pairs.');
}
const savedKeywords = JSON.parse(await readFile(path.join(root, 'data/keywords.json'), 'utf8'));
if (JSON.stringify(savedKeywords) !== JSON.stringify(KEYWORDS)) {
  throw new Error('data/keywords.json is out of sync. Run npm run keywords.');
}

const arrow = '<svg class="arrow" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const searchIcon = '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="8.8" cy="8.8" r="5.8" stroke="currentColor" stroke-width="1.5"/><path d="m13.2 13.2 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
const brand = `<span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 34 34" fill="none"><rect width="34" height="34" rx="9" fill="#14241e"/><path d="M8 8h18v14h-9l-5 5v-5H8V8Z" fill="#d4f276"/><circle cx="14" cy="15" r="1.4" fill="#14241e"/><circle cx="20" cy="15" r="1.4" fill="#14241e"/></svg></span><span>balcão<span class="brand-dot">.</span></span>`;
const sourceLinks = [
  ['Recursos do WhatsApp Business', 'https://business.whatsapp.com/resources/resource-library/whatsapp-business-app-resources/small-business-use-whatsapp-business-app'],
  ['Política de mensagens da Meta', 'https://business.whatsapp.com/policy'],
  ['Tarifas atuais da Plataforma', 'https://whatsappbusiness.com/products/platform-pricing/'],
  ['Business Agent da Meta', 'https://whatsappbusiness.com/blog/introducing-meta-business-agent-ai/']
];

function absolute(url) { return `${origin}${url}`; }
function header() {
  return `<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <header class="site-header"><div class="shell header-inner">
    <a class="brand" href="/" aria-label="Balcão, página inicial">${brand}</a>
    <nav class="header-nav" aria-label="Navegação principal"><a href="/#comece">Como começar</a><a href="/#roteiros">Roteiros</a><a href="/#ferramentas">Ferramentas</a></nav>
    <a class="btn btn--dark header-cta" href="/#roteiros">Encontrar roteiro ${arrow}</a>
  </div></header>`;
}
function footer() {
  return `<footer class="site-footer"><div class="shell">
    <div class="footer-top"><div><a class="brand" href="/" aria-label="Balcão, página inicial">${brand}</a>
      <p>Guias de campo para atender melhor, organizar o próximo passo e saber quando a conversa precisa de gente.</p></div>
      <div class="footer-col"><h2>Explorar</h2><a href="/#roteiros">Todos os roteiros</a><a href="/#comece">O método</a><a href="/#ferramentas">Ferramentas</a></div>
      <div class="footer-col"><h2>Fontes oficiais</h2>${sourceLinks.map(([label, url]) => `<a href="${h(url)}" target="_blank" rel="noopener noreferrer">${h(label)} ↗</a>`).join('')}</div>
    </div><div class="footer-bottom"><p>© ${SITE.published.slice(0, 4)} Balcão · Conteúdo independente, feito para o Brasil.</p>
    <p>WhatsApp é marca da Meta. Este site não representa a Meta nem promete resultados comerciais.</p></div>
  </div></footer>`;
}
function document({ title, description, url, type = 'website', body, schema }) {
  const canonical = absolute(url);
  return `<!DOCTYPE html>
<html lang="pt-BR"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f7f8f2"><meta name="robots" content="index,follow,max-image-preview:large">
  <title>${h(title)}</title><meta name="description" content="${h(description)}">
  <link rel="canonical" href="${h(canonical)}"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/site.css">
  <meta property="og:site_name" content="Balcão"><meta property="og:locale" content="pt_BR">
  <meta property="og:type" content="${h(type)}"><meta property="og:title" content="${h(title)}">
  <meta property="og:description" content="${h(description)}"><meta property="og:url" content="${h(canonical)}">
  <meta property="og:image" content="${h(absolute('/assets/social-card.png'))}">
  <meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${h(title)}">
  <meta name="twitter:description" content="${h(description)}"><meta name="twitter:image" content="${h(absolute('/assets/social-card.png'))}">
  <script type="application/ld+json">${safeJson(schema)}</script>
  <script defer src="/assets/site.js"></script>
</head><body>${header()}<main id="conteudo">${body}</main>${footer()}</body></html>\n`;
}
function toolLink(key, label) {
  const active = Boolean(links[key]);
  const url = active ? links[key] : official[key];
  const rel = active ? 'sponsored noopener noreferrer' : 'noopener noreferrer';
  return `<a class="tool-link" href="${h(url)}" target="_blank" rel="${rel}" data-affiliate="INSERT_YOUR_REF" data-affiliate-key="${key}">${h(label)} ${arrow}</a>`;
}
function tools() {
  return `<div class="tools-grid">
    <div class="tool-card"><span class="tool-icon" aria-hidden="true">✳</span><span class="tool-label">01 / Comece simples</span>
      <h3>WhatsApp Business</h3><p>Saudação, ausência, catálogo e respostas rápidas para começar. Recursos nativos de IA podem existir em contas elegíveis; confira a disponibilidade no app.</p>
      <a class="tool-link" href="${sourceLinks[0][1]}" target="_blank" rel="noopener noreferrer">Ver recursos oficiais ${arrow}</a></div>
    <div class="tool-card tool-card--accent"><span class="tool-icon" aria-hidden="true">↗</span><span class="tool-label">02 / Fluxo visual</span>
      <h3>Make + Plataforma oficial</h3><p>Para ligar a conversa a agenda ou planilha e criar etapas condicionais. Exige acesso à Plataforma do WhatsApp Business e configuração responsável.</p>
      ${toolLink('make', 'Explorar a integração')}</div>
    <div class="tool-card"><span class="tool-icon" aria-hidden="true">⌘</span><span class="tool-label">03 / Mais controle</span>
      <h3>n8n + Plataforma oficial</h3><p>Para quem tem apoio técnico e precisa de rotas, verificações e integrações próprias. Requer manutenção, monitoramento e a conexão oficial.</p>
      ${toolLink('n8n', 'Conhecer o conector')}</div>
  </div><p class="tool-disclosure">${Object.values(links).some(Boolean)
    ? 'Transparência: links configurados como parceiros podem gerar comissão; a escolha deve seguir a necessidade do negócio.'
    : 'Transparência: os links levam a páginas oficiais, sem comissão ativa. Os campos de parceiro estão sinalizados como INSERT_YOUR_REF para configuração futura.'} Consulte recursos, regras e preços atuais nos sites dos fornecedores.</p>`;
}
function faq(question, answer) {
  return `<details><summary>${h(question)}</summary><p>${h(answer)}</p></details>`;
}
function homePage() {
  const categories = ['Todos', ...new Set(SECTORS.map(({ category }) => category))];
  const card = (guide) => `<article class="guide-card" data-category="${h(guide.sector.category)}"><a href="${h(guide.url)}" aria-label="${h(guide.workflow.label)} para ${h(guide.sector.label)}">
    <div class="card-top"><span class="card-label">${h(guide.sector.label)}</span><span class="card-arrow" aria-hidden="true">↗</span></div>
    <h3>${h(guide.workflow.short)}</h3><p>${h(guide.scenario.scene)}</p><span class="card-bottom">${h(guide.workflow.label)} · Ler roteiro →</span></a></article>`;
  const body = `<section class="hero"><div class="shell hero-grid"><div class="hero-copy">
    <p class="eyebrow">Guias de campo · Pequenos negócios no Brasil</p>
    <h1>O atendimento anda melhor quando a conversa tem <em>rumo.</em></h1>
    <p class="hero-lead">Seu WhatsApp não precisa virar um labirinto de mensagens. Encontre um roteiro para responder, agendar, cobrar e acompanhar clientes — sem perder o toque humano.</p>
    <div class="hero-actions"><a class="btn btn--dark" href="#roteiros">Encontrar meu roteiro ${arrow}</a><a class="btn btn--line" href="#comece">Entender por onde começar</a></div>
    <p class="hero-footnote"><span aria-hidden="true">✳</span> 99 situações do dia a dia + um guia para começar. Sem promessa mágica.</p>
  </div><div class="hero-visual" aria-hidden="true"><div class="preview-frame">
    <div class="preview-top"><span>Conversa em movimento</span><span class="status">PRÓXIMO PASSO CLARO</span></div>
    <div class="preview-window"><div class="preview-window-head"><span class="avatar">B.</span><span><strong>Atendimento</strong><small>Um exemplo de conversa bem guiada</small></span><span class="preview-dots">···</span></div>
      <div class="bubble">Oi! Vocês têm horário para banho e tosa na sexta?<small>10:24</small></div>
      <div class="bubble bubble--right">Vou conferir. Qual o porte do seu pet e você precisa de busca e entrega?<small>10:25 ✓</small></div>
      <div class="preview-next"><span>✓</span> Contexto certo antes de prometer a vaga</div></div>
    <div class="preview-foot"><span>01 / RECEBER</span><span>02 / ENTENDER</span><strong>03 / ENCAMINHAR</strong></div>
  </div><div class="floating-note">Feito para a vida real</div></div></div></section>
  <div class="stat-band"><div class="shell stat-grid"><div><strong>11</strong><span>tipos de negócio, da loja ao serviço local</span></div><div><strong>09</strong><span>situações que voltam todo dia no chat</span></div><div><strong>01</strong><span>próximo passo útil em cada roteiro</span></div></div></div>
  <section class="method-section" id="comece"><div class="shell method-grid"><div>
    <div class="section-heading"><div class="section-kicker">O jeito Balcão</div><h2>Automatizar o repetido. Cuidar do que importa.</h2><p>Não é sobre colocar um robô em toda conversa. É sobre tirar o peso da repetição e deixar mais tempo para a parte que só uma pessoa resolve.</p></div>
    <div class="method-steps"><div class="method-step"><span class="number">01</span><div><h3>Escolha uma conversa que sempre se repete</h3><p>Comece por uma pergunta concreta: horário, preço, disponibilidade ou acompanhamento de pedido.</p></div></div>
      <div class="method-step"><span class="number">02</span><div><h3>Escreva a resposta e o limite dela</h3><p>Diga o que dá para confirmar agora, o que precisa de checagem e quando alguém da equipe entra.</p></div></div>
      <div class="method-step"><span class="number">03</span><div><h3>Teste com a rotina, não só com a ferramenta</h3><p>Se estoque, agenda ou caixa não estão atualizados, a automação só responde errado mais depressa.</p></div></div></div>
  </div><aside class="method-aside" aria-label="Dica para começar"><div class="aside-icon" aria-hidden="true">↗</div><h3>Primeiro organize.<br>Depois conecte.</h3><p>O aplicativo já ajuda com saudação, catálogo e respostas rápidas; algumas contas têm IA nativa. Para conectar agenda ou estoque externos, avalie a Plataforma oficial e mantenha os dados em dia.</p><a class="text-link" href="#ferramentas">Ver caminhos de ferramenta ${arrow}</a></aside></div></section>
  <section class="directory-section" id="roteiros"><div class="shell"><div class="directory-top"><div class="section-heading"><div class="section-kicker">Biblioteca de campo</div><h2>Encontre o roteiro para a conversa de hoje.</h2><p>Filtre por tipo de negócio ou procure um assunto. Cada página traz mensagem de exemplo, passos e momento de chamar uma pessoa.</p></div><p class="directory-caption">Busca local, sem cadastro e sem enviar sua pesquisa para outro serviço.</p></div>
    <div class="filter-panel"><label class="search-wrap">${searchIcon}<span class="visually-hidden">Buscar roteiro</span><input class="search-input" id="guide-search" type="search" placeholder="Ex.: salão, Pix, agendamento…" aria-label="Buscar roteiro" autocomplete="off"></label>
      <div class="filters" role="group" aria-label="Filtrar por setor">${categories.map((name) => `<button type="button" class="filter" data-filter="${h(name)}" aria-pressed="${name === 'Todos'}">${h(name)}</button>`).join('')}</div></div>
    <p class="result-count" id="result-count" role="status" aria-live="polite">99 roteiros encontrados</p><div class="guide-grid">${GUIDES.map(card).join('')}</div>
    <p class="empty-state" id="empty-state" hidden>Nenhum roteiro com essa busca. Tente outro termo ou escolha “Todos”.</p>
  </div></section>
  <section class="tools-section" id="ferramentas"><div class="shell"><div class="tools-header"><div class="section-heading section-heading--light"><div class="section-kicker">Ferramentas, sem truque</div><h2>Escolha a complexidade<br>que faz sentido.</h2><p>Uma boa rotina pode começar com uma resposta rápida. Só adicione integrações quando houver uma necessidade clara.</p></div><p>As opções abaixo não são um ranking nem um teste de laboratório. São caminhos diferentes para necessidades diferentes.</p></div>${tools()}</div></section>
  <section class="trust-section" id="metodo"><div class="shell trust-grid"><div class="section-heading"><div class="section-kicker">Antes de apertar enviar</div><h2>Confiança também faz parte do fluxo.</h2><p>Uma resposta pode ser rápida e ainda assim respeitar a pessoa do outro lado.</p></div><div class="trust-list">
    <div class="trust-item"><span>01</span><div><h3>Permissão vem antes da retomada</h3><p>Mensagens iniciadas pelo negócio exigem autorização; confira também as regras de modelos e a política vigente da Meta.</p></div></div>
    <div class="trust-item"><span>02</span><div><h3>A equipe sabe quando assumir</h3><p>Reclamação, risco, alergia, cobrança divergente ou pedido por uma pessoa não ficam presos em um menu.</p></div></div>
    <div class="trust-item"><span>03</span><div><h3>Preço e prazo só depois de conferir</h3><p>Agenda, estoque, orçamento e pagamento dependem do dado real, não de uma resposta convincente.</p></div></div>
  </div></div></section>
  <section class="faq-section"><div class="shell faq-grid"><div><div class="section-kicker">Perguntas honestas</div><h2>O que vale saber antes de começar.</h2></div><div class="faq-list">
    ${faq('Preciso pagar uma plataforma para começar?', 'Não necessariamente. O WhatsApp Business tem saudação, ausência, catálogo e respostas rápidas; recursos de IA nativos dependem da conta. Para conectar sistemas externos, avalie a Plataforma oficial e os custos atuais.')}
    ${faq('Posso mandar lembretes e ofertas para toda a minha lista?', 'Não trate uma lista de números como autorização. Para iniciar mensagens, obtenha permissão e observe a política do WhatsApp, os modelos aprovados quando exigidos e as regras locais aplicáveis.')}
    ${faq('Esses roteiros garantem mais vendas?', 'Não. São modelos de organização e exemplos de conversa, não uma previsão de resultados. Adapte-os ao negócio, teste com a equipe e acompanhe o que acontece de verdade.')}
  </div></div></section>`;
  return document({ ...HOME, body, schema: {
    '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name,
    url: absolute('/'), inLanguage: SITE.language, description: HOME.description
  } });
}
function relatedGuides(guide) {
  const own = WORKFLOWS.findIndex(({ id }) => id === guide.workflow.id);
  const sectorIndex = SECTORS.findIndex(({ slug }) => slug === guide.sector.slug);
  const selected = [1, 2, 3].map((step) => GUIDES.find(({ sector, workflow }) =>
    sector.slug === guide.sector.slug && workflow.id === WORKFLOWS[(own + step) % WORKFLOWS.length].id));
  selected.push(GUIDES.find(({ sector, workflow }) =>
    sector.slug === SECTORS[(sectorIndex + 1) % SECTORS.length].slug && workflow.id === guide.workflow.id));
  return selected;
}
function guidePage(guide) {
  const { sector, workflow, scenario } = guide;
  const body = `<div class="shell"><nav class="breadcrumbs" aria-label="Trilha de navegação"><a href="/">Início</a><span aria-hidden="true">/</span><a href="/#roteiros">Roteiros</a><span aria-hidden="true">/</span><span>${h(sector.label)} · ${h(workflow.label)}</span></nav>
    <section class="article-hero"><div><p class="eyebrow">Guia de campo · ${h(sector.category)} / ${h(workflow.label)}</p>
      <h1>${h(workflow.headline)} para ${h(sector.search)}</h1><p class="article-lead">${h(scenario.scene)} Aqui você encontra um roteiro possível, o que conferir antes de responder e o ponto certo de passar a conversa para alguém.</p>
      <div class="article-actions"><a class="btn btn--dark" href="#passo-a-passo">Ver passo a passo ${arrow}</a><a class="btn btn--line" href="#ferramentas">Escolher ferramenta</a></div>
      <div class="article-meta"><span>${h(sector.label)}</span><span>${h(workflow.label)}</span><span>Leitura prática · 4 min</span><span>Atualizado em 17 out 2026</span></div>
    </div><aside class="scene-card" aria-label="Exemplo de pergunta do cliente"><span class="scene-label">A pergunta que chega</span><blockquote>“${h(scenario.question)}”</blockquote><p>Exemplo ilustrativo. O próximo passo precisa caber na rotina real do negócio.</p></aside></section></div>
  <div class="article-divider"></div><div class="shell article-layout"><article class="article-content">
    <section id="diagnostico"><div class="section-kicker">01 / Entenda a cena</div><h2>O que a pessoa precisa agora?</h2>
      <p class="intro-paragraph">${h(sector.context)}</p><p>${h(workflow.promise)}</p><p>${h(sector.operations)}</p>
      <div class="decision-grid"><div class="decision-card"><span>Quando entra</span><p>${h(workflow.trigger)}</p></div>
        <div class="decision-card"><span>O que guardar</span><p>${h(workflow.collect)}</p></div>
        <div class="decision-card"><span>Quando parar</span><p>${h(scenario.handoff)}</p></div></div></section>
    <section id="mensagem"><div class="section-kicker">02 / Texto para adaptar</div><h2>Uma resposta que abre caminho.</h2>
      <p>Use o exemplo como ponto de partida, não como mensagem para disparar sem contexto. Ajuste vocabulário, horário e disponibilidade com quem realmente atende.</p>
      <figure class="message-example"><div class="bubble">${h(scenario.question)}</div><div class="bubble bubble--right">${h(scenario.reply)}</div>
      <figcaption>Conversa fictícia para ilustrar o fluxo. Confirme dados reais antes de enviar a resposta.</figcaption></figure></section>
    <section id="passo-a-passo"><div class="section-kicker">03 / Coloque de pé</div><h2>Do chat à rotina, em três movimentos.</h2>
      <ol class="step-list"><li><div><h3>Prepare a informação certa</h3><p>${h(scenario.firstStep)} ${h(workflow.path[0])}</p></div></li>
        <li><div><h3>Responda sem inventar certeza</h3><p>${h(workflow.path[1])} Use a resposta de exemplo acima e ajuste nomes, prazos e condições com os dados do seu negócio.</p></div></li>
        <li><div><h3>Deixe a pessoa assumir quando precisar</h3><p>${h(workflow.path[2])} ${h(scenario.handoff)}</p></div></li></ol>
      <div class="quick-win"><span aria-hidden="true">✳</span><div><strong>Para testar ainda hoje</strong><p>${h(scenario.check)}</p></div></div></section>
    <section id="ferramentas"><div class="section-kicker">04 / Escolha com critério</div><h2>Qual ferramenta cabe neste momento?</h2>
      <p>${h(workflow.app)} Ferramentas de fluxo não substituem a checagem da agenda, do estoque ou do caixa. Consulte preços e disponibilidade diretamente com cada fornecedor.</p>
      ${tools()}</section>
    <section id="cuidados"><div class="section-kicker">05 / Limites claros</div><h2>O que não deixar no automático.</h2>
      <div class="warning-card"><h3>Segurança antes da velocidade</h3><p>${h(workflow.caution)} ${h(sector.care)}</p>
      <p>Se a empresa iniciar uma nova conversa, confirme autorização de contato, janela de atendimento e eventual necessidade de modelo aprovado na <a class="text-link" href="https://business.whatsapp.com/policy" target="_blank" rel="noopener noreferrer">política atual da Meta ${arrow}</a>. Não use integrações não oficiais que prometem disparos sem essas regras.</p></div></section>
    <section id="medir"><div class="section-kicker">06 / Aprenda com o uso</div><h2>Uma medida melhor que “respondeu rápido”.</h2>
      <div class="metric-card"><span>Observe na primeira semana</span><p>${h(workflow.metric)} ${h(sector.place[0].toUpperCase() + sector.place.slice(1))}, revise também as perguntas que a equipe ainda precisa esclarecer manualmente.</p></div></section>
    <section id="duvidas"><div class="section-kicker">Perguntas frequentes</div><h2>Antes de colocar para rodar.</h2><div class="faq-list">
      ${faq(`Dá para começar ${sector.place} só com o aplicativo?`, workflow.app)}
      ${faq(`Quando ${sector.team} precisa assumir a conversa?`, scenario.handoff)}
      ${faq('E se a mensagem for enviada depois, por iniciativa do negócio?', 'Peça autorização para esse tipo de contato, respeite pedidos de saída e confira as regras atuais de modelos e tarifas da Plataforma oficial. Não trate silêncio como permissão.')}
    </div></section>
    <section id="continuar"><div class="section-kicker">Continue de onde faz sentido</div><h2>O próximo roteiro está por aqui.</h2><p>Escolha uma situação vizinha, não dez automações de uma vez. O objetivo é melhorar uma conversa real por vez.</p>
      <div class="related-grid">${relatedGuides(guide).map((item) => `<a class="related-card" href="${h(item.url)}"><span>${h(item.sector.label)} · ${h(item.workflow.label)}</span><strong>${h(item.workflow.short)}</strong>${arrow}</a>`).join('')}</div></section>
  </article><aside class="article-sidebar" aria-label="Navegação do roteiro"><nav class="toc" aria-label="Nesta página"><h2>Neste roteiro</h2><a href="#diagnostico">Entenda a cena</a><a href="#mensagem">Mensagem de exemplo</a><a href="#passo-a-passo">Passo a passo</a><a href="#ferramentas">Ferramentas</a><a href="#cuidados">Limites claros</a><a href="#medir">Como medir</a><a href="#duvidas">Perguntas frequentes</a></nav>
    <div class="sidebar-note"><span>Próximo passo</span><p>Comece pela resposta. Conecte sistemas só quando souber o que a equipe precisa conferir.</p><a href="/#roteiros">Ver os 99 roteiros ${arrow}</a></div></aside></div>`;
  return document({ ...guide, body, type: 'article', schema: {
    '@context': 'https://schema.org', '@type': 'Article', headline: `${workflow.headline} para ${sector.search}`,
    description: guide.description, mainEntityOfPage: absolute(guide.url),
    datePublished: SITE.published, dateModified: SITE.published, inLanguage: SITE.language,
    author: { '@type': 'Organization', name: SITE.name },
    publisher: { '@type': 'Organization', name: SITE.name, url: absolute('/') }
  } });
}

await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, 'assets'), { recursive: true });
for (const asset of ['favicon.svg', 'social-card.png', 'site.css', 'site.js']) {
  await cp(path.join(root, 'assets', asset), path.join(dist, 'assets', asset));
}
await writeFile(path.join(dist, 'index.html'), homePage());
for (const guide of GUIDES) {
  const directory = path.join(dist, 'guias', guide.slug);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), guidePage(guide));
}
const paths = [HOME.url, ...GUIDES.map(({ url }) => url)];
await writeFile(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((url) => `  <url><loc>${h(absolute(url))}</loc><lastmod>${SITE.published}</lastmod></url>`).join('\n')}\n</urlset>\n`);
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${absolute('/sitemap.xml')}\n`);
console.log(`Built ${paths.length} static HTML pages for ${origin}`);
