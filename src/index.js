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

    //      Add New     \\
function newProject() {
    exitBox(viewBox);
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
        mainProjects.push(project({title: title.value,}))
        displayMainProjects();
        exitBox(viewBox);
    }

    const children = [label, title, submitButton];
    children.map(child => viewBox.appendChild(child))
} 


function newTask() {
    exitBox(viewBox);
    // function makeDOMInput({property, type, maxLength=null}){
    //     const label = document.createElement('label');
    //     const input = document.createElement('input');
    //     label.for = label.innerHTML = input.id = property;
    //     input.type = type;
    //     if (!!maxLength) { input.maxLength = maxLength}
    //     return [label, input]
    // }

    const titleLabel = document.createElement('label');
    const title = document.createElement('input');
    titleLabel.for = titleLabel.textContent = title.id = 'title';
    title.type='text';

    const descriptionLabel = document.createElement('label');
    const description = document.createElement('input');
    descriptionLabel.for = descriptionLabel.textContent = description.id = 'description';
    description.type='text';
    description.maxLength = '200';

    const dateCompleteByLabel = document.createElement('label');
    const dateCompleteBy = document.createElement('input');
    dateCompleteByLabel.for = dateCompleteByLabel.textContent = dateCompleteBy.id = 'completeBy';
    dateCompleteBy.type='date';


    const priorityLabel = document.createElement('label');
    const selectPriority = document.createElement('select');
    priorityLabel.for = priorityLabel.textContent = selectPriority.id = 'priority';
    const selections = ['Top', 'High', 'Mid', 'Low'];
    selections.map(selection => {
        const option = document.createElement('option');
        option.value = selection;
        option.textContent = selection;
        selectPriority.appendChild(option); 
    })

    const projectLabel = document.createElement('label');
    const selectProject = document.createElement('select');
    projectLabel.for = projectLabel.textContent = selectProject.id = 'project';
    mainProjects.map(project => {
        const option = document.createElement('option');
        option.value = project.id;
        option.textContent = project.title;
        selectProject.appendChild(option);
    })

    const submitButton = document.createElement('input')
    submitButton.type = submitButton.value = 'submit';

    submitButton.onclick = function() {
        const projectID = document.getElementById('project').value;
        const project = mainProjects.filter(project => project.id == projectID)[0];
        const newTask = task({
            title: title.value,
            description: description.value,
            dateCompleteBy: dateCompleteBy.value,
            priority: selectPriority.value,
        });
        project.children.push(newTask);
        displayMainProjects();
        displayFocusedProject.bind(project)();
        exitBox(viewBox);
    }

    const children = [titleLabel, title, descriptionLabel, description, dateCompleteByLabel, dateCompleteBy, priorityLabel, selectPriority, projectLabel, selectProject, submitButton];
    children.map(child => viewBox.appendChild(child));
}

function exitBox(node) {
    node.textContent = '';
}

    //      Edit        \\
function edit(){
    exitBox(viewBox);

    const jsItem = this;
    const editables = ['title', 'description', 'dateCompleteBy'];

    createDOMItems(viewBox, jsItem);
    let DOMitem = document.getElementById('viewBox').querySelector('div');

    function submitButton(){
        const btn = document.createElement('button');
        btn.textContent = 'Submit';
        btn.onclick = function() {
            editables.map(property => {
                jsItem[property] = DOMitem.querySelector(`.${property}`).textContent;
            })
            displayFocusedProject.apply(currentProject); // update focused box
            exitBox(viewBox);
        }
        DOMitem.appendChild(btn);
    }
    submitButton();
    makeEditable();

    function makeEditable(){    /// improve editability
        DOMitem.childNodes.forEach((child) => {
            editables.map(property => {
                if (child.classList.contains(property)) {
                    child.contentEditable = (child.contentEditable==true)? false : true;
                }
            })
            }
        )
    }

}


    //      Main Box Initialize     \\
function displayMainProjects() {
    mainBox.textContent='';
    for (let project of mainProjects){
        let parentDiv = createDOMItems(mainBox, project, viewBtn.bind(project));
    }
}

function viewBtn(){
    const btn = document.createElement('button');
    btn.classList = btn.textContent = 'view';
    btn.value = this.id;
    btn.onclick = displayFocusedProject.bind(this);
    return btn     
}

displayMainProjects();

let currentProject; //remove global, binds current focusedproject project to target refresh after edit
//          Focused         \\
function displayFocusedProject() {
    exitBox(focusedBox);

    const title = document.createElement('div');
    title.classList += 'title';
    title.innerHTML = this.title;
    focusedBox.appendChild(title);

    for (let child of this.children) {
        createDOMItems(focusedBox, child, editBtn.bind(child));
        
        // toggle display class
    }
    currentProject = this;
}

function editBtn(){
    const btn = document.createElement('button');
    btn.classList = btn.textContent = 'edit';
    btn.value = this.id;
    btn.onclick = edit.bind(this);
    return btn        
}




//      Event Listeners     \\
document.getElementById('newProject').addEventListener('click', newProject);
document.getElementById('newTask').addEventListener('click', newTask);


export {edit,}