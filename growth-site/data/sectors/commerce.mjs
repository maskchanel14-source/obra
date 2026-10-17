export const commerceSectors = [
  {
    slug: 'restaurante', label: 'Restaurante', search: 'restaurante', category: 'Alimentação',
    context: 'Em restaurante, mesa, retirada e entrega são conversas diferentes. Cardápio, disponibilidade e alergênicos precisam estar atualizados no mesmo ritmo da cozinha.',
    operations: 'Separe a fila de reservas da fila de pedidos e confirme o que está disponível no dia. O horário da cozinha pode ser diferente do horário de atendimento.',
    care: 'Questões de alergia alimentar e pedido incorreto exigem alguém da equipe; nenhuma mensagem pronta deve garantir ausência de contaminação cruzada.',
    scenarios: {
      'primeiro-contato': {
        scene: 'A pessoa escreve perto do almoço e não sabe se está pedindo entrega, retirada ou uma mesa.',
        question: 'Oi, vocês estão atendendo almoço agora? Tem entrega?',
        reply: 'Oi! Estamos recebendo pedidos para almoço. Você prefere entrega, retirada ou quer reservar mesa? Aí eu te passo o caminho certo.',
        firstStep: 'Abra com três caminhos simples — mesa, retirada ou entrega — e confira o horário real da cozinha.',
        handoff: 'Endereço fora da área de entrega ou restrição alimentar vai para a equipe antes de aceitar o pedido.'
      },
      agendamento: {
        scene: 'Uma reserva para seis pessoas precisa de disponibilidade real e informação sobre horário de chegada.',
        question: 'Conseguem mesa para seis no sábado às 20h?',
        reply: 'Posso verificar sábado às 20h para seis pessoas. Há criança pequena ou alguma necessidade de acesso que devamos considerar?',
        firstStep: 'Defina capacidade por faixa de horário, tamanho do grupo e regra de atraso antes de confirmar mesa.',
        handoff: 'Grupos grandes e adaptações de acesso são confirmados pelo salão, não por um horário presumido.'
      },
      orcamento: {
        scene: 'Um pedido de almoço para equipe pede quantidade, data e entrega; preço por prato não resolve a proposta.',
        question: 'Quanto fica um almoço para vinte pessoas na sexta?',
        reply: 'Consigo montar uma proposta. É para entrega ou retirada, e há alguma restrição alimentar no grupo? A cozinha confirma o menu disponível.',
        firstStep: 'Peça número de pessoas, data, local de entrega e formato do serviço antes de cotar evento.',
        handoff: 'Cardápio especial, alergênicos ou capacidade da cozinha precisam de validação por quem prepara.'
      },
      catalogo: {
        scene: 'O prato visto ontem pode ter acabado hoje; um cardápio útil precisa refletir o que a cozinha serve agora.',
        question: 'Tem a opção vegetariana do cardápio hoje?',
        reply: 'Vou confirmar se está disponível agora e te mando as opções de hoje. Se você tiver alergia, me avise para a cozinha orientar com cuidado.',
        firstStep: 'Atualize itens do dia, tamanhos e valores do cardápio antes do pico de mensagens.',
        handoff: 'Alergia ou composição de um prato passa pela cozinha; não prometa segurança alimentar com texto padrão.'
      },
      lembrete: {
        scene: 'Uma mesa reservada para aniversário pede confirmação discreta, sem confundir o aviso com anúncio.',
        question: 'Está tudo certo para minha reserva de amanhã à noite?',
        reply: 'Sua reserva está registrada para amanhã à noite. Se o tamanho do grupo mudar, pode responder por aqui para o salão ajustar.',
        firstStep: 'Envie aviso somente depois de validar data, horário e número de pessoas na agenda de reservas.',
        handoff: 'Mudança no grupo, cancelamento ou pedido especial vai para quem organiza o salão.'
      },
      'pos-venda': {
        scene: 'Uma entrega chegou incompleta; o primeiro contato de pós-venda precisa resolver o pedido, não pedir estrelas.',
        question: 'Faltou uma bebida no pedido que chegou agora.',
        reply: 'Desculpe pela falta. Vou localizar seu pedido e chamar a equipe de entregas para combinar a solução com você.',
        firstStep: 'Registre o número do pedido e um caminho simples para relatar erro depois da entrega.',
        handoff: 'Falta de item, atraso grave ou problema com alimento vai imediatamente para a equipe responsável.'
      },
      retomada: {
        scene: 'Uma pessoa pediu retorno sobre menu para um evento e autorizou a equipe a escrever quando houvesse proposta.',
        question: 'Quando sair o menu do evento, pode me mandar por aqui?',
        reply: 'Oi! Você pediu o menu para o evento. A cozinha preparou uma opção; quer que eu te envie para ver se atende ao grupo?',
        firstStep: 'Anote a autorização junto com data do evento e tamanho do grupo; não mande cardápios semanais por hábito.',
        handoff: 'Se houve mudança de data ou restrição alimentar, a equipe revisa a proposta antes de enviar.'
      },
      pix: {
        scene: 'Um pedido para retirada foi fechado; a cobrança deve bater com itens, taxa e horário combinados.',
        question: 'Como pago meu pedido de retirada por Pix?',
        reply: 'Vou conferir itens, valor final e nome do pedido. Depois envio a orientação oficial e confirmo a retirada quando o pagamento estiver conciliado.',
        firstStep: 'Vincule o pagamento ao número do pedido e confira se há taxa de entrega ou retirada antes de cobrar.',
        handoff: 'Troca de item ou comprovante sem baixa no caixa precisa de verificação por uma pessoa.'
      },
      encaminhamento: {
        scene: 'O cliente avisa de uma alergia depois de começar a montar o pedido; a conversa deve ir para a cozinha.',
        question: 'Tenho alergia a castanhas. Esse molho é seguro?',
        reply: 'Obrigado por avisar. Vou chamar a equipe da cozinha para verificar ingredientes e preparo; não vou garantir segurança sem essa checagem.',
        firstStep: 'Marque alergia, erro no pedido e reclamação de alimento como assuntos prioritários fora do roteiro.',
        handoff: 'A cozinha ou gerente assume e explica o que pode ou não garantir, inclusive risco de contato cruzado.'
      }
    }
  },
  {
    slug: 'loja-de-roupas', label: 'Loja de roupas', search: 'loja de roupas', category: 'Comércio',
    context: 'Numa loja de roupas, tamanho, cor, estoque e troca decidem a compra. Uma foto sem medidas nem disponibilidade gera mais mensagens, não mais clareza.',
    operations: 'Mantenha grade e política de troca atualizadas. Diferencie peça disponível, reservada para prova e vendida antes de confirmar retirada.',
    care: 'Nunca peça foto de documento ou dado de cartão no chat para fechar venda. Questões de troca e defeito pedem atendimento pessoal.',
    scenarios: {
      'primeiro-contato': {
        scene: 'A cliente viu uma peça no Instagram e precisa saber se ainda existe no tamanho dela.',
        question: 'A calça que vocês postaram tem no tamanho 42?',
        reply: 'Oi! Vou conferir o estoque da calça no 42. Você prefere que eu procure para retirada na loja ou para entrega?',
        firstStep: 'Faça a primeira resposta pedir modelo e tamanho, sem prometer estoque antes de conferir a grade.',
        handoff: 'Se a peça estiver reservada ou o tamanho variar muito, alguém da loja explica as alternativas.'
      },
      agendamento: {
        scene: 'A cliente quer provar algumas peças e a loja oferece horário assistido, mas não pode reservar o que já saiu.',
        question: 'Posso ir amanhã provar os vestidos que vi no catálogo?',
        reply: 'Claro! Qual horário e quais modelos você quer provar? Confiro a disponibilidade das peças antes de separar para você.',
        firstStep: 'Defina janela de prova assistida e prazo de reserva; vincule o horário às peças realmente disponíveis.',
        handoff: 'Peça única, ajuste ou mudança de tamanho é confirmada por quem está com o estoque na loja.'
      },
      orcamento: {
        scene: 'Um pedido de camisetas para equipe envolve quantidades, tamanhos e personalização, não só preço da vitrine.',
        question: 'Quanto custa encomendar quinze camisetas iguais para a equipe?',
        reply: 'Posso montar a proposta. Você já sabe tamanhos, cor e se quer personalização? A loja confirma prazo e valor antes de fechar.',
        firstStep: 'Peça quantidade por tamanho, tipo de peça, arte e prazo desejado antes da cotação de uniforme.',
        handoff: 'Personalização, prazo curto ou falta de grade devem ser avaliados pela loja antes de prometer entrega.'
      },
      catalogo: {
        scene: 'Uma vitrine sem medidas deixa a cliente insegura para escolher entre dois tamanhos.',
        question: 'Esse vestido veste pequeno? Tenho dúvida entre M e G.',
        reply: 'Posso te mandar medidas e tecido do modelo. Se quiser, alguém da loja compara com uma peça que você já usa antes da escolha.',
        firstStep: 'Inclua medidas, tecido, variações e regra de troca nos itens mais procurados do catálogo.',
        handoff: 'Dúvida de caimento muito específica vai para vendedora com a peça em mãos, sem promessa de ajuste perfeito.'
      },
      lembrete: {
        scene: 'Uma peça foi separada por tempo limitado; o aviso precisa dizer até quando a reserva vale.',
        question: 'A blusa que reservei ainda fica separada até amanhã?',
        reply: 'Vou conferir a sua reserva e o prazo combinado. Se estiver tudo certo, te confirmo até quando a peça fica separada.',
        firstStep: 'Registre data e horário de vencimento da reserva antes de criar qualquer lembrete de retirada.',
        handoff: 'Extensão de prazo ou peça vendida por engano é resolvida pela loja, não por aviso automático.'
      },
      'pos-venda': {
        scene: 'A cliente recebeu uma peça e percebeu um defeito; o pós-venda precisa explicar o caminho de troca.',
        question: 'A costura abriu no primeiro uso. Como faço para trocar?',
        reply: 'Sinto muito. Vou pedir para a equipe olhar seu pedido e te orientar sobre a troca; você não precisa explicar tudo outra vez.',
        firstStep: 'Vincule pedido e política de troca à conversa posterior, com caminho visível para registrar defeito.',
        handoff: 'Defeito, prazo de troca contestado ou produto diferente do anunciado vai para uma pessoa.'
      },
      retomada: {
        scene: 'A cliente pediu aviso se o vestido voltasse em outra numeração, sem aceitar mensagens de lançamento.',
        question: 'Se o vestido verde chegar no G, me avisa?',
        reply: 'Oi! Você pediu aviso sobre o vestido verde no G. A loja recebeu uma atualização; quer que eu confira se ainda te interessa?',
        firstStep: 'Guarde modelo, tamanho e autorização; encerre o aviso quando a cliente disser que não procura mais.',
        handoff: 'Antes de oferecer a peça, a vendedora confere estoque físico e condição de troca.'
      },
      pix: {
        scene: 'O pagamento de uma peça para entrega precisa refletir frete e tamanho escolhidos no pedido final.',
        question: 'Posso pagar por Pix o vestido M com entrega no centro?',
        reply: 'Pode. Vou conferir tamanho, frete e valor total do pedido antes de enviar a orientação de pagamento da loja.',
        firstStep: 'Calcule o total aprovado com frete, endereço confirmado e identificador do pedido antes da cobrança.',
        handoff: 'Estoque mudou ou o banco ainda não confirmou? Uma pessoa revisa antes de separar a peça.'
      },
      encaminhamento: {
        scene: 'A cliente questiona uma troca negada e precisa de explicação individual, não de uma política colada no chat.',
        question: 'Quero falar com alguém sobre a troca do pedido de ontem.',
        reply: 'Claro. Vou encaminhar o pedido e o que você já contou para a equipe de trocas, que continua a conversa por aqui.',
        firstStep: 'Crie uma rota direta para troca, defeito e cobrança, levando o número do pedido junto.',
        handoff: 'A equipe avalia o caso e explica os próximos passos sem pedir documento sensível pelo chat.'
      }
    }
  },
  {
    slug: 'confeitaria', label: 'Confeitaria', search: 'confeitaria', category: 'Alimentação',
    context: 'Na confeitaria, data da festa, quantidade de pessoas, sabor e decoração mudam o pedido. Uma encomenda sem esses detalhes costuma virar retrabalho.',
    operations: 'Confirme a capacidade de produção e o prazo mínimo antes de aceitar encomendas. Diferencie retirada, entrega e pedido personalizado.',
    care: 'Alergênicos e restrições alimentares precisam de conversa cuidadosa com quem produz; não prometa ambiente livre de contaminação.',
    scenarios: {
      'primeiro-contato': {
        scene: 'Uma pessoa pede bolo para festa sem data ou número de convidados e espera saber como começar.',
        question: 'Vocês fazem bolo de aniversário personalizado?',
        reply: 'Fazemos encomendas sob consulta. Para eu te orientar, qual a data da festa e para quantas pessoas seria o bolo?',
        firstStep: 'Abra a conversa com data e tamanho do pedido antes de perguntar decoração, sabor e entrega.',
        handoff: 'Prazo muito curto ou restrição alimentar vai para a confeiteira avaliar a possibilidade.'
      },
      agendamento: {
        scene: 'A retirada do bolo precisa de janela real depois da produção, não de um horário escolhido sem checagem.',
        question: 'Posso buscar o bolo sábado às dez da manhã?',
        reply: 'Vou conferir com a produção se o bolo estará pronto para retirada às 10h. Te confirmo o horário antes de fechar, combinado?',
        firstStep: 'Defina janelas de retirada por dia e bloqueie horários que não cabem na rotina de produção.',
        handoff: 'Mudança de data ou decoração de última hora precisa da confeiteira antes de confirmar nova retirada.'
      },
      orcamento: {
        scene: 'Um bolo de dois andares envolve estrutura e decoração; preço por quilo sozinho não conta a história.',
        question: 'Quanto custa bolo de dois andares para trinta pessoas?',
        reply: 'Posso montar uma proposta com tamanho, sabor, decoração e data. A confeiteira confirma a viabilidade antes de passar o valor final.',
        firstStep: 'Peça data, porções, sabores e referência de decoração; deixe claro o que é extra.',
        handoff: 'Estrutura complexa ou detalhe fora do catálogo é avaliado por quem vai produzir antes da proposta.'
      },
      catalogo: {
        scene: 'A vitrine mistura doces de pronta-entrega com bolos sob encomenda e cria expectativa de retirada imediata.',
        question: 'Esses docinhos do catálogo ficam prontos para hoje?',
        reply: 'Alguns itens são de pronta-entrega e outros por encomenda. Vou conferir a disponibilidade de hoje e te mostrar as opções certas.',
        firstStep: 'Marque no catálogo quais itens são do dia, quais exigem encomenda e quantas unidades vêm em cada caixa.',
        handoff: 'Pedido personalizado, ingrediente substituído ou restrição alimentar precisa da produção.'
      },
      lembrete: {
        scene: 'Na véspera da festa, uma confirmação de retirada evita confusão entre sábado e domingo.',
        question: 'Está confirmado meu bolo para buscar amanhã à tarde?',
        reply: 'Vou conferir o pedido e o horário registrado com a produção. Te retorno com a janela de retirada certinha.',
        firstStep: 'Conecte o lembrete a pedidos confirmados e ao status de produção, com data e horário escritos por extenso.',
        handoff: 'Atraso na produção ou mudança na entrega é comunicado por alguém da confeitaria.'
      },
      'pos-venda': {
        scene: 'Depois de uma encomenda, um retorno abre espaço para saber se transporte e apresentação correram bem.',
        question: 'O bolo chegou com a decoração danificada.',
        reply: 'Sinto muito pelo problema. Vou localizar o pedido e pedir à confeiteira que fale com você sobre o que aconteceu.',
        firstStep: 'Registre entrega e tipo de encomenda para um contato posterior autorizado que aceite relato de problema.',
        handoff: 'Dano no transporte, ingrediente errado ou alergênico exige atenção humana imediata.'
      },
      retomada: {
        scene: 'A cliente autorizou retorno sobre a cotação da mesa de doces para uma festa com data próxima.',
        question: 'Pode me chamar quando fechar a proposta dos doces da festa?',
        reply: 'Oi! Você pediu a proposta para a mesa de doces. Ela está pronta para conferirmos sabores e quantidades; ainda faz sentido para a data?',
        firstStep: 'Vincule autorização, data da festa e itens cotados; não estenda o contato a outras datas sem pedido.',
        handoff: 'Mudança de número de convidados ou produção lotada exige nova validação antes de enviar valores.'
      },
      pix: {
        scene: 'A encomenda de bolo tem sinal e saldo; o chat precisa deixar claro qual parcela está sendo paga.',
        question: 'Esse Pix é o sinal ou já o valor inteiro do bolo?',
        reply: 'Vou conferir seu pedido e o que foi combinado: sinal, saldo e prazo. Te mando a orientação certa antes de você pagar.',
        firstStep: 'Identifique encomenda, parcela, valor e condição de cancelamento na mensagem de cobrança.',
        handoff: 'Alteração da decoração ou comprovante sem confirmação financeira vai para quem fechou a encomenda.'
      },
      encaminhamento: {
        scene: 'Uma cliente pergunta se o bolo é seguro para alergia a leite; a resposta não pode sair de uma descrição genérica.',
        question: 'Tenho alergia a leite. Vocês conseguem garantir esse bolo?',
        reply: 'Obrigada por avisar. Vou pedir à confeiteira que explique ingredientes e condições de preparo; não vou garantir isso sem verificar.',
        firstStep: 'Defina “alergia”, “ingrediente trocado” e pedido danificado como motivos de transferência imediata.',
        handoff: 'Quem produz conversa sobre ingredientes e risco de contato cruzado; o fluxo não dá garantia de segurança.'
      }
    }
  },
  {
    slug: 'floricultura', label: 'Floricultura', search: 'floricultura', category: 'Comércio',
    context: 'Na floricultura, ocasião, endereço e horário da entrega pesam tanto quanto as flores. O estoque muda com estação e fornecedor.',
    operations: 'Tenha fotos de referência, faixa de composição e área de entrega claras. Confirme substituições possíveis antes de fechar o buquê.',
    care: 'Presente surpresa ainda exige endereço correto e alguém para receber. Problema na entrega merece uma pessoa, não outro disparo automático.',
    scenarios: {
      'primeiro-contato': {
        scene: 'Um presente precisa chegar hoje; o cliente quer saber se ainda há tempo de montar e entregar.',
        question: 'Vocês entregam um buquê hoje até o fim da tarde?',
        reply: 'Posso conferir. Qual bairro de entrega e qual faixa de horário você precisa? A equipe confirma flores disponíveis antes de fechar.',
        firstStep: 'Na primeira resposta, peça bairro e prazo; consulte montagem e rota antes de prometer entrega no dia.',
        handoff: 'Entrega urgente ou fora da rota vai para quem organiza os motoboys e o estoque.'
      },
      agendamento: {
        scene: 'A retirada de arranjo para uma cerimônia não pode ser marcada antes de confirmar montagem e transporte.',
        question: 'Consigo retirar o arranjo para a cerimônia sexta cedo?',
        reply: 'Vou verificar o tempo de montagem e a janela de retirada de sexta. Qual o tamanho do arranjo e a hora da cerimônia?',
        firstStep: 'Reserve horário de montagem e retirada separadamente, com margem para ajustes no arranjo.',
        handoff: 'Peças grandes ou cerimônia com horário rígido são confirmadas pela pessoa que monta o pedido.'
      },
      orcamento: {
        scene: 'Um buquê de flores específicas depende de estação, tamanho e endereço; imagem de referência não é preço fechado.',
        question: 'Quanto sai um buquê parecido com essa foto para entregar amanhã?',
        reply: 'Posso montar uma proposta com essa referência. Qual seu orçamento e bairro? A equipe confirma as flores disponíveis ou sugere equivalentes.',
        firstStep: 'Registre ocasião, tamanho desejado, referência, bairro e tolerância a substituições antes de cotar.',
        handoff: 'Flor fora de estação ou pedido sem substituição permitida vai para a florista antes de precificar.'
      },
      catalogo: {
        scene: 'O catálogo mostra rosas que podem não estar disponíveis na cor da foto quando o cliente compra.',
        question: 'Esse arranjo tem exatamente as flores da foto?',
        reply: 'A foto é referência de composição. Vou conferir as flores e cores disponíveis hoje e te contar se algo precisar mudar.',
        firstStep: 'Identifique fotos de referência, tamanho aproximado e política de substituição em cada arranjo do catálogo.',
        handoff: 'Se a composição exata for indispensável, a florista confirma antes da venda.'
      },
      lembrete: {
        scene: 'A entrega de aniversário está agendada e o aviso interno precisa refletir endereço e janela combinados.',
        question: 'Vocês confirmam a entrega do buquê amanhã de manhã?',
        reply: 'Vou conferir endereço, nome de quem recebe e a janela de entrega registrada. Te retorno com a confirmação certinha.',
        firstStep: 'Antes do lembrete, valide endereço e contato do destinatário sem expor detalhes do presente para a pessoa errada.',
        handoff: 'Mudança de endereço ou ausência de quem recebe deve ir à equipe de entregas.'
      },
      'pos-venda': {
        scene: 'O arranjo chegou machucado; a floricultura precisa tratar a reclamação e verificar o transporte.',
        question: 'As flores chegaram amassadas na entrega.',
        reply: 'Sinto muito. Vou passar o pedido para a florista e a equipe de entrega avaliarem com você uma solução.',
        firstStep: 'Relacione pedido e rota para facilitar retorno depois da entrega, sem pedir avaliação antes de resolver problema.',
        handoff: 'Dano, atraso ou entrega em endereço errado vai para alguém que pode agir, não para um formulário.'
      },
      retomada: {
        scene: 'Uma cliente pediu aviso quando fosse possível montar orquídeas na cor desejada para um presente.',
        question: 'Se vocês tiverem orquídea branca de novo, me avisam?',
        reply: 'Oi! Você pediu aviso sobre orquídea branca. A florista tem uma atualização; quer que eu confira disponibilidade para o seu presente?',
        firstStep: 'Anote flor, cor e autorização; remova o contato do aviso após a compra ou desistência.',
        handoff: 'A florista confirma qualidade e quantidade do lote antes de oferecer a peça.'
      },
      pix: {
        scene: 'O valor do buquê com entrega inclui frete; cobrar só o arranjo gera diferença na hora de sair.',
        question: 'Qual o Pix do buquê com entrega no bairro Novo?',
        reply: 'Vou conferir arranjo, bairro, frete e valor total aprovado. Já te mando a orientação oficial vinculada ao pedido.',
        firstStep: 'Reúna pedido, frete e prazo acordado em uma confirmação antes de enviar instrução de Pix.',
        handoff: 'Mudança de bairro ou comprovante não conciliado é resolvida pelo caixa antes de despachar.'
      },
      encaminhamento: {
        scene: 'A entrega foi para o endereço errado e o cliente precisa saber quem está corrigindo a rota.',
        question: 'O buquê não chegou e disseram que foi entregue em outra casa.',
        reply: 'Sinto muito. Vou chamar agora a pessoa responsável pelas entregas e passar o número do pedido para localizar o que houve.',
        firstStep: 'Configure endereço incorreto, item danificado e atraso crítico como passagem imediata à equipe.',
        handoff: 'Uma pessoa verifica a rota e combina solução; o bot não marca a entrega como concluída sem apuração.'
      }
    }
  }
];
