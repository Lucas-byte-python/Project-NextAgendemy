// Variável para armazenar o nome do usuário
let nomeUsuario = null;

// Captura o botão "Prosseguir"
document.getElementById('btn-prosseguir').addEventListener('click', function() {
    // Pega o valor do input com o nome
    nomeUsuario = document.getElementById('nome').value;
    
    // Valida se o nome foi preenchido
    if (nomeUsuario.trim() === '') {
        alert('Por favor, digite seu nome!');
        return;
    }
    
    alert(`Bem-vindo, ${nomeUsuario}! Clique em um dos selects para adicionar seu nome.`);
});

// Seleciona todos os selects da tabela
const selects = document.querySelectorAll('select[name="nome"]');

// Adiciona um event listener para quando o select for aberto
selects.forEach(select => {
    select.addEventListener('focus', function() {
        // Só adiciona a opção se o usuário já digitou o nome
        if (nomeUsuario && nomeUsuario.trim() !== '') {
            // Verifica se a opção já existe
            const opcaoExiste = Array.from(select.options).some(option => option.value === nomeUsuario);
            
            if (!opcaoExiste) {
                // Cria uma nova opção
                const novaOpcao = document.createElement('option');
                novaOpcao.value = nomeUsuario;
                novaOpcao.textContent = nomeUsuario;
                
                // Adiciona a opção ao select
                select.appendChild(novaOpcao);
            }
        }
    });
});
