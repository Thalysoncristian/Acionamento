// Função para calcular o SLA
function calculateSLA() {
    const alarme = document.getElementById('alarme').value;
    const acionamento = document.getElementById('horaAcionamento').value;

    let slaHours = 0;

    switch (alarme) {
        case 'AFCA':
        case 'ABAT':
        case 'ADIF':
        case 'AQDF':
        case 'AOGMG':
        case 'ACGMG':
        case 'AFGMG':
        case 'ATEMP':
        case 'ATRO':
        case 'ARCON':
            slaHours = 4;
            break;
        case 'AFRET':
        case 'ABAL':
            slaHours = 24;
            break;
        default:
            slaHours = 0;
    }

    if (acionamento && slaHours > 0) {
        const [hours, minutes] = acionamento.split(':');
        const slaDate = new Date();
        slaDate.setHours(parseInt(hours) + slaHours);
        slaDate.setMinutes(parseInt(minutes));

        const slaDateFormatted = `${slaDate.toLocaleDateString()} ${String(slaDate.getHours()).padStart(2, '0')}:${String(slaDate.getMinutes()).padStart(2, '0')}`;
        document.getElementById('previsaoTec').value = `${String(slaDate.getHours()).padStart(2, '0')}:${String(slaDate.getMinutes()).padStart(2, '0')}`;
        return slaDateFormatted;
    }
    return 'N/A';
}

// Função para gerar o acionamento
function gerarAcionamento() {
    const analista = document.getElementById("analista").value.toUpperCase();
    const supervisor = document.getElementById("supervisor").value.toUpperCase();
    const cn = document.getElementById("cn").value;
    const estacao = document.getElementById("site-search").value.toUpperCase();
    const uc = document.getElementById("uc").value;
    const endereco = document.getElementById("endereco").value;
    const alarme = document.getElementById("alarme").value;
    const ami = document.getElementById("ami").value.toUpperCase();
    const inc = document.getElementById("inc").value.toUpperCase();
    const horaAcionamento = document.getElementById("horaAcionamento").value;
    const previsaoTec = document.getElementById("previsaoTec").value;
    const sla = calculateSLA();
    const tecnico = document.getElementById("tecnico").value.toUpperCase();
    const destacar = document.getElementById("destacar").checked;

    const asterisk = destacar ? '*' : '';

    let resultado = `${asterisk}INFORMATIVO DE ACIONAMENTO${asterisk}\n${asterisk}ANALISTA NOC:${asterisk} ${analista}\n${asterisk}SUPERVISOR:${asterisk} ${supervisor}\n${asterisk}CN:${asterisk} ${cn}\n${asterisk}ESTAÇÃO:${asterisk} ${estacao}\n`;

    if (uc) {
        resultado += `${asterisk}UC:${asterisk} ${uc}\n${asterisk}ENDEREÇO:${asterisk} ${endereco}\n`;
    }

    resultado += `${asterisk}ALARME:${asterisk} ${alarme}\n${asterisk}AMI:${asterisk} ${ami}\n${asterisk}INC:${asterisk} ${inc}\n${asterisk}HORA DO ACIONAMENTO:${asterisk} ${horaAcionamento}\n${asterisk}PREVISÃO:${asterisk} ${previsaoTec}\n${asterisk}SLA ATÉ:${asterisk} ${sla}\n${asterisk}TÉCNICO ACIONADO:${asterisk} ${tecnico}`;

    document.getElementById("resultado").innerText = resultado.trim();
}

// Função para copiar o acionamento gerado
function copiarAcionamento() {
    const resultado = document.getElementById("resultado").innerText;
    navigator.clipboard.writeText(resultado);
    alert("Acionamento copiado para a área de transferência!");
}

// Função para alternar entre modo claro e escuro
function toggleTheme() {
    document.body.classList.toggle('dark');
}

// Função para buscar site e filtrar opções
document.getElementById("site-search").addEventListener("input", function() {
    const filter = this.value.toUpperCase();
    const options = document.getElementById("site").options;

    for (let i = 1; i < options.length; i++) {
        const optionText = options[i].text.toUpperCase();
        options[i].style.display = optionText.includes(filter) ? "" : "none";
    }
});

// Função para preencher dados de UC e Endereço
function preencherDados(value) {
    const select = document.getElementById('site');
    let found = false;
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === value) {
            const dados = select.options[i].value.split('*');
            document.getElementById('uc').value = dados[1];
            document.getElementById('endereco').value = dados[2];
            found = true;
            break;
        }
    }
    if (!found) {
        document.getElementById('uc').value = '';
        document.getElementById('endereco').value = '';
    }
}

// Função para buscar site e exibir dropdown
document.getElementById('site-search').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    const select = document.getElementById('site');
    const dropdownContent = document.getElementById('dropdown-content');
    dropdownContent.innerHTML = '';

    if (searchValue.length >= 3) {
        for (let i = 0; i < select.options.length; i++) {
            const option = select.options[i];
            if (option.text.toLowerCase().includes(searchValue)) {
                const div = document.createElement('div');
                div.textContent = option.text;
                div.addEventListener('click', function() {
                    document.getElementById('site-search').value = option.text;
                    dropdownContent.classList.remove('show');
                    preencherDados(option.value);
                });
                dropdownContent.appendChild(div);
            }
        }

        dropdownContent.classList.add('show');
    } else {
        dropdownContent.classList.remove('show');
    }
});

document.addEventListener('click', function(event) {
    const dropdownContent = document.getElementById('dropdown-content');
    if (!event.target.matches('#site-search')) {
        dropdownContent.classList.remove('show');
    }
});

// Função para limpar campos UC e Endereço antes de preencher novos dados
function limparCampos() {
    document.getElementById('uc').value = '';
    document.getElementById('endereco').value = '';
}

// Adiciona a chamada para limparCampos antes de preencher novos dados
document.getElementById('site-search').addEventListener('input', function() {
    limparCampos();
    const searchValue = this.value.toLowerCase();
    const select = document.getElementById('site');
    const dropdownContent = document.getElementById('dropdown-content');
    dropdownContent.innerHTML = '';

    if (searchValue.length >= 3) {
        for (let i = 0; i < select.options.length; i++) {
            const option = select.options[i];
            if (option.text.toLowerCase().includes(searchValue)) {
                const div = document.createElement('div');
                div.textContent = option.text;
                div.addEventListener('click', function() {
                    document.getElementById('site-search').value = option.text;
                    dropdownContent.classList.remove('show');
                    preencherDados(option.value);
                });
                dropdownContent.appendChild(div);
            }
        }

        dropdownContent.classList.add('show');
    } else {
        dropdownContent.classList.remove('show');
    }
});
