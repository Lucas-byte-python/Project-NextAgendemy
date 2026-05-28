// Recupera agenda salva
const agenda = JSON.parse(localStorage.getItem('agendaResumo')) || [];
const tabela = document.getElementById('tabela-resumo');
let totalAgendados = 0;

// Renderiza tabela
agenda.forEach(function(item) {
    const tr = document.createElement('tr');

    // DIA o mesmo
    const tdDia = document.createElement('td');
    tdDia.textContent = item.dia;

    // HORÁRIO o mesmo
    const tdHorario = document.createElement('td');

    tdHorario.textContent =
        item.agendado
        ? item.horarioSelecionado
        : item.horarios.join(' -- ');

    // STATUS o mesmo
    const tdStatus = document.createElement('td');
    tdStatus.textContent = item.status;

    // PARTICIPANTE o mesmo
    const tdParticipante = document.createElement('td');
    tdParticipante.textContent = item.participante;

    // Cor status o mesmo
    if (item.agendado) {
        tdStatus.classList.add('agendado');
        totalAgendados++;
    }
    else {
        tdStatus.classList.add('disponivel');
    }

    // Estrutura da tabela o mesmo
    tr.appendChild(tdDia);
    tr.appendChild(tdHorario);
    tr.appendChild(tdStatus);
    tr.appendChild(tdParticipante);

    tabela.appendChild(tr);
});

// Resumo do agendamento
const totalHorarios = agenda.length;

const totalDisponiveis = totalHorarios - totalAgendados;

document.getElementById('resumo').innerHTML = `
    <h2>RESUMO</h2>

    <p>
        TOTAL DE HORÁRIOS:
        ${totalHorarios}
    </p>

    <p>
        HORÁRIOS AGENDADOS:
        ${totalAgendados}
    </p>

    <p>
        HORÁRIOS DISPONÍVEIS:
        ${totalDisponiveis}
    </p>
`;

// Botão de voltar para a página principal
document
.getElementById('btn-voltar')
.addEventListener('click', function() {
    window.location.href = 'index.html';
});
