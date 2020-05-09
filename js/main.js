const body = document.querySelector('body');

const listItems = document.querySelector('.list__items');
listItems.innerHTML = localStorage.getItem('todoList');

const taskItems = document.querySelector('.task__items');
taskItems.innerHTML = localStorage.getItem('taskList');

const makeAListBlock = document.querySelector('.make_a_list')
const taskInputWrap = document.querySelector('.task__input-wrap')
const addTaskInput = document.querySelector('.task__input');

document.addEventListener('DOMContentLoaded', () => {
    // CLOSE MODAl

    if(localStorage.getItem('isClosedGreet')) {
        document.querySelector('.modal__greet').classList.add('disabled')
    } else {
        document.querySelector('.modal__greet').classList.remove('disabled')
        setTimeout(() => {
            document.querySelector('.modal__greet').classList.add('hide')
            localStorage.setItem('isClosedGreet', true)
        }, 10000)
    }
})

document.addEventListener('click', e => {
    // HIDE SETTINGS IF PRESSED КРЕСТИК ИЛИ OVERLAY
    if(e.target.dataset.close || e.target.classList.contains('overlay')) {
        closeAllModals()
    } else if(e.target.dataset.select) {
        document.querySelector('.modal-content-settings').classList.add('disabled')
        document.querySelector('.modal-content-theme').classList.remove('disabled')
    } else if(e.target.dataset.back) {
        document.querySelector('.modal-content-settings').classList.remove('disabled')
        document.querySelector('.modal-content-theme').classList.add('disabled')
        // CHANGE THEME TO WHITE
    } else if(e.target.classList.contains('white')) {
        closeAllModals()
        document.querySelector('body').classList.add('white')
    }
})

function closeAllModals() {
    document.querySelector('.modal').classList.add('hide')
    document.querySelectorAll('.test').forEach(e => e.classList.add('disabled'))
    setTimeout(() => document.querySelector('.modal-content-settings').classList.remove('disabled'), 1000)
}

function createListDiv() {
    // Созданние списка и добавление в конец всех списков
    let listDiv = document.createElement("div");
    listDiv.className = 'list__item';
    createPersonalName(listDiv);
    listDiv.innerHTML =
        `<svg class="delete__list-icon" fill="#000000" width="26px" height="26px"><path d="M 21.734375 19.640625 L 19.636719 21.734375 C 19.253906 22.121094 18.628906 22.121094 18.242188 21.734375 L 13 16.496094 L 7.761719 21.734375 C 7.375 22.121094 6.746094 22.121094 6.363281 21.734375 L 4.265625 19.640625 C 3.878906 19.253906 3.878906 18.628906 4.265625 18.242188 L 9.503906 13 L 4.265625 7.761719 C 3.882813 7.371094 3.882813 6.742188 4.265625 6.363281 L 6.363281 4.265625 C 6.746094 3.878906 7.375 3.878906 7.761719 4.265625 L 13 9.507813 L 18.242188 4.265625 C 18.628906 3.878906 19.257813 3.878906 19.636719 4.265625 L 21.734375 6.359375 C 22.121094 6.746094 22.121094 7.375 21.738281 7.761719 L 16.496094 13 L 21.734375 18.242188 C 22.121094 18.628906 22.121094 19.253906 21.734375 19.640625 Z"/></svg>
        <input type="text" class="list__item-name" value="Untitled list">
        <div class="list__item-count">0</div>`;
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
    let listTitleName = document.createElement('h2');
    listTitleName.classList.add('list__item-title');
    taskDiv.append(listTitleName);
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
    taskItemsChildren = document.querySelectorAll('.task__item');
    // Если нет списков то не показыть поле добавить задачу
    if(listItemInputs.length === 0) {
        taskInputWrap.classList.add('d-none')
        makeAListBlock.classList.remove('d-none')
    }else {
        taskInputWrap.classList.remove('d-none');
        makeAListBlock.classList.add('d-none')
    }
    // Так как у нас одинаковое количество инпутов, кнопок удалить этот инпут то это все мы помещаем в один цыкл
    for(let i = 0; i < listItemInputs.length; i++) {

        listItemInputs[i].addEventListener('click', e => {
            for(let a = 0; a < taskItemsChildren.length; a++) {
                taskItemsChildren[a].style.display = 'none';
            }
            let listItemPersonalName =  e.target.parentNode.classList[1];
            taskItems.querySelector('.' + listItemPersonalName).style.display = 'block';
            localStorage.setItem('listSelectedName', listItemPersonalName);
            saveToStorage();
        })

        listItemInputs[i].addEventListener('dblclick', () => {
            listItemInputs[i].readOnly = false;
        })

        listItemInputs[i].addEventListener('keyup', e => {
            // Не даю вводить пустое значение
            if(listItemInputs[i].value === "") {
                listItemInputs[i].classList.add('wrong');
                body.style.pointerEvents = 'none';
                return false;
            }else {
                listItemInputs[i].classList.remove('wrong')
                body.style.pointerEvents = 'all';
            }

            if(e.keyCode === 13) {
                listItemInputs[i].setAttribute('value', listItemInputs[i].value );
                listItemInputs[i].blur();
                listItemInputs[i].readOnly = true;
                let listItemPersonalName = listItemInputs[i].parentNode.classList[1];
                selectedList  = taskItems.querySelector('.' + listItemPersonalName);
                let selectedListTitle = selectedList.querySelector('.list__item-title');
                selectedListTitle.innerHTML = listItemInputs[i].value;
                aside.classList.add('d-mob-none');
                menuButton.classList.remove('active');
                addTaskInput.focus();
                saveToStorage();
            }
        });

        listItemInputs[i].onblur = () => {
            // Не даю вводить пустое значение
            if(listItemInputs[i].value === "") {
                listItemInputs[i].classList.add('wrong');
                listItemInputs[i].focus();
                body.style.pointerEvents = 'none';
            }else {
                listItemInputs[i].classList.remove('wrong')
                listItemInputs[i].setAttribute('value', listItemInputs[i].value );
                listItemInputs[i].readOnly = true;
                let listItemPersonalName = listItemInputs[i].parentNode.classList[1];
                let selectedList  = taskItems.querySelector('.' + listItemPersonalName);
                let selectedListTitle = selectedList.querySelector('.list__item-title');
                selectedListTitle.innerHTML = listItemInputs[i].value;
                body.style.pointerEvents = 'all';
                saveToStorage();
            }
        };

        deleteListBtn[i].onclick = () => {
            deleteListBtn[i].parentNode.remove();
            taskItemsChildren[i].remove();
            listen();
            saveToStorage();
        }
    }
    let allTasks = document.querySelectorAll('.task input');
    for(let i = 0; i < allTasks.length; i++) {
        allTasks[i].addEventListener('dblclick', () => {
            allTasks[i].readOnly = false;
        })

        allTasks[i].addEventListener('keyup', e => {
            // Не даю вводить пустое значение
            if(allTasks[i].value === "") {
                allTasks[i].classList.add('wrong');
                body.style.pointerEvents = 'none';
            }else {
                allTasks[i].classList.remove('wrong')
                body.style.pointerEvents = 'all';
            }
            if(e.keyCode === 13) {
                allTasks[i].setAttribute('value', allTasks[i].value);
                allTasks[i].blur();
                allTasks[i].readOnly = true;
                saveToStorage();
            }
        })

        allTasks[i].onblur = () => {
            // Не даю вводить пустое значение
            if(allTasks[i].value === ""){
                allTasks[i].classList.add('wrong');
                allTasks[i].focus();
                body.style.pointerEvents = 'none';
            }else {
                allTasks[i].classList.remove('wrong')
                allTasks[i].setAttribute('value', allTasks[i].value);
                allTasks[i].readOnly = true;
                body.style.pointerEvents = 'all';
                saveToStorage();
            }
        }
    }
    let taskCheckboxes = document.querySelectorAll('.task__checkbox-input');
    let allDeleteTaskIcons = document.querySelectorAll('.delete__task-icon')
    for(let i = 0; i < taskCheckboxes.length; i++) {
        taskCheckboxes[i].onclick =  () => {
            if (taskCheckboxes[i].hasAttribute('checked')) {
                taskCheckboxes[i].removeAttribute('checked');
                taskCheckboxes[i].parentNode.nextSibling.style.textDecoration = 'none';
            }else {
                taskCheckboxes[i].setAttribute('checked', true);
                taskCheckboxes[i].parentNode.nextSibling.style.textDecoration = 'line-through';
            }
            listen();
            saveToStorage();
        };
    }

    for (let i = 0; i < allDeleteTaskIcons.length; i++) {
        allDeleteTaskIcons[i].addEventListener('click', () => {
            allDeleteTaskIcons[i].parentNode.remove();
            listItems.querySelector('.' + listSelectedName + " " + '.list__item-count').innerHTML = taskItems.querySelectorAll('.' + listSelectedName + " " + '.task').length;
            saveToStorage();
        })
    }

    addTaskInput.onkeyup = e => {
        if(e.keyCode === 13) {
            createTask(addTaskInput);
            listen();
        }
    }
    addTaskInput.onblur = () => {
        addTaskInput.classList.remove('wrong');
    }

    addTaskInput.addEventListener('keyup', e => {
        if(e.keyCode !== 13) {
            addTaskInput.classList.remove('wrong');
        }
    })
}

listen();

function createTask(e) {
    // Не даю вводить пустое значение
    if(e.value === ""){
        e.classList.add('wrong');
        return false;
    }else {
        e.classList.remove('wrong')
    }
    // Получаю список который выбран и передаю в инпут для добавление задач что бы он знал куда добавлять
    listSelectedName = localStorage.getItem('listSelectedName');
    // Создание задачи с уникальным именем
    let task = document.createElement('div');
    task.classList.add('task');
    let wrap = document.createElement('div');
    wrap.classList.add('task__wrap');
    let taskCheckbox = document.createElement('label');
    taskCheckbox.classList.add('task__checkbox');
    let inputCheckbox = document.createElement('input');
    inputCheckbox.classList.add('task__checkbox-input')
    inputCheckbox.setAttribute('type', 'checkbox');
    let checkboxCheckmark = document.createElement('span');
    checkboxCheckmark.classList.add('checkmark');
    taskCheckbox.append(inputCheckbox);
    taskCheckbox.append(checkboxCheckmark);
    let taskInput = document.createElement('input');
    taskInput.classList.add('task__value');
    taskInput.setAttribute('value', e.value);
    taskInput.readOnly = true;

    deleteTaskIcon = '<svg class="delete__task-icon" fill="#000000" width="26px" height="26px"><path d="M 21.734375 19.640625 L 19.636719 21.734375 C 19.253906 22.121094 18.628906 22.121094 18.242188 21.734375 L 13 16.496094 L 7.761719 21.734375 C 7.375 22.121094 6.746094 22.121094 6.363281 21.734375 L 4.265625 19.640625 C 3.878906 19.253906 3.878906 18.628906 4.265625 18.242188 L 9.503906 13 L 4.265625 7.761719 C 3.882813 7.371094 3.882813 6.742188 4.265625 6.363281 L 6.363281 4.265625 C 6.746094 3.878906 7.375 3.878906 7.761719 4.265625 L 13 9.507813 L 18.242188 4.265625 C 18.628906 3.878906 19.257813 3.878906 19.636719 4.265625 L 21.734375 6.359375 C 22.121094 6.746094 22.121094 7.375 21.738281 7.761719 L 16.496094 13 L 21.734375 18.242188 C 22.121094 18.628906 22.121094 19.253906 21.734375 19.640625 Z"/></svg>'
    task.append(wrap);
    wrap.append(taskCheckbox);
    wrap.append(taskInput);
    task.innerHTML += (deleteTaskIcon);
    taskItems.querySelector('.' + listSelectedName).append(task);
    // Очистка инпута после добавление задачи
    e.value = "";
    listItems.querySelector('.' + listSelectedName + " " + '.list__item-count').innerHTML = taskItems.querySelectorAll('.' + listSelectedName + " " + '.task').length;
    saveToStorage();
}

// Сохранение всего чтобы осталось после перезагрузки страницы
function saveToStorage() {
    localStorage.setItem('todoList',listItems.innerHTML);
    localStorage.setItem('taskList',taskItems.innerHTML);
}

const aside = document.querySelector('aside')
const menuButton = document.querySelector('.menu__btn');
menuButton.onclick = function openTasks() {
    if(aside.classList.contains('d-mob-none')) {
        menuButton.classList.add('active');
        aside.classList.remove('d-mob-none');
    } else {
        menuButton.classList.remove('active');
        aside.classList.add('d-mob-none');
    }
}


function openSettings() {
    // REMOVE HIDE CLASS
    const $modal = document.querySelector('.modal')
    $modal.classList.remove('hide')
}