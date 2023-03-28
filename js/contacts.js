/** 
 * That function renders the contact list on the contacts.html page. 
 */
function renderContactsList() { 
    let list = document.getElementById(`contacts-list`);
    list.innerHTML = '';
    if(contacts.length > 0 ) filterContacts(list);
}

/** 
 * That function filters all contacts saved in the array 'contacts' and shows them in a ordered list.
 * @param {div} list - list is the content of a html div with id 'contacts-list' 
 */
function filterContacts(list) {
    let contactNumber = 0;
    for (let i = 0; i < alphabet.length; i++) {
        let contactNumberAtThisLetter = 0;
        filterContactsLoop(list, contactNumber, contactNumberAtThisLetter, i);
        if(contactNumber == contacts.length) break;
    }
}

/** 
 * That function filters all contacts saved in the array 'contacts' in a loop and renders, if necessary, the right first letter.
 * @param {div} list - list is the content of a html div with id 'contacts-list'
 * @param {number} contactNumber - contactNumber is the index of the contact in the array 'contacts' 
 * @param {number} contactNumberAtThisLetter - contactNumberAtThisLetter is the number of that contact at this current first letter
 * @param {number} i - i is the index of a letter from the array 'alphabet' 
 */
function filterContactsLoop(list, contactNumber, contactNumberAtThisLetter, i) {
    for (let j = 0; j < contacts.length; j++) {
        if(alphabet[i] == contacts[j]['name'].toLowerCase().charAt(0)) {
            contactNumber++;
            contactNumberAtThisLetter++;
            if(contactNumberAtThisLetter == 1) renderTemplateListLetter(alphabet[i].toUpperCase(), list);
            renderListLetterContacts(alphabet[i].toUpperCase(), contactNumberAtThisLetter, j);
            if(createdContactName == contacts[j]['name'].toLowerCase()) setContactValuesForLinking(j, alphabet[i].toUpperCase(), contactNumberAtThisLetter);
        }
        if(contactNumber == contacts.length) break;
    }
}

/** 
 * Return a contact container with a first letter template
 * @param {div} list - list is the content of a html div with id 'contacts-list'
 * @param {string} letter - letter is the currrent letter of the array 'alphabet'  
 */
function renderTemplateListLetter(letter, list) {
    list.innerHTML += `
        <div class="contacts-container-withLetter column flex">
            <p>${letter}</p>
            <div class="container-with-contacts column flex" id="contacts-with-${letter}"></div>
        </div>`
}

/** 
 * That function renders the contact element in the contact list at the right letter.
 * @param {number} j - j is the index of the contact in the array 'contacts' 
 * @param {number} number - number is the number of that contact at this current first letter
 * @param {string} letter - letter is the currrent letter of the array 'alphabet'
 */
function renderListLetterContacts(letter, number, j) {
    let content = document.getElementById(`contacts-with-${letter}`);
    content.innerHTML +=  renderTemplateListLetterContact(letter, number, j);
    contactAbbreviationColoring(letter, number, j);
}

/** 
 * That function colors the contact abbreviation in the contact list.
 * @param {number} j - j is the index of the contact in the array 'contacts' 
 * @param {number} number - number is the number of contacts at this current first letter
 * @param {string} letter - letter is the currrent letter of the array 'alphabet' 
 */
function contactAbbreviationColoring(letter, number, j) {
    document.getElementById(`contact-abbreviation-wrapper-${letter}-${number}`).style.backgroundColor = `${contacts[j]['color']}`;
}

/** 
 * That function opens the cotnact info.
 * @param {number} index - index is the index of the contact in the array 'contacts' 
 * @param {number} number - number is the number of contacts at this current first letter
 * @param {string} letter - letter is the currrent letter of the array 'alphabet'
 */
function openContactInfoPopup(index, letter, number) {
    document.getElementById('contacts-info-popup-container').innerHTML = '';
    document.getElementById('contact-info-popup-responsive-full').innerHTML = ''; 
    setContactValuesForLinking(index, letter, number); // used for moving to contact after editting (not necessary in responsive) (l. 170)
    showContactInfoPopup(index, letter, number);
    showContactInfoPopupResponsive(index);
}

/**
 * That function creates an object for getting the info of a contact, that has been editted.
 * So that it will be shown (scrolled to) after editting it.
 * @param {number} index - index is the index of the contact in the array 'contacts' 
 * @param {number} number - number is the number of contacts at this current first letter
 * @param {string} letter - letter is the currrent letter of the array 'alphabet' 
 */
function setContactValuesForLinking(index, letter, number) {
    cleanContactValues();
    contactValues['index'] = index;
    contactValues['letter'] = `${letter}`;
    contactValues['number'] = number;
}

/** 
 * That function opens the cotnact info (in normal view).
 * So that it will be shown (scrolled to) after editting it.
 * @param {number} index - index is the index of the contact in the array 'contacts' 
 * @param {number} number - number is the number of contacts at this current first letter
 * @param {string} letter - letter is the currrent letter of the array 'alphabet' 
 */
function showContactInfoPopup(index, letter, number) {
    removeClasslist('contacts-info-popup-container', 'contact-info-popup-visible');
    setTimeout(() => {
        changebackgroundColorOfSelectedContact(letter, number);
        renderContactInfoPopup(index);
        contactInfoPopupAbbreviationColoring(index);
        addClasslist('contacts-info-popup-container', 'contact-info-popup-visible');
    }, 125);
}

/** 
 * That function styles the contact element in the contact list, that has been selected.
 * @param {number} number - number is the number of contacts at this current first letter
 * @param {string} letter - letter is the currrent letter of the array 'alphabet' 
 */
function changebackgroundColorOfSelectedContact(letter, number) {
    renderContactsList();
    document.getElementById(`contact-withLetter-${letter}-number-${number}`).style.backgroundColor = "#2A3647";
    document.getElementById(`contact-withLetter-${letter}-number-${number}`).style.color = "#ffffff";
    document.getElementById(`contact-abbreviation-wrapper-${letter}-${number}`).style.border = `1px solid white`;
}

/** 
 * That function renders some contact-info-popup relevant template when clicking on a contact (in normal view).
 * @param {number} i - i is the index of the contact in the array 'contacts'
 */
function renderContactInfoPopup(i) {
    let popupContainer = document.getElementById('contacts-info-popup-container');
    popupContainer.innerHTML = renderTemplateContactInfoPopup(i);
    let content = document.getElementById(`contact-info-popup`);
    content.innerHTML = renderTemplateContactInfoPopupAbbreviationAndName(i);
    renderTemplateContactInfoPopupName(i);
    content.innerHTML += renderTemplateContactInfoPopupTitleAndEditContactBtn(i);
    content.innerHTML += renderTemplateContactInfoPopupEmailAndPhone(i);
}

/** 
 * That function 'colors' the contact info popup abbreviation template.
 * @param {number} index - index is the index of the contact in the array 'contacts' 
 */
function contactInfoPopupAbbreviationColoring(index) {
    document.getElementById(`contact-info-popup-abbreviation-${index}`).style.backgroundColor = `${contacts[index]['color']}`;
}


///////////////////////// CREATE  OR  SAVE   NEW CONTACT ////////////////////////////////////
let firstAndLastName = false;
let emailNotUnique = false;


/** 
 * That function will be executet onsubmit in the 'new contact'/'edit contact' popup form. 
 */
async function creatingOrSavingContact() {
    firstAndLastName = false;
    emailNotUnique = false;
    if(await createContact()) {
        closeContactsNewContactPopupFilled(); 
        renderContactsList();
        MoveToContact();
        showPopupWhenCreatedContact();
    } 
    else if (emailNotUnique) { 
        closeContactsNewContactPopupFilled();
        showPopupWhenNotCreatedContact();
    }
}

/** 
 * That function is for creating a new contact and also for editting a contact and will be executed
 * in the 'new contact'/'edit contact' popup form. 
 */
async function createContact() {
    setContactNameForLinking(); // used for moving to contact after creating (not necessary in responsive) (l. 63)
    if(addAllInputValuesToContact()) {
        if (firstAndLastName) {
            if(edittingNewContact) saveAllInputValuesToContact();
            else contacts.push(newContact);
            await addContact(); //on the server
            clearNewContact();
            return true;
        } else {
            displayErrorTwoNamesRequired()
        }
    } else return false;
}


/**
 * This function is used to display that there need to be a name and surname when creating a contact
 */
function displayErrorTwoNamesRequired() {
    document.getElementById('name-error').classList.remove('d-none');
}


/** 
 * That function returns a boolean back, it checks if the 'new' or 'editted' email is already there or not.
 * After that it puts all the inputs, taken by the users input, and assignes them to an object called 'newContact'. 
 */
function addAllInputValuesToContact() {
    if(addInputValuesToContact('email')){
        addInputValuesToContact('name');
        addInputValuesToContact('phone');
        addAbbreviationToContact('name');
        addColorToContact('color');
        return true;
    } else { 
        emailNotUnique = true;
        return false;
    }    
}


/**
 * The function, to assign the values getting by the user to the 'new contact' JSON object. 
 * You'll find a similar function in add_task.js in line 476.
 * @param {string} identifier - ID of the input fields in the popup 'new contact' on the contacts-site.
 */
function addInputValuesToContact(identifier) {
    if(identifier == 'email') {
        if(emailIsUnique(document.getElementById(identifier).value)) {
            newContact[identifier] = document.getElementById(identifier).value;
            return true; 
        }
        else return false;
    }else newContact[identifier] = document.getElementById(identifier).value; 
}


/** 
 * That function return a boolean back, it checks whether a given email is  
 */
function emailIsUnique(email) {
    if (onEditEmailIsEqualToNewEmail(email)) return true;
    else if(contacts.length > usersContact.length) { 
        for(let i = 0; i < contacts.length; i++) {
            if(!(isEmailUnique(i, email))) return false;
        }
    }
    else {
        for(let i = 0; i < usersContact.length; i++) {
            if(!(isEmailUnique(i, email))) return false;
        }
    }
    return true;
}
    

/** 
 * That function checks whether an email is unique when 'editting'/'creating' a contact. 
 * It checks the email of all contacts and of all signed-in user accounts.
 * @param {number} i - i is the index in the arrays contacts OR usersContact
 * @param {string} email - email is the given email, we compare other emails with (on uniqueness) 
 */
function isEmailUnique(i, email) {
    if((i < usersContact.length) && (i < contacts.length)) {
        if(emailIsInUsersOrContacts(i, email)) return false;
        else return true;
    } 
    else if (i < contacts.length) {
        if(emailIsInContacts(i, email)) return false;
        else return true;
    } else if(i < usersContact.length) {
        if(emailIsInUsersContact(i, email)) return false;
        else return true;
    } 
    else return true;
}


/**
 * This function checks if the email adress of the contact that is edited is equivalent to the email adress in newContact
 * Otherwise the error that the email already exists will show up when one edits a contact and does not change the email address
 * 
 * @returns A condition to check if the email of the edited contact is equal to the one entered in the input field
 */
function onEditEmailIsEqualToNewEmail(email) {
    if (edittingNewContact) {
        return email == contacts[indexOfChoosedContactToEdit]['email'];
    }
}


/** 
 * That function compares the given email to the emails of the arrays 'usersContact AND contacts'.
 * @param {number} i - i is the index in the arrays contacts OR usersContact
 * @param {string} email - email is the given email, we compare other emails with (on uniqueness) 
 */
function emailIsInUsersOrContacts(i, email) {
    if(email == usersContact[i]['email'] || (email == contacts[i]['email'])) return true;
    else return false; 
}


/** 
 * That function compares the given email to the emails of the array 'contacts'.
 * @param {number} i - i is the index in the arrays contacts OR usersContact
 * @param {string} email - email is the given email, we compare other emails with (on uniqueness) 
 */
function emailIsInContacts(i, email) {
    if(email == contacts[i]['email'])  return true;
    else return false;
}


/** 
 * That function compares the given email to the emails of the array 'usersContact'.
 * @param {number} i - i is the index in the arrays contacts OR usersContact
 * @param {string} email - email is the given email, we compare other emails with (on uniqueness) 
 */
function emailIsInUsersContact(i, email) {
    if(email == usersContact[i]['email']) return true;
    else return false;
}


/** 
 * That function adds the abbreviation of the current user name, given from the input, to the abbreviation-key
 * of the object newContact.
 * @param {string} identifier - identifier is the given id of the input field 
 */
function addAbbreviationToContact(identifier) {
    newContact['abbreviation'] =  getNameLetters(document.getElementById(identifier).value);
}


/**
 * That function gets the abbreviation of a given name (shortletter).
 * @param {string} name - name is a user/contact name
 * @returns an abbreviation, to letter from the name in uppercase.
 */
function getNameLetters(name) {
    let firstLetter = name.toString().charAt(0).toUpperCase();  
    let index = name.indexOf(' '); 
    let secondLetter = name.toString().charAt(index+1).toUpperCase();
    checkIfTwoNamesEntered(index);
    return firstLetter + secondLetter;
}


/**
 * This function is used to check if there were two names entered when creating the contact
 * 
 * @param {Number} index - The index of the empty space in the input fiel (-1 if no second name)
 */
function checkIfTwoNamesEntered(index) {
    if (index >= 0) {
        firstAndLastName = true;
    }
}


/** 
 * That function adds a color of the current created user to the 'newContact' object. It uses the function:
 * 'getRandomNumberFromZeroToNine()'.
 * @param {string} identifier - identifier is the given id of the input field 
 */
function addColorToContact(identifier) {
    newContact[identifier] = colors[getRandomNumberFromZeroToNine()];
}

/** 
 * That function is important to get the right contact-index data in the rendered contact list. Its for moving and clicking
 * to that contact, after 'creating'/'editting'.
 */
function setContactNameForLinking() {
    createdContactName = document.getElementById('name').value.toLowerCase();
}


// SAVE
/** 
 * That function will be executed, when a contact is 'editted' and the input data needs to be saved. 
 */
function saveAllInputValuesToContact() {
    saveInputValuesToContact('name');
    saveInputValuesToContact('email');
    saveInputValuesToContact('phone');
    saveInputValuesToContact('abbreviation');
}

/** 
 * That function adds the right input values from the object 'newContact' (given before) to 
 * the current 'editted' contact in contacts.
 * @param {string} identifier - identifier is the given id of the input field 
 */
function saveInputValuesToContact(identifier) {
    contacts[indexOfChoosedContactToEdit][identifier] = newContact[identifier]; // because newContact is already created and for less code
}

/** 
 * That function will be started, if the user chooses to edit an existing contact. The function changes the variable
 * 'edittingNewContact' to true and gives the undefined variable 'choosedContactToEdit' the right index.
 * @param {number} index - Thats the index of the contact-object in the array 'contacts' which will be editted 
 */
function setContactValuesForEditting(index) {
    edittingNewContact = true;
    indexOfChoosedContactToEdit = index;
}

/** 
 * That function cleans some global variables data, which are needed to know, if a user wants
 * to 'edit' an existing contact or not.
 */
function cleanValuesForEdittingContact() {
    edittingNewContact = false;
    indexOfChoosedContactToEdit = -1;
}

/** 
 * basic contact structure 
 */
function clearNewContact() {
    newContact = {
        'name': '',
        'color': '',
        'email': '',
        'phone': '',
        'abbreviation': '',
    };
}

/** 
 * That function is for the moving-animation to the right contact in the contact-list on the page contacts.html, after 
 * 'creating' or 'editting' a user. 
 */
function MoveToContact() {
        setTimeout(() => {
            document.getElementById(`contact-link-withLetter-${contactValues['letter']}-number-${contactValues['number']}`).click();
        }, 150);
}

/** 
 * That function executes an popup-animation after succesfully creating a new contact. 
 */
function showPopupWhenCreatedContact() {
    if(!edittingNewContact) showPopupCreatedContact();
}

// CONTACT CREATED
/**
 * That function adds some classes to show an popup-animation after succesfully creating a new contact. 
 */
function showPopupCreatedContact() {
    removeClasslist(`pop-up-created-contact-full`, `d-none`);
    setTimeout(() => {
        removeClasslist(`contact-is-created-popup`,`d-none`);
        addClasslist(`pop-up-created-contact`,`background-color-blue`);
        addClasslist(`pop-up-created-contact`,`contacts-created-popup-slideUp`);
    }, 400);
    hidePopupCreatedContact();
}

// CONTACT NOT CREATED
/** 
 * That function adds some classes to show an popup-animation after NOT succesfully creating a new contact.
 * (Because of already existing email). 
 */
function showPopupWhenNotCreatedContact() {
    removeClasslist(`pop-up-created-contact-full`, `d-none`);
    setTimeout(() => {
        removeClasslist(`contact-is-not-created-popup`,`d-none`);
        addClasslist(`pop-up-created-contact`,`background-color-red`);
        addClasslist(`pop-up-created-contact`,`contacts-created-popup-slideUp`);
    }, 125);
    hidePopupCreatedContact();
}

/** 
 * That function ends and hides the before executed popup-animation after 'creating' or 'editting' a contact.  
 */
function hidePopupCreatedContact() {
    setTimeout(() => {
        removeClasslist(`pop-up-created-contact`,`contacts-created-popup-slideUp`);
    }, 2300);
    setTimeout(() => {
        cleaningTheCreatedContactPopupClasslists();
    }, 2330);
}

/** 
 * That function adds some classes (like 'd-none') to the popup-animation 'Contact succesfully creating'/'Email is already existing', 
 * after hiding it. 
 */
function cleaningTheCreatedContactPopupClasslists() {
    addClasslist(`contact-is-created-popup`, `d-none`);
    addClasslist(`contact-is-not-created-popup`, `d-none`);
    removeClasslist(`pop-up-created-contact`,`background-color-blue`);
    removeClasslist(`pop-up-created-contact`,`background-color-red`);
    addClasslist(`pop-up-created-contact-full`, `d-none`);
}

/** 
 * That function cleans the object-keys of the object 'contactValues', which is needed
 * for moving to a contact after rendering the contact-list on contact.html page. 
 */
function cleanContactValues() {
    contactValues = {
        'index' : '',
        'letter' : '',
        'number' : '',
    };
}