export const serviceSectors = [
  {
    slug: 'estudio-de-pilates', label: 'Estúdio de pilates', search: 'estúdio de pilates', category: 'Bem-estar',
    context: 'No estúdio de pilates, turma, disponibilidade e necessidade de avaliação importam mais que mandar uma tabela de planos. A primeira aula não deve prometer resultado de saúde.',
    operations: 'Organize modalidade, tamanho da turma, aula experimental e política de reposição. Mantenha vagas reais por professor e horário.',
    care: 'Dor, lesão, gestação ou recomendação médica pedem orientação de profissional habilitado; uma conversa comercial não substitui avaliação.',
    scenarios: {
      'primeiro-contato': {
        scene: 'Uma pessoa pergunta sobre começar pilates e não sabe se há turma para quem nunca praticou.',
        question: 'Nunca fiz pilates. Vocês têm aula para iniciante?',
        reply: 'Temos opções para começar, sim. Você prefere manhã ou fim do dia? A equipe explica como funciona a avaliação antes da primeira aula.',
        firstStep: 'Faça a primeira resposta separar modalidade, turno e interesse em aula experimental, sem prometer benefício clínico.',
        handoff: 'Se a pessoa relatar dor, cirurgia ou orientação médica, peça avaliação da equipe habilitada antes de indicar turma.'
      },
      agendamento: {
        scene: 'Uma aula experimental só pode ser marcada onde há vaga e instrutor disponível para receber alguém novo.',
        question: 'Dá para fazer aula experimental terça depois das seis?',
        reply: 'Posso conferir as vagas de terça após as 18h. Você já fez pilates antes? A equipe confirma a turma adequada e o horário.',
        firstStep: 'Separe turmas com vaga real para iniciantes e bloqueie horários sem profissional disponível.',
        handoff: 'Necessidade de adaptação ou turma cheia exige conversa com instrutor antes de confirmar.'
      },
      orcamento: {
        scene: 'Quem pergunta pelo valor do plano precisa entender frequência, duração e regra de reposição.',
        question: 'Quanto fica fazer pilates duas vezes por semana?',
        reply: 'Te mostro os planos de duas aulas semanais e as regras de reposição. A equipe confirma qual turma tem vaga antes da matrícula.',
        firstStep: 'Monte uma comparação clara entre frequências e condições de reposição, sem sugerir que preço substitui avaliação.',
        handoff: 'Condição específica de saúde ou necessidade de aula individual vai para o profissional responsável.'
      },
      catalogo: {
        scene: 'A página de planos usa nomes internos que não explicam se a aula é em grupo ou individual.',
        question: 'Qual a diferença entre aula em grupo e individual?',
        reply: 'Posso te mostrar como funcionam os formatos, duração e disponibilidade. Se precisar de adaptação, um instrutor conversa com você.',
        firstStep: 'Descreva modalidades, tamanho máximo da turma, duração e regras de matrícula em cada item do catálogo.',
        handoff: 'Pergunta sobre exercício para uma lesão vai para instrutor habilitado; catálogo não faz prescrição.'
      },
      lembrete: {
        scene: 'O lembrete de aula experimental deve informar local e como remarcar, não cobrar presença automaticamente.',
        question: 'Minha aula experimental está marcada para amanhã?',
        reply: 'Vou conferir seu horário com a recepção e te mando endereço e orientação para remarcar, se precisar.',
        firstStep: 'Envie somente para aulas confirmadas, com endereço do estúdio e caminho curto para reagendar.',
        handoff: 'Mudança de turma ou ausência de instrutor exige contato da recepção antes do lembrete.'
      },
      'pos-venda': {
        scene: 'Depois da primeira aula, o estúdio pode perguntar como foi sem transformar a resposta em promessa de melhora.',
        question: 'Gostei da aula, mas fiquei com uma dúvida sobre um movimento.',
        reply: 'Que bom que veio! Vou passar sua dúvida ao instrutor da aula para ele orientar você com calma.',
        firstStep: 'Faça um único contato autorizado depois da aula para ouvir dúvidas sobre experiência e horários.',
        handoff: 'Desconforto, dor ou dúvida técnica deve ser tratada pelo instrutor, não por resposta automática.'
      },
      retomada: {
        scene: 'A pessoa pediu aviso quando abrisse turma de manhã e não autorização para receber promoções diárias.',
        question: 'Se abrir pilates às sete da manhã, pode me avisar?',
        reply: 'Oi! Você pediu aviso se surgisse turma às 7h. Há uma atualização na agenda; ainda quer que a recepção confira uma vaga?',
        firstStep: 'Registre turno, modalidade e autorização específica para contato; encerre o aviso se a pessoa desistir.',
        handoff: 'A recepção confirma a vaga e o instrutor avalia necessidades de adaptação antes da matrícula.'
      },
      pix: {
        scene: 'O plano mensal foi escolhido, mas a cobrança precisa dizer a qual período e frequência se refere.',
        question: 'Posso pagar a mensalidade de duas aulas por Pix?',
        reply: 'Pode. Vou conferir plano, período e valor combinado e te envio a orientação oficial de pagamento do estúdio.',
        firstStep: 'Identifique período de referência, frequência e valor aprovado antes de enviar cobrança.',
        handoff: 'Reposição, desconto negociado ou pagamento não conciliado é assunto da recepção financeira.'
      },
      encaminhamento: {
        scene: 'Uma aluna relata dor após a aula; o fluxo não deve sugerir exercícios nem seguir vendendo planos.',
        question: 'Senti uma dor forte depois da aula. Posso falar com o instrutor?',
        reply: 'Claro. Vou encaminhar seu relato ao instrutor agora. Se a dor for intensa ou urgente, procure atendimento de saúde sem esperar a conversa.',
        firstStep: 'Defina relato de dor, lesão e pedido de instrutor como saída imediata da automação.',
        handoff: 'O profissional habilitado assume o caso; a automação não diagnostica nem prescreve exercícios.'
      }
    }
  },
  {
    slug: 'assistencia-tecnica-celulares', label: 'Assistência técnica de celulares', search: 'assistência técnica de celulares', category: 'Serviços',
    context: 'Na assistência técnica, modelo do aparelho, sintoma e peça disponível mudam prazo e valor. Conversa organizada protege também os dados do cliente.',
    operations: 'Separe triagem, diagnóstico, autorização e retirada. Nunca peça senha de desbloqueio ou acesso a contas em mensagem automática.',
    care: 'Aparelho com bateria estufada, superaquecimento ou dados expostos exige atenção humana e orientação segura, não um roteiro de venda.',
    scenarios: {
      'primeiro-contato': {
        scene: 'A pessoa escreve sobre tela trincada e quer saber se a loja recebe o aparelho hoje.',
        question: 'Quebrei a tela do meu celular. Posso levar agora?',
        reply: 'Pode me dizer marca e modelo? Vou conferir horário de recebimento e se a equipe consegue avaliar a peça antes de falar em prazo.',
        firstStep: 'Na chegada, peça apenas modelo, sintoma e preferência de horário; não solicite senha nem foto de documentos.',
        handoff: 'Se o aparelho estiver superaquecendo ou com bateria inchada, um técnico assume sem sugerir uso contínuo.'
      },
      agendamento: {
        scene: 'A pessoa quer conserto no mesmo dia, mas horário de triagem não é promessa de entrega.',
        question: 'Tem horário hoje para olhar meu iPhone? Preciso dele à noite.',
        reply: 'Posso verificar um horário para avaliação hoje. O prazo do reparo depende de diagnóstico e peça; o técnico confirma depois de examinar.',
        firstStep: 'Mostre horários de recebimento para diagnóstico separados de prazos de execução do conserto.',
        handoff: 'Reparo urgente e necessidade de backup são avaliados por técnico antes de qualquer prazo.'
      },
      orcamento: {
        scene: 'O preço de trocar tela varia por modelo e qualidade de peça, e o defeito pode ser maior que o vidro.',
        question: 'Quanto custa trocar a tela de um Galaxy A54?',
        reply: 'Consigo verificar peças disponíveis para o A54. O valor final depende da avaliação do aparelho e da peça escolhida; te passo isso com clareza.',
        firstStep: 'Registre modelo exato, tipo de dano e peça considerada; indique o que depende de teste presencial.',
        handoff: 'Se o toque falha ou há dano interno, o técnico revisa o orçamento e pede autorização antes de trocar.'
      },
      catalogo: {
        scene: 'Uma lista de reparos não explica ao cliente o que é diagnóstico, troca de peça e garantia.',
        question: 'Vocês trocam bateria? Tem garantia do serviço?',
        reply: 'Fazemos avaliação de bateria para modelos atendidos. Posso te mostrar como funciona o serviço e as condições de garantia?',
        firstStep: 'Descreva no catálogo quais modelos são atendidos, avaliação necessária e condições escritas de garantia.',
        handoff: 'Compatibilidade da peça e risco de perda de dados precisam de confirmação do técnico.'
      },
      lembrete: {
        scene: 'O cliente recebeu previsão de retirada, mas o aviso só pode sair quando o aparelho foi testado e liberado.',
        question: 'Meu celular já está pronto para buscar?',
        reply: 'Vou conferir se o técnico terminou os testes e liberou a retirada. Te aviso o horário certo assim que confirmar.',
        firstStep: 'Use o status de teste concluído para avisar retirada, nunca apenas a hora estimada na entrada.',
        handoff: 'Peça atrasada ou teste reprovado deve ser explicado pelo técnico antes de novo prazo.'
      },
      'pos-venda': {
        scene: 'Após a troca de tela, o toque apresenta falha e o suporte deve ligar a queixa à ordem de serviço.',
        question: 'A tela que trocaram parou de responder em uma parte.',
        reply: 'Sinto muito. Vou localizar a ordem de serviço e passar ao técnico para avaliar a falha e orientar o atendimento de garantia.',
        firstStep: 'Vincule o contato posterior ao reparo realizado e deixe o procedimento de garantia fácil de encontrar.',
        handoff: 'Falha após reparo ou dúvida sobre dados do aparelho vai ao técnico responsável, sem diagnóstico no bot.'
      },
      retomada: {
        scene: 'O cliente pediu aviso quando chegasse a bateria do modelo dele e autorizou um único retorno.',
        question: 'Quando chegar a bateria do meu modelo, me manda mensagem?',
        reply: 'Oi! Você pediu aviso sobre a bateria do seu modelo. Chegou uma atualização de peças; quer que o técnico confira compatibilidade?',
        firstStep: 'Registre modelo, peça e autorização; não ofereça reparos diferentes em uma sequência de mensagens.',
        handoff: 'O técnico confirma a referência da peça antes de pedir que o cliente leve o aparelho.'
      },
      pix: {
        scene: 'O orçamento de reparo foi aprovado e a cobrança deve indicar peça, serviço e ordem corretos.',
        question: 'Como faço o Pix para retirar o celular consertado?',
        reply: 'Vou conferir sua ordem de serviço e o valor aprovado. Depois envio a orientação de pagamento da loja e confirmo a liberação no sistema.',
        firstStep: 'Relacione valor final aprovado à ordem de serviço sem enviar chave Pix avulsa em conversa confusa.',
        handoff: 'Divergência de orçamento ou captura de comprovante sem baixa bancária vai ao caixa.'
      },
      encaminhamento: {
        scene: 'A bateria inchou e o cliente pede orientação; o caso é de segurança, não de resposta comercial automática.',
        question: 'Meu celular está estufado e muito quente. Posso levar aí?',
        reply: 'Vou chamar um técnico para orientar a entrega com segurança. Evite continuar usando ou carregando o aparelho enquanto aguarda orientação especializada.',
        firstStep: 'Defina “bateria estufada”, “muito quente” e exposição de dados como prioridade de atendimento humano.',
        handoff: 'Um técnico assume o caso e orienta manuseio seguro; o fluxo não pede senha nem promete reparo imediato.'
      }
    }
  },
  {
    slug: 'lavanderia', label: 'Lavanderia', search: 'lavanderia', category: 'Serviços',
    context: 'Na lavanderia, tipo de peça, etiqueta de cuidado, coleta e prazo mudam o serviço. Uma triagem curta evita tratar tecido delicado como roupa comum.',
    operations: 'Separe lavagem por peça, volume e serviços delicados. Registre coleta, conferência das peças e prazo prometido depois da triagem.',
    care: 'Mancha antiga ou tecido frágil não tem garantia automática de remoção. Perda e dano precisam de responsável humano e registro do lote.',
    scenarios: {
      'primeiro-contato': {
        scene: 'A pessoa pergunta se a lavanderia busca um edredom em casa e quer saber como funciona a coleta.',
        question: 'Vocês retiram um edredom no meu bairro?',
        reply: 'Posso conferir a rota de coleta. Qual é o bairro e o tamanho do edredom? A equipe confirma prazo e tipo de lavagem depois da triagem.',
        firstStep: 'Abra a conversa com tipo de peça e bairro; evite prometer prazo antes de conferir a etiqueta.',
        handoff: 'Tecido especial, mancha difícil ou pedido fora da rota vai para a equipe avaliar.'
      },
      agendamento: {
        scene: 'Uma coleta precisa caber na rota, e horário de retirada não significa entrega no dia seguinte.',
        question: 'Conseguem buscar minhas roupas amanhã cedo?',
        reply: 'Vou conferir a rota de amanhã cedo. Qual o bairro e mais ou menos quantas peças são? Depois confirmo a janela de coleta.',
        firstStep: 'Organize janelas por bairro e capacidade da rota, deixando prazo de entrega separado da coleta.',
        handoff: 'Volume alto ou endereço fora da rota precisa de confirmação da equipe logística.'
      },
      orcamento: {
        scene: 'Lavar um terno não custa o mesmo que uma cesta de roupas; preço exige tipo e quantidade.',
        question: 'Quanto fica lavar dois ternos e uma colcha?',
        reply: 'Posso te passar a referência para cada peça. A equipe confere tecido e etiqueta na entrada antes de fechar o orçamento.',
        firstStep: 'Peça lista de peças, material e serviço desejado; indique quando a etiqueta pode alterar o método.',
        handoff: 'Peça sem etiqueta, tecido delicado ou mancha específica é avaliada por quem executa a lavagem.'
      },
      catalogo: {
        scene: 'A tabela de serviços usa “lavagem especial” sem explicar quais peças entram nem os cuidados.',
        question: 'Vocês lavam cortina e tapete também?',
        reply: 'Posso te mostrar quais peças atendemos e como funciona a triagem. Para cortina ou tapete, a equipe confirma material e tamanho.',
        firstStep: 'Organize serviços por tipo de peça e deixe visíveis coleta, prazo estimado e avaliação necessária.',
        handoff: 'Material que pode encolher ou soltar tinta precisa de avaliação antes de aceitar o pedido.'
      },
      lembrete: {
        scene: 'O pedido de roupas está pronto e o aviso de retirada só pode sair após a conferência final do lote.',
        question: 'Minhas roupas já estão prontas para buscar?',
        reply: 'Vou conferir se o lote passou pela revisão final e te confirmo o horário de retirada por aqui.',
        firstStep: 'Acione o aviso quando conferência e embalagem estiverem concluídas, com número do pedido correto.',
        handoff: 'Peça faltando, atraso ou mudança para entrega em domicílio vai para a equipe.'
      },
      'pos-venda': {
        scene: 'Uma peça voltou com mancha e a pessoa precisa de análise do caso, não de pesquisa de satisfação.',
        question: 'Minha camisa voltou com uma mancha que não estava antes.',
        reply: 'Sinto muito. Vou localizar o registro da peça e pedir à equipe responsável que veja o que aconteceu com você.',
        firstStep: 'Associe retorno à conferência de entrada e ao número do lote para investigar reclamações.',
        handoff: 'Dano, peça trocada ou mancha nova vai ao responsável da lavanderia com prioridade.'
      },
      retomada: {
        scene: 'Um cliente pediu aviso quando houvesse rota de coleta no bairro e autorizou o retorno naquele dia.',
        question: 'Quando tiver coleta no meu bairro na semana que vem, me avisa?',
        reply: 'Oi! Você pediu aviso sobre coleta no seu bairro. A rota da próxima semana foi atualizada; quer que eu confira uma janela?',
        firstStep: 'Registre bairro, semana e autorização; não mantenha o contato em avisos permanentes sem novo pedido.',
        handoff: 'A equipe confirma capacidade da rota e prazo de lavagem antes de fechar a coleta.'
      },
      pix: {
        scene: 'Após a triagem, o total final das peças mudou; a cobrança deve refletir o orçamento aprovado.',
        question: 'Posso fazer Pix do pedido depois da conferência das roupas?',
        reply: 'Pode. Vou conferir o valor final aprovado e o número do seu pedido antes de mandar a orientação de pagamento.',
        firstStep: 'Vincule a cobrança ao lote conferido, aos serviços aprovados e a eventual taxa de coleta.',
        handoff: 'Alteração de preço ou comprovante sem conciliação exige conferência de uma pessoa.'
      },
      encaminhamento: {
        scene: 'O cliente não encontrou uma peça na entrega; a resposta precisa iniciar busca no lote imediatamente.',
        question: 'Faltou uma camisa no meu pedido. Quem pode verificar?',
        reply: 'Vou passar seu pedido para a equipe conferir o registro de entrada e saída das peças. Alguém assume a conversa por aqui.',
        firstStep: 'Configure peça faltante, dano e cobrança divergente como encaminhamento prioritário com número do lote.',
        handoff: 'A equipe investiga entrada, processamento e entrega; o bot não encerra o caso com mensagem padrão.'
      }
    }
  }
];
