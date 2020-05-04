const listItems = document.querySelector('.list__items');
listItems.innerHTML = localStorage.getItem('todoList');

const taskItems = document.querySelector('.task__items');
taskItems.innerHTML = localStorage.getItem('taskList');

function createListDiv() {
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

function selectLastListDiv() {
    let lastListDiv = document.querySelector('.list__items .list__item:last-child input');
    lastListDiv.select();
}

function createPersonalName(e) {
    let randomCharacters = Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 4);
    let personalName = `ltm_${randomCharacters}`;
    e.classList.add(personalName);
    let taskDiv = document.createElement('div');
    taskDiv.classList.add('task__item', personalName);
    taskItems.append(taskDiv);

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
    listSelectedName = localStorage.getItem('listSelectedName');
    task = document.createElement('input');
    task.classList.add('task');
    task.setAttribute('value', e.value);
    taskItems.querySelector('.' + listSelectedName).append(task);
    e.value = "";
    saveToStorage();
}

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
// MODAL 
class Modal {
    constructor(params) {
        this.header = params.header
        this.body = params.body
        this.footer = params.footer || ''
        this.background = params.background
        this.class = params.class || ''

        this.createModal()
        document.addEventListener('DOMContentLoaded', () => {
            if(!localStorage.getItem('isShowedModal')) {
                this.open()
            } else {
            }
        })
        document.addEventListener('click', e => {
            if (e.target.className === 'modal__overlay' || e.target.className === 'modal__close__btn') {
                this.close()
            }
        })
    }

    createModal() {
        const $modal = document.createElement('div')
        $modal.classList.add('modal')
        $modal.insertAdjacentHTML('afterbegin', `
        <div class="modal__overlay">
            <div class="modal__content">
                <div class="modal__header">
                    <h1>${this.header}</h1>
                    <p class="modal__close__btn">&times;</p>
                </div>
                <div class="modal__body">
                    <p>${this.body}</p>
                </div>
                <div class="modal__footer">
                    <small>${this.footer}</small>
                </div>
            </div>
        </div>
        `)
        document.body.insertAdjacentElement('afterbegin', $modal)
        document.querySelector(".modal__content").style.background = this.background
        if(this.class) {
            document.querySelector(".modal__content").classList.add(this.class)
        }
    }
    
    close() {
        if(this.class) {
            document.querySelector('body').removeChild(document.querySelector('.modal'))
        } else {
            setTimeout(() => {document.querySelector('.modal__content').style.transform = 'translateY(-300%) translateX(-50%)'}, 100)
            document.querySelector('.modal').classList.remove('open')
            localStorage.setItem('isShowedModal', true)
        }
    }
    
    open() {
        setTimeout(() => {document.querySelector('.modal__content').style.transform = 'translateY(-50%) translateX(-50%)'}, 100)
        document.querySelector('.modal').classList.add('open')
    }
}

const modal = new Modal({
    header: 'JSWelcome',
    body: 'Hello to the todo. Here u can plan your day and anything more...',
    footer: 'By Artyom&Taras',
    background: '#fff',
})

// SETTINGS
document.addEventListener('click', e => {
    // IF USER CLICKED ON SETTING-BTN
    if(e.target.classList.contains('fa-ellipsis-v')) {
        const settings = new Modal({
            header: 'Settings',
            body: `<ul>
                <li><a class="changeBtn">Change theme</a></li>
                <li><a>Choose language</a></li>
                <li><a>Download on mobile</a></li>
            </ul>`,
            // footer: 'Find bug? Tell us email@example.com',
            background: 'lightblue',
            class: 'settings',
        })
        settings.open()
    } else if(e.target.classList.contains('changeBtn')) {
    // IF USER CLICKED ON CHANGE-BTN
        document.querySelector('body').removeChild(document.querySelector('.modal'))

        const theme = new Modal({
            header: `<ul>
                        <li class="settings__close">&larr;</li>
                        <li>Choose theme</li>
                    </ul>`,
            body: `<ul>
                <li class="choose"><div class="blue choose__color"></div><p>color</p></li>
                <li class="choose"><div class="white choose__color"></div><p>color</p></li>
                <li class="choose"><div class="black choose__color"></div><p>color</p></li>
                <li class="choose"><div class="green choose__color"></div><p>color</p></li>
            </ul>`,
            // footer: 'Find bug? Tell us email@example.com',
            background: 'lightblue',
            class: 'theme',
        })

        theme.open()
    } else if(e.target.classList.contains('settings__close')) {
        document.querySelector('body').removeChild(document.querySelector('.modal'))
        const settings = new Modal({
            header: 'Settings',
            body: `<ul>
                <li><a class="changeBtn">Change settings</a></li>
                <li><a>Choose language</a></li>
                <li><a>Download on mobile</a></li>
            </ul>`,
            // footer: 'Find bug? Tell us email@example.com',
            background: 'lightblue',
            class: 'settings',
        })
        settings.open()
    }

})
