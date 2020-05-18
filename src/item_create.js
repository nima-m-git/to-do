//      Item Creators       \\
let id = 0;
const generateID = () => ++id;

const info = ({
    title, 
    ...args
}) => ({
    id: generateID(),
    title,
    dateAdded: new Date(), 
    ...args 
});


const task = ({
    description = '', 
    dateCompleteBy = null, 
    priority = null,
    complete = false,
    ...args
}) => info({
    ...args, 
    type: 'Task',
    description, 
    dateCompleteBy,
    priority, 
    complete,
    completeTask() {
        this.complete = (this.complete==false)? true : false
    },
});


const project = ({
    children=[], 
    ...args
}) => info({
    ...args, 
    type:'project', 
    children,
});

export {task, project}