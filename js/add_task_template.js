///////////////////////// CATEGORY DROPDOWN TEMPLATES ////////////////////////////////////

/**
 * This function generates the html code for the dropdown field, which is used to create a new category
 * 
 * @returns a html temlate of a row in the dropdown for the user to select to create a new category
 */
function templateDropdownNewCategory() {
    return /*html*/ `
        <span class="dropdown-content-child" onclick="changeVisibility('category-dropdown'); changeVisibilityNewCategory(); focusOnInput('new-category-input'); createNewCategoryObject()">New category</span>
    `;
}


/**
 * This function generates the html code which is used to display and select the categories in the dropdown container
 * 
 * @param {int} i -  is the indexes of the category that will be displayed (in this iteration)
 * @returns a html template of a row in the dropdown which displays the category with the current index
 */
function templateDropdownCategories(i) {
    return /*html*/ `
        <div class="dropdown-content-child" onclick="changeVisibility('category-dropdown'); selectCategory('${i}')">
            ${category[i]['name']}
            <div class="category-colors" style="background-color: ${category[i]['color']}"></div>
        </div>
    `;
}


/**
 * This function is used to generate the html code for the color selection when a new category should be created
 * 
 * @param {int} i - is the indexes of the color that will be displayed (in this iteration)
 * @returns a html template which displays the color with the current index
 */
function templateCategoryColors(i) {
    return /*html*/ `
        <div onclick="changeColorSelected(${i})" id="category-color-${i}" class="category-colors category-colors-selection-section" style="background-color: ${categoryColors[i]}"></div>
    `;
}


/**
 * This function generates the html code which is replacing the name of the dropdown field 
 * 
 * @param {int} i - index of the selected categoryObject in the category array 
 * @returns a html template which displays the name and color of the category 
 */
function templateSelectedCategoryinDropdownField(i) {
    return /*html*/ `
            ${category[i]['name']}
            <div class="category-colors" style="background-color: ${category[i]['color']}"></div>
    `;
}


///////////////////////// CONTACTS DROPDOWN TEMPLATES ////////////////////////////////////

/**
 * This function generates the html code to display and be able to select the currently logged in user
 * @returns a html template which display 'YOU' and a checkbox
 */
function templateContactsYou() {
    return /*html*/ `
        <label for="checkbox-you" class="dropdown-content-child space-between">    
                <span>You</span>
                <input value="you" name="checkbox" class="users-contacts-cb" id="checkbox-you" type="checkbox" onclick="changeDisplayInContactIconSection(${'usersContactIconArray'}, ${indexOfCurrentUser})">
        </label>
    `;
}


/**
 * This function generates the html code to display and be able to select the contact (of the current itteration)
 * 
 * @param {int} i - index of the contact in the contacts array 
 * @returns a html tmeplate which displays the name of the contact and checkbox
 */
function templateDropdownContacts(i) {
    return /*html*/ `
        <label for="checkbox${i}" class="dropdown-content-child space-between">    
                <span>${contacts[i]['name']}</span>
                <input value="${i}" name="checkbox" class="contacts-cb" id="checkbox${i}" type="checkbox" onclick="changeDisplayInContactIconSection(${'contactIconArray'}, ${i})">
        </label>
    `;
}


/**
 * This function generates the html code to display and be able to select the userContact (of the current itteration)
 * 
 * @param {int} i - index of the user in the usersContact array 
 * @returns a html tmeplate which displays the name of the user and checkbox
 */
function templateDropdownUsersContacts(i) {
    return /*html*/ `
        <label for="checkboxUsers${i}" class="dropdown-content-child space-between">    
                <span>${usersContact[i]['name']}</span>
                <input value="${i}" name="checkbox" class="users-contacts-cb" id="checkboxUsers${i}" type="checkbox" onclick="changeDisplayInContactIconSection(${'usersContactIconArray'}, ${i})">
        </label>
    `;
}


/**
 * This function generates the html code to display the selected contact (current itteration)
 * 
 * @param {int} index - the position of selected contact in the contactArray 
 * @returns a html template consisting of a div with the abbreviation of the contact in it
 */
function templateContactIconSection(contactArray, index) {
    return /*html*/ `
        <div class="contact-icon" style="background-color: ${contactArray[index]['color']}">${contactArray[index]['abbreviation']}</div>
    `;
}


/**
 * This function generates the html code to display the guest symbol if a guest is assigned to a task
 * 
 * @returns a html template consisting of the image of the guest symbol
 */
function templateGuestContactIconSection() {
    return /*html*/ `
        <img class="contact-icon-img" src="./assets/img/add-contact-icon.png">
    `;
}


/**
 * This function generates the dropdown row to select invite a new contact
 * 
 * @returns a html template with the text Invite new Contact and a img of a contact symbol
 */
function templateDropwdownInviteNewContact() {
    return /*html*/ `
        <div onclick="changeVisibilityContactSection(), focusOnInput('input-invite-contact')" class="dropdown-content-child space-between">
            <span>Invite new Contact</span>
            <img src="./assets/img/add-task-invite-icon.svg">
        </div>
    `;
}


///////////////////////// PIORITY SELECTION TEMPALTES ////////////////////////////////////

/**
 * This function generates the html code to display and be able to select the priotity (current iteration)
 * 
 * @param {int} i - index of the current priority in the priorities array 
 * @returns a html template which displays the name of the priority with index i and the image assigned to this priority
 */
function templatePrioritySelection(i) {
    return /*html*/ `
         <button type="button" class="prio-btn" id="${priorities[i]['name']}" onclick="selectPrio(${i})">
            ${priorities[i]['name']}
            <img src="${priorities[i]['image']}">
        </button>
    `;
}


///////////////////////// SUBTASK TEMPLATES ////////////////////////////////////

/**
 * This function generates the html code used to display the newly entered subtask in the subtask list
 * 
 * @param {string} subtask - the value entered in the subtask input field 
 * @returns a html template with a list item consisting of the name of the subtask and a checkbox
 */
function templateSubtaskList(subtask) {
    return /*html*/ `
        <li class="subtask-list-entry flex"><input id="cb-subtask-${task['subtasks']-1}" class="subtask-checkbox" type="checkbox">${subtask}</li>
    `;
}
