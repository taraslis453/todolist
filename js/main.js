let listItems = document.querySelector('.list__items');
listItems.innerHTML = localStorage.getItem('todoList');

function createListDiv() {
    let listDiv = document.createElement("div");
    listDiv.className = 'list__item';
    listDiv.innerHTML =
        `<svg class="delete__list-icon" fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" width="26px" height="26px"><path d="M 21.734375 19.640625 L 19.636719 21.734375 C 19.253906 22.121094 18.628906 22.121094 18.242188 21.734375 L 13 16.496094 L 7.761719 21.734375 C 7.375 22.121094 6.746094 22.121094 6.363281 21.734375 L 4.265625 19.640625 C 3.878906 19.253906 3.878906 18.628906 4.265625 18.242188 L 9.503906 13 L 4.265625 7.761719 C 3.882813 7.371094 3.882813 6.742188 4.265625 6.363281 L 6.363281 4.265625 C 6.746094 3.878906 7.375 3.878906 7.761719 4.265625 L 13 9.507813 L 18.242188 4.265625 C 18.628906 3.878906 19.257813 3.878906 19.636719 4.265625 L 21.734375 6.359375 C 22.121094 6.746094 22.121094 7.375 21.738281 7.761719 L 16.496094 13 L 21.734375 18.242188 C 22.121094 18.628906 22.121094 19.253906 21.734375 19.640625 Z"/></svg>
        <input type="text" class="list__item-name" value="Список без названия">
        <div class="list__item-count">${1}</div>`;
    listItems.append(listDiv);
    listListeners();
    selectLastListDiv()
    saveToStorage();
}

function selectLastListDiv() {
    let lastListDiv = document.querySelector('.list__items .list__item:last-child input');
    lastListDiv.select();
}

function listListeners() {
    let listItemInputs = document.querySelectorAll('.list__item input');
    let deleteListBtn = document.querySelectorAll('.delete__list-icon');
    for(let i = 0; i < listItemInputs.length; i++) {

        listItemInputs[i].addEventListener('dblclick', () => {
            listItemInputs[i].readOnly = false;
        })

        listItemInputs[i].addEventListener('keyup', e => {
            if(e.keyCode === 13) {
                listItemInputs[i].setAttribute('value', listItemInputs[i].value );
                listItemInputs[i].blur();
                listItemInputs[i].readOnly = true;
                saveToStorage();
            }
        });

        listItemInputs[i].onblur = () => {
            listItemInputs[i].setAttribute('value', listItemInputs[i].value );
            listItemInputs[i].readOnly = true;
            saveToStorage();
        };

        deleteListBtn[i].addEventListener('click', () =>{
            deleteListBtn[i].parentNode.remove();
            saveToStorage();
        })
    }
}

listListeners();

function saveToStorage() {
    localStorage.setItem('todoList',listItems.innerHTML);
}

function openTasks() {
    const aside = document.querySelector('aside')
    const main = document.querySelector('main')

    if(aside.style.display === 'none') {
        aside.style.display = 'block'
        main.style.width = '80%'
        main.style.position = 'relative'
    } else {
        aside.style.display = 'none'
        main.style.width = '100%'
        main.style.position = 'absolute'
    }
    
}