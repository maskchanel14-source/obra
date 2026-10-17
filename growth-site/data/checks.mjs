// A distinct rehearsal for each scenario. These are editorial checks, not
// measured results or claims that the workflows were tested in a business.
export const CHECKS = {
  'salao-de-beleza': {
    'primeiro-contato': 'Faça a recepção simular uma cliente com cabelo colorido escrevendo à noite. A resposta precisa acolher sem indicar química antes da avaliação.',
    agendamento: 'Coloque um corte e uma escova no mesmo sábado de teste. Veja se a agenda reserva tempo para os dois e para a profissional certa.',
    orcamento: 'Mostre à colorista uma pergunta sobre mudança de escuro para ruivo. Confirme quais dados ela precisa antes de qualquer estimativa.',
    catalogo: 'Peça a alguém que nunca viu o cardápio explicar o que inclui cada tratamento. Onde houver dúvida, reescreva a descrição.',
    lembrete: 'Cancele uma escova fictícia depois de criar o aviso. O lembrete não pode sair para a reserva que já foi removida.',
    'pos-venda': 'Simule uma cliente insatisfeita com a cor. Veja se a resposta encaminha o caso à colorista antes de pedir avaliação pública.',
    retomada: 'Verifique se o aviso de vaga de sexta desaparece depois da sexta. A autorização era para aquele horário, não para a agenda inteira.',
    pix: 'Faça a recepção conferir o valor do sinal e a regra de remarcação usando só a mensagem. Se faltar uma informação, ajuste o texto.',
    encaminhamento: 'Envie uma mensagem de teste contendo “ardência”. O fluxo deve parar e colocar a colorista responsável na conversa sem sugerir produto.'
  },
  barbearia: {
    'primeiro-contato': 'Teste um pedido para hoje com barbeiro específico. A primeira resposta deve perguntar se é corte ou combo antes de reservar.',
    agendamento: 'Simule duas reservas consecutivas, uma de corte e outra de combo. Confira se o segundo horário não começa antes do primeiro terminar.',
    orcamento: 'Leia a descrição do combo com um barbeiro. Garanta que desenho e acabamento extra não apareçam como incluídos por engano.',
    catalogo: 'Mostre o catálogo a alguém novo e peça que diferencie barba simples de desenho. Se os nomes confundirem, troque por descrição direta.',
    lembrete: 'Cancele um corte fictício de sábado. Confirme que o aviso para o cliente para e que a vaga volta à agenda correta.',
    'pos-venda': 'Simule um pedido de ajuste no acabamento. O cliente precisa receber uma pessoa e uma solução possível, não apenas um convite para voltar.',
    retomada: 'Depois de simular o aviso de vaga com o Rafa, marque a vaga como ocupada. A mensagem não pode continuar oferecendo o mesmo encaixe.',
    pix: 'Faça a conta de três cortes e peça a outro atendente para conferir o sinal, o nome da reserva e a condição de cancelamento.',
    encaminhamento: 'Escreva “quero falar com o barbeiro sobre ontem”. A conversa deve preservar o horário do atendimento para quem assumir.'
  },
  'pet-shop': {
    'primeiro-contato': 'Teste a chegada de um filhote e de um pet adulto. A triagem deve recolher o necessário sem decidir condições de saúde pelo chat.',
    agendamento: 'Simule banho, tosa e transporte na mesma manhã. Veja se a capacidade do turno comporta os três antes de oferecer a vaga.',
    orcamento: 'Compare dois cães do mesmo porte com pelagens diferentes. O roteiro deve explicar quando uma avaliação muda o valor.',
    catalogo: 'Peça a um tutor que identifique no catálogo se cortar unhas faz parte do banho. Se não estiver claro, detalhe o serviço.',
    lembrete: 'Marque um banho como atrasado no teste. O aviso de “pronto para buscar” só deve existir quando a equipe liberar o pet.',
    'pos-venda': 'Simule um relato de coceira após a tosa. A equipe deve receber a queixa antes de qualquer pedido de avaliação do serviço.',
    retomada: 'Deixe passar o sábado solicitado no exemplo. Confira se o aviso para a Nina é encerrado e não vira uma lista de ofertas.',
    pix: 'Confira com outra pessoa se banho e leva e traz estão no mesmo pedido antes de enviar o valor ao tutor.',
    encaminhamento: 'Teste a frase “voltou abatido do banho”. A prioridade deve mudar para uma pessoa sem o sistema oferecer outro serviço.'
  },
  'oficina-mecanica': {
    'primeiro-contato': 'Envie um relato fictício de barulho no freio. A mensagem pode pedir modelo e ano, mas nunca dizer que o carro pode continuar rodando.',
    agendamento: 'Simule entrada às oito com pedido de retirada no almoço. A resposta deve separar horário de inspeção de prazo de reparo.',
    orcamento: 'Peça cotação de pastilhas sem informar o ano do carro. O texto deve pedir o dado e manter a estimativa distinta do valor aprovado.',
    catalogo: 'Leia o item “revisão completa” com um mecânico. Liste o que está incluído e o que dependerá do diagnóstico.',
    lembrete: 'Mantenha uma ordem de serviço fictícia como “aguardando peça”. Nenhum aviso de retirada deve sair antes da liberação.',
    'pos-venda': 'Simule retorno do mesmo ruído depois do serviço. Veja se a mensagem leva a ordem de serviço ao mecânico certo.',
    retomada: 'Marque uma peça como “chegou”, mas não conferida. O aviso precisa esperar compatibilidade e prazo confirmados pela oficina.',
    pix: 'Compare o total aprovado na ordem de serviço com o valor da instrução Pix; uma divergência deve bloquear o envio.',
    encaminhamento: 'Digite “o freio falhou depois da revisão”. O encaminhamento precisa priorizar o responsável técnico sem avaliação remota de segurança.'
  },
  restaurante: {
    'primeiro-contato': 'Mande uma pergunta sobre almoço com entrega pouco antes de fechar a cozinha. A resposta deve refletir o horário da cozinha, não só o do salão.',
    agendamento: 'Simule duas mesas grandes para o mesmo horário. Confira capacidade do salão antes de confirmar a reserva de seis pessoas.',
    orcamento: 'Monte um almoço de equipe fictício para vinte pessoas. Verifique se proposta distingue retirada, entrega e restrições alimentares.',
    catalogo: 'Marque a opção vegetariana como indisponível no teste. A recomendação não pode apontar para um prato que a cozinha não tem.',
    lembrete: 'Altere de seis para oito pessoas numa reserva fictícia. O lembrete só deve refletir o tamanho confirmado pelo salão.',
    'pos-venda': 'Simule uma bebida faltando. O primeiro retorno precisa identificar o pedido e uma pessoa que resolva, não oferecer pesquisa.',
    retomada: 'Teste um retorno sobre menu de evento depois da data da festa. Se a ocasião passou, o contato não deve ser enviado.',
    pix: 'Some itens e eventual taxa do pedido antes de cobrar. O caixa deve bloquear liberação baseada somente em print do comprovante.',
    encaminhamento: 'Envie uma pergunta sobre castanhas. A cozinha deve verificar ingredientes e contato cruzado antes de qualquer resposta de segurança.'
  },
  'loja-de-roupas': {
    'primeiro-contato': 'Simule uma calça 42 que existe no catálogo, mas acabou na loja. A resposta deve checar estoque antes de dizer “temos”.',
    agendamento: 'Peça prova de três vestidos, um deles já reservado. A vendedora deve corrigir a seleção antes de confirmar horário.',
    orcamento: 'Faça um pedido fictício de quinze camisetas com tamanhos mistos. O orçamento precisa registrar grade, arte e prazo.',
    catalogo: 'Peça a alguém que compare medidas do M e do G sem falar com vendedora. Complete a ficha se faltar tecido ou medidas.',
    lembrete: 'Deixe uma reserva vencer no teste. O aviso deve mencionar o prazo real e não afirmar que a peça seguirá separada.',
    'pos-venda': 'Simule costura aberta em um pedido. Confirme se a equipe encontra a compra e orienta a troca sem pedir dado de cartão.',
    retomada: 'Troque o status do vestido verde G para “reservado”. O aviso de reposição deve esperar estoque livre confirmado.',
    pix: 'Altere o frete depois do CEP informado. O valor enviado por Pix deve corresponder ao total aprovado pela cliente.',
    encaminhamento: 'Teste uma contestação de troca. A conversa precisa chegar a quem decide o caso com número do pedido e sem julgamento automático.'
  },
  confeitaria: {
    'primeiro-contato': 'Teste dois pedidos de bolo, um para amanhã e outro para o mês seguinte. A primeira resposta deve priorizar capacidade e data.',
    agendamento: 'Bloqueie a manhã de sábado para produção. Uma retirada fictícia às dez não pode ser confirmada por falta de horário no balcão.',
    orcamento: 'Use uma foto de bolo de dois andares sem tamanho. O roteiro deve perguntar porções e data antes de falar em valor.',
    catalogo: 'Marque docinhos como “sob encomenda”. Verifique se quem pede para hoje vê essa condição antes de fechar o pedido.',
    lembrete: 'Mude a retirada de sábado para domingo. O aviso antigo deve ser cancelado e a produção notificada da nova data.',
    'pos-venda': 'Simule decoração danificada no transporte. A confeiteira precisa receber a queixa antes de uma pesquisa de satisfação.',
    retomada: 'Deixe a data da festa passar em um teste. A proposta de doces não pode ser retomada como se ainda fosse atual.',
    pix: 'Divida uma encomenda em sinal e saldo. Peça a outra pessoa para identificar qual parcela cada mensagem está cobrando.',
    encaminhamento: 'Pergunte sobre alergia a leite com uma receita que divide a cozinha com outros produtos. Não permita resposta automática de garantia.'
  },
  floricultura: {
    'primeiro-contato': 'Teste um pedido para entregar hoje em bairro fora da rota. A mensagem deve verificar transporte antes de prometer horário.',
    agendamento: 'Simule um arranjo grande para cerimônia cedo. Verifique se montagem e retirada cabem no cronograma da florista.',
    orcamento: 'Use foto com flor fora de estação e orçamento limitado. A proposta deve pedir permissão para sugerir substituições.',
    catalogo: 'Troque uma flor indisponível no arranjo da foto. O cliente precisa saber da mudança antes de pagar.',
    lembrete: 'Altere o endereço de um presente surpresa no teste. Confira quem recebe sem expor o presente à pessoa errada.',
    'pos-venda': 'Simule buquê amassado na entrega. A conversa deve abrir uma solução e localizar o trajeto do pedido.',
    retomada: 'Marque a orquídea branca como indisponível de novo. O aviso não pode sair apenas porque houve entrada de flores.',
    pix: 'Some buquê e frete para um bairro novo. A equipe deve aprovar o total antes do envio da orientação de pagamento.',
    encaminhamento: 'Digite que o buquê foi entregue em casa errada. A responsabilidade deve chegar à equipe de entregas imediatamente.'
  },
  'estudio-de-pilates': {
    'primeiro-contato': 'Faça uma pergunta fictícia de iniciante com histórico de dor. O texto deve marcar uma conversa com instrutor, não indicar exercícios.',
    agendamento: 'Simule turma cheia após as 18h. Uma aula experimental não pode ser confirmada só porque o horário aparece na agenda.',
    orcamento: 'Compare plano de duas aulas e aula individual. A resposta deve mostrar frequência, regras de reposição e vagas reais.',
    catalogo: 'Peça a alguém novo que explique diferença entre turma e aula individual usando apenas as descrições de planos.',
    lembrete: 'Remarque uma aula experimental fictícia e confira se o aviso anterior desaparece antes do novo horário.',
    'pos-venda': 'Simule dúvida técnica depois da primeira aula. Verifique se ela chega ao instrutor e não a um texto de vendas.',
    retomada: 'Teste o aviso da turma das sete sem vaga confirmada. A recepção precisa verificar disponibilidade antes de convidar.',
    pix: 'Faça uma cobrança de plano mensal e confira se o período e a frequência estão explícitos, não só o valor.',
    encaminhamento: 'Envie “dor forte depois da aula”. A automação deve parar e priorizar uma pessoa, sem sugerir alongamento ou diagnóstico.'
  },
  'assistencia-tecnica-celulares': {
    'primeiro-contato': 'Simule tela trincada e bateria quente em chats separados. O segundo caso deve ir ao técnico com prioridade, nunca pedir senha.',
    agendamento: 'Ofereça avaliação hoje sem peça em estoque. A resposta não pode transformar horário de entrada em promessa de conserto no dia.',
    orcamento: 'Compare dois aparelhos parecidos com telas diferentes. O orçamento precisa confirmar modelo exato e peça antes do valor final.',
    catalogo: 'Peça a alguém que encontre condições de garantia e modelos atendidos sem precisar informar senha do aparelho.',
    lembrete: 'Deixe um reparo como “teste reprovado”. A mensagem de retirada não deve sair só porque o prazo estimado acabou.',
    'pos-venda': 'Simule falha de toque após reparo. O técnico precisa encontrar a ordem de serviço e o prazo de garantia aplicável.',
    retomada: 'Marque uma bateria recebida como incompatível no teste. O cliente não deve ser chamado para trocar a peça.',
    pix: 'Compare valor aprovado e ordem de serviço. Um print de pagamento sem conciliação não libera o aparelho.',
    encaminhamento: 'Digite “bateria estufada e quente”. A resposta deve priorizar segurança e repassar o caso a um técnico, sem pedir desbloqueio.'
  },
  lavanderia: {
    'primeiro-contato': 'Teste coleta de edredom em bairro fora da rota. O texto deve perguntar tamanho e endereço antes de falar em prazo.',
    agendamento: 'Coloque um volume grande na última janela de coleta. Confirme se a rota comporta as peças sem prometer entrega no dia seguinte.',
    orcamento: 'Simule dois ternos e uma colcha sem etiquetas. A proposta precisa indicar o que só será confirmado após triagem.',
    catalogo: 'Peça a alguém que descubra se tapete e cortina são aceitos apenas lendo a lista de serviços e condições.',
    lembrete: 'Marque uma peça como ainda não conferida. O aviso de retirada do lote não pode sair enquanto faltar revisão.',
    'pos-venda': 'Simule mancha nova em camisa. O responsável deve achar a conferência de entrada e abrir análise, não pedir nota.',
    retomada: 'Deixe a semana de coleta solicitada passar. Um novo aviso exige nova autorização, não aproveita o pedido antigo.',
    pix: 'Acrescente taxa de coleta depois da triagem. Só envie a cobrança quando o total for mostrado e aprovado pelo cliente.',
    encaminhamento: 'Teste uma camisa faltando na entrega. O fluxo deve localizar o lote e dar um responsável pelo caso, não encerrar o chamado.'
  }
};
