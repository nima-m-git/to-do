const mainBox = document.createElement('div')
mainBox.setAttribute('id', 'mainBox');

const body = document.querySelector('body');


// const displayMainBox = (mainItems) => {
//     mainBox.innerHTML += '<p> Main Page </p>';
//     for (let item of mainItems){
//         mainBox.innerHTML += item.type + ':\t' + item.title + " <br> ";
//     }
//     body.appendChild(mainBox);
// }

// export {displayMainBox}

// show by default for main items, and then on expand
function createDOMItems (parentNode, item) {
    const newItemDiv = document.createElement('div');
    newItemDiv.classList += item.type;
    newItemDiv.innerHTML = '<br>' + '<b>' + item.type + ':\t' + item.title + '</b>';
    for (let property in item) {
        const newPropertyDiv = document.createElement('div');
        newPropertyDiv.classList = property;
        newPropertyDiv.innerHTML = ((typeof item[property] == 'string' /*|| typeof item[property] == 'object'*/)? property + ':\t ' + item[property] : '');
        newItemDiv.appendChild(newPropertyDiv);
    }
    parentNode.appendChild(newItemDiv);
    return parentNode
}

export {createDOMItems,}