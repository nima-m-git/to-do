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

// newProject(); // remove by default


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
        mainProjects.push(project({title: title.value,}))
        displayMainProjects();
        // Toggle class view viewBox on submit / exit and clear contents
    }

    const children = [label, title, submitButton];
    children.map(child => viewBox.appendChild(child))
} 


function newTask() {
    const titleLabel = document.createElement('label');
    titleLabel.for = 'title';
    titleLabel.textContent = 'Title:';
    const title = document.createElement('input');
    title.type='text';
    title.id = 'title';

    const descriptionLabel = document.createElement('label');
    descriptionLabel.for = 'description';
    descriptionLabel.textContent = 'Description:';
    const description = document.createElement('input');
    description.type='text';
    description.id = 'description';
    description.maxLength = '200';

    const dateCompleteByLabel = document.createElement('label');
    dateCompleteByLabel.for = 'completeBy';
    dateCompleteByLabel.textContent = 'Complete By:';
    const dateCompleteBy = document.createElement('input');
    dateCompleteBy.type='date';
    dateCompleteBy.id = 'dateCompleteBy';

    const priorityLabel = document.createElement('label');
    priorityLabel.for = 'priority';
    priorityLabel.textContent = 'Priority:';
    const selectPriority = document.createElement('select');
    selectPriority.id = 'priority';
    const selections = ['Top', 'High', 'Mid', 'Low'];
    selections.map(selection => {
        const option = document.createElement('option');
        option.value = selection;
        option.textContent = selection;
        selectPriority.appendChild(option); 
    })

    const projectLabel = document.createElement('label');
    projectLabel.for = 'project';
    projectLabel.textContent = 'Project:';
    const selectProject = document.createElement('select');
    selectProject.id = 'project';
    mainProjects.map(project => {
        const option = document.createElement('option');
        option.value = project.id;
        option.textContent = project.title;
        selectProject.appendChild(option);
    })

    const submitButton = document.createElement('input')
    submitButton.type = 'submit';
    submitButton.value = 'Submit';
    submitButton.onclick = function() {
        const projectID = document.getElementById('project').value;
        const project = mainProjects.filter(project => project.id == projectID)[0];
        const newTask = task({
            title: title.value,
            description: description.value,
            dateCompleteBy: dateCompleteBy.value,
            priority: selectPriority.value,
        });
        console.log(newTask)
        project.children.push(newTask);
        displayMainProjects();
        displayFocusedProject.bind(project)();
    }

    const children = [titleLabel, title, descriptionLabel, description, dateCompleteByLabel, dateCompleteBy, priorityLabel, selectPriority, projectLabel, selectProject, submitButton];
    children.map(child => viewBox.appendChild(child));
}

newTask();



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
    focusedBox.innerHTML = ''
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


