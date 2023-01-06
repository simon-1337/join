///////////////////////// PIORITY SELECTION FUNCTIONS ////////////////////////////////////

/**
 * This function renders the dropdown container for the selection of the priority 
 */
function renderPrioritySelection() {
    let container = document.getElementById('prio-container');
    for (let i = 0; i < priorities.length; i++) {
        container.innerHTML += templatePrioritySelection(i);
    }
}


/**
 * This function is designed change the design of the priority buttons (selected/not selected)
 * 
 * @param {int} i - index of the current priority in the priorities array 
 */
function selectPrio(i) {
    changeSelectedPrioBtn(i);
    resetOtherPrioBtns(i);
}


/**
 * This function changes the design of priority button which has been clicked
 * By changing the design it gets if a button is currently selected
 * 
 * @param {int} i - index of the current priority in the priorities array 
 */
function changeSelectedPrioBtn(i) {
    let id = priorities[i]['name'];
    let button = document.getElementById(id);
    if (!button.hasAttribute('style')) {
        changePrioImageToWhite(button, i);
        changePrioBtnColors(button, i);
    } else {
        removeStyleAttributesBtn(button)
    }
}


/**
 * This function resets the design of the priority buttons which were not clicked now but selected with a click before to default
 * 
 * @param {int} i - the index of the priority (in priorities array) which is clicked 
 */
function resetOtherPrioBtns(i) {
    for (let j = 0; j < priorities.length; j++) {
        let id = priorities[j]['name'];
        let button = document.getElementById(id); 
        //i is the clicked button
        //only gets executed for the button which was selected right before button i was clicked
        if (j != i && button.hasAttribute('style')) {
            removeStyleAttributesBtn(button)
        }
    }
}


/**
 * This function is used to change the image of the priority to white 
 * 
 * @param {Element} button - The button where the image should be changed to white
 */
function changePrioImageToWhite(button) {
    button.lastElementChild.style.filter = 'brightness(0) invert(1)'   
}


/**
 * This function changes the bg-color (according to the priorityObject) and the color of the text (white) 
 * 
 * @param {Element} button - The button where the colors should be changed
 * @param {int} i - the index of the priorityObject in the priorities array
 */
function changePrioBtnColors(button, i) {
    button.style.backgroundColor = `${priorities[i]['color']}`;
    button.style.color = 'white';
}


/**
 * This function resets the design of a priority button to default
 * This is done by removing the style attribute from the button and from the image
 * 
 * @param {Element} button - The button where the style attribute should be removed (design set back to default) 
 */
function removeStyleAttributesBtn(button) {
    button.removeAttribute('style');
    button.lastElementChild.removeAttribute('style');
}


///////////////////////// SUBTASK FUNCTIONS ////////////////////////////////////

/**
 * This function function changes which part of the subtask section is visible
 */
function changeVisibilitySubtask() {
    changeVisibility('subtask-placeholder-input-ctn');
    changeVisibility('subtask-input-ctn');
}


/**
 * This function calls the function which changes which part of the subtask section is visible
 * and clears the subtask input field  
 */
function clearSubtaskInput() {
    changeVisibilitySubtask();
    clearInput('subtask-input');
}


/**
 * This function adds the entered subtask to the task currently under creation and wirtes the subtask into the list below the subtask input
 * This only happens if the input field is not empty
 */
function addSubtask() {
    let input = document.getElementById('subtask-input');
    let subtask = input.value;
    let currentTask = task; //necessary because in edit the subtasks are also displayed but from another task 
    if (!inputFieldIsEmpty(subtask)) {
        changeVisibilitySubtask();
        addSubtaskToTask(subtask);
        addTaskToSubtaskList(subtask, currentTask);
        clearInput('subtask-input')
    }
}


/**
 * This function checks if the input field is empty
 * @param {Element} input - The input field where subtasks are entered 
 * @returns a condition which is true if input field is empty
 */
function inputFieldIsEmpty(input) {
    return input == '';
}


/**
 * This function adds the new subtask to the task in creation and increases the counter (which counts how many subtasks there are) by one
 * And adds the Status false for the created subtask
 * 
 * @param {string} subtask - the value entered in the subtask input field (the name of the subtask)
 */
function addSubtaskToTask(subtask) {
    task['subtasksArray'].push(subtask);
    task['subtasks']++;
    task['status-subtasks'].push(false);
}


/**
 * This function adds the currently entered subtask to the container which displays all subtasks below the input field
 * 
 * @param {string} subtask - the value which has been entered in the subtask input field
 */
function addTaskToSubtaskList(subtask) {
    let container = document.getElementById('subtask-list-container');
    container.innerHTML += templateSubtaskList(subtask);
}


///////////////////////// BOTTOM BUTTONS SECTION ////////////////////////////////////

/**
 * This function changes the image in the clear button to a lightblue version of it 
 */
function clearImageToLightBlue() {
    let img = document.getElementById('clear-image');
    img.src = './assets/img/blue-cancel-icon.png'
}


/**
 * This function changes the image in the clear button to a darkblue version of it  
 */
function clearImageToDarkBlue() {
    let img = document.getElementById('clear-image');
    img.src = './assets/img/clear-x-icon.png'
}


/**
 * This function sets the add task form back to default
 * In add_task.html the initAddTask is called to reset everything
 * the other pages the add task pop up is closed which leads to the same effect
 */
function clearAddTask() {
    if (window.location.pathname == '/add_task.html') {
        initAddTask();
    } else {
        closeBoardAddtaskPopup()
    }
}


///////////////////////// CREATE TASK ////////////////////////////////////

/**
 * This function calls the functions necessary in regard of creating a new task 
 */
async function createTask() {
    let currentTask = task; //to be able to reuse functions in edit task
    addInputValuesToTask(currentTask, 'title');
    addInputValuesToTask(currentTask, 'description');
    addInputValuesToTask(currentTask, 'due-date');
    changeSubtasksStatus(currentTask);
    addPriotityToTask(currentTask);
    pushAssignedContactsToTask(currentTask);
    pushAssignedUserContactsToTask(currentTask);
    pushTaskToTodo();
    await addBoard();
    switchToBoard();
}


/**
 * This function adds the value of the forwarded inputfield to the task currently in creation
 * 
 * @param {Element} currentTask - the task currently in creation 
 * @param {*} identifier - the identifier(id) of the input field whichs value is added to the task in creation
 */
function addInputValuesToTask(currentTask, identifier) {
    currentTask[identifier] = document.getElementById(identifier).value;
}


/**
 * This function adds the selected priority to the task in creation
 * 
 * @param {Object} currentTask - the task currently in creation
 */
function addPriotityToTask(currentTask) {
    for (let i = 0; i < priorities.length; i++) {
        let btn = document.getElementById(priorities[i]['name']); //id of the btns equals name of the priority
        if (btn.hasAttribute('style')) {
            currentTask['prior'] = priorities[i];
        }
    }
}


/**
 * This function adds the selected contacts to task in creation
 * 
 * @param {Object} currentTask - the task currently in creation
 */
function pushAssignedContactsToTask(currentTask) {
    currentTask['team'] = []; //to make sure contacts are removed in edit when they are not anymore selected
    let checkboxes = document.querySelectorAll('.contacts-cb:checked'); //get all selected contacts checkboxes
    for (let i = 0; i < checkboxes.length; i++) {
        currentTask['team'].push(contacts[checkboxes[i].value]); //value contains and index of the contact in the object contacts
    }
}


/**
 * This function adds the selected users (either the logged in or others) to task in creation
 * 
 * @param {Object} currentTask - the task currently in creation
 */
function pushAssignedUserContactsToTask(currentTask) {
    let checkboxes = document.querySelectorAll('.users-contacts-cb:checked'); //get all selected contacts checkboxes
    for (let i = 0; i < checkboxes.length; i++) {
        if (currentUserIsSelected(checkboxes[i])) {
            addCurrentUserToTeam(currentTask)
        } else {
            currentTask['team'].push(usersContact[checkboxes[i].value]); //value contains and index of the contact in the object contacts
        }
    }
}


/**
 * This function checks if currently logged in user is also selected
 * 
 * @param {Element} checkbox - checked checkbox (current iteration)
 * @returns true if the value of the checkbox is true
 */
function currentUserIsSelected(checkbox) {
    return checkbox.value == 'you';
}


/**
 * This function adds the current user to the created task, if indexOfCurrentUser >= 0 (thus is not a guest user)
 * 
 * @param {Object} currentTask - The task which gets created 
 */
function addCurrentUserToTeam(currentTask) {
    if (indexOfCurrentUser >= 0) {
        currentTask['team'].push(usersContact[indexOfCurrentUser]);
    }
}


/**
 * This function checks if a subtask is already ticked (completed) and safes the status of each subtask in the current task
 * 
 * @param {Element} currentTask - the task currently in creation 
 */
function changeSubtasksStatus(currentTask) {
    currentTask['finished-subtasks'] = 0;
    for (let i = 0; i < currentTask['subtasksArray'].length; i++) {
        resetSubtaskStatusAndFinishCounter(currentTask, i); //to make sure if a subtask is not anymore ticked it gets reset
        let checkbox = document.getElementById('cb-subtask-' + i);
        if (checkbox.checked) {
            currentTask['status-subtasks'][i] = true;
            currentTask['finished-subtasks']++;
        }
    }
}


/**This function resets every status of the subtasks to false and reduces the subtask counter
 * Important for the case a subtask is not anymore checked
 * 
 * @param {Element} currentTask - the task currently in creation
 * @param {int} i - the position/index of the current task, to now on which position the subtask status needs to be reseted */
function resetSubtaskStatusAndFinishCounter(currentTask, i) {
    currentTask['status-subtasks'][i] = false;
}


/** This function adds the current task to todo/boardcolumns[0] */
function pushTaskToTodo() {
    boardColumns[0].push(task);
}


/**
 * This function switches to the board.html page if the current page is add task 
 */
function switchToBoard() {
    if (URLequalsAddTaskHtml()) {
        setTimeout(function (){
            window.location.href = '/board.html';     
          }, 700);
    }
}

///////////////////////// GENERAL FUNCTIONS////////////////////////////////////

/**
 * This function changes the visibility of an element
 * 
 * @param {string} id - the id of the element which visibility should be changed 
 */
function changeVisibility(id) {
    let dropdown = document.getElementById(id);
    if (dropdown.classList.contains('d-none')) {
        dropdown.classList.remove('d-none');
    } else {
        dropdown.classList.add('d-none');
    }
}


/**
 * This function sets the focus on the input field
 * 
 * @param {string} id - the id of the input field which should be focused 
 */
function focusOnInput(id) {
    document.getElementById(id).focus();
}


/**
 * This function clears the value in an input field
 * 
 * @param {string} id - the id of the input which should be cleared 
 */
function clearInput(id) {
    let elem = document.getElementById(id);
    if (elem.value != '') {
        elem.value = '';
    }
}


///////////////////////// SEND INVITE EMAIL ////////////////////////////////////
///////////////////////// NOT FUNCTIONING ////////////////////////////////////

async function sendInviteMail() {
    //event.preventDefault();
    //giveID();
    alert('Email not sent, Problems with Backend') 
    let formData = document.getElementById('input-invite-contact').value;
    let response = await actionInvite(formData);
    if(response.ok) { 
        console.log('email was send!');
    } else {
        alert('Email not send!');
    }
}

function actionInvite(formData) {
     const input = 'https://gruppe-348.developerakademie.net/join/send_invite_mail.php';
     const requestInit = {
         method: 'post',
         body: formData
     };

     return fetch(
         input,
         requestInit
         );
}