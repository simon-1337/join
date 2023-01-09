let categoryObject;
let contactIconArray = []; //safes the indexes/positions of the seleceted Contacts in the contacts array
let usersContactIconArray = [];
let guestInIconArray = false;




/**
 * This function is used to initialize the AddTask page and the AddTask form in the board page
 */
async function initAddTask() {
    renderResponsiveHeaderTitle(); //in script.js
    await includeHTML();
    clearTask();
    renderAddTask();
}


/**
 * This function create/clears the template task which gets filled during the creation of a task
 */
function clearTask() {
    task = { 
        'category': [],
        'title': '',
        'description': '',
        'process': 0,
        'subtasks': 0,
        'finished-subtasks': 0,
        'status-subtasks': [],
        'subtasksArray': [],
        'team': [],
        'prior': '',
        'board': 0,
        'due-date': '',
    };
}


/**
 * This function is used to include the AddTask template form
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "assets/templates/task_form.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML += await resp.text();
        } else {
            element.innerHTML += 'Page not found';
        }
    }
}


/**
 * This function renders the elements in the add task form
 */
async function renderAddTask() {
    renderCategoryDropdown();
    renderCategoryColorSelection();
    renderContactsDropdown();
    renderPrioritySelection();
    changeClearToCancel();
    changeDateToToday();
}


/**
 * This function changes the span in the clear button in the task form from clear to cancel, if the current page is not add_task.html
 */
function changeClearToCancel() {
    if (!URLequalsAddTaskHtml()) {
        document.getElementById('clear-btn-string').innerHTML = 'Cancel';
    }
}


///////////////////////// CATEGORY DROPDOWN FUNCTIONS ////////////////////////////////////

/**
 * This function renders the dropdown container for the categories 
 */
function renderCategoryDropdown() {
    let id = 'category-dropdown';
    let dropdown = document.getElementById(id);
    dropdown.innerHTML = templateDropdownNewCategory();
    for (let i = 0; i < category.length; i++) {
        dropdown.innerHTML += templateDropdownCategories(i);
    }  
}


/**
 * This function is used to render the color selection, when a new category should be created
 * Every category needs to be assigned to a color
 */
function renderCategoryColorSelection() {
    let container = document.getElementById('category-color-selection-ctn');
    container.innerHTML = '';
    for (let i = 0; i < categoryColors.length; i++) {
        container.innerHTML += templateCategoryColors(i);
    }
}

/**
 * This function is executed to change the selected color for the new category and
 * to visually signal which color is selected
 * 
 * @param {int} i - index of the color that has been selected for the category 
 */
function changeColorSelected(i) {
    changeClassOfClickedElem(i);
    changeColorInCategoryObject(i);
    removeClassOfPriorClickedElem(i);
}

/**
 * This function changes the way the clicked element is displayed to communicate if it is selected or not
 * This is done by checking if the element already contains the class 'category-colors-selected'
 * If YES the class is removed
 * If NO the class is added
 * 
 * @param {int} i - index of the color clicked at creating a new category 
 */
function changeClassOfClickedElem(i) {
    let elemID = document.getElementById('category-color-' + i)
    if (elemID.classList.contains('category-colors-selected')) {
        elemID.classList.remove('category-colors-selected');
    } else {
        elemID.classList.add('category-colors-selected');
    }
}

/**
 * This function is used to correctly save the selected color in the new categoryObject
 * If color is already in the categoryObject, the click should remove the color; else add the color
 * 
 * @param {int} i - index of the color which is either added to the categoryObject or removed
 */
function changeColorInCategoryObject(i) {
    if (categoryObject['color'] == categoryColors[i]) {
        categoryObject['color'] = '';
    } else {
        categoryObject['color'] = categoryColors[i];
    }
}

/**
 * This function removes the class 'category-colors-seleceted' from the earlier selected color
 * Necessary for the case that the user is changing which color the new category should have
 *  
 * @param {int} i - index of the color clicked at creating a new category 
 */
function removeClassOfPriorClickedElem(i) {
    for (let j = 0; j < categoryColors.length; j++) {
        let color = document.getElementById('category-color-' + j)
        // i!=j because otherwise you would instantly remove the class from the element you just selected
        //true for the elem which was clicked before the current selection
        if (i != j && color.classList.contains('category-colors-selected')) {
            color.classList.remove('category-colors-selected');
        }
    } 
}


/**
 * This function is used to remove the class which signals which color has been selected at creating a new category
 * Gets executed when the creation of a new category is cancelled
 */
function removeClassFromSelectedColor() {
    for (let j = 0; j < categoryColors.length; j++) {
        let color = document.getElementById('category-color-' + j)
        if (color.classList.contains('category-colors-selected')) { 
            color.classList.remove('category-colors-selected');
        }
    } 
}


/**
 * This function is used to open or close the new category input and corresponding color selection
 */
function changeVisibilityNewCategory() {
    clearInput('new-category-input');
    changeVisibility('category-dropdown-field');
    changeVisibility('new-category-input-ctn');
    changeVisibility('category-color-selection-ctn');
}


/**
 * This function adds the newly created category to the category array and saves it in the database
 */
function addNewCategory() {
    if (BothValuesAreEntered()) {
        addCategoryNameToCategoryObject()
        pushCategoryObjectToCategoryArray()
        renderCategoryDropdown();
        changeVisibilityNewCategory();
        selectCategory(category.length - 1);
    } else {
        alert("Please select a color and type in a category name!")
    }
}


/**
 * This function checks if both values of the categoryObject are entered when creating a new category
 * @returns either true or nothing
 */
function BothValuesAreEntered() {
    let categoryInput = document.getElementById('new-category-input').value;
    if (categoryInput != '' && categoryObject['color'] != '') {
        return true
    }
}


/**
 * This function adds the value entered in the new category input field to the categoryObject
 */
function addCategoryNameToCategoryObject() {
    categoryObject['name'] = document.getElementById('new-category-input').value;
}


/**
 * This function adds the newly created category to the category array
 */
function pushCategoryObjectToCategoryArray() {
    category.push(categoryObject);
    saveCategoriesOnServer();
}


/**
 * This function saves the category array in the database on the server
 */
function saveCategoriesOnServer() {
    backend.setItem('category', JSON.stringify(category));
}


/**
 * This function creates/resets the category object as an empty template which can then be filled with the entered data
 */
function createNewCategoryObject() {
    categoryObject = {
        'name': '',
        'color': ''
    };
}


/**
 * This function is used when a user selects a category
 * It changes the text which is shown in the dropdown field and adds the category to the task which gets currently created
 * 
 * @param {int} i - index of the selected categoryObject in the category array
 */
function selectCategory(i) {
    changeCategoryDropdownText(i)
    addCategoryToTask(i)
}


/**
 * This function is changing the text in the dropdown box (normally: Select a category) into the name of the selected category
 * 
 * @param {int} i - index of the selected categoryObject in the category array  
 */
function changeCategoryDropdownText(i) {
    let dropdown = document.getElementById('dropdown-text-category');
    dropdown.innerHTML = templateSelectedCategoryinDropdownField(i);
}


/**
 * This function is used to add the selected category to the task in creation
 * 
 * @param {int} i - index of the selected categoryObject in the category array 
 */
function addCategoryToTask(i) {
    task['category'] = category[i];
}


///////////////////////// CONTACTS DROPDOWN FUNCTIONS ////////////////////////////////////

/**
 * This function renders the dropdown container for the contacts selection
 */
function renderContactsDropdown() {
    let dropdown = document.getElementById('contacts-dropdown');
    dropdown.innerHTML = templateContactsYou();
    for (let i = 0; i < contacts.length; i++) {
        dropdown.innerHTML += templateDropdownContacts(i);
    }
    for (let i = 0; i < usersContact.length; i++) {
        if (!userContactIsLoggedIn(i)) {
            dropdown.innerHTML += templateDropdownUsersContacts(i);
        }
    }
    dropdown.innerHTML += templateDropwdownInviteNewContact();  
}

/**
 * This function checks if the user of the current iteration is logged in
 * 
 * @param {int} i - index of the current iteration of usersContact 
 * @returns boolean value (True if the usersContact on the position i is the logged in user)
 */
function userContactIsLoggedIn(i) {
    return i == indexOfCurrentUser;
}


/**
 * This function displays the initials of a contact below the contacts dropdown when the contact is selected
 * Or it removes the initials from being displayed if the selection of the contact is removed
 * 
 * @param {Array} iconArray - the array in which the indexes of the selected users/contacts are save (can either be contacts or usersContact)
 * @param {int} i - index of the clicked contact 
 */
function changeDisplayInContactIconSection(iconArray, i) {
    if (!(i >= 0)) {
        changeGuestUserInIconArray();
        displayGuestWarning();
    } else {
        let index = iconArray.indexOf(i);
        if (ContactIsAlreadyInArray(index)) {
            removeFromIconArray(iconArray, index);
        } else {
            addToContactsIconArray(iconArray, i);
        }
    }
    renderContactIconSection();
}    


/**
 * This function changes if the guest warning is displayed or not 
 */
function displayGuestWarning() {
    let warning = document.getElementById('guest-warning'); 
    if (warning.classList.contains('d-none')) {
        warning.classList.remove('d-none');
    } else {
        warning.classList.add('d-none');
    }
}


/**
 * This function changes the boolean value, if the  guestuser should be in the iconArray or not 
 */
function changeGuestUserInIconArray() {
    if (guestInIconArray == false) guestInIconArray = true;
    else guestInIconArray = false;
}


/**
 * This function checks if the Contact is already in the ContactsIconArray by checking if the index is greater -1
 * 
 * @param {int} index - index of the contact in the contactIconArray \ -1 if the contact is not in the array  
 * @returns true if index > -1
 */
function ContactIsAlreadyInArray(index) {
    return index > -1;
}

/**
 * This function removes the value at the position index from the contactIconArray
 * 
 * @param {int} index - position of the value that should be removed from contactsIconArray 
 */
function removeFromIconArray(iconArray, index) {
    iconArray.splice(index, 1); 
}


/**
 * This function adds i to the iconArray (either usersContactIconArray or contactIconArray)
 * 
 * @param {Array} iconArray - the Array in which the index is pushed (either usersContactIconArray or contactIconArray)
 * @param {int} i - is the index/position of the selected contactObject in the contactsArray
 */
function addToContactsIconArray(iconArray, i) {
    iconArray.push(i);
}


/**
 * This function renders the section where the initials of the selected contacts are displayed
 */
function renderContactIconSection() {
    let container = document.getElementById('contacts-icon-section');
    container.innerHTML = '';
    renderGuestUserInIconSection(container);
    renderContactsInIconSection(container);
    renderUsersContactsInIconSection(container);
}


/**
 * This function renders the contacts icons in the icon section, for the selected contacts
 * 
 * @param {Element} container - div container which displays the icons of the selected contacts 
 */
function renderContactsInIconSection(container) {
    for (let i = 0; i < contactIconArray.length; i++) {
        let contactIndex = contactIconArray[i] //the contactIonArray holds the indexes of the selected contacts
        container.innerHTML += templateContactIconSection(contacts, contactIndex);
    }
}


/**
 * This function renders the user icons in the icon section, for the selected users
 * 
 * @param {Element} container - div container which displays the icons of the selected contacts 
 */
function renderUsersContactsInIconSection(container) {
    for (let i = 0; i < usersContactIconArray.length; i++) {
        let contactIndex = usersContactIconArray[i] //the contactIonArray holds the indexes of the selected contacts
        container.innerHTML += templateContactIconSection(usersContact, contactIndex);
    }
}


/**
 * This function renders the guest user icon in the icon section, if the variable guestInIconArray is true
 * 
 * @param {Element} container - div container which displays the icons of the selected contacts 
 */
function renderGuestUserInIconSection(container) {
    if (guestInIconArray) {
        container.innerHTML += templateGuestContactIconSection();
    }
}


/**
 * This function changes the visibility of the elements in the contact section when:
 *      - invite new contact is selected
 *      - the invitation of a contact was fulfilled or canceled
 */
function changeVisibilityContactSection() {
    clearInput('input-invite-contact')
    changeVisibility('invite-contact-ctn');
    changeVisibility('contacts-dropdown-ctn');
    changeVisibility('contacts-dropdown');
}


/**
 * This sets the value attribute of the input field to a string in the ISO format (YYYY-MM-DD)
 */
function changeDateToToday() {
    const today = new Date();
    const inputField = document.getElementById('due-date');
    inputField.setAttribute('value', today.toISOString().substring(0, 10));
}