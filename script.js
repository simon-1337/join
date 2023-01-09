// ##### TASK #####
let task;

/** 
 * That object is used in AddTask when creating a new task. 
 * Familiar functions: templatePrioritySelection(i), changeSelectedPrioBtn(i), resetOtherPrioBtns(i) 
 */
let priorities = [
    {
        'name': 'Urgent',
        'prio-index': 0,
        'image': './assets/img/red-prio.svg',
        'color': '#FF3D00'
    },
    {
        'name': 'Medium',
        'prio-index': 1,
        'image': './assets/img/orange-prio.svg',
        'color': '#FFA800'
    },
    {
        'name': 'Low',
        'prio-index': 2,
        'image': './assets/img/green-prio.svg',
        'color': '#7AE229'
    }
]

// ##### BOARD #####
/** 
 * That array is important when using the board searchbar for searching a ticket and than editting it. After the board reloads, only the search results are still visible, 
 *  because the hiden tickets are pushed before to 'hiddenTickets'. 
 */
let hiddenTickets = [];

/** 
 * That variable is important in board.html when closing the ticket info popup. When the ticket was editted, the board needs to be reloaded.  
 */
let taskEditted = false;


// ##### CONTACTS #####
let contacts = [];

/** 
 * That object is important when creating a new contact in contacts. Familiar functions: addAllInputValuesToContact()
 */
let newContact = {
    'name': '',
    'color': '',
    'email': '',
    'phone': '',
    'abbreviation': '',
}

/** 
 * That object is important to for the scroll function, after editting or creating a new contact in "contacts"
 *  Familiar functions: settingContactValuesGlobaly(index, letter, number), cleanContactValues()
 */
let contactValues = {
    'index' : '',
    'letter' : '',
    'number' : '',
}

/** 
 * That variable is important to scroll to the new contact after creating it.
 *  Find it in contacts.js. Familiar functions: filerContacts() 
 */
let createdContactName;

/** 
 * This two variables are important for loading the right templates and buttons, if a contact will be editted or not (creating new contact).
 *  Familiar functions: settingValuesForEdittingContact(index), cleanValuesForEdittingContact()
*/
let edittingNewContact = false;
let indexOfChoosedContactToEdit;

/** 
 * Array for choosing a random color out of this array. Find it in contacts.js
 *  Familiar functions: addColorToContact(identifier)
 */
let colors = ['#0190e0','#ee00d6', '#02cf2f', '#ffa800', '#9327ff', '#ff5c00', '#4e963d', '#32daff', '#007cee', '#cb02cf']

/** 
 * That variable is important to get an alphabetic order in the contacts list. 
*  Familiar functions: filterContacts(list)
*/
let alphabet = [...'abcdefghijklmnopqrstuvwxyz'];


// ##### USERS #####
let users = [];
let usersContact = [];

// ##### CATEGORY #####
let category = [];
let categoryColors = ['#FF8A00', '#8AA4FF', '#FF0000', '#2AD300', '#E200BE', '#0038FF']


// ##### NAV #####
let selectedNavItem = 0;

/**
 * That function marks the category/tab in the navbar on the same page.
 * @param {number} n - The id of the category/tab in the nav
 */
function markNavItem(n) {
    unmarkAllNAvItems();
    selectedNavItem = n;
    document.getElementById(`${n}`).classList.add('selected-nav-item');  
}

/**
 * That function unmarks all categories/tabs in the navbar.
 */
function unmarkAllNAvItems() {
    for (let i = 1; i < 5; i++) document.getElementById(`${i}`).classList.remove('selected-nav-item');
}


// ##### HEADER RESPONSIVE #####
/**
 * That function add a title-template into the content-container (in responsive view)
 */
function renderResponsiveHeaderTitle() {
    document.getElementById('content-container').innerHTML = `<p class="header-title-resp cursor-d">Kanban Project Management Tool</p>`;
}


// ########## BACKEND ##########
setURL('https://simon-besenbaeck.developerakademie.net/smallest_backend_ever');


async function init() {
    // await deleteServerData()
    await downloadFromServer();
    usersContact = await JSON.parse(backend.getItem('usersContact')) || [];
    boardColumns =  await JSON.parse(backend.getItem('boardColumns')) || [[], [], [], []]; // compare with line 6
    category =  await JSON.parse(backend.getItem('category')) || [];
    contacts =  await JSON.parse(backend.getItem('contacts')) || [];
    isLoggedInn();
    getIndexOfCurrentUser();
    renderSiteRelatedTemplate();
    console.clear();
}

/**
 * That function helps us do delete all server-data, if we want to test for functionality.
 */
async function deleteServerData() {
    await backend.deleteItem('usersContact');
    await backend.deleteItem('boardColumns');
    await backend.deleteItem('category');
    await backend.deleteItem('contacts');
    await backend.deleteItem('users');
}

/**
 * That function renders the site (url) related templates.
 */
function renderSiteRelatedTemplate() {
    renderNavAndHeader();
    if(window.location.pathname.includes('summary.html')) initSummary(1);
    else if(window.location.pathname.includes('board.html')) initBoard(2);
    else if(window.location.pathname.includes('add_task.html')) initAddtask(3);
    else if(window.location.pathname.includes('contacts.html')) initContacts(4);
    
}

/**
 * This function renders the navbar and the header. Almost on every site.
 */
function renderNavAndHeader() {
    renderNav();
    renderHeader();
}

/**
 * That function is the site related init function with site related navbar-marking and content.
 * @param {number} value - value is the a site related number for marking the right navbar element, when entering that site.
 */
function initSummary(value) {
    greet();
    markNavItem(value);
    renderPopups();
    renderSummary();
    
}

/**
 * That function is the site related init function with site related navbar-marking and content.
 * @param {string} value - value is the a site related number for marking the right navbar element, when entering that site.
 */
function initBoard(value) {
    markNavItem(value);
    renderPopupsInBoard();
    renderBoard();
}

/**
 * That function is the site related init function with site related navbar-marking and content.
 * @param {string} value - value is the a site related number for marking the right navbar element, when entering that site.
 */
function initAddtask(value) {
    markNavItem(value);
    renderPopups();
    initAddTask();
}

/**
 * That function is the site related init function with site related navbar-marking and content.
 * @param {string} value - value is the a site related number for marking the right navbar element, when entering that site.
 */
function initContacts(value) {
    markNavItem(value);
    renderPopupsInContacts();
    renderContactsList();
}

// LOGIN 
/**
 * That function checks, if there are any login (signed-in user or guest) related data. If not, the user will be put back
 * to the login site (index.html).
 */
function isLoggedInn() {
    let itemSet = localStorage.getItem('usersEmail');
    if(!(itemSet || anyCurrentUserHeaderData() || isGuestUser())) {
        window.location.href = 'index.html?msg=Du hast dich erfolgreich abgemeldet';
    }
}


// ADD
/**
 * That function adds the contacts array to the server database and overwrites previous saved data on the server.
 */
async function addContact() {
    await backend.setItem('contacts', JSON.stringify(contacts));
}

/**
 * That function adds the boardColumns array to the server database and overwrites previous saved data on the server.
 */
async function addBoard() {
    await backend.setItem('boardColumns', JSON.stringify(boardColumns));
}

// async function addUser() {
//     users.push('John);
//     await backend.setItem('users', JSON.stringify(users));
// }
// DELETE
// function deleteUser(name) {
//     await backend.deleteItem('users');
// }


// HELPFULL FUNCTIONS
/**
 * That function is a smaller helpfull function to add a class name to an element.
 * @param {string} id - id is the id of an element to which we want add a class to 
 * @param {string} classe - classe is a class name, that we want to add to the element
 */
function addClasslist(id, classe) {
    document.getElementById(id).classList.add(classe);
}

/**
 * That function is a smaller helpfull function to remove a class name from an element.
 * @param {string} id - id is the id of an element from which we want remove a class from 
 * @param {string} classe - classe is a class name, that we want to remove from the element
 */
function removeClasslist(id, classe) {
    document.getElementById(id).classList.remove(classe);
}

/**
 * That function is needed in most popups, that have a close event onlick on the background. 
 * That function prevents the popup to close, if we click right on the popup.
 * @param {event} event 
 */
function doNotClose(event) {
    event.stopPropagation();
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
    return firstLetter + secondLetter;
}


/** 
 * Returns a random integer from 0 to 9:
 * Math.random returns a number lower than 1
 * Math.floor makes the decimal number to a 'no decimal' number
 * 10 is the number of values we want, beginning from  0
 * Using this function to get a random color out of the array 'colors' 
 */
function getRandomNumberFromZeroToNine() {
    return Math.floor(Math.random() * 10);
}

/**
 * That function checks if the current site is equal to the add_taks.html url.
 * If yes, it returns true.
 * @returns a boolean
 */
function URLequalsAddTaskHtml() {
    if ('/add_task.html' == window.location.pathname) {
        return true;
    }
}

//// To get the index of the current user in usersContact
let indexOfCurrentUser;

/**
 * That function gets the index of the current logged-in user by looping through usersContact and 
 * comparing the (in localstorage) stored email address.
 */
function getIndexOfCurrentUser() {
    for (let i = 0; i < usersContact.length; i++) {
        if (usersContact[i]['email'] == localStorage.getItem('usersEmail')) {
            indexOfCurrentUser = i;
            break;
        }
    }
}
