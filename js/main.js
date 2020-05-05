const listItems = document.querySelector('.list__items');
listItems.innerHTML = localStorage.getItem('todoList');

const taskItems = document.querySelector('.task__items');
taskItems.innerHTML = localStorage.getItem('taskList');

document.addEventListener('DOMContentLoaded', () => {
    // CLOSE MODAl

    if(localStorage.getItem('isClosedGreet')) {
        document.querySelector('.modal__greet').classList.add('disabled')
    } else {
        document.querySelector('.modal__greet').classList.remove('disabled')
        setTimeout(() => {
            document.querySelector('.modal__greet').classList.add('hide')
            localStorage.setItem('isClosedGreet', true)
        }, 2000)
    }
})

document.addEventListener('click', e => {
    if(e.target.dataset.close === 'true' || e.target.classList.contains('overlay')) {
        document.querySelector('.modal').classList.add('hide')    
    }
})

function createListDiv() {
    // Созданние списка и добавление в конец всех списков
    let listDiv = document.createElement("div");
    listDiv.className = 'list__item';
    createPersonalName(listDiv);
    listDiv.innerHTML =
        `<svg class="delete__list-icon" fill="#000000" width="26px" height="26px"><path d="M 21.734375 19.640625 L 19.636719 21.734375 C 19.253906 22.121094 18.628906 22.121094 18.242188 21.734375 L 13 16.496094 L 7.761719 21.734375 C 7.375 22.121094 6.746094 22.121094 6.363281 21.734375 L 4.265625 19.640625 C 3.878906 19.253906 3.878906 18.628906 4.265625 18.242188 L 9.503906 13 L 4.265625 7.761719 C 3.882813 7.371094 3.882813 6.742188 4.265625 6.363281 L 6.363281 4.265625 C 6.746094 3.878906 7.375 3.878906 7.761719 4.265625 L 13 9.507813 L 18.242188 4.265625 C 18.628906 3.878906 19.257813 3.878906 19.636719 4.265625 L 21.734375 6.359375 C 22.121094 6.746094 22.121094 7.375 21.738281 7.761719 L 16.496094 13 L 21.734375 18.242188 C 22.121094 18.628906 22.121094 19.253906 21.734375 19.640625 Z"/></svg>
        <input type="text" class="list__item-name" value="Список без названия">
        <div class="list__item-count">${1}</div>`;
    listItems.append(listDiv);
    listen();
    selectLastListDiv();
    saveToStorage();
}
// Выбрать последний созданный список чтобы выделить его для редактирования
function selectLastListDiv() {
    let lastListDiv = document.querySelector('.list__items .list__item:last-child input');
    lastListDiv.select();
}

function createPersonalName(e) {
    // создание рандомных симвлов для уникального именни
    let randomCharacters = Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 4);
    let personalName = `ltm_${randomCharacters}`;
    // Добавление этого именни к созданому диву
    e.classList.add(personalName);
    // Создание списка и его соединение с блоком задач
    let taskDiv = document.createElement('div');
    taskDiv.classList.add('task__item', personalName);
    taskItems.append(taskDiv);
    // Скрываем все блоки с задачами и показывем только выбранный
    for(let a = 0; a < taskItemsChildren.length; a++) {
        taskItemsChildren[a].style.display = 'none';
    }
    taskItems.querySelector('.' + personalName).style.display = 'block';

    localStorage.setItem('listSelectedName', personalName);
    saveToStorage();
}

function listen() {
    let listItemInputs = document.querySelectorAll('.list__item input');
    let deleteListBtn = document.querySelectorAll('.delete__list-icon');
    taskItemsChildren = document.querySelectorAll('.task__item')
    let taskInput = document.querySelector('.task__input');
    // Так как у нас одинаковое количество инпутов и кнопок удалить этот инпут то это все мы помещаем в один цыкл
    for(let i = 0; i < listItemInputs.length; i++) {

        listItemInputs[i].addEventListener('click', e => {
            for(let a = 0; a < taskItemsChildren.length; a++) {
                taskItemsChildren[a].style.display = 'none';
            }
            listItemPersonalName =  e.target.parentNode.classList[1];
            taskItems.querySelector('.' + listItemPersonalName).style.display = 'block';
            localStorage.setItem('listSelectedName', listItemPersonalName);
            saveToStorage();
        })

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

        deleteListBtn[i].onclick = () => {
            deleteListBtn[i].parentNode.remove();
            taskItemsChildren[i].remove();
            saveToStorage();
        }
    }

    taskInput.onkeyup = e => {
        if(e.keyCode === 13) {
            createTask(taskInput);
        }
    }
}

listen();

function createTask(e) {
    // Получаю список который выбран и передаю в инпут для добавление задач что бы он знал куда добавлять
    listSelectedName = localStorage.getItem('listSelectedName');
    // Создание задачи с уникальным именем
    task = document.createElement('input');
    task.classList.add('task');
    task.setAttribute('value', e.value);
    taskItems.querySelector('.' + listSelectedName).append(task);
    // Очистка инпута после добавление задачи
    e.value = "";
    saveToStorage();
}

// Сохранение всего чтобы осталось после перезагрузки страницы
function saveToStorage() {
    localStorage.setItem('todoList',listItems.innerHTML);
    localStorage.setItem('taskList',taskItems.innerHTML);
}

const aside = document.querySelector('aside')
const main = document.querySelector('main')
function openTasks() {
    if(aside.classList.contains('d-mob-none')) {
        aside.classList.remove('d-mob-none');
    } else {
        aside.classList.add('d-mob-none')
    }

}

function openSettings() {
    // REMOVE HIDE CLASS
    const $modal = document.querySelector('.modal')
    $modal.classList.remove('hide')


}