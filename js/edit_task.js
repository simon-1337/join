/////////////////// PRIORITY SECTION ////////////////////

/**
 * This functions purpose is to highlight the chosen priority in the task currently edited
 * 
 * @param {int} column - position/index of the column of the task selected to be edited in boardColumns
 * @param {int} ticket - position/index of the task inside the column that is selected to be edited 
 */
function selectPrioInEditContainer(column, ticket) {
    let id = boardColumns[column][ticket]['prior']['name'];
    if (id) {
        let button = document.getElementById(id);
        let index = boardColumns[column][ticket]['prior']['prio-index']
        changePrioImageToWhite(button);
        changePrioBtnColors(button, index)    
    }
}


/////////////////// CONTACTS SECTION ////////////////////

/**
 * This function is here to render the assigned contacts & userContacts when editing a task
 * 
 * @param {int} column - position/index of the column of the task selected to be edited in boardColumns
 * @param {int} ticket - position/index of the task inside the column that is selected to be edited 
 */
function renderAlreadyAssignedContactsAndUsers(column, ticket) {
    let assignedContacts = getAssignedContacts(column, ticket);
    for (let i = 0; i < assignedContacts.length; i++) { 
        renderAlreadyAssignedContacts(column, ticket, i);
        renderAlreadyAssignedUsers(column, ticket, i)
    }
}


/**
 * This function is here to render the assigned contacts when editing a task
 * 
 * @param {int} column - position/index of the column of the task selected to be edited in boardColumns
 * @param {int} ticket - position/index of the task inside the column that is selected to be edited
 * @param {int} i - position/index of the contact currently itterated  
 */
function renderAlreadyAssignedContacts(column, ticket, i) {
    for (let j = 0; j < contacts.length; j++) {           
        //compare email of all contacts with them assigned to the task 
        if (boardColumns[column][ticket]['team'][i]['email'] == contacts[j]['email']) { 
            displayAssignedContactsAsChecked(j);
            changeDisplayInContactIconSection(contactIconArray, j); //in add_task.js -> same as if contact would have been clicked
            break
        }
    }
}    


/**
 * This function is here to render the assigned users when editing a task
 * 
 * @param {int} column - position/index of the column of the task selected to be edited in boardColumns
 * @param {int} ticket - position/index of the task inside the column that is selected to be edited
 * @param {int} i - position/index of the contact currently itterated  
 */
function renderAlreadyAssignedUsers(column, ticket, i) {
    for (let j = 0; j < usersContact.length; j++) {           
        //compare email of all contacts with them assigned to the task 
        if (boardColumns[column][ticket]['team'][i]['email'] == usersContact[j]['email']) { 
            displayAssignedUsersContactsAsChecked(j);
            changeDisplayInContactIconSection(usersContactIconArray, j); //in add_task.js -> same as if contact would have been clicked
            break
        }
    }
}


/**
 * This function adds the tasks in the JSON object one for one to a new array
 * without that we cannot use .length  (Does not work on a Json Object)
 * 
 * @param {int} column - position/index of the column of the task selected to be edited in boardColumns
 * @param {int} ticket - position/index of the task inside the column that is selected to be edited 
 * @returns 
 */
function getAssignedContacts(column, ticket) {
    let assignedContacts = [];
    for (let i = 0; i < Object.keys(boardColumns[column][ticket]['team']).length; i++) {
        assignedContacts.push(boardColumns[column][ticket]['team'][i]);
    }
    return assignedContacts;
}


/**
 * This function displays the contacts which are assigned to a task as checked in the contacts list in edit task
 * 
 * @param {int} j - index of the checkbox that needs to get checked
 */
function displayAssignedContactsAsChecked(j) {
    document.getElementById('checkbox' + j).checked = true;
}

/**
 * This function displays the userContacts which are assigned to a task as checked in the contacts list in edit task
 * 
 * @param {int} j - index of the checkbox that needs to get checked
 */
function displayAssignedUsersContactsAsChecked(j) {
    if (userContactIsLoggedIn(j)) {
        document.getElementById('checkbox-you').checked = true;
    } else {
        document.getElementById('checkboxUsers' + j).checked = true;
    }
}

/////////////////// SUBTASK SECTION ////////////////////

/**
 * This function renders and manages everything regarding the subtask section when editing a task
 * 
 * @param {int} column - position/index of the column of the task selected to be edited in boardColumns
 * @param {int} ticket - position/index of the task inside the column that is selected to be edited 
 */
function renderSubtasksInEditContainer(column, ticket) {
    let subtasks = getSubtasksFromTask(column, ticket);
    for (let i = 0; i < subtasks.length; i++) {
        addTaskToSubtaskListInEdit(subtasks[i], i);
    }
    displayCheckBoxesCorrectlyIfChecked(column, ticket);
    addDisplayNoneToSubtaskIfEmpty(subtasks);
}


/**
 * This function pushes all subtasks from a JSON object into an array
 * 
 * @param {int} column - position/index of the column of the task selected to be edited in boardColumns
 * @param {int} ticket - position/index of the task inside the column that is selected to be edited 
 * @returns - an array consisting of all subtasks assigned to a task
 */
function getSubtasksFromTask(column, ticket) {
    let subtasks = [];
    for (let i = 0; i < Object.keys(boardColumns[column][ticket]['subtasksArray']).length; i++) {
        subtasks.push(boardColumns[column][ticket]['subtasksArray'][i]);
    }
    return subtasks;
}


/**
 * This function get the container adds the subtasks to the subtask list
 * 
 * @param {string} subtask - the subtask of the current iteration (current position/i)
 * @param {int} i - the index of the subtask currently added (needed for the id of the checkbox) 
 */
function addTaskToSubtaskListInEdit(subtask, i) {
    let container = document.getElementById('subtask-list-container');
    container.innerHTML += templateSubtaskListInEdit(subtask, i);
}


/**
 * This function generates a HTML template of a list entry in the subtask list
 * 
 * @param {string} subtask - the subtask of the current iteration (current position/i)
 * @param {int} i - the index of the subtask currently added (needed for the id of the checkbox) 
 * @returns html code consisting of a list entry with a checkbox and the current subtask (string)
 */
function templateSubtaskListInEdit(subtask, i) {
    return /*html*/ `
        <li class="subtask-list-entry flex"><input id="cb-subtask-${i}" class="subtask-checkbox" type="checkbox">${subtask}</li>
    `;
}


/**
 * This function marks the checkboxes of the finished subtasks as checked
 * 
 * @param {int} column - position/index of the column of the task selected to be edited in boardColumns
 * @param {int} ticket - position/index of the task inside the column that is selected to be edited 
 */
function displayCheckBoxesCorrectlyIfChecked(column, ticket) {
    for (let i = 0; i < boardColumns[column][ticket]['subtasksArray'].length; i++) {
        if (subtaskStatusIsTrue(i, column, ticket)) {
            let checkbox = document.getElementById('cb-subtask-' + i);
            checkbox.checked = true;
        }
    }
}


/**
 * This function checks if a subtask is already finished 
 * @param {int} i - the index of the subtask within the subtasks array 
 * @param {int} column - position/index of the column of the task selected to be edited in boardColumns
 * @param {int} ticket - position/index of the task inside the column that is selected to be edited 
 * @returns a boolean value, true if the subtask is already finished
 */
function subtaskStatusIsTrue(i, column, ticket) {
    return boardColumns[column][ticket]['status-subtasks'][i];
}


/**
 * This function adds display none to the whole subtask section if there are no subtask assigned to a task
 * 
 * @param {Array} subtasks - the array holding all subtasks of a task
 */
function addDisplayNoneToSubtaskIfEmpty(subtasks) {
    if (subtasks == '') {
        document.getElementById('subtask-edit-container').classList.add('d-none');
    }
}


/////////////////// FINISH EDIT ////////////////////

/**
 * This function manages (makes the necessary function calls) to save the changes of the task editing
 * 
 * @param {int} column - position/index of the column of the task selected to be edited in boardColumns
 * @param {int} ticket - position/index of the task inside the column that is selected to be edited 
 */
async function saveChanges(columm, ticket) {
    let currentTask = boardColumns[columm][ticket];
    if (addPriotityToTask(currentTask)) {
        addInputValuesToTask(currentTask, 'title'); //in add_task.js
        addInputValuesToTask(currentTask, 'description'); //in add_task.js
        addInputValuesToTask(currentTask, 'due-date'); //in add_task.js
        addPriotityToTask(currentTask);
        pushAssignedContactsToTask(currentTask);
        pushAssignedUserContactsToTask(currentTask);
        changeSubtasksStatus(currentTask);
        renderTicketInfoPopupContainer(columm, ticket)
        await addBoard();
        taskEditted = true;
    }
}


//
/**
 * This function clears the contacts icon array which is needed to display the contacts abbreviations correctly
 */
function clearIconArray() {
    usersContactIconArray = [];
    contactIconArray = [];
    guestInIconArray = false;
}



