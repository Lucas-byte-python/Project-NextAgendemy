// Variável para armazenar o nome do usuário (em memória)
let nomeUsuario = null;

// Lista de nomes já agendados
const nomesAgendados = [];

// Array para criação da tabela
const agenda = [
    {
        dia: 'Segunda',
        horarios: ['08:00', '09:00', '10:00'],
        status: 'DISPONÍVEL',
        participante: '',
        agendado: false
    },

    {
        dia: 'Terça',
        horarios: ['15:00', '16:00', '17:00'],
        status: 'DISPONÍVEL',
        participante: '',
        agendado: false
    },

    {
        dia: 'Quarta',
        horarios: ['20:00', '21:00', '22:00'],
        status: 'DISPONÍVEL',
        participante: '',
        agendado: false
    },

    {
        dia: 'Quinta',
        horarios: ['12:00', '13:00', '14:00'],
        status: 'DISPONÍVEL',
        participante: '',
        agendado: false
    },

    {
        dia: 'Sexta',
        horarios: ['05:00', '06:00', '07:00'],
        status: 'DISPONÍVEL',
        participante: '',
        agendado: false
    }
];

const tabela = document.getElementById('tabela-agenda');

// Função para renderizar a tabela
function renderizarTabela() {
    tabela.innerHTML = `
        <tr>
            <th>DIA</th>
            <th>HORÁRIO</th>
            <th>STATUS</th>
            <th>PARTICIPANTE</th>
            <th>AGENDAMENTO</th>
        </tr>
    `;

    // Adcionando linhas da agenda
    agenda.forEach(function(item) {
        const tr = document.createElement('tr');

        // Dia
        const tdDia = document.createElement('td');
        tdDia.classList.add('dia');
        tdDia.textContent = item.dia;

        // Horário
        const tdHorario = document.createElement('td');
        tdHorario.classList.add('horario');

        // Perceber qual horário agendado ou mostrar todos
        tdHorario.textContent = item.agendado
            ? item.horarioSelecionado
            : item.horarios.join(' -- ');

        // Status
        const tdStatus = document.createElement('td');
        tdStatus.classList.add('disponibilidade');
        tdStatus.textContent = item.status;
        
        // Mudar a cor do status se estiver agendado ou volta ao normal
        if (item.agendado) {
            tdStatus.style.color = '#00ff88';
        } 
        else {
            tdStatus.style.color = '#00ffc8';
        } 

        // Participantes do Agendameto
        const tdParticipante = document.createElement('td');
        tdParticipante.classList.add('nome');
        tdParticipante.textContent = item.participante;

        // Select
        const tdSelect = document.createElement('td');
        const select = document.createElement('select');
        select.classList.add('select-horario');

        // Se estiver agendado mostra a opção de liberar, caso contrário mostra os horários disponíveis
        if (item.agendado) {

            // Opção Padrao
            const optionPadrao = document.createElement('option');
            optionPadrao.value = '';
            optionPadrao.textContent = 'LIBERAR AGEND';
            optionPadrao.selected = true;
            optionPadrao.disabled = true;
            select.appendChild(optionPadrao);
            
            // Opção de liberar
            const optionLiberar = document.createElement('option');
            optionLiberar.value = 'liberar';
            optionLiberar.textContent = 'LIBERAR';
            select.appendChild(optionLiberar);
        }
        else {
            // Volta ao padrão
            const optionPadrao = document.createElement('option');

            optionPadrao.value = '';
            optionPadrao.textContent = 'ESCOLHER';
            optionPadrao.hidden = true;
            optionPadrao.selected = true;
            select.appendChild(optionPadrao);

            // Horários disponíveis do select
            item.horarios.forEach(function(horario) {
                const option = document.createElement('option');
                option.value = horario;
                option.textContent = horario;
                select.appendChild(option);
            });
        }

    // Funções do agendamento
    // Mostrar para digitar o nome caso não tenha digitado
    select.addEventListener('change', function() {

        // Liberar agendamento
        if (select.value === 'liberar') {
            
            const index = nomesAgendados.indexOf(item.participante.toLowerCase());
            
            if (index !== -1) {
                nomesAgendados.splice(index, 1);
            }

            // Resetar informações
            item.status = 'DISPONÍVEL';
            item.participante = '';
            item.agendado = false;

            delete item.horarioSelecionado;

            // Atualiza tabela
            renderizarTabela();
            alert('AGENDAMENTO LIBERADO!');
            return;
        }

        // Mostrar para digitar o nome caso não tenha digitado
        if (!nomeUsuario) {
            alert('DIGITE O SEU NOME ANTES DE AGENDAR UM HORÁRIO!');
            select.value = '';
            return;
        }

        const horarioSelecionado = select.value;
        if (!horarioSelecionado) return;

        // Atualiza a lista de agendados
        item.status = 'AGENDADO';
        item.participante = nomeUsuario;
        item.agendado = true;
        item.horarioSelecionado = horarioSelecionado;

        // Salva o nome
        nomesAgendados.push(nomeUsuario.toLowerCase());

        // Limpa o input
        document.getElementById('nome').value = '';
        nomeUsuario = null;
        document.querySelector('.observacao').textContent = 'Obs: Você só poderá agendar um horário caso digite seu nome acima.';

        // Atualiza a tabela
        renderizarTabela();
        });

        // Destaque da linha ao clicar no select
        select.addEventListener('focus', function() {
            tr.classList.add('linha-destaque');
        });

        select.addEventListener('blur', function() {
            tr.classList.remove('linha-destaque');
    });

        // Estrutura da tabela
        tdSelect.appendChild(select);
        tr.appendChild(tdDia);
        tr.appendChild(tdHorario);
        tr.appendChild(tdStatus);
        tr.appendChild(tdParticipante);
        tr.appendChild(tdSelect);
        tabela.appendChild(tr);
    });
}

renderizarTabela();

// Funções do botão confirmar
document
.getElementById('btn-prosseguir')
.addEventListener('click', function() {
    nomeUsuario = document.getElementById('nome').value.trim();

    if (nomeUsuario === '') {
        alert('POR GENTILIZA, DIGITE SEU NOME NO CAMPO -- DIGITE SEU NOME --');
        return;
    }

    // Verifica se já agendou com o mesmo nome (tanto caixa alta quanto caixa baixa)
    if (
        nomesAgendados.includes(nomeUsuario.toLowerCase())
    ) {
        alert('ESTE NOME JÁ REALIZOU UM AGENDAMENTO.');
        document.getElementById('nome').value = '';
        nomeUsuario = null;
        return;
    }
    document.querySelector('.observacao').textContent = 'Escolha um horário para agendar.';
    alert(`SEJA BEM-VINDO! ${nomeUsuario}, AGORA VOCÊ PODE AGENDAR UM HORÁRIO!`);
});

// Funções do botão cancelar
document
.getElementById('btn-cancelar')
.addEventListener('click', function() {

    const inputNome = document.getElementById('nome');
    const nomeParaCancelar = inputNome.value.trim();

    // Se não tiver nada digitado
    if (nomeParaCancelar === '') {
        alert('NÃO É POSSÍVEL CANCELAR ALGO SEM DIGITAR UM NOME.');
        return;
    }

    const nomeLower = nomeParaCancelar.toLowerCase();

    // Procura se tem agendamento com esse nome (tanto caixa alta quanto caixa baixa)
    const agendamento = agenda.find(function(item) {
        return (item.participante.toLowerCase() === nomeLower);
    });

    // Não encontrou
    if (!agendamento) {
        inputNome.value = '';
        nomeUsuario = null;
        document.querySelector('.observacao').textContent = 'Obs: Você só poderá agendar um horário caso digite seu nome acima.';
        return;
    }

    // Remove da lista de agendamento
    const index = nomesAgendados.indexOf(nomeLower);

    if (index !== -1) { 
        nomesAgendados.splice(index, 1);
    }

    // Reseta as informações para o padrão
    agendamento.status = 'DISPONÍVEL';
    agendamento.participante = '';
    agendamento.agendado = false;
    delete agendamento.horarioSelecionado;

    // Atualiza tabela
    renderizarTabela();

    // Limpa input
    inputNome.value = '';
    nomeUsuario = null;

    document.querySelector('.observacao').textContent = 'Obs: Você só poderá agendar um horário caso digite seu nome acima.';
    alert('AGENDAMENTO CANCELADO COM SUCESSO!');
});

document
.getElementById('btn-resumo')
.addEventListener('click', function() {

    // Salva agenda no navegador
    localStorage.setItem(
        'agendaResumo',
        JSON.stringify(agenda)
    );

    // Vai para página de resumo
    window.location.href = 'resumo.html';
});