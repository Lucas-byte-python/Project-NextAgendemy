// Variável para armazenar o nome do usuário (em memória)
let nomeUsuario = null;

// Lista de nomes já agendados
const nomesAgendados = [];

// Função para armazenar o nome
document.getElementById('btn-prosseguir').addEventListener('click', function() {
    nomeUsuario = document.getElementById('nome').value.trim();
    if (nomeUsuario === '') {
        alert('Por favor, digite seu nome!');
        return;
    }
    // Verifica se o nome já agendou
    if (nomesAgendados.includes(nomeUsuario.toLowerCase())) {
        alert('Este nome já realizou um agendamento. Utilize outro nome.');
        document.getElementById('nome').value = '';
        nomeUsuario = null;
        return;
    }
    document.querySelector('.observacao').textContent = 'Selecione um horário para agendar.';
    alert(`Bem-vindo, ${nomeUsuario}! Agora selecione um horário para agendar.`);
});

// Função para cancelar agendamento
document.getElementById('btn-cancelar').addEventListener('click', function() {
    const nomeParaCancelar = document.getElementById('nome').value.trim();
    if (nomeParaCancelar === '') {
        alert('Por favor, digite o nome que deseja cancelar!');
        return;
    }
    const nomeLower = nomeParaCancelar.toLowerCase();
    const index = nomesAgendados.indexOf(nomeLower);
    if (index === -1) {
        alert('Nenhum agendamento encontrado para este nome.');
        return;
    }
    // Remover o nome da lista de agendados
    nomesAgendados.splice(index, 1);
    // Procurar e liberar o agendamento na tabela
    let cancelado = false;
    document.querySelectorAll('#tabela-agenda tr').forEach(function(tr) {
        const tdNome = tr.querySelector('.nome');
        if (tdNome && tdNome.textContent.trim().toLowerCase() === nomeLower) {
            // Restaurar estado original
            const tdHorario = tr.querySelector('.horario');
            const tdDia = tr.querySelector('.dia');
            const tdDisponibilidade = tr.querySelector('.disponibilidade');
            const select = tr.querySelector('.select-horario');
            if (tdDia && tdHorario && tdDisponibilidade && select) {
                // Restaurar horários originais
                if (tdDia.textContent.includes('Segunda')) {
                    tdHorario.textContent = '8:00 -- 9:00 -- 10:00';
                } else if (tdDia.textContent.includes('Terça')) {
                    tdHorario.textContent = '15:00 -- 16:00 -- 17:00';
                } else if (tdDia.textContent.includes('Quarta')) {
                    tdHorario.textContent = '20:00 -- 21:00 -- 22:00';
                }
                tdDisponibilidade.textContent = 'Disponível';
                tdDisponibilidade.style.color = '';
                tdNome.textContent = '';
                select.disabled = false;
                select.value = '';
                cancelado = true;
            }
        }
    });
    if (cancelado) {
        alert('Agendamento cancelado com sucesso!');
        document.getElementById('nome').value = '';
        document.querySelector('.observacao').textContent = 'Obs: Você só poderá agendar um horário caso digite seu nome acima.';
    } else {
        alert('Erro ao cancelar o agendamento.');
    }
});

// Função para lidar com o agendamento
function agendarHorario(select) {

    // Sempre pega o nome atual do input
    let nomeAtual = nomeUsuario;
    if (!nomeAtual) {
        alert('Digite seu nome antes de agendar!');
        select.value = '';
        return;
    }

    // Verifica se o nome já agendou
    if (nomesAgendados.includes(nomeAtual.toLowerCase())) {
        alert('Este nome já realizou um agendamento. Utilize outro nome.');
        document.getElementById('nome').value = '';
        nomeUsuario = null;
        select.value = '';
        return;
    }

    const tr = select.closest('tr');
    const horarioSelecionado = select.value;
    if (!horarioSelecionado) return;

    // Mostra apenas o horário selecionado
    tr.querySelector('.horario').textContent = horarioSelecionado;
    tr.querySelector('.nome').textContent = nomeAtual;
    tr.querySelector('.disponibilidade').textContent = 'Agendado';
    tr.querySelector('.disponibilidade').style.color = 'green';

    // Desabilita o select e impede novo agendamento
    select.disabled = true;

    // Adiciona o nome à lista de nomes já agendados
    nomesAgendados.push(nomeAtual.toLowerCase());

    // Limpa o nome para permitir novo usuário agendar
    document.getElementById('nome').value = '';
    nomeUsuario = null;
    document.querySelector('.observacao').textContent = 'Obs: Você só poderá agendar um horário caso digite seu nome acima.';
}

// Adiciona evento para todos os selects
document.querySelectorAll('.select-horario').forEach(function(select) {
    select.addEventListener('change', function() {
        agendarHorario(this);
    });
});