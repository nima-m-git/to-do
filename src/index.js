/* eslint-disable semi */
import { createDOMItems } from './pageLoad.js'
import { task, project } from './item_create.js'

//         Application Logic         \\
//      DOM Elements        \\
const body = document.querySelector('body')

const containerBox = document.createElement('div')
containerBox.setAttribute('id', 'containerBox')

const mainBox = document.createElement('div')
mainBox.setAttribute('id', 'mainBox')

const focusedBox = document.createElement('div')
focusedBox.setAttribute('id', 'focusedBox')

const viewBox = document.createElement('div')
viewBox.setAttribute('id', 'viewBox');

[mainBox, focusedBox, viewBox].map((box) => containerBox.appendChild(box))
body.appendChild(containerBox)


//          Items           \\
const projects = (function () {
  const addProject = (project) => {
    localStorage.setItem(project.id, JSON.stringify(project))
  }

  const removeProject = (project) => {
    localStorage.removeItem(project.id)
  }

  const currentProject = JSON.parse(localStorage.getItem('1'))

  const getMainProjects = () => Object.values(localStorage).map(project => JSON.parse(project));

  const getProject = (projectID) => JSON.parse(localStorage.getItem(projectID))

  const setCurrentProject = (project) => {
    projects.currentProject = project
  };

  const addTask = (project, task) => {
    const addedProj = getProject(project.id);
    addedProj.children.push(task);

    projects.addProject(addedProj);
  };

  const removeTask = (task) => {
    const index = projects.currentProject.children.findIndex((main) => main.id == task.id)
    projects.currentProject.children.splice(index, 1)
    projects.addProject(projects.currentProject);
  };

  return {
    getMainProjects,
    addProject,
    removeProject,
    getProject,
    currentProject,
    setCurrentProject,
    addTask,
    removeTask
  }
})()

//      Add      \\
const submitProjectButton = (title) => {
  const submitButton = document.createElement('input')
  submitButton.type = 'submit'
  submitButton.value = 'Submit'
  submitButton.onclick = function () {
    const newProject = project({ title: title.value})
    projects.addProject(newProject)
    displayMainProjects()
    exitBox(viewBox)
  };
  return submitButton
};

const newProject = () => {
  exitBox(viewBox)
  exitButton(viewBox)

  const label = document.createElement('label')
  label.for = 'title'
  label.textContent = 'Title:'
  const title = document.createElement('input')
  title.type = 'text'
  title.id = 'newTitle'

  const children = [label, title, submitProjectButton(title)]
  children.map((child) => viewBox.appendChild(child))
};

function newTask (submitButton) {
  exitBox(viewBox)
  exitButton(viewBox)
  // function makeDOMInput({property, type, maxLength=null}){
  //     const label = document.createElement('label');
  //     const input = document.createElement('input');
  //     label.for = label.innerHTML = input.id = property;
  //     input.type = type;
  //     if (!!maxLength) { input.maxLength = maxLength}
  //     return [label, input]
  // }

  const titleLabel = document.createElement('label')
  const title = document.createElement('input')
  titleLabel.for = titleLabel.textContent = title.id = 'title'
  title.type = 'text'

  const descriptionLabel = document.createElement('label')
  const description = document.createElement('textarea')
  descriptionLabel.for = descriptionLabel.textContent = description.id =
    'description'
  description.maxLength = '200'

  const dateCompleteByLabel = document.createElement('label')
  const dateCompleteBy = document.createElement('input')
  dateCompleteByLabel.for = dateCompleteByLabel.textContent = dateCompleteBy.id =
    'dateCompleteBy'
  dateCompleteBy.type = 'date'

  const priorityLabel = document.createElement('label')
  const selectPriority = document.createElement('select')
  priorityLabel.for = selectPriority.id = priorityLabel.textContent =
    'priority'
  const selections = ['Top', 'High', 'Mid', 'Low']
  selections.map((selection) => {
    const option = document.createElement('option')
    option.value = option.textContent = option.id = selection
    selectPriority.appendChild(option)
  })

  const projectLabel = document.createElement('label')
  const selectProject = document.createElement('select')
  projectLabel.id = 'projectLabel'
  projectLabel.for = projectLabel.textContent = selectProject.id = 'project'
  projects.getMainProjects().map((project) => {
    const option = document.createElement('option')
    option.value = project.id
    option.textContent = project.title
    selectProject.appendChild(option)
  })

  const children = [
    titleLabel,
    title,
    descriptionLabel,
    description,
    dateCompleteByLabel,
    dateCompleteBy,
    priorityLabel,
    selectPriority,
    projectLabel,
    selectProject,
    submitButton
  ]
  children.map((child) => viewBox.appendChild(child))
}

function submitNewTaskBtn () {
  const submitButton = document.createElement('input')
  submitButton.type = submitButton.value = 'submit'

  submitButton.onclick = function () {
    const projectID = document.getElementById('project').value
    const project = projects.getProject(projectID)

    const newTask = task({
      title: title.value,
      description: description.value,
      dateCompleteBy: dateCompleteBy.value,
      priority: priority.value
    })

    projects.addTask(project, newTask);

    displayMainProjects()// Unessecary? 
    displayFocusedProject.apply(projects.getProject(project.id))
    exitBox(viewBox)
  };
  return submitButton
}

//      Edit        \\
function edit () {
  exitBox(viewBox)
  exitButton(viewBox)

  newTask(submitEditBtn.apply(this));
  document.getElementById('title').value = this.title
  document.getElementById('description').value = this.description
  document.getElementById('dateCompleteBy').defaultValue = this.dateCompleteBy
  // set priority
  document.getElementById('project').remove()
  document.getElementById('projectLabel').remove()
}

function editBtn () {
  const btn = document.createElement('button')
  btn.classList = btn.textContent = 'edit'
  btn.value = this.id
  btn.onclick = edit.bind(this)
  return btn
}

function submitEditBtn () {
  const btn = document.createElement('input')
  btn.type = btn.value = 'submit'

  btn.onclick = function () {
    const editedTask = task({
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      dateCompleteBy: document.getElementById('dateCompleteBy').value,
      priority: document.getElementById('priority').value
    })

    Object.assign(this, editedTask, { id: this.id })
    projects.addProject(projects.currentProject)

    displayFocusedProject.apply(projects.currentProject)
    exitBox(viewBox)
  }.bind(this);
  return btn
}

//      Delete      \\
function removeTaskBtn () {
  const btn = document.createElement('button')
  btn.classList = btn.textContent = 'remove'
  btn.value = this.id
  btn.onclick = removeTask.bind(this)
  return btn
}

function removeTask () {
  exitBox(focusedBox)
  if (this.type == 'task') {
    projects.removeTask(this)
    displayFocusedProject.apply(projects.currentProject)
  } else if (this.type == 'project') {
    projects.removeProject(this)
    displayMainProjects()
  }
}

//      Main Box Initialize     \\
function displayMainProjects () {
  mainBox.textContent = ''
  for (const project of projects.getMainProjects()) {
    createDOMItems(mainBox, project, viewBtn.bind(project))
  }
}

function viewBtn () {
  const btn = document.createElement('button')
  btn.classList = btn.textContent = 'view'
  btn.value = this.id
  btn.onclick = displayFocusedProject.bind(this)
  return btn
}

//          Focused         \\
function displayFocusedProject () {
  exitBox(focusedBox);
  exitButton(focusedBox);

  const project = document.createElement('div')
  project.classList += 'title'
  project.innerHTML = this.title
  project.appendChild(removeTaskBtn.bind(this)())
  project.appendChild(completeBtn.bind(this)())
  focusedBox.appendChild(project)

  for (const child of this.children) {
    createDOMItems(
      focusedBox,
      child,
      editBtn.bind(child),
      removeTaskBtn.bind(child),
      completeBtn.bind(child)
    )
    // TODO: toggle display class
  }
  projects.setCurrentProject(this)
}

function exitBox (node) {
  node.textContent = ''
}

function exitButton (box) {
  const button = document.createElement('button')
  button.textContent = 'X'
  button.value = 'exit'
  button.onclick = () => exitBox(box)
  box.appendChild(button)
}

function completeBtn () {
  const button = document.createElement('button')
  button.textContent = 'Complete'
  button.value = 'complete'
  button.onclick = () =>
    document.getElementById(this.id).classList.toggle('complete')
  return button
}

//      Event Listeners     \\
document.getElementById('newProject').addEventListener('click', newProject)
document.getElementById('newTask').addEventListener('click', () => {
  newTask(submitNewTaskBtn())
})

//      Init        \\
displayMainProjects()

export { edit }


//      Sample Items        \\
const sampleItems = () => {
  const generalProject = project({ title: 'General' })
  const testProjectTwo = project({ title: 'who' })
  const testItem = task({
    title: 'to-do',
    dateCompleteBy: null,
    priority: 'Top',
    complete: true,
    description: 'your first item'
  })
  const testNote = task({
    title: 'buncha',
    complete: true,
    priority: 'Low',
    description: 'your first note'
  })
  generalProject.children.push(testItem, testNote);
  [generalProject, testProjectTwo].map((project) => projects.addProject(project))
}