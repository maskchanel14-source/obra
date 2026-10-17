// Each job has a distinct decision, setup path and failure mode. The app is
// deliberately not described as a full workflow engine: branching needs the
// official Business Platform and an appropriate integration.
export const WORKFLOWS = [
  {
    id: 'primeiro-contato',
    label: 'Primeiro contato',
    short: 'Receber sem deixar no vácuo',
    keyword: 'como criar resposta automática no WhatsApp',
    headline: 'Resposta automática no WhatsApp',
    promise: 'Uma boa primeira resposta diz que a mensagem chegou, faz só a pergunta necessária e combina o próximo passo. Ela não finge ser uma pessoa nem promete disponibilidade que a equipe não tem.',
    trigger: 'Mensagem nova de alguém que ainda não tem atendimento em andamento.',
    collect: 'Nome, motivo do contato e melhor momento para resposta — somente se isso for realmente necessário.',
    path: [
      'Escreva uma saudação que diga quando uma pessoa da equipe volta ao chat.',
      'Separe as perguntas frequentes em duas ou três respostas curtas; não transforme a chegada em interrogatório.',
      'Encaminhe pedidos urgentes ou fora do roteiro com o histórico da conversa, sem pedir tudo de novo.'
    ],
    app: 'No aplicativo, comece com saudação, ausência e respostas rápidas. Para ligar a conversa a sistemas externos, avalie a Plataforma oficial; recursos nativos de IA podem variar conforme a conta.',
    metric: 'Conte quantas conversas novas receberam um próximo passo claro e quantas precisaram ser refeitas por falta de contexto.',
    caution: 'Não chame uma mensagem de ausência de atendimento humano 24 horas. Diga com honestidade quando alguém estará disponível.'
  },
  {
    id: 'agendamento',
    label: 'Agendamento',
    short: 'Marcar sem idas e vindas',
    keyword: 'como automatizar agendamento pelo WhatsApp',
    headline: 'Agendamento pelo WhatsApp',
    promise: 'Agendar bem é confirmar serviço, duração e horário antes de dizer “está marcado”. Se a agenda não está sincronizada, a resposta automática deve oferecer opções, não confirmar vaga inexistente.',
    trigger: 'Cliente pede data ou horário para um serviço, reserva ou retirada.',
    collect: 'Serviço desejado, data preferida, turno e informação indispensável para reservar a vaga.',
    path: [
      'Defina duração, intervalo e responsável por cada tipo de horário antes de oferecer opções.',
      'Peça uma preferência de dia e turno; consulte a agenda real antes de confirmar.',
      'Envie confirmação com endereço, regra de alteração e um caminho simples para cancelar.'
    ],
    app: 'No aplicativo, respostas rápidas ajudam a pedir dia e turno. Para confirmar vagas a partir de uma agenda externa, avalie uma integração com a Plataforma oficial; recursos nativos variam por conta.',
    metric: 'Compare pedidos de horário recebidos com reservas realmente confirmadas; observe remarcações por conflito de agenda.',
    caution: 'Nunca diga que uma reserva está confirmada antes de validar o horário com a agenda ou com alguém da equipe.'
  },
  {
    id: 'orcamento',
    label: 'Orçamento',
    short: 'Pedir o contexto certo',
    keyword: 'como organizar orçamentos no WhatsApp',
    headline: 'Orçamentos no WhatsApp',
    promise: 'O ganho está em pedir os detalhes que mudam o preço antes de montar a proposta. Quando faltam dados, uma faixa ou uma próxima etapa honesta vale mais que um valor automático inventado.',
    trigger: 'Pessoa pede preço de um serviço ou de um pedido com variações.',
    collect: 'Escopo, quantidade, prazo e condição que altera o preço, sem solicitar dados sensíveis no primeiro contato.',
    path: [
      'Liste três variáveis que sempre mudam o valor final e transforme-as em perguntas curtas.',
      'Separe preço fechado, estimativa e avaliação presencial; use o nome correto em cada resposta.',
      'Registre quem aprova a proposta e quando ela deixa de valer; entregue o caso a uma pessoa quando houver exceção.'
    ],
    app: 'No aplicativo, respostas rápidas padronizam a coleta. Para montar propostas com dados de outros sistemas, use uma integração oficial e aprovação humana.',
    metric: 'Observe quantos pedidos de preço chegam completos para análise e quantos voltam por informação que faltou.',
    caution: 'Não transforme uma estimativa em promessa de preço final; condições e disponibilidade devem ser confirmadas.'
  },
  {
    id: 'catalogo',
    label: 'Catálogo',
    short: 'Mostrar a opção certa',
    keyword: 'como usar catálogo do WhatsApp Business',
    headline: 'Catálogo no WhatsApp Business',
    promise: 'O catálogo resolve a pergunta “o que vocês têm?” quando está limpo, atualizado e fácil de percorrer. Uma indicação útil começa com uma preferência, não com dez produtos jogados no chat.',
    trigger: 'Cliente pede opções, cardápio, serviços, modelos ou disponibilidade.',
    collect: 'Preferência, tamanho ou tipo de serviço e faixa desejada, se a pessoa quiser informar.',
    path: [
      'Organize poucos itens por categoria, com descrição e condição de compra ou reserva legíveis.',
      'Pergunte uma preferência antes de sugerir uma seleção curta do catálogo.',
      'Cheque estoque ou agenda antes da confirmação; sinalize quando a disponibilidade pode mudar.'
    ],
    app: 'O aplicativo já oferece catálogo e respostas rápidas. Recomendação baseada em estoque em tempo real precisa de integração e dados confiáveis.',
    metric: 'Acompanhe quantas conversas sobre opções chegam a uma escolha concreta e quais itens geram dúvidas repetidas.',
    caution: 'Imagem bonita não substitui informação atual: revise preço, prazo, condições e disponibilidade com frequência.'
  },
  {
    id: 'lembrete',
    label: 'Lembrete',
    short: 'Lembrar sem incomodar',
    keyword: 'como enviar lembrete pelo WhatsApp Business',
    headline: 'Lembretes pelo WhatsApp',
    promise: 'Um lembrete útil confirma o combinado e oferece uma saída fácil para remarcar. Ele não deve virar uma sequência de mensagens para quem cancelou ou não autorizou o contato.',
    trigger: 'Existe uma reserva ou entrega confirmada que merece um lembrete combinado.',
    collect: 'Horário confirmado, canal de contato autorizado, prazo útil para alteração e status atualizado da reserva.',
    path: [
      'Escolha um único momento em que a lembrança realmente ajude, considerando o tipo de compromisso.',
      'Escreva mensagem com data, local ou retirada e uma instrução curta para alterar.',
      'Interrompa o envio quando houver cancelamento; fora da janela de atendimento, confira consentimento e modelo aprovado.'
    ],
    app: 'No aplicativo, salve um texto para envio manual. Se o disparo depender de uma agenda externa, avalie a Plataforma oficial; em qualquer canal, confira opt-in e a categoria de mensagem.',
    metric: 'Acompanhe confirmações, remarcações e lembretes enviados por engano após cancelamento.',
    caution: 'Não envie lembretes automáticos sem permissão nem trate um agendamento cancelado como ativo.'
  },
  {
    id: 'pos-venda',
    label: 'Pós-venda',
    short: 'Cuidar depois da entrega',
    keyword: 'como fazer pós-venda no WhatsApp',
    headline: 'Pós-venda no WhatsApp',
    promise: 'Pós-venda é uma pergunta sincera depois da entrega, com espaço para resolver um problema. Não é pedir nota máxima antes de saber se a experiência foi boa.',
    trigger: 'Pedido concluído ou serviço encerrado com contato posterior autorizado.',
    collect: 'Data da entrega, item ou serviço realizado, responsável pela solução e resposta do cliente.',
    path: [
      'Defina um intervalo razoável depois da entrega, sem mandar mensagem no mesmo minuto.',
      'Faça uma pergunta aberta e ofereça um canal direto para ajustes ou reclamações.',
      'Marque as respostas que precisam de retorno humano e feche o caso só depois de resolver.'
    ],
    app: 'No aplicativo, use etiquetas e uma resposta rápida para acompanhamento manual. Fluxos disparados pelo status do pedido precisam de integração oficial e consentimento.',
    metric: 'Registre retornos que pediram solução e se a equipe respondeu; não use só a quantidade de avaliações positivas.',
    caution: 'Nunca condicione suporte a uma boa avaliação ou esconda um problema em uma resposta automática.'
  },
  {
    id: 'retomada',
    label: 'Retomada',
    short: 'Voltar ao assunto com permissão',
    keyword: 'como retomar clientes interessados pelo WhatsApp',
    headline: 'Retomada de interesse no WhatsApp',
    promise: 'Retomar uma conversa é lembrar o que a pessoa pediu e facilitar a decisão, não insistir até ela bloquear o número. Se não houver permissão para novo contato, não automatize o envio.',
    trigger: 'Uma conversa sobre produto ou serviço ficou em aberto e a pessoa autorizou o retorno.',
    collect: 'Interesse registrado, data do último contato, autorização, motivo de pausa e preferência de contato.',
    path: [
      'Separe dúvidas em aberto de conversas já encerradas; não trate silêncio como consentimento.',
      'Envie no máximo uma retomada útil, com o contexto original e uma pergunta simples.',
      'Respeite um “não”, remova a pessoa do fluxo e confira modelos aprovados para mensagens iniciadas pelo negócio.'
    ],
    app: 'No aplicativo, uma etiqueta ajuda no acompanhamento individual. Qualquer retomada exige opt-in e opção de parar; para integrar uma lista externa, observe as regras da Plataforma oficial.',
    metric: 'Conte respostas úteis e pedidos de interrupção do contato; crescimento sem consentimento não é sucesso.',
    caution: 'Não importe números de listas nem confunda um orçamento antigo com autorização para campanhas.'
  },
  {
    id: 'pix',
    label: 'Pagamento',
    short: 'Cobrar com clareza e segurança',
    keyword: 'como organizar cobrança por Pix no WhatsApp',
    headline: 'Cobrança por Pix no WhatsApp',
    promise: 'Cobrança boa deixa valor, prazo e pedido visíveis e evita sustos. A confirmação de pagamento deve vir do sistema financeiro, não de uma imagem enviada no chat.',
    trigger: 'Há pedido ou serviço acordado e um pagamento pendente confirmado pela empresa.',
    collect: 'Identificador do pedido, valor aprovado, vencimento, canal seguro de pagamento e status financeiro.',
    path: [
      'Confirme pedido, valor e favorecido antes de compartilhar instruções de pagamento.',
      'Envie a orientação pelo canal oficial e mantenha dados financeiros fora de planilhas abertas.',
      'Só marque como pago após conciliação bancária ou confirmação do provedor; escale divergências para uma pessoa.'
    ],
    app: 'No aplicativo, envie a orientação manualmente depois de conferir o pedido. Lembretes condicionais e confirmação de quitação precisam de integração confiável e autorização.',
    metric: 'Acompanhe pagamentos conciliados corretamente e divergências resolvidas, não apenas comprovantes recebidos.',
    caution: 'Comprovante pode ser falso. Nunca libere produto ou serviço só porque alguém enviou uma captura de tela.'
  },
  {
    id: 'encaminhamento',
    label: 'Atendimento humano',
    short: 'Passar o bastão sem perder contexto',
    keyword: 'como encaminhar atendimento do WhatsApp para uma pessoa',
    headline: 'Encaminhamento humano no WhatsApp',
    promise: 'A automação deve saber parar. Uma boa passagem informa o que já foi dito, quem assume e quando a pessoa pode esperar resposta — sem obrigá-la a começar do zero.',
    trigger: 'Pedido complexo, reclamação, urgência, dúvida fora da base ou solicitação explícita de uma pessoa.',
    collect: 'Resumo da conversa, prioridade, responsável disponível e dado essencial para a próxima ação.',
    path: [
      'Defina sinais que sempre exigem uma pessoa e deixe essa opção visível desde a primeira resposta.',
      'Envie o resumo ao responsável certo, com consentimento e apenas os dados necessários.',
      'Avise o cliente do prazo real e verifique se alguém assumiu; não deixe o caso preso numa fila invisível.'
    ],
    app: 'No aplicativo, etiquetas e respostas rápidas ajudam em repasses manuais. Se a equipe precisa integrar filas e histórico a outros sistemas, avalie uma solução ligada à Plataforma oficial.',
    metric: 'Meça transferências que tiveram responsável definido e tempo até a primeira resposta humana.',
    caution: 'Nunca esconda a opção de falar com alguém, sobretudo em conflito, erro de pagamento ou questão sensível.'
  }
];
