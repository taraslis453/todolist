let listItems = document.querySelector('.list__items');
listItems.innerHTML = localStorage.getItem('todoList');

function createListDiv() {
    let listDiv = document.createElement("div");
    listDiv.className = 'list__item';
    listDiv.innerHTML = `<input type="text" class="list__item-name" value="Список без названия"><div class="list__item-count">${1}</div></div>`;
    listItems.append(listDiv);
    listenInputs();
    selectLastListDiv()
    saveToStorage();
}

function selectLastListDiv() {
    let lastListDiv = document.querySelector('.list__items .list__item:last-child input');
    lastListDiv.select();
}

function listenInputs() {
    let listItemInputs = document.querySelectorAll('.list__item input');

    for(let i = 0; i < listItemInputs.length; i++) {
        listItemInputs[i].addEventListener('keyup', e => {
            if(e.keyCode === 13) {
                listItemInputs[i].setAttribute('value', listItemInputs[i].value );
                listItemInputs[i].blur();
                saveToStorage();
            }
        });

        listItemInputs[i].onblur = () => {
            listItemInputs[i].setAttribute('value', listItemInputs[i].value );
            saveToStorage();
        };
    }
}

listenInputs();

function saveToStorage() {
    localStorage.setItem('todoList',listItems.innerHTML);
}