export const beautySectors = [
  {
    slug: 'salao-de-beleza', label: 'Salão de beleza', search: 'salão de beleza', category: 'Beleza',
    context: 'No salão, uma mesma conversa mistura cor, corte, profissional preferida e horário. Se tudo vira “qual dia você quer?”, a equipe volta várias vezes ao começo.',
    operations: 'Separe serviços rápidos de procedimentos que exigem avaliação. Deixe duração e profissional visíveis para a recepção antes de prometer uma vaga.',
    care: 'Alergias, reações ou dúvidas sobre procedimentos devem ir para uma profissional; o roteiro não faz avaliação técnica pelo chat.',
    scenarios: {
      'primeiro-contato': {
        scene: 'A cliente pergunta sobre luzes no fim do expediente e fica sem saber se alguém recebeu a mensagem.',
        question: 'Oi! Vocês fazem luzes em cabelo já colorido?',
        reply: 'Oi! Fazemos avaliação antes de indicar luzes em cabelo colorido. Você prefere que a equipe fale com você amanhã de manhã ou à tarde?',
        firstStep: 'Salve uma saudação que diferencie pedido de corte de pedido de cor e informe o próximo horário de atendimento.',
        handoff: 'Se a cliente mencionar química recente ou sensibilidade, passe para a colorista antes de sugerir qualquer procedimento.'
      },
      agendamento: {
        scene: 'Um pedido de corte e escova chega como se fosse um único horário, mas ocupa dois blocos na agenda.',
        question: 'Dá para fazer corte e escova sábado depois do almoço?',
        reply: 'Consigo conferir, sim. Você quer corte e escova na mesma visita? Vou checar a duração e a agenda da profissional antes de confirmar.',
        firstStep: 'Mapeie os tempos de corte, escova e coloração separadamente antes de oferecer sábado como opção.',
        handoff: 'Quando há encaixe, duas profissionais ou procedimento demorado, a recepção valida a agenda antes de confirmar.'
      },
      orcamento: {
        scene: 'A pessoa pede preço de coloração sem dizer comprimento ou histórico; um valor fechado seria chute.',
        question: 'Quanto sai para mudar meu cabelo de escuro para ruivo?',
        reply: 'O valor depende do histórico de cor e do que será necessário fazer. Posso separar uma avaliação com a colorista e depois te passar a proposta?',
        firstStep: 'Crie uma resposta que explique por que mudança de cor pede avaliação, em vez de usar uma tabela única para tudo.',
        handoff: 'Histórico de descoloração, alisamento ou reação precisa de avaliação profissional antes de falar em preço final.'
      },
      catalogo: {
        scene: 'A lista de serviços do salão mostra nomes bonitos, mas não explica duração nem o que inclui cada opção.',
        question: 'Qual a diferença entre hidratação e reconstrução aí?',
        reply: 'São propostas diferentes e a escolha depende do fio. Posso te mostrar o que cada serviço inclui e pedir à profissional uma indicação após avaliação?',
        firstStep: 'Revise o catálogo com descrição simples de corte, escova e tratamentos, incluindo “avaliação necessária” quando couber.',
        handoff: 'Se a cliente pedir diagnóstico do cabelo por foto, uma profissional assume a indicação, sem promessa feita pelo catálogo.'
      },
      lembrete: {
        scene: 'O horário de escova foi confirmado, mas a cliente precisa saber quando avisar se não puder comparecer.',
        question: 'Meu horário de amanhã às 15h continua de pé?',
        reply: 'Seu atendimento está registrado para amanhã às 15h. Se precisar mudar, responda por aqui para a recepção conferir outra opção.',
        firstStep: 'Use somente horários confirmados e defina com a equipe quanto tempo antes um lembrete ajuda de verdade.',
        handoff: 'Pedido de mudança de última hora vai para a recepção; não ofereça automaticamente a vaga a outra pessoa.'
      },
      'pos-venda': {
        scene: 'Depois da coloração, uma mensagem útil abre espaço para corrigir um incômodo antes de pedir avaliação pública.',
        question: 'Oi, a cor ficou diferente da que eu imaginei. O que faço?',
        reply: 'Obrigada por contar. Quero que a colorista veja o resultado com você; posso pedir que ela retorne por aqui ainda hoje?',
        firstStep: 'Marque a data do procedimento e combine um único contato posterior, autorizado, com pergunta aberta sobre o resultado.',
        handoff: 'Queixa sobre cor, couro cabeludo ou desconforto não recebe resposta genérica: vai direto à profissional responsável.'
      },
      retomada: {
        scene: 'Uma cliente pediu horário para tratamento e autorizou retorno, mas ainda precisava alinhar o dia.',
        question: 'Pode me avisar depois se aparecer vaga para tratamento na sexta?',
        reply: 'Oi! Você pediu que eu avisasse sobre sexta. Surgiu uma opção para avaliação; quer que eu confira se ainda combina com sua rotina?',
        firstStep: 'Registre o pedido explícito de aviso e a data desejada; sem essa autorização, não transforme a conversa em campanha.',
        handoff: 'Se o serviço depende de avaliação de cabelo, uma profissional confirma o tratamento antes de qualquer reserva.'
      },
      pix: {
        scene: 'Para reservar um procedimento longo, o salão combinou um sinal, mas valor e regra de reagendamento precisam estar claros.',
        question: 'Como pago o sinal da minha coloração de sábado?',
        reply: 'Vou conferir o valor combinado e a política de remarcação da sua reserva. Em seguida envio a instrução oficial de pagamento por aqui.',
        firstStep: 'Escreva uma orientação de sinal com valor aprovado, condição de alteração e identificação da reserva, sem chave Pix solta.',
        handoff: 'Divergência de valor ou comprovante sem confirmação bancária fica com a recepção, não com uma resposta automática.'
      },
      encaminhamento: {
        scene: 'A cliente relata ardência depois de um procedimento; o robô não deve continuar sugerindo produtos.',
        question: 'Fiz o procedimento ontem e meu couro cabeludo está ardendo.',
        reply: 'Sinto muito pelo desconforto. Vou chamar a profissional responsável agora; se houver piora ou urgência, procure atendimento de saúde.',
        firstStep: 'Defina “ardência”, “reação” e pedido de correção como sinais de parada imediata do roteiro automático.',
        handoff: 'A responsável pelo atendimento recebe o histórico e assume; a automação não dá orientação clínica nem prescreve produtos.'
      }
    }
  },
  {
    slug: 'barbearia', label: 'Barbearia', search: 'barbearia', category: 'Beleza',
    context: 'Na barbearia, o cliente quer saber se cabe um corte hoje e com qual barbeiro. Responder depressa sem conferir duração costuma criar encaixes impossíveis.',
    operations: 'Corte, barba e combo têm tempos diferentes. Mantenha os horários reais por profissional e a política de atraso ao alcance de quem responde.',
    care: 'Preferência por barbeiro, ajustes no corte e reclamações merecem retorno pessoal; não resolva insatisfação com resposta pronta.',
    scenarios: {
      'primeiro-contato': {
        scene: 'Alguém escreve no intervalo do almoço querendo corte no mesmo dia e precisa de uma resposta objetiva.',
        question: 'Tem corte com o Rafa hoje no fim da tarde?',
        reply: 'Boa! Vou conferir a agenda do Rafa no fim da tarde. É só corte ou quer incluir barba? Assim te passo uma opção certa.',
        firstStep: 'Separe a mensagem de chegada em corte, barba ou combo e diga quando a agenda será consultada.',
        handoff: 'Se a pessoa só aceita um barbeiro e não há vaga confirmada, a recepção propõe alternativas reais.'
      },
      agendamento: {
        scene: 'O combo corte e barba não cabe no espaço livre de um corte simples; a agenda precisa distinguir os dois.',
        question: 'Consigo marcar corte e barba para quinta às 18h?',
        reply: 'Vou olhar um horário que comporte os dois serviços. Você prefere quinta no fim do dia ou outra opção perto das 18h?',
        firstStep: 'Cadastre a duração do combo e o tempo de intervalo do barbeiro antes de oferecer horários.',
        handoff: 'Encaixe na última hora e preferência por profissional específico só são confirmados por quem vê a agenda.'
      },
      orcamento: {
        scene: 'O cliente confunde serviço de barba simples com desenho e quer saber o valor antes de agendar.',
        question: 'Quanto fica corte com barba e desenho na lateral?',
        reply: 'Consigo te passar os valores dos serviços separados. O desenho pode variar conforme o trabalho; o barbeiro confirma essa parte antes de fechar.',
        firstStep: 'Deixe claro o que entra no combo e o que depende de avaliação do barbeiro, sem esconder adicional.',
        handoff: 'Desenho personalizado ou correção de corte anterior precisa de confirmação do profissional antes do total.'
      },
      catalogo: {
        scene: 'A tabela da barbearia usa nomes de combos que não explicam ao cliente o que ele vai receber.',
        question: 'Esse combo clássico inclui acabamento da barba?',
        reply: 'Inclui corte e acabamento básico da barba. Se você quer um desenho ou tratamento específico, eu te mostro a opção certa.',
        firstStep: 'Reescreva os itens do catálogo com serviço incluído, duração aproximada e eventuais adicionais.',
        handoff: 'Pedidos de estilo muito específico ou referência por foto vão ao barbeiro antes da indicação final.'
      },
      lembrete: {
        scene: 'Um horário no sábado cedo é fácil de esquecer; o lembrete precisa permitir cancelar sem constrangimento.',
        question: 'Confirma meu corte de sábado às nove?',
        reply: 'Seu corte está anotado para sábado às 9h. Se não puder vir, me avise por aqui para a gente liberar o horário.',
        firstStep: 'Programe o lembrete apenas para reservas confirmadas e inclua a política de atraso em linguagem simples.',
        handoff: 'Cancelamento ou chegada atrasada deve atualizar a agenda e ser tratado por quem coordena os encaixes.'
      },
      'pos-venda': {
        scene: 'Após um corte diferente do habitual, vale perguntar se o resultado agradou sem forçar uma nota.',
        question: 'Meu acabamento ficou torto de um lado.',
        reply: 'Poxa, obrigado por avisar. Quero mostrar isso ao barbeiro que te atendeu para combinar um ajuste com você.',
        firstStep: 'Salve o serviço realizado e ofereça um canal direto para ajustes antes de convidar para uma avaliação.',
        handoff: 'Queixa sobre acabamento passa para o barbeiro ou gerente; não responda com cupom automático.'
      },
      retomada: {
        scene: 'Um cliente pediu aviso de vaga com o barbeiro preferido e autorizou o contato quando surgisse encaixe.',
        question: 'Se abrir horário com o Rafa amanhã, você me chama?',
        reply: 'Oi! Você pediu aviso se abrisse vaga com o Rafa. Apareceu uma opção amanhã; quer que eu confira se ainda faz sentido para você?',
        firstStep: 'Anote o barbeiro e o dia pedidos, junto com a autorização; apague o lembrete quando a data passar.',
        handoff: 'Vaga disputada não pode ser prometida a duas pessoas: a recepção confirma antes de reservar.'
      },
      pix: {
        scene: 'Uma reserva para atendimento em grupo envolve sinal, nome de quem paga e regra de cancelamento.',
        question: 'Quero pagar o sinal dos três cortes de sábado. Como faço?',
        reply: 'Vou conferir a reserva do grupo, o valor combinado e a regra de cancelamento. Já te passo a orientação oficial para pagar.',
        firstStep: 'Vincule o pedido de pagamento à reserva do grupo e ao valor aprovado; evite mandar uma chave sem contexto.',
        handoff: 'Se o grupo mudar de tamanho ou o pagamento não for conciliado, uma pessoa ajusta a reserva.'
      },
      encaminhamento: {
        scene: 'O cliente não gostou do resultado e pede para falar com quem realizou o corte, não com um menu de opções.',
        question: 'Preciso falar com o barbeiro sobre o corte de ontem.',
        reply: 'Claro. Vou passar sua mensagem e o horário do atendimento para ele; alguém da equipe responde por aqui assim que assumir.',
        firstStep: 'Crie uma etiqueta de ajuste de serviço e um responsável claro para reclamações depois do atendimento.',
        handoff: 'O barbeiro ou gerente recebe o contexto e responde pessoalmente, sem pedir ao cliente que conte tudo de novo.'
      }
    }
  },
  {
    slug: 'pet-shop', label: 'Pet shop', search: 'pet shop', category: 'Serviços',
    context: 'No pet shop, tamanho do animal, tipo de pelagem, serviço e horário de retirada mudam tudo. O cliente precisa de cuidado, não de um preço genérico.',
    operations: 'Tenha regras claras para banho, tosa, transporte e horário de busca. Confirme quais informações sobre o pet são necessárias para cada atendimento.',
    care: 'Sinais de dor, mal-estar ou reação não são dúvidas de catálogo; interrompa o fluxo e oriente procurar avaliação veterinária quando necessário.',
    scenarios: {
      'primeiro-contato': {
        scene: 'Uma tutora pergunta por banho de um filhote e quer saber se o pet shop pode atender com segurança.',
        question: 'Vocês dão banho em filhote de quatro meses?',
        reply: 'Oi! Posso pedir à equipe para conferir as condições do serviço para o seu filhote. Qual o porte dele e qual dia você tinha em mente?',
        firstStep: 'Na mensagem inicial, peça só porte e serviço desejado; deixe avaliação de condições do animal com a equipe.',
        handoff: 'Dúvida sobre saúde ou restrição ao banho vai para um profissional responsável, sem indicação automática.'
      },
      agendamento: {
        scene: 'Banho com tosa higiênica leva outro tempo e pode depender do porte do pet antes de reservar.',
        question: 'Tem banho e tosa para uma shih-tzu sexta de manhã?',
        reply: 'Vou conferir um horário que comporte banho e tosa para ela. Você precisa de busca e entrega ou vai trazer até a loja?',
        firstStep: 'Separe na agenda banho simples, tosa e transporte; confira a capacidade real de cada turno.',
        handoff: 'Pelagem embaraçada, necessidades especiais ou transporte fora da rota pedem validação humana.'
      },
      orcamento: {
        scene: 'O preço do banho muda com porte, pelagem e serviço adicional; prometer valor só pela raça dá erro.',
        question: 'Quanto custa banho e tosa para meu vira-lata médio?',
        reply: 'Posso te dar o ponto de partida, mas o valor final depende do porte, da pelagem e do tipo de tosa. A equipe confirma antes de fechar, tudo bem?',
        firstStep: 'Liste as variáveis que alteram o serviço e deixe expresso quando será necessária uma avaliação presencial.',
        handoff: 'Nó na pelagem ou condição do animal altera o orçamento e exige conversa com quem fará o atendimento.'
      },
      catalogo: {
        scene: 'O cliente vê “banho completo” no catálogo, mas não sabe se inclui secagem, tosa ou transporte.',
        question: 'O banho completo inclui cortar as unhas?',
        reply: 'Te mostro exatamente o que entra no banho e quais cuidados são adicionais. Quer me dizer o porte do seu pet para eu indicar o serviço?',
        firstStep: 'Descreva cada serviço do catálogo em itens inclusos e adicionais, sem usar nomes ambíguos.',
        handoff: 'Serviço que dependa da condição da pele ou da pelagem precisa de avaliação da equipe antes da indicação.'
      },
      lembrete: {
        scene: 'A tutora quer saber quando buscar o pet e um aviso de retirada deve refletir o andamento real do banho.',
        question: 'Já posso buscar a Mel depois do banho?',
        reply: 'Vou confirmar com a equipe se a Mel já está pronta e te aviso o horário de retirada por aqui, combinado?',
        firstStep: 'Use o status real do serviço para avisar retirada; não programe “pronto” baseado só no horário previsto.',
        handoff: 'Atraso, mudança na rotina do pet ou solicitação de transporte vai para a equipe da loja.'
      },
      'pos-venda': {
        scene: 'Depois da tosa, a tutora relata desconforto e precisa de alguém atento ao caso, não de pesquisa de satisfação.',
        question: 'A Mel ficou se coçando depois da tosa de hoje.',
        reply: 'Sinto muito. Vou chamar quem cuidou dela para entender o que aconteceu; se houver piora, procure orientação veterinária.',
        firstStep: 'Marque o serviço feito e combine um retorno autorizado que permita relatar qualquer reação ou dúvida.',
        handoff: 'Coceira, ferimento ou comportamento incomum exige pessoa responsável e possível orientação veterinária.'
      },
      retomada: {
        scene: 'O tutor pediu para ser avisado quando abrisse um horário de banho para sábado, não para receber promoções.',
        question: 'Se abrir banho sábado cedo para a Nina, me avisa?',
        reply: 'Oi! Você pediu aviso sobre sábado cedo para a Nina. Apareceu uma possibilidade; quer que eu confirme com a equipe?',
        firstStep: 'Guarde a autorização vinculada ao dia e ao serviço, e pare o contato quando a data não fizer mais sentido.',
        handoff: 'Antes de reservar o horário, a equipe confere porte, serviço e disponibilidade do banho.'
      },
      pix: {
        scene: 'Um banho com transporte foi combinado e o pagamento precisa identificar o serviço e o tutor corretos.',
        question: 'Como faço o Pix do banho com leva e traz da Nina?',
        reply: 'Vou conferir o pedido da Nina, o transporte e o valor que combinamos. Depois envio a orientação segura de pagamento.',
        firstStep: 'Associe valor aprovado, pet e serviço ao pedido; confirme o favorecido antes de mandar instruções de Pix.',
        handoff: 'Se houver alteração no transporte ou na cobrança, a loja revisa o valor e confirma quitação no financeiro.'
      },
      encaminhamento: {
        scene: 'Um pet apresenta um sinal de mal-estar e a conversa deve sair imediatamente do menu comercial.',
        question: 'Meu cachorro voltou abatido do banho. Com quem eu falo?',
        reply: 'Sinto muito por isso. Vou passar seu relato à pessoa responsável agora; se ele estiver piorando, procure atendimento veterinário sem esperar nossa resposta.',
        firstStep: 'Configure relato de mal-estar, ferimento ou reação como prioridade para atendimento humano.',
        handoff: 'Uma pessoa da equipe assume o caso e registra os fatos; o fluxo não faz diagnóstico nem tenta encerrar a queixa.'
      }
    }
  },
  {
    slug: 'oficina-mecanica', label: 'Oficina mecânica', search: 'oficina mecânica', category: 'Serviços',
    context: 'Na oficina, a pressa por um valor esconde a etapa essencial: entender o sintoma e verificar o carro. Automação pode organizar a entrada, não diagnosticar.',
    operations: 'Registre modelo, ano, sintoma descrito e data disponível para inspeção. Separe orçamento preliminar de autorização para executar serviço.',
    care: 'Barulho, freio ou superaquecimento podem envolver segurança. Nada de dizer que o carro pode rodar sem avaliação de um profissional.',
    scenarios: {
      'primeiro-contato': {
        scene: 'O motorista escreve sobre um ruído no carro fora do horário e precisa saber como pedir inspeção.',
        question: 'Meu carro está fazendo barulho ao frear. Vocês olham amanhã?',
        reply: 'Recebi sua mensagem. Para a equipe avaliar com segurança, qual é o modelo e o ano do carro? Já verifico a primeira possibilidade de inspeção.',
        firstStep: 'Crie uma resposta de chegada que peça modelo, ano e sintoma sem sugerir diagnóstico por mensagem.',
        handoff: 'Relato de falha de freio ou risco imediato vai para um mecânico; não dê orientação para continuar dirigindo.'
      },
      agendamento: {
        scene: 'A pessoa quer deixar o carro para inspeção, mas confunde horário de entrada com prazo de reparo.',
        question: 'Consigo levar o carro terça às oito e buscar no almoço?',
        reply: 'Posso conferir a entrada na terça às 8h. O prazo de retirada depende da avaliação; a oficina confirma depois de examinar o carro.',
        firstStep: 'Separe na agenda recepção do veículo, diagnóstico e execução, com duração e responsável diferentes.',
        handoff: 'Prazo de entrega após desmontagem ou falta de peça deve ser combinado pelo responsável técnico.'
      },
      orcamento: {
        scene: 'Trocar pastilhas parece simples, mas modelo, peça e condição do sistema mudam o valor final.',
        question: 'Quanto fica trocar as pastilhas do meu Onix?',
        reply: 'Posso levantar uma estimativa com modelo e ano, mas a oficina só fecha o valor depois de conferir peças e estado do sistema, combinado?',
        firstStep: 'Peça identificação do veículo e descreva o que a estimativa cobre antes de enviar qualquer faixa de preço.',
        handoff: 'Peça adicional ou risco identificado na inspeção exige novo orçamento aprovado pelo cliente.'
      },
      catalogo: {
        scene: 'O cliente procura “revisão completa”, uma expressão vaga que esconde serviços bem diferentes.',
        question: 'O que entra na revisão antes de viajar?',
        reply: 'Temos uma lista de verificações, mas ela varia conforme o carro e o histórico. Te mostro os itens e a equipe confirma o escopo antes de começar.',
        firstStep: 'Descreva no catálogo verificações inclusas e serviços cobrados à parte, sem prometer resultado de diagnóstico.',
        handoff: 'Sintoma de segurança ou pedido de reparo específico vai a um mecânico antes de indicar pacote.'
      },
      lembrete: {
        scene: 'O carro está pronto para retirada e o aviso só pode sair depois da confirmação da oficina.',
        question: 'Meu carro já está liberado para buscar?',
        reply: 'Vou conferir com a oficina se o serviço foi concluído e se a retirada está liberada. Te retorno com o horário certo.',
        firstStep: 'Use o status “liberado” confirmado pelo responsável, não a previsão inicial, para enviar aviso de retirada.',
        handoff: 'Se houver atraso, peça pendente ou serviço extra, o responsável explica a mudança antes do aviso.'
      },
      'pos-venda': {
        scene: 'Depois da revisão, o motorista percebe que o ruído continua e precisa reabrir o caso com o histórico.',
        question: 'Peguei o carro ontem, mas o barulho voltou.',
        reply: 'Obrigado por avisar. Vou localizar a ordem de serviço e pedir ao mecânico responsável que converse com você para avaliar o retorno.',
        firstStep: 'Vincule o contato posterior à ordem de serviço e deixe visível o canal para retorno sobre o reparo.',
        handoff: 'Ruído persistente ou dúvida de segurança deve voltar ao mecânico, não para um pedido automático de avaliação.'
      },
      retomada: {
        scene: 'O cliente autorizou receber retorno quando chegasse uma peça necessária para o reparo.',
        question: 'Quando a peça da minha revisão chegar, vocês me avisam?',
        reply: 'Oi! Você pediu aviso sobre a peça. A oficina recebeu uma atualização; quer que eu peça ao responsável para confirmar prazo e próximo passo?',
        firstStep: 'Associe autorização à peça e à ordem de serviço, sem incluir o contato em uma lista geral de promoções.',
        handoff: 'Disponibilidade, compatibilidade e novo valor são confirmados por quem acompanha o reparo.'
      },
      pix: {
        scene: 'Uma oficina enviou orçamento aprovado; o Pix deve corresponder à ordem de serviço, não ao valor estimado antes da inspeção.',
        question: 'Posso pagar o conserto por Pix antes de buscar o carro?',
        reply: 'Pode, depois de conferirmos a ordem de serviço e o valor final aprovado. Vou enviar a orientação de pagamento da oficina.',
        firstStep: 'Só gere a instrução depois da aprovação do orçamento e da identificação correta da ordem de serviço.',
        handoff: 'Diferença entre estimativa e valor final, ou comprovante sem conciliação, precisa da equipe financeira.'
      },
      encaminhamento: {
        scene: 'O motorista diz que o freio falhou depois do serviço: o atendimento comercial não é o lugar desse caso.',
        question: 'O freio ficou estranho depois da revisão. Preciso falar com alguém.',
        reply: 'Entendi a gravidade do relato. Vou chamar o responsável técnico agora; não vou tentar avaliar segurança do carro por mensagem.',
        firstStep: 'Defina falha de freio, vazamento e risco de acidente como gatilhos de transferência prioritária.',
        handoff: 'O técnico recebe o histórico da ordem de serviço e orienta a avaliação; o bot não afirma que dirigir é seguro.'
      }
    }
  }
];
