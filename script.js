function setCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('horaAcionamento').value = `${hours}:${minutes}`;
}

function calculateSLA() {
    const alarme = document.getElementById('alarme').value;
    const acionamento = document.getElementById('horaAcionamento').value;

    let slaHours = 0;

    switch (alarme) {
        case 'ABAT':
        case 'AC':
        case 'ATEMP':
            slaHours = 4;
            break;
        case 'AFRET':
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
        return slaDateFormatted;  // Retorna a previsão com data
    }
}

function gerarAcionamento() {
    // Atualizar a hora do acionamento com a hora atual
    setCurrentTime();

    const analista = document.getElementById("analista").value.toUpperCase();
    const supervisor = document.getElementById("supervisor").value.toUpperCase();
    const cn = document.getElementById("cn").value;
    const estacao = document.getElementById("estacao").value.toUpperCase();
    const alarme = document.getElementById("alarme").value;
    const ami = document.getElementById("ami").value.toUpperCase();
    const inc = document.getElementById("inc").value.toUpperCase();
    const horaAcionamento = document.getElementById("horaAcionamento").value;
    const previsaoTec = document.getElementById("previsaoTec").value;
    const sla = calculateSLA(); // Obter SLA atualizado
    const tecnico = document.getElementById("tecnico").value.toUpperCase();
    const destacar = document.getElementById("destacar").checked;

    const asterisk = destacar ? '*' : '';

    // Gerar o texto do acionamento com SLA ATÉ incluindo a data
    let resultado = `
        ${asterisk}INFORMATIVO DE ACIONAMENTO${asterisk}
        ${asterisk}ANALISTA NOC:${asterisk} ${analista}
        ${asterisk}SUPERVISOR:${asterisk} ${supervisor}
        ${asterisk}CN:${asterisk} ${cn}
        ${asterisk}ESTAÇÃO:${asterisk} ${estacao}
        ${asterisk}ALARME:${asterisk} ${alarme}
        ${asterisk}AMI:${asterisk} ${ami}
        ${asterisk}INC:${asterisk} ${inc}
        ${asterisk}HORA DO ACIONAMENTO:${asterisk} ${horaAcionamento}
        ${asterisk}PREVISÃO:${asterisk} ${previsaoTec}
        ${asterisk}SLA ATÉ:${asterisk} ${sla}
        ${asterisk}TÉCNICO ACIONADO:${asterisk} ${tecnico}
    `;

    document.getElementById("resultado").innerText = resultado.trim();
}

function copiarAcionamento() {
    const resultado = document.getElementById("resultado").innerText;
    navigator.clipboard.writeText(resultado);
    alert("Acionamento copiado para a área de transferência!");
}

function toggleTheme() {
    document.body.classList.toggle('dark');
}
