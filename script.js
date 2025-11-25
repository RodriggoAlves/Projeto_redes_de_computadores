const API_URL = "https://dns.google/resolve";

// --- Função Auxiliar: Promessa de Delay ---
// Isso cria um atraso artificial. Definido para 2000ms (2 segundos)
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- Atualiza a Barra Visual ---
function updateBrowserBar(status, domain, ipAddress = null) {
    const ipLinkOutput = document.getElementById('ip-link-output');
    const lockIcon = document.querySelector('.lock-icon');
    const refreshIcon = document.querySelector('.refresh-icon');

    // Resetar classes
    lockIcon.classList.remove('secure', 'error');
    ipLinkOutput.classList.remove('placeholder');

    if (status === 'success') {
        // TRUQUE UX: Mostra IP, linka para Domínio
        ipLinkOutput.innerHTML = ipAddress;
        ipLinkOutput.href = `http://${domain}`;
        ipLinkOutput.target = "_blank";
        ipLinkOutput.title = "Clique para acessar (Redirecionamento via Domínio)";
        
        lockIcon.innerHTML = '🔒';
        lockIcon.classList.add('secure');
        refreshIcon.style.visibility = 'visible';

    } else if (status === 'error') {
        ipLinkOutput.innerHTML = `Erro de resolução`;
        ipLinkOutput.removeAttribute('href');
        
        lockIcon.innerHTML = '❌';
        lockIcon.classList.add('error');
        refreshIcon.style.visibility = 'visible';

    } else if (status === 'loading') {
        ipLinkOutput.innerHTML = 'Escaneando rede...';
        ipLinkOutput.removeAttribute('href');
        lockIcon.innerHTML = '⏳';
        refreshIcon.style.visibility = 'hidden';

    } else {
        // Inicial
        ipLinkOutput.innerHTML = 'Endereço IP / Domínio Resolvido';
        ipLinkOutput.classList.add('placeholder');
        ipLinkOutput.removeAttribute('href');
        lockIcon.innerHTML = '❓';
        refreshIcon.style.visibility = 'hidden';
    }
}

// --- Função Principal ---
async function resolveDomain() {
    const domainInput = document.getElementById('domain-input');
    const domain = domainInput.value.trim();
    const resultsContainer = document.getElementById('results-container');
    const btn = document.getElementById('lookup-button');

    if (!domain) {
        resultsContainer.innerHTML = '<div class="fade-in"><h2>⚠️ Digite um domínio válido.</h2></div>';
        return;
    }

    // 1. Estado de Carregamento (UI)
    btn.disabled = true; // Evita múltiplos cliques
    updateBrowserBar('loading', domain);
    
    resultsContainer.innerHTML = `
        <div class="loading-container fade-in">
            <div class="spinner"></div>
            <h3>Buscando registros DNS...</h3>
            <p>Consultando Servidor Root > TLD > Autoritativo</p>
        </div>
    `;

    const urlConsulta = `${API_URL}?name=${domain}&type=A`;

    try {
        // 2. Executa a Requisição E o Delay ao mesmo tempo.
        // O Promise.all espera os dois terminarem. 
        // Se a API for rápida, ele espera o delay acabar.
        // Se a API for lenta, ele espera a API.
        const [response, _] = await Promise.all([
            fetch(urlConsulta),
            wait(2000) // DELAY DE 2 SEGUNDOS AQUI
        ]);

        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

        const data = await response.json();

        // 3. Processamento do Resultado
        if (data.Status === 0 && data.Answer && data.Answer.length > 0) {
            // Pega o registro A (prioriza tipo 1) ou o último da lista
            const record = data.Answer.find(r => r.type === 1) || data.Answer[data.Answer.length - 1];
            const ipAddress = record.data;

            // Exibe com animação fade-in
            resultsContainer.innerHTML = `
                <div class="fade-in">
                    <div class="final-result">
                        <h3>✅ Sucesso: ${domain}</h3>
                    </div>
                    <div class="validation-tip">
                        IP Localizado: <strong>${ipAddress}</strong>
                    </div>
                </div>
            `;
            updateBrowserBar('success', domain, ipAddress);

        } else {
            throw new Error('Domínio não encontrado ou sem registro A.');
        }

    } catch (error) {
        resultsContainer.innerHTML = `
            <div class="fade-in">
                <h2>❌ Falha na Resolução</h2>
                <p>${error.message}</p>
            </div>
        `;
        updateBrowserBar('error', domain);
    } finally {
        btn.disabled = false; // Reativa o botão
    }
}

// Event Listeners
document.getElementById('lookup-button').addEventListener('click', resolveDomain);
document.getElementById('domain-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') resolveDomain();
});