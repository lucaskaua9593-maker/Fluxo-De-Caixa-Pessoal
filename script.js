// Funções utilitárias para salvar e carregar dados do localStorage
function salvarDespesa(tipo, pagina, despesa) {
    const chave = `${pagina}_${tipo}`;
    const lista = JSON.parse(localStorage.getItem(chave)) || [];
    lista.push(despesa);
    localStorage.setItem(chave, JSON.stringify(lista));
}

function carregarDespesas(tipo, pagina) {
    const chave = `${pagina}_${tipo}`;
    return JSON.parse(localStorage.getItem(chave)) || [];
}

function renderizarLista(tipo, pagina, ulId) {
    const lista = carregarDespesas(tipo, pagina);
    const ul = document.getElementById(ulId);
    ul.innerHTML = '';
    lista.forEach((item, idx) => {
        const li = document.createElement('li');
        let venc = item.vencimento ? ` | Venc: ${formatarData(item.vencimento)}` : '';
        li.textContent = `${item.nome} - R$ ${item.valor.toFixed(2)}${venc}`;
        const btn = document.createElement('button');
        btn.textContent = 'Remover';
        btn.onclick = () => {
            removerDespesa(tipo, pagina, idx);
            renderizarLista(tipo, pagina, ulId);
        };
        li.appendChild(btn);
        ul.appendChild(li);
    });
}

function formatarData(dataStr) {
    if (!dataStr) return '';
    const [ano, mes, dia] = dataStr.split('-');
    return `${dia}/${mes}/${ano}`;
}

function removerDespesa(tipo, pagina, idx) {
    const chave = `${pagina}_${tipo}`;
    const lista = carregarDespesas(tipo, pagina);
    lista.splice(idx, 1);
    localStorage.setItem(chave, JSON.stringify(lista));
}

// FLASH
const formFixaFlash = document.getElementById('form-fixa-flash');
if (formFixaFlash) {
    formFixaFlash.onsubmit = function(e) {
        e.preventDefault();
        const nome = this.nome.value;
        const valor = parseFloat(this.valor.value);
        const vencimento = this.vencimento.value;
        salvarDespesa('fixa', 'flash', { nome, valor, vencimento });
        renderizarLista('fixa', 'flash', 'lista-fixa-flash');
        this.reset();
    };
    renderizarLista('fixa', 'flash', 'lista-fixa-flash');
}
const formVariavelFlash = document.getElementById('form-variavel-flash');
if (formVariavelFlash) {
    formVariavelFlash.onsubmit = function(e) {
        e.preventDefault();
        const nome = this.nome.value;
        const valor = parseFloat(this.valor.value);
        const vencimento = this.vencimento.value;
        salvarDespesa('variavel', 'flash', { nome, valor, vencimento });
        renderizarLista('variavel', 'flash', 'lista-variavel-flash');
        this.reset();
    };
    renderizarLista('variavel', 'flash', 'lista-variavel-flash');
}

// SALÁRIO
const formFixaSalario = document.getElementById('form-fixa-salario');
if (formFixaSalario) {
    formFixaSalario.onsubmit = function(e) {
        e.preventDefault();
        const nome = this.nome.value;
        const valor = parseFloat(this.valor.value);
        const vencimento = this.vencimento.value;
        salvarDespesa('fixa', 'salario', { nome, valor, vencimento });
        renderizarLista('fixa', 'salario', 'lista-fixa-salario');
        this.reset();
    };
    renderizarLista('fixa', 'salario', 'lista-fixa-salario');
}
const formVariavelSalario = document.getElementById('form-variavel-salario');
if (formVariavelSalario) {
    formVariavelSalario.onsubmit = function(e) {
        e.preventDefault();
        const nome = this.nome.value;
        const valor = parseFloat(this.valor.value);
        const vencimento = this.vencimento.value;
        salvarDespesa('variavel', 'salario', { nome, valor, vencimento });
        renderizarLista('variavel', 'salario', 'lista-variavel-salario');
        this.reset();
    };
    renderizarLista('variavel', 'salario', 'lista-variavel-salario');
}
