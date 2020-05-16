

//         Application Logic         \\
const item = ({
    title, 
    dateCompleteBy=null, 
    priority=null, 
    complete=false
} ={}) => {
    const dateAdded = new Date();
    const type = () => 'item';
    return {title, dateAdded, dateCompleteBy, priority, complete, type}
}

const note = ({
    title, 
    dateCompleteBy=null, 
    priority=null, 
    complete=false, 
    content
} = {}) => {
    const dateAdded = new Date();
    const type = () => 'note';
    const prototype = item({title, dateCompleteBy, priority, complete,});
    return Object.assign({}, prototype, {type, content})
}

const project = ({
    title, 
    dateCompleteBy=null, 
    priority=null, 
    complete=false, 
    content
} ={}) => {
    const dateAdded = new Date();
    let children = [];
    const type = () => 'project';
    const prototype = note({title, dateCompleteBy, priority, complete, content});
    return Object.assign({}, prototype, {type, children})
}


//          Tests/Inits         \\
let testItem = item({title: 'to-do'});
console.log(testItem);

let testNote = note({title: 'buncha', content:'hooplah'});
console.log(testNote.content);

let testProject = project('whole bunch of', 'hooplah')
testProject.children=[testItem, testNote]
console.log(testProject.children);