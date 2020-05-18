import {createDOMItems} from './pageLoad.js'
import {task, project} from './item_create.js'

//         Application Logic         \\
//      DOM Elements        \\
const body = document.querySelector('body');

const mainBox = document.createElement('div');
mainBox.setAttribute('id', 'mainBox');
mainBox.innerHTML = `<h2>Main Projects</h2>`;
body.appendChild(mainBox);

const focusedBox = document.createElement('div');
focusedBox.setAttribute('id', 'focusedBox');
body.appendChild(focusedBox)

const viewBox = document.createElement('div');
viewBox.setAttribute('id', 'viewBox');
body.appendChild(viewBox) // hidden by default

//          Items           \\
let mainProjects = []

//          Tests/Inits             \\
    //      Sample Items        \\
let testItem = task({title: 'to-do', dateCompleteBy: null, priority: 'top', complete: true, description: 'your first item',});
let testNote = task({title: 'buncha', note:'hooplah', complete: true, priority:'numba1', description: 'your first note',});
const testProject = project({title:'General', children: [testItem, testNote]});
let testProjectTwo = project({title: 'who',});
mainProjects.push(testProject, testProjectTwo);

newProject(); // remove by default

    //      Add New     \\
function newProject() {
    const label = document.createElement('label');
    label.for = 'title';
    label.textContent = 'Title:';
    const title = document.createElement('input');
    title.type='text'
    title.id = 'newTitle';
    const submitButton = document.createElement('input')
    submitButton.type = 'submit';
    submitButton.value = 'Submit';

    submitButton.onclick = function() {
        const title = document.getElementById('newTitle').value;
        mainProjects.push(project({title,}))
        displayMainProjects();
        // Toggle class view viewBox on submit / exit
    }

    viewBox.appendChild(label)
    viewBox.appendChild(title)
    viewBox.appendChild(submitButton)
} 





    //      Main Box Initialize     \\
function displayMainProjects() {
    mainBox.textContent='';
    for (let project of mainProjects){
        let parentDiv = createDOMItems(mainBox, project)
    }
}
displayMainProjects();

//          Focused         \\
function displayFocusedProject() {
    focusedBox.classList.add('active');
    focusedBox.innerHTML = this.title;
    
    const editBtn = document.createElement('button')
    editBtn.classList.con

    for (let child of this.children) {
        createDOMItems(focusedBox, child);
    }
    // add display class
}

function exitFocused() {
    focusedBox.classList.remove('active');
}

displayFocusedProject.apply(testProject);


