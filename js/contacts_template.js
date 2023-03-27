/** 
 * Return a contact element template for the contact list.
 * @param {number} j - j is the index of the contact in the array 'contacts' 
 * @param {number} number - number is the number of that contact at this current first letter
 * @param {string} letter - letter is the currrent letter of the array 'alphabet' 
 */
function renderTemplateListLetterContact(letter, number, j) {
    return `
        <div class="contact cursor-p flex" id="contact-withLetter-${letter}-number-${number}" onclick="openContactInfoPopup(${j}, '${letter}', ${number})">
            <a class="d-none" href="#contact-withLetter-${letter}-number-${number}" id="contact-link-withLetter-${letter}-number-${number}"></a>
            <div class="contact-abbreviation-wrapper flex" id="contact-abbreviation-wrapper-${letter}-${number}">
                <p class="contact-abbreviation">${contacts[j]['abbreviation']}</p>
            </div>
            <div class="contact-name-wrapper column flex">
                <p class="contact-name">${contacts[j]['name']}</p>
                <p class="contact-email">${contacts[j]['email']}</p>    
            </div>
        </div>`
}


// #### CONTACT INFO POPUP ####

/** 
 * Returns the contact info popup main template.
 * @param {number} i - i is the index of the contact in the array 'contacts' 
 */
function renderTemplateContactInfoPopup(i) {
    return `<div class="contact-info-popup column flex" id="contact-info-popup"></div>`;
}

/** 
 * Returns the contact info popup 'abbreviation and name' template.
 * @param {number} i - i is the index of the contact in the array 'contacts' 
 */
function renderTemplateContactInfoPopupAbbreviationAndName(i) {
    return `<div class="contact-info-popup-abbreviation-and-name flex" id="contact-info-popup-abbreviation-and-name">
                <div class="contact-info-popup-abbreviation-wrapper">
                    <div class="contact-abbreviation-wrapper contact-info-popup-abbreviation flex" id="contact-info-popup-abbreviation-${i}">
                        <p class="contact-abbreviation">${contacts[i]['abbreviation']}</p>
                    </div>
                </div>
            </div>`;
}

/** 
 * Returns the contact info popup section 'name and addtask-btn'.
 * @param {number} i - i is the index of the contact in the array 'contacts' 
 */
function renderTemplateContactInfoPopupName(i) {
    let wrapper = document.getElementById(`contact-info-popup-abbreviation-and-name`);
    wrapper.innerHTML += `
        <div class="contact-info-popup-name-and-addtask column flex">
            <p>${contacts[i]['name']}</p>
            <div class="contact-info-popup-addTask-btn flex cursor-p" onclick="openBoardAddtaskPopup(0)">
                <p>+</p>
                <p>Add Task</p>
            </div>
        </div>`;
}

/** 
 * Returns the contact info popup 'title and edit-contact-btn' template.
 * @param {number} i - i is the index of the contact in the array 'contacts' 
 */
function renderTemplateContactInfoPopupTitleAndEditContactBtn(i) {
    return `<div class="contact-info-popup-title-and-editContactBtn flex">
                <p>Contact Information</p>
                <div class="contact-info-popup-editContact-btn cursor-p" onclick="setContactValuesForEditting(${i});openContactsNewContactPopup(${i})">
                    <img src="assets/img/profil-edit-contact-icon.png">
                    <p>Edit Contact</p>
                </div>
            </div>`;
}

/** 
 * Returns the contact info popup 'email and phone' template
 * @param {number} i - i is the index of the contact in the array 'contacts' 
 */
function renderTemplateContactInfoPopupEmailAndPhone(i) {
    return `<div class="contact-info-popup-email-and-phone column flex">
                <div class="contact-info-popup-email-wrapper column flex">
                    <p>Email</p>
                    <p>${contacts[i]['email']}</p>
                </div>
                <div class="contact-info-popup-phone-wrapper column flex">
                    <p>Phone</p>
                    <p>${contacts[i]['phone']}</p>
                </div>
            </div>`;
}