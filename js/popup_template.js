// #### LOGOUT #### 

/**
 * Logout-Popup (Header profile onclick) 
 */
function renderHeaderMenuPopup() {
    return `<div class="header-menu-container-full absolute d-none" id="header-menu-container-full" onclick="closeHeaderMenuPopup()">
                <div class="header-menu-container absolute flex" onclick="doNotClose(event)">
                    <div class="header-menu-spacer" onclick="closeHeaderMenuPopup()"></div>
                    <div class="header-menu flex column cursor-p" onclick="closeHeaderMenuPopup()">
                        <a href="help.html" class="header-menu-item header-menu-resp">Help</a>
                        <a href="legal_notice.html" class="header-menu-item header-menu-resp">Legal notice</a>
                        <a href="javascript:logout()" class="header-menu-item">Log out</a>
                    </div>
                </div>
            </div>`;
}


// #### BOARD: TICKET ONCLICK POPUP ####
// #### TICKET INFO ####
/** 
 * Returns the ticket info popup content template 
 */
function renderTemplateTicketInfoPopupContainer(column, ticket) {
    return `
        <div class="ticket-info-popup-container column flex relative" onclick="doNotClose(event)" id="ticket-info-popup-container-${column}-${ticket}">
            <div class="ticket-info-popup-inner-container flex column h-100 w-100" id="ticket-info-popup-inner-container-${column}-${ticket}">
                <div class="ticket-info-popup-wrapper w-100 flex column" id="ticket-info-popup-wrapper"></div>
                <div class="ticket-info-popup-edit-container w-100 flex">
                    <div class="ticket-info-popup-edit flex cursor-p" onclick="renderTicketInfoEditting(${column}, ${ticket})"><img src="assets/img/pencil-white.png"></div>
                </div>
            </div>
        </div>`;
}

/** 
 * Returns the ticket-info-popup category template 
 * @param {number} column - column is the column number starting at 0
 * @param {number} ticket - ticket is the row or the ticket-number in that column 
 */
function templateTicketInfoPopupCategory(column, ticket) {
    return `<div class="ticket-info-popup-category-container flex w-100">
                <div class="ticket-info-popup-category flex">
                    <p class="h-100 cursor-d" id="ticket-info-popup-category-${column}-${ticket}">${boardColumns[column][ticket]['category']['name']}</p> 
                </div>
                <img class="ticket-info-popup-cross cursor-p" src="assets/img/popup-cross.png" onclick="closeTicketInfoPopup()">
                <img class="ticket-info-popup-backArrow cursor-p" src="assets/img/back-arraw.png" onclick="closeTicketInfoPopup()">
            </div>`;
}

/** 
 * Returns the ticket-info-popup title and description template 
 * @param {number} column - column is the column number starting at 0
 * @param {number} ticket - ticket is the row or the ticket-number in that column 
 */
function templateTicketInfoPopupTitleAndDescription(column, ticket) {
    return `<div class="ticket-info-popup-title flex">
                <p class="cursor-d">${boardColumns[column][ticket]['title']}</p>
            </div>
            <div class="ticket-info-popup-description flex">
                <p class="cursor-d">${boardColumns[column][ticket]['description']}</p>
            </div>`;
}

/** 
 * Returns the ticket-info-popup 'date, prios and assignedTo'-Team Container template 
 */
function templateTicketInfoPopupDatePrioTeam() {
    return `<div class="ticket-info-popup-date-and-prio-and-assignedTo" id="ticket-info-popup-date-and-prio-and-assignedTo"></div>`;
}

/** 
 * Returns the ticket-info-popup 'date and priority' template 
 * @param {number} column - column is the column number starting at 0
 * @param {number} ticket - ticket is the row or the ticket-number in that column 
 */
function templateTicketInfoPopupDateAndPrio(column, ticket) {
    return `<div class="ticket-info-popup-date flex">
                <p class="cursor-d">Due date:</p>
                <p class="cursor-d">${boardColumns[column][ticket]['due-date']}</p>
            </div>
            <div class="ticket-info-popup-prio flex">
                <p class="cursor-d">Priority:</p>
                <div class="ticket-info-popup-prio-wrapper flex" id="ticket-info-popup-prio-${column}-${ticket}">
                    <p class="cursor-d">${boardColumns[column][ticket]['prior']['name']}</p>
                    <img class="ticket-info-popup-prio-image" id="ticket-info-popup-prio-image-${column}-${ticket}" src="${boardColumns[column][ticket]['prior']['image']}">
                </div>
            </div>`;
}

/** 
 * Returns the ticket-info-popup 'assignedTo' template 
 * @param {number} column - column is the column number starting at 0
 * @param {number} ticket - ticket is the row or the ticket-number in that column 
 */
function templateTicketInfoPopupAssignedTo(column, ticket) {
    return `<div class="ticket-info-popup-assignedTo flex column" id="ticket-info-popup-assignedTo-${column}-${ticket}">
                <p class="cursor-d">Assigned To:</p>
            </div>`;
}


// #### TICKET INFO EDITTING ####

/** 
 * This function generates the HTML for the container to edit a task
 * @param {int} column - position/index of the column of the task selected to be edited in boardColumns
 * @param {int} ticket - position/index of the task inside the column that is selected to be edited 
 * @returns a html template for the edit container (in board.js to edit a task) 
 */
function templateTicketEditing(column, ticket) {
    return /*html*/`<form class="add-task-form-style-board-wrapper column flex" onsubmit="saveChanges(${column}, ${ticket}); return false">      
                        <div class="add-task-form-style-board" id="add-task-form-style-board"></div>
                        <div class="create-task-btn-container-edit">
                            <button class="flex add-task-btn create-btn">
                                Ok
                                <img src="./assets/img/check-small.png">
                            </button>     
                        </div>
                    </form>`;
}

// Addtask-Form in Board Column Main Sections
/** 
 * Returns the ticket-editing 'title and description' template
 * @param {number} column - column is the column number starting at 0
 * @param {number} ticket - ticket is the row or the ticket-number in that column 
 */
function templateAddTaskFormInBoardTitleDescription(column, ticket) {
    return `<div class="add-task-column-left-child flex column">
                <span class=>Title</span>
                <input type="text" value="${boardColumns[column][ticket]['title']}" id="title" required class="add-task-input margin-bottom-24" placeholder="Enter a title">
            </div>
            <div class="add-task-column-left-child flex column">
                <span class=>Description</span>
                <textarea name="description" id="description" placeholder="Enter a description" class="add-task-textarea margin-bottom-24">${boardColumns[column][ticket]['description']}</textarea>
            </div>`;
}

/** 
 * Returns the ticket-editing 'due date and priority' template
 * @param {number} column - column is the column number starting at 0
 * @param {number} ticket - ticket is the row or the ticket-number in that column 
 */
function templateAddTaskFormInBoardDuedatePrio(column, ticket) {
    return `<div class="w-100 flex column">
                <span>Due Date</span>
                <input type="date" id="due-date" value="${boardColumns[column][ticket]['due-date']}" class="add-task-input margin-bottom-24" min="2022-10-01" max="2030-12-31">
            </div>
            <div class="w-100 flex relative column">
                <span>Prio</span>
                <div class="add-task-prio-container margin-bottom-24" id="prio-container"></div>
                <span id="prio-error" class="prio-error-edit d-none ">Please select a Priority!</span>
            </div>`;
}

/** 
 * Returns the ticket-editing 'assignedTo section' template 
 */
function templateAddTaskFormInBoardAssignedToSection() {
    return `<div class="add-task-column-left-child flex column margin-bottom-24" id="add-task-column-left-child"></div>`;
}

/** 
 * Returns the ticket-editing 'subtasks' template 
 */
function templateAddTaskFormInBoardSubtasks() {
    return `<div class="w-100 flex column" id="subtask-edit-container">
                <span>Subtasks</span>
                <ul class="flex column" id="subtask-list-container"></ul>
            </div>`;
}

// Addtask-Form in Board Column inner-Sections
/** 
 * Returns the ticket-editing 'dropdown container' template 
 */
function templateAddTaskFormInBoardDropDownContainer() {
    return `<span class=>Assigned to</span>
            <div class="dropdown-container" id="dropdown-container"></div>`;
}

/** 
 * Returns the ticket-editing 'contacts icon and warning sign' template 
 */
function templateAddTaskFormInBoardContactsiconWarning() {
    return `<div id="contacts-icon-section" class="flex"></div>
            <span class="d-none warning" id="guest-warning">Guest is not added to the task!</span>`;
}

// Addtask-Form in Board Column dropdown-Sections
/** 
 * Returns the ticket-editing 'dropdown contacts' template 
 */
function templateAddTaskFormInBoardDropdownContacts() {
    return `<div class="dropdown" id="contacts-dropdown-ctn" onclick="changeVisibility('contacts-dropdown')">
                <span>Select contacts to assign</span>
                <img src="./assets/img/vector_2.png">
            </div>
            <div class="dropdown-content max-height-176 auto d-none" id="contacts-dropdown"></div>`;
}

/** 
 * Returns the ticket-editing 'input container' template 
 */
function templateAddTaskFormInBoardInputContainter() {
    return `<div class="input-container d-none" id="invite-contact-ctn">
                <input class="w-100 subtask-input" id="input-invite-contact" type="email" placeholder="Contact email">
                <div class="flex">
                    <img src="./assets/img/add_task_cancel.png" class="icon-subtask" onclick="changeVisibilityContactSection()">
                    |
                    <img src="./assets/img/add_task_check.png" class="icon-subtask" onclick="changeVisibilityContactSection(), sendInviteMail(event)">
                </div>
            </div>`;
}


//#### CREATED TASK ANIMATION ####

/** 
 * This function generate the HTML code for the pop up when a task is created
 * @returns a html template for the pop up that the Task was added to the board 
 */
function templateCreatedTaskPopUp() {
    return /*html*/ `
        <div class="pop-up-created-task absolute-centered flex" id="pop-up-created-task">
            <span>Task added to board</span>
            <img src="./assets/img/board-nav-icon.png">
        </div>
    `;
}


//#### BOARD: ADD-TASK POPUP ####

/** 
 * Returns the main addtask popup template 
 */
function renderTemplateBoardAddtaskPopup() {
    return `
    <div class="board-addtask-popup-full flex absolute d-none" id="board-addtask-popup-full" onclick="closeBoardAddtaskPopup()">
        <div class="board-addtask-popup flex relative" id="board-addtask-popup" onclick="doNotClose(event)"></div>
    </div>`;
}

/** 
 * Returns the addtask popup template 
 */
function templateBoardAddtaskPopup() {
    return `<div class="board-addtask-popup-header-resp w-100" id="board-addtask-popup-header-resp">
                <img class="board-addtask-popup-header-resp-image" src="assets/img/logo-big2.png">
                <button form="myform" value="update" class="board-addtask-popup-header-resp-create-btn cursor-p flex">
                    Create
                    <img src="./assets/img/check-small.png">
                </button>
            </div>
            <div class="board-addtask-popup-content w-100 h-100 relative" id="board-addtask-popup-content-container">
                <img class="board-addtask-popup-cross cursor-p fixed" onclick="closeBoardAddtaskPopup()" src="assets/img/popup-cross.png">
                <div w3-include-html="./assets/templates/task_form.html" class="content-container" id="board-addtask-popup-content"></div>    
            </div>`;
}


//#### CONTACT: CONTACT INFO POPUP (ONLY RESPONSIVE) ####

/** 
 * Returns the contact-info main wrapper (in responsive view).
 * @param {number} member - member is the index of a contact in the 'contacts' array 
 */
function templateContactInfoPopupResp(member) {
    return `<p class="header-title-resp cursor-d">Kanban Project Management Tool</p>
            <div class="contact-info-popup-resp-wrapper">
                <div class="contact-info-popup-resp-inner-wrapper column flex" id="contact-info-popup-resp-inner-wrapper"></div>
                <div class="contact-info-popup-resp-pencil-wrapper flex">
                    <img class="cursor-p" src="assets/img/pencil-white.png" onclick="setContactValuesForEditting(${member});openContactsNewContactPopup(${member})">
                </div>
            </div>`;
}

/** 
 * Returns the inner wrapper of the contact-info popup template (in responsive view). 
 */
function templateContactInfoPopupRespInnerWrapper() {
    return ` <div class="contact-info-popup-resp-title column flex"> 
                <div class="contact-info-popup-resp-title-without-line column flex"> 
                    <div class="contact-info-popup-resp-title-head flex"> 
                        <p>Contacts</p> 
                        <img class="cursor-p" src="assets/img/back-arraw.png" onclick="closeContactInfoPopupResponsive()"> 
                    </div> 
                    <p>Better with a team</p> 
                </div> 
                <img src="assets/img/linehorizontal.png"> 
            </div> 
            <div class="contact-info-popup-resp-contactInfo column flex" id="contact-info-popup-resp-contactInfo"></div>`;
}


//#### CONTACT: NEW CONTACT BTN - POPUP ####

/** 
 * Return the 'new contact' popup template in contacts.html. 
 */
function templateContactsNewContactPopup() {
    return `<div class="contacts-new-contact-popup-full flex absolute d-none" id="contacts-new-contact-popup-full" onclick="closeContactsNewContactPopup()">
                    <div class="contacts-new-contact-popup-container relative" id="contacts-new-contact-popup-container" onclick="doNotClose(event)"></div>
            </div>`;
}

/** 
 * Return the 'new contact' or 'edit contact' popup template. 
 */
function templateNewContactPopup() {
    return `<div class="contacts-new-contact-popup flex w-100 h-100" id="contacts-new-contact-popup"></div>`;
}

/** 
 * Return the "title and logo" template in the'new contact' or 'edit contact' popup template 
 */
function templateNewContactTitleAndLogo() {
    return `<div class="contacts-new-contact-popup-darkside-title-and-logo flex column">
                <div class="contacts-new-contact-popup-darkside-title-and-logo-container flex column">
                    <img src="assets/img/logo-big.png">
                    <p class="contacts-new-contact-popup-title d-none" id="contacts-new-contact-popup-title">Add contact</p>
                    <p class="contacts-new-contact-popup-title d-none" id="contacts-add-contact-popup-title">Edit contact</p>
                    <div class="contacts-new-contact-popup-subtitle-container d-none flex column w-100" id="contacts-new-contact-popup-subtitle-container">
                        <p class="contacts-new-contact-popup-subtitle">Tasks are better with a team!</p>
                        <img src="assets/img/underline.png">
                    </div>
                </div>
            </div>`;
}

/** 
 * Return the "form side" template in the'new contact' or 'edit contact' popup template 
 */
function templateNewContactPopupFormSide() {
    return `<div class="contacts-new-contact-popup-form-side relative flex" id="contacts-new-contact-popup-form-side"></div>`;
}

/** 
 * Return the "abbreviation" template in the'new contact' or 'edit contact' popup template 
 */
function templateNewContactPopupAbbreviationWrapper() {
    return `<div class="contacts-new-contact-popup-abbreviation-wrapper flex">
                <div class="contacts-new-contact-popup-abbreviation d-none" id="contacts-new-contact-abbreviation">
                    <img class="new-contact-popup-profil-icon" src="assets/img/add-contact-icon.png">
                </div>
                <div class="contacts-new-contact-popup-abbreviation new-contact-popup-profil-icon d-none" id="contacts-new-contact-abbreviation-existing-user"></div>
            </div>`;
}

/** 
 * Return the "form" template in the'new contact' or 'edit contact' popup template 
 */
function templateNewContactPopupForm() {
    return `<div class="contacts-new-contact-popup-form flex">
                <form class="w-100" id="contacts-new-contact-popup-form-tag" onsubmit="creatingOrSavingContact(); return false">
                    <div class="contacts-new-contact-popup-form-container flex column" id="contacts-new-contact-popup-form-container"></div>
                </form>
            </div>`;
}

/**
 *  Return the "form inputs" template in the'new contact' or 'edit contact' popup template 
 */
function templateNewContactPopupFormInputs() {
    return `<div class="contacts-new-contact-popup-form-inputs-container flex column">
                <div class="contacts-new-contact-popup-form-name flex">
                    <input type="text" id="name" name="name" placeholder="Name" required>
                    <img src="assets/img/add-contact-name-icon.png">
                </div>
                <span id="name-error" class="error d-none">Please enter your name and surname!</span>
                <div class="contacts-new-contact-popup-form-email flex">
                    <input type="email" id="email" name="email" placeholder="Email" required>
                    <img src="assets/img/add-contact-email-icon.png">
                </div>
                <div class="contacts-new-contact-popup-form-phone flex">
                    <input type="number" id="phone" name="phone" placeholder="Phone" required>
                    <img src="assets/img/add-contact-phone-icon.png">
                </div>
            </div>`;
}

/** 
 * Return the "form btns" template in the'new contact' or 'edit contact' popup template 
 */
function templateNewContactPopupFormBtns() {
    return `<div class="contacts-new-contact-popup-form-btns flex" id="contacts-new-contact-popup-form-btns">
                <div class="new-contact-popup-form-btn-cancel cursor-p flex d-none" id="new-contact-popup-form-btn-cancel" onmouseover="changeColorOfContactsNewContactBtnCancelToLightblue()" onmouseout="changeColorOfContactsNewContactBtnCancelToBlack()" onclick="closeContactsNewContactPopup()">
                    <p>Cancel</p>
                    <img class="new-contact-form-btn-cancel-cross-black" id="new-contact-form-btn-cancel-cross-black" src="assets/img/add_task_cancel.png">
                    <img class="new-contact-form-btn-cancel-cross-blue d-none" id="new-contact-form-btn-cancel-cross-blue" src="assets/img/blue-cancel-icon.png">
                </div>
                <button class="new-contact-popup-form-btn-create cursor-p flex d-none" id="new-contact-popup-form-btn-create">
                    <p>Create contact</p>
                    <img src="assets/img/check-small.png"> 
                </button>
                <button class="edit-contact-popup-form-btn-save cursor-p flex d-none" id="edit-contact-popup-form-btn-save">
                    <p>Save</p>
                </button>
            </div>`;
}


/**
 *  Return the close cross in the 'new contact' or 'edit contact' popup template. 
 */
function templateNewContactCloseCross() {
    return `
        <img class="board-addtask-popup-cross cursor-p absolute" id="new-contact-popup-cross" onclick="closeContactsNewContactPopup()" src="assets/img/popup-cross.png">`;
}

/** 
 * That function shows the contact abbreviation when editting the contact in the edit-form popup. 
 * @param {number} index - index of that contact in the array 'contacts'. 
 */
function renderTemplateAbbreviationWrapperOfExistingUser(index) {
    document.getElementById(`contacts-new-contact-abbreviation-existing-user`).innerHTML = `
        <div class="contacts-new-contact-popup-abbreviation-container flex w-100 h-100" id="contacts-new-contact-popup-abbreviation-container">
            <p class="flex">${contacts[index]['abbreviation']}</p>
        </div>`;    
}


//#### CONTACT: CONTACT CREATED POPUP ####

/** 
 * This function generate the HTML code for the pop up when a contact is created
 * @returns a html template for the pop up that the contact was added to contacts 
 */
function templateCreatedContactPopup() {
    return `<div class="pop-up-created-contact-full absolute flex d-none" id="pop-up-created-contact-full">
                <div class="pop-up-created-contact flex" id="pop-up-created-contact">
                    <span class="contact-is-created-popup d-none" id="contact-is-created-popup">Contact succesfully created</span>
                    <span class="contact-is-not-created-popup d-none" id="contact-is-not-created-popup">A user or contact with this Email adress already exists</span>
                </div>
            </div>`;
}