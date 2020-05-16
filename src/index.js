

//         Application Logic         \\

    //      Item Creators       \\
const info = ({
    title, 
    dateCompleteBy = null,
    priority = null,
    complete = false,
    ...args
}) => ({
    title, 
    dateAdded: new Date(), 
    dateCompleteBy, 
    priority, 
    complete,
    ...args 
});

const item = ({...args}) => info({
    ...args, 
    type: 'item'
});

const note = ({content, ...args}) => info({
    ...args, 
    type: 'note', 
    content
});

const project = ({content, children=[], ...args}) => info({
    ...args, 
    type:'project', 
    content, 
    children});




//          Tests/Inits         \\
let testItem = item({title: 'to-do', dateCompleteBy: null, priority: 'top', complete: true});
// console.log(testItem);

let testNote = note({title: 'buncha', content:'hooplah', complete: true, priority:'numba1'});
// console.log(testNote);

let testProject = project({title:'whole bunch of', content:'hooplah'});
testProject.children=[testItem, testNote]
console.log(testProject.children);