import {createDOMItems} from './pageLoad.js'

//         Application Logic         \\

    //      Item Creators       \\
const info = ({
    title, 
    description = '',
    dateCompleteBy = null,
    priority = null,
    complete = false,
    ...args
}) => ({
    title,
    description, 
    dateAdded: new Date(), 
    dateCompleteBy, 
    priority, 
    complete,
    completeTask: function() {
        this.complete = (this.complete==false)? true : false},
    ...args 
});


const item = ({...args}) => info({
    ...args, 
    type: 'item'
});

const note = ({content, ...args}) => info({
    ...args, 
    type: 'note', 
    content,
});

const project = ({content, children=[], ...args}) => info({
    ...args, 
    type:'project', 
    content, 
    children,
});


//          Items           \\
let mainProjects = []


//          Tests/Inits         \\
let testItem = item({title: 'to-do', dateCompleteBy: null, priority: 'top', complete: true});
let testNote = note({title: 'buncha', content:'hooplah', complete: true, priority:'numba1'});
let testProject = project({title:'General', description:'Your general tasks', children: [testItem, testNote]});
let testProjectTwo = project({title: 'who', description: 'datboi'});


const body = document.querySelector('body');
const mainBox = document.createElement('div')
mainBox.setAttribute('id', 'mainBox');
mainBox.innerHTML = `<h2>Main Projects</h2>`;

mainProjects.push(testProject, testProjectTwo);



//          Main Box Initialize         \\
    //      Projects        \\
function displayMainProjects() {
    for (let project of mainProjects){
        createDOMItems(mainBox, project)
    }
}

const updateMainScreen = () => {
    displayMainProjects();
    body.appendChild(mainBox);
}

updateMainScreen();
