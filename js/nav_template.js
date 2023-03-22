/** 
 * That function renders the navbar. 
 */
function renderNav() {
    let navbar = document.getElementById('nav');
    navbar.innerHTML = renderNavContent();  
    renderMainNavItems();
}

/** 
 * Returns the navbar template. 
 */
function renderNavContent() {
    return `<a class="logo-img absolute" href="summary.html"><img class="logo-img" src="assets/img/logo-big.png"></a>
            <div class="nav-selection flex column" id="nav-selection">
                <div class="nav-main-selection flex column" id="nav-main-selection"></div>
                <a href="legal_notice.html" id="5" class="nav-item nav-legal-notice flex">
                    <img src="assets/img/legal-notice.png">
                    <p>Legal notice</p>
                </a>
            </div>`;
}

/** 
 * That function renders the navbar element templates. 
 */
function renderMainNavItems() {
    let content = document.getElementById('nav-main-selection');
    content.innerHTML = renderNavItemSummary();
    content.innerHTML += renderNavItemBoard();
    content.innerHTML += renderNavItemAddTask();
    content.innerHTML += renderNavItemContacts();
}

/** 
 * Returns the navbar element template for summary 
 */
function renderNavItemSummary() {
    return `<a href="summary.html" class="nav-item nav-summary flex" id="1">
                <img src="assets/img/summary-nav-icon.png">
                <p>Summary</p>
            </a>`;
}

/** 
 * Returns the navbar element template for board 
 */
function renderNavItemBoard() {
    return `<a href="board.html" class="nav-item nav-board flex" id="2">
                <img src="assets/img/board-nav-icon.png">
                <p>Board</p>
            </a>`;
}

/** 
 * Returns the navbar element template for addtask 
 */
function renderNavItemAddTask() {
    return `<a href="add_task.html" class="nav-item nav-add-task flex" id="3">
                <img src="assets/img/add-task-nav-icon.png">
                <p>Add Task</p>
            </a>`;
}

/** 
 * Returns the navbar element template for contacts 
 */
function renderNavItemContacts() {
    return ` <a href="contacts.html" class="nav-item nav-contacts flex" id="4">
                <img src="assets/img/contacts-nav-icon.png">
                <p>Contacts</p>
            </a>`;
}