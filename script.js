// Variável para armazenar o nome do usuário (em memória)
let nomeUsuario = null;

// Lista de nomes já agendados
const nomesAgendados = [];

// Salva os horários originais de cada select
document.querySelectorAll('.select-horario').forEach(function(select) {
    select.dataset.originalOptions = select.innerHTML;
});

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

    document.querySelector('.observacao').textContent =
        'Selecione um horário para agendar.';

    alert(`Bem-vindo, ${nomeUsuario}! Agora selecione um horário para agendar.`);
});

// Função para cancelar agendamento
document.getElementById('btn-cancelar').addEventListener('click', function() {

    const inputNome = document.getElementById('nome');

    const nomeParaCancelar = inputNome.value.trim();

    // Se não digitou nada
    if (nomeParaCancelar === '') {

        alert('Não é possível cancelar algo sem digitar um nome.');

        return;
    }

    const nomeLower = nomeParaCancelar.toLowerCase();

    const index = nomesAgendados.indexOf(nomeLower);

    // Se o nome NÃO tiver agendamento,
    // apenas limpa o input sem mostrar mensagem
    if (index === -1) {

        inputNome.value = '';

        nomeUsuario = null;

        document.querySelector('.observacao').textContent =
            'Obs: Você só poderá agendar um horário caso digite seu nome acima.';

        return;
    }

    // Remove da lista de agendados
    nomesAgendados.splice(index, 1);

    let cancelado = false;

    document.querySelectorAll('#tabela-agenda tr').forEach(function(tr) {

        const tdNome = tr.querySelector('.nome');

        if (
            tdNome &&
            tdNome.textContent.trim().toLowerCase() === nomeLower
        ) {

            const tdHorario = tr.querySelector('.horario');
            const tdDia = tr.querySelector('.dia');
            const tdDisponibilidade =
                tr.querySelector('.disponibilidade');

            const select = tr.querySelector('.select-horario');

            if (
                tdDia &&
                tdHorario &&
                tdDisponibilidade &&
                select
            ) {

                // Restaurar horários originais
                if (tdDia.textContent.includes('Segunda')) {

                    tdHorario.textContent =
                        '8:00 -- 9:00 -- 10:00';

                } else if (tdDia.textContent.includes('Terça')) {

                    tdHorario.textContent =
                        '15:00 -- 16:00 -- 17:00';

                } else if (tdDia.textContent.includes('Quarta')) {

                    tdHorario.textContent =
                        '20:00 -- 21:00 -- 22:00';

                } else if (tdDia.textContent.includes('Quinta')) {

                    tdHorario.textContent =
                        '12:00 -- 13:00 -- 14:00';

                } else if (tdDia.textContent.includes('Sexta')) {

                    tdHorario.textContent =
                        '05:00 -- 06:00 -- 07:00';
                }

                // Restaurar status
                tdDisponibilidade.textContent = 'Disponível';
                tdDisponibilidade.style.color = '';

                // Limpar nome
                tdNome.textContent = '';

                // Restaurar select original
                select.innerHTML =
                    select.dataset.originalOptions;

                select.disabled = false;
                select.value = '';

                cancelado = true;
            }
        }
    });

    // Retorno do Cancelamento
    if (cancelado) {

        alert('Agendamento cancelado com sucesso!');

        inputNome.value = '';

        nomeUsuario = null;

        document.querySelector('.observacao').textContent =
            'Obs: Você só poderá agendar um horário caso digite seu nome acima.';
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
    tr.querySelector('.horario').textContent =
        horarioSelecionado;

    // Mostra o nome do participante
    tr.querySelector('.nome').textContent =
        nomeAtual;

    // Atualiza disponibilidade
    tr.querySelector('.disponibilidade').textContent =
        'AGENDADO';

    tr.querySelector('.disponibilidade').style.color =
        'green';

    // Troca o select para "INDISPONÍVEL"
    select.innerHTML =
        '<option value="indisponivel">INDISPONÍVEL</option>';

    select.value = 'indisponivel';

    select.disabled = true;

    // Adiciona nome na lista
    nomesAgendados.push(nomeAtual.toLowerCase());

    // Limpa input
    document.getElementById('nome').value = '';

    nomeUsuario = null;

    document.querySelector('.observacao').textContent =
        'Obs: Você só poderá agendar um horário caso digite seu nome acima.';
}

// Eventos dos selects
document.querySelectorAll('.select-horario').forEach(function(select) {

    // Destacar linha ao focar
    select.addEventListener('focus', function() {

        const tr = this.closest('tr');

        if (tr) {
            tr.classList.add('linha-destaque');
        }
    });

    // Remover destaque
    select.addEventListener('blur', function() {

        const tr = this.closest('tr');

        if (tr) {
            tr.classList.remove('linha-destaque');
        }
    });

    // Detectar o usuário escolher no select
    select.addEventListener('change', function() {
        agendarHorario(this);
    });
});