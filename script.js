// Função para alternar a exibição dos submenus
function toggleSubMenu(element) {
    const submenu = element.nextElementSibling;
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
}

// Função para carregar conteúdo na DIV central
/*
function loadContent(page) {
    fetch(page)
        .then(response => response.text())
        .then(html => {
            document.getElementById('mainContent').innerHTML = html;
            setupBackButton();
            //document.getElementById('pictureButtonsContainer').style.display = 'none';
        })
        .catch(error => {
            console.error('Erro ao carregar o conteúdo:', error);
            document.getElementById('mainContent').innerHTML = `
                <div class="error-message">
                    <h2>Erro ao carregar a página</h2>
                    <p>${error.message}</p>
                </div>
            `;
        });
}*/
/*
function loadContent(page) {
    fetch(page)
        .then(response => response.text())
        .then(html => {
            document.getElementById('mainContent').innerHTML = html;
            // Disparar evento quando o conteúdo for carregado
            window.dispatchEvent(new CustomEvent('contentLoaded'));
            setupBackButton();
        })
        .catch(error => {
            console.error('Erro ao carregar o conteúdo:', error);
            document.getElementById('mainContent').innerHTML = `
                <div class="error-message">
                    <h2>Erro ao carregar a página</h2>
                    <p>${error.message}</p>
                </div>
            `;
        });
}*/
function loadContent(page) {
    fetch(page)
        .then(response => response.text())
        .then(html => {
            // Insere o HTML no container
            document.getElementById('mainContent').innerHTML = html;

            // Chama manualmente a função que deveria rodar na janela2
            if( page === 'Estatistica.html' || page === 'Rel.html') 
                {
                    initJanela2();
                }

            setupBackButton();
        })
        .catch(error => {
            console.error('Erro ao carregar o conteúdo:', error);
            document.getElementById('mainContent').innerHTML = `
                <div class="error-message">
                    <h2>Erro ao carregar a página</h2>
                    <p>${error.message}</p>
                </div>
            `;
        });
}


// Função que será chamada manualmente quando o conteúdo for carregado
function initJanela2() {
    const figuraNome = sessionStorage.getItem('previousPage');
    console.log("SessionStorage (janela2): ", figuraNome);

    if (figuraNome) {
        const imgElement = document.createElement('img');
        imgElement.src = figuraNome;
        document.getElementById('container-da-imagem').appendChild(imgElement);
    }
}


// Função separada para configurar o botão de voltar
function setupBackButton() {
    const previousPage = sessionStorage.getItem('previousPage');
    const backButtons = document.querySelectorAll('.btn-retornar'); // Seleciona TODOS os botões com essa classe
    const selectButtons = document.querySelectorAll('.btn-selecionar');// Seleciona TODOS os botões com essa classe

    if (backButtons.length && previousPage) {
        backButtons.forEach(button => {
            button.onclick = function () {
                loadContent(previousPage); // Ou `window.location.href = previousPage;` se preferir recarregar a página
            };
        });
    }
    if (selectButtons.length && previousPage) {
        selectButtons.forEach(button => {
            button.onclick = function () {
                loadContent(previousPage); // Ou `window.location.href = previousPage;` se preferir recarregar a página
            };
        });
    }

}

// Função para exibir picture buttons
function showPictureButtonsFases() {
    const buttonsContainer = document.getElementById('pictureButtonsContainer');
    const mainContent = document.getElementById('mainContent');

    // Esconde a mensagem de boas-vindas se estiver visível
    const welcomeMsg = document.querySelector('.welcome-message');
    if (welcomeMsg) welcomeMsg.style.display = 'none';

    // Cria os picture buttons
    buttonsContainer.innerHTML = `
        <div class="picture-button" onclick="loadContent('pre_embarque.html')">
            <img src="https://via.placeholder.com/150" alt="Botão 1">
            <p>Pré-Embarque</p>
        </div>
        <div class="picture-button" onclick="loadContent('pagina6.html')">
            <img src="https://via.placeholder.com/150" alt="Botão 2">
            <p>Embarque</p>
        </div>
        <div class="picture-button" onclick="loadContent('pagina7.html')">
            <img src="https://via.placeholder.com/150" alt="Botão 3">
            <p>Trânsito Internacional</p>
        </div>
        <div class="picture-button" onclick="loadContent('pagina7.html')">
            <img src="https://via.placeholder.com/150" alt="Botão 4">
            <p>Pré-chegada</p>
        </div>
        <div class="picture-button" onclick="loadContent('pagina7.html')">
            <img src="https://via.placeholder.com/150" alt="Botão 5">
            <p>Desembaraço</p>
        </div>
        <div class="picture-button" onclick="loadContent('pagina7.html')">
            <img src="https://via.placeholder.com/150" alt="Botão 6">
            <p>Liberação</p>
        </div>
        <div class="picture-button" onclick="loadContent('pagina7.html')">
            <img src="https://via.placeholder.com/150" alt="Botão 7">
            <p>Entrega na Base</p>
        </div>

    `;

    buttonsContainer.style.display = 'flex';
    mainContent.scrollTo(0, 0);
}

// Exemplo de páginas de conteúdo (crie esses arquivos separadamente)
// pagina1.html, pagina2.html, etc. podem conter qualquer HTML que você queira exibir
// Declaração das funções no escopo global
window.loadJsonData = async function (fase, janela, aba) {

    try {
        const response = await fetch('definicoes.json');
        const jsonData = await response.json();
        window.displayData(jsonData, fase, janela, aba); // Chama explicitamente pelo escopo global
    } catch (error) {
        console.error("Erro ao carregar o JSON:", error);
        document.getElementById('conteudoJson').innerHTML = '<p>Erro ao carregar os dados.</p>';
    }
}

/*
*/
window.displayData = function (jsonData, faseFiltro, janelaFiltro, abaFiltro) {
    const container = document.getElementById('conteudoJson');
    container.innerHTML = ''; // Limpa o conteúdo

    if (!jsonData || jsonData.length === 0) {
        container.innerHTML = '<p>Nenhum dado disponível.</p>';
        return;
    }

    // Filtra os itens com base nos parâmetros JANELA e ABA
    const itensFiltrados = jsonData.filter(item => {
        return item.FASE === faseFiltro && item.JANELA === janelaFiltro && item.ABA === abaFiltro;
    });

    if (itensFiltrados.length === 0) {
        container.innerHTML = '<p>Nenhum dado correspondente aos filtros.</p>';
        return;
    }

    // Cria um parágrafo para cada item filtrado
    itensFiltrados.forEach(item => {
        const p = document.createElement('p');
        p.className = 'paragrafo-item';
        // Concatena ID e DEFINICAO separados por "-"
        p.textContent = `${item.ID} - ${item.DEFINICAO}`;
        container.appendChild(p);
    });

    const divElement = document.createElement('div');

    const inputButton = document.createElement('input');
    inputButton.type = 'button';
    inputButton.value = 'Fechar Definição';

    inputButton.addEventListener('click', () => {
        limparContainer(container);
    });

    divElement.appendChild(inputButton);
    container.appendChild(divElement);



};

function limparContainer(container) {
    container.innerHTML = ''; // Remove todo o conteúdo
    // Alternativa: container.textContent = '';
};


function goToJanela(janela1, janela2) {
    sessionStorage.setItem('previousPage', janela1);
    //window.location.href = janela2;
    console.log("Parâmetros recebidos:", janela1, janela2);
    console.log("SsessionStorage: ", sessionStorage.getItem('previousPage'));
    loadContent(janela2);
};

// Função principal para abrir abas
function openTab(clickedTab) {
    // Encontra o container de abas DIRETO (pai do ul.tabs)
    const container = clickedTab.closest('ul.tabs').parentElement;

    // Remove active apenas das abas e conteúdos DESTE container
    container.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    container.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Ativa a aba clicada e seu conteúdo
    const tabId = clickedTab.getAttribute('data-tab');
    clickedTab.classList.add('active');
    container.querySelector(`#${tabId}`).classList.add('active');
}

// Delegação de eventos
document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (e) {
        if (e.target.classList.contains('tab')) {
            openTab(e.target);
            e.stopPropagation(); // Importante para não ativar containers pais
        }
    });
});

function mostrarPopup(elemento) {
    const popup = elemento.querySelector('.popup');
    popup.style.display = 'block';
}

function esconderPopup(elemento) {
    const popup = elemento.querySelector('.popup');
    popup.style.display = 'none';
}

