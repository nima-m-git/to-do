import {edit} from './index.js'

const body = document.querySelector('body');
const mainBox = document.createElement('div')
mainBox.id = 'mainBox';

// 
function createDOMItems (parentNode, item, ...buttons) {
    const newItemDiv = document.createElement('div');
    newItemDiv.classList += item.type;
    newItemDiv.id = item.id;

    for (let property in item) {
        const newPropertyDiv = document.createElement('div');
        newPropertyDiv.classList = property;
        newPropertyDiv.innerHTML = ((typeof item[property] == 'string' /*|| typeof item[property] == 'object'*/)? item[property] : '');
        newItemDiv.appendChild(newPropertyDiv);
    }
    if (buttons){
        for (let button of buttons){
            newItemDiv.appendChild(button());
        }
    }


    parentNode.appendChild(newItemDiv);
    return newItemDiv
}


export {createDOMItems,}