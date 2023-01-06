let boardColumnTitle = ['To do', 'In progress', 'Awaiting Feedback', 'Done'];
let emptyBoardColumn = ['No task to do', 'Nothing in progess', 'No Feedback awaiting', 'Nothing here'];
/** This variable is for storing the current ticket index when drag&drop. Familiar functions: startDragging(column, ticket), drop(column) */
let currentElementTicket;
/** This variable is for storing the current ticket object when drag&drop. 
 * Familiar functions: startDragging(column, ticket), drop(column), pushNewElement(column), unshiftNewElement(column), removeAllHighlightAreas(i), highlightAreas(i) */
let currentElement;

/** Render the board content with its tickets */
function renderBoard() {
    let content = document.getElementById('board-content');
    content.innerHTML = '';
    for (let i = 0; i < boardColumns.length; i++) {
        content.innerHTML += renderTemplateBoardColumn(i);
        if(window.innerWidth > 800 || boardColumns[i].length > 0) renderOnholdTicketTargetResponsive(i);
        else renderBoardColumnIsEmptySign(i);
        renderBoardColumnContent(i);
    }
    renderOnholdTicketTarget();
}

/** 
 * Render the board content of a column with its tickets
 * @param {number} n - n is the board column number starting at 0 
 */
function renderBoardColumnContent(n) {
    let content = document.getElementById(`board-column-${n}`);
    if(boardColumns[n].length > 0) {
        for (let j = 0; j < boardColumns[n].length; j++) {
            content.innerHTML += renderTemplateTicket(n,j);
            renderTicketContent(n,j);
        }
    }
}


////////////////// TICKET /////////////////////
// >>===============================> =======================================> ==============================================> =======================================>
/** 
 * That is a template function which returns the ticket-container, where the ticket details will be rendered inside
 * @param {number} n - n is the column number starting at 0
 * @param {number} j - j is the row or the ticket-number in that column
 * @returns the ticket template 
 */
function renderTemplateTicket(n,j) {
    return `<div class="ticket-container flex column cursor-p" id="ticket-container-${n}-${j}" draggable="true" ondragstart="startDragging(${n}, ${j})" onmousedown="highlightTicket(${n},${j})" onmouseup="removeHighlightTicket(${n},${j})" onclick="renderTicketInfoPopupContainer(${n}, ${j})"></div>`;
}

/** 
 * That function renders a ticket with its content
 * @param {number} n - n is the column number starting at 0
 * @param {number} j - j is the row or the ticket-number in that column
 */
function renderTicketContent(n, j) {
    renderTemplateTicketCategory(n,j);
    renderTemplateTicketDescription(n,j);
    renderTemplateTicketProgressbar(n,j);
    setProgressBar(n,j);
    renderTemplateTicketFooter(n,j);
    renderTicketTeam(n,j);
}

////////////////// CATEGORY
/** 
 * That function renders the ticket category in the ticket
 * @param {number} n - n is the column number starting at 0
 * @param {number} j - j is the row or the ticket-number in that column 
 */
function renderTemplateTicketCategory(n,j) {
    let ticketContent = document.getElementById(`ticket-container-${n}-${j}`);
    ticketContent.innerHTML += templateTicketCategory(n,j);
    document.getElementById(`ticket-category-${n}-${j}`).style.backgroundColor = `${boardColumns[n][j]['category']['color']}`;
}

////////////////// DESCRIPTION
/** 
 * That function renders the ticket description in the ticket
 * @param {number} n - n is the column number starting at 0
 * @param {number} j - j is the row or the ticket-number in that column 
 */
function renderTemplateTicketDescription(n,j) {
    let ticketContent = document.getElementById(`ticket-container-${n}-${j}`);
    ticketContent.innerHTML += templateTicketDescription(n,j);
}

////////////////// PROGRESSBAR
/** 
 * That function renders the ticket progressbar in the ticket
 * @param {number} n - n is the column number starting at 0
 * @param {number} j - j is the row or the ticket-number in that column 
 */
function renderTemplateTicketProgressbar(n,j) {
    if(boardColumns[n][j]['subtasks'] > 0) { 
        let ticketContent = document.getElementById(`ticket-container-${n}-${j}`);
        ticketContent.innerHTML += templateTicketProgressbar(n,j);
    }
}

/** 
 * That function sets the value of the progressbar
 * @param {number} n - n is the column number starting at 0
 * @param {number} j - j is the row or the ticket-number in that column 
 */
function setProgressBar(n,j) {
    if(boardColumns[n][j]['finished-subtasks'] > 0) {
        let progressValue = (boardColumns[n][j]['finished-subtasks']/boardColumns[n][j]['subtasks']);
        document.getElementById(`process-bar-${n}-${j}`).value = progressValue;
    }
}

/** 
 * That function renders the ticket footer in the ticket
 * @param {number} n - n is the column number starting at 0
 * @param {number} j - j is the row or the ticket-number in that column 
 */
function renderTemplateTicketFooter(n,j) {
    let ticketContent = document.getElementById(`ticket-container-${n}-${j}`);
    ticketContent.innerHTML += templateTicketFooter(n,j);
    if(boardColumns[n][j]['prior']) renderPrioFooter(n,j);
}

/** 
 * That function render the ticket priority in footer (if its existing)
 * @param {number} n - n is the column number starting at 0
 * @param {number} j - j is the row or the ticket-number in that column 
 */
function renderPrioFooter(n,j) {
    let content = document.getElementById(`ticket-footer-container-${n}-${j}`);
    content.innerHTML += templatePrioFooter(n,j);
}

////////////////// TEAM
/** 
 * That function renders the ticket team in the ticket
 * @param {number} n - n is the column number starting at 0
 * @param {number} j - j is the row or the ticket-number in that column 
 */
function renderTicketTeam(n,j) {
    if(boardColumns[n][j]['team']) {
        let k = boardColumns[n][j]['team'].length;
        let content = document.getElementById(`ticket-contacts-container-${n}-${j}`);
        if(boardColumns[n][j]['team'].length > 3) k = 2;
        templateTicketMember(n,j,k,content);
        if(k < boardColumns[n][j]['team'].length) renderContactPlaceholder(k,n,j,content);
    }
}

/** 
 * That function gets the template 'ticket-contact' and renders the ticket members in a loop.
 * @param {number} n - n is the column number starting at 0
 * @param {number} j - j is the row or the ticket-number in that column 
 * @param {div} content - content of the 'ticket-contacts-container'
 * @param {number} k - k is the number of shown ticket team member
 */
function templateTicketMember(n, j, k, content) {
    for (let i = 0; i < k ; i++) {
        let name = boardColumns[n][j]['team'][i]['name'];
        content.innerHTML += `<div class="ticket-contact" id="board-contact-${n}-${j}-${i}">${getNameLetters(name)}</div>`;
        coloringTicketMembers(n,j,i);
    }
}

/** 
 * That function colors the ticket team members in the ticket
 * @param {number} column - column is the column number starting at 0
 * @param {number} ticket - ticket is the row or the ticket-number in that column 
 * @param {number} teamMember - teamMember is the team-member-index in the team-array of that ticket-element
 */
function coloringTicketMembers(column, ticket, teamMember) {
    document.getElementById(`board-contact-${column}-${ticket}-${teamMember}`).style.backgroundColor = `${boardColumns[column][ticket]['team'][teamMember]['color']}`;
}

/** 
 * That function returns the rest number of team members, when there are more than 3 team members in that ticket
 * @param {number} column - column is the column number starting at 0
 * @param {number} ticket - ticket is the row or the ticket-number in that column 
 */
function getRestNumberOfMembers(column, ticket) {
    return boardColumns[column][ticket]['team'].length - 2;
}
// <<=============================== <======================================= <============================================== <=======================================


/** 
 * That function renders an empty-sign in reponsive view, when the column is empty.
 * @param {number} n - n is the column number starting at 0 
 */
function renderBoardColumnIsEmptySign(n) {
    content = document.getElementById(`board-column-${n}`);
    content.innerHTML = `<p class="noTask cursor-d w-100">${emptyBoardColumn[n]}</p>`;
    emptyBoardColumnProperties(n);
}

/** 
 * That function adds the class 'emptyColumn' to that board column.
 * @param {number} n - n is the column number starting at 0 
 */
function emptyBoardColumnProperties(n) {
    addClasslist(`board-column-${n}` ,`emptyColumn`);
}


////////////////// DRAGGING AND DROP /////////////////////
/** 
 * That function will be executed when start dragging a ticket in board. It highlights all drop-areas for few seconds.
 * @param {number} column - column is the column number starting at 0
 * @param {number} ticket - ticket is the row or the ticket-number in that column 
 */
function startDragging(column, ticket) {
    currentElement = boardColumns[column][ticket];
    currentElementTicket = ticket;
    for (let i = 0; i < boardColumns.length; i++) highlightAllAreas(i,column,ticket);
    for (let i = 0; i < boardColumns.length; i++) removeAllHighlightAreas(i);
}

/** 
 * That function will be startet, when a ticket in board will be dropped (onkeyup mouse) over a droparea. 
 * Thats for moving and dropping tickets to another column 
 * @param {number} column -  column is the column number starting at 0 
 */
async function drop(column) {
    if (currentElement['board'] != column) {
        boardColumns[currentElement['board']].splice(currentElementTicket,1);
        if(window.innerWidth > 800) pushNewElement(column);
        else unshiftNewElement(column);
        currentElement = '';
    }
    await addBoard();
    await init();
}

/** 
 * That function has been given to us from w3schools (API). 
 * That function is important for allowing elements to be dropped over the area they are draged over. 
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/** 
 * That function is for pushing an element to the new column in the array 'boardColumns', if it is dragged and dropped to another column.
 * Every column element has the key 'board'. It has the current column number of that element.
 * @param {number} column -  column is the column number starting at 0 
 */ 
function pushNewElement(column) {
    boardColumns[column].push(currentElement);
    boardColumns[column][boardColumns[column].length-1]['board'] = column; 
}

/** 
 * (Used in responsive) That function is for pushing an element to the new column in the array 'boardColumns', if it is dragged and dropped to another column.
 * Every column element has the key 'board'. It has the current column number of that element.
 * @param {number} column -  column is the column number starting at 0 
 */ 
function unshiftNewElement(column) {
    boardColumns[column].unshift(currentElement);
    boardColumns[column][0]['board'] = column; 
}


////////////////// SEARCHBAR INPUT /////////////////////
/** 
 * That function is for widening the searchbar input field. 
 */
function widerInputField() {
    addClasslist('board-search-icon', 'd-none');
    addClasslist(`board-header-search-input-container`, `border-none`);
}

/** 
 * That function is for reset the wide searchbar input field (if widened before). 
 */
function narrowInputField() {
    removeClasslist('board-search-icon', 'd-none');
    removeClasslist(`board-header-search-input-container`, `border-none`);
}

/** 
 * That function will be executed onkeyup when writing into the searchbar input field.
 * That function checks if there is some input or not.
 */
function searchTasks() {
    let input = document.getElementById('board-header-search-input');
    let inputComparison = input.value.toLowerCase();
    if(input.value.length > 0) filterTasks(inputComparison);
    else showAllTickets();
}

/** 
 * That function filters and shows the tickets with the titel or descriptions that includes the searchbar input string.
 * @param {string} inputComparison - inputComparison in the input of the user 
 */
function filterTasks(inputComparison) {
    showAllTickets();
    for (let i = 0; i < boardColumns.length; i++) {
        if(boardColumns[i].length > 0) {
            for (let j = 0; j < boardColumns[i].length; j++) {
                let ticketTitle = boardColumns[i][j]['title'].toLowerCase();
                let ticketDescription = boardColumns[i][j]['description'].toLowerCase();
                if(!(ticketTitle.includes(inputComparison) || ticketDescription.includes(inputComparison))) hideTicket(i,j);
            }
        }
    }
}

/** 
 * That function shows all tickets in board (for example if there is no input in the searchbar). 
 */
function showAllTickets() {
    hiddenTickets = [];
    for (let i = 0; i < boardColumns.length; i++) {
        if(boardColumns[i].length > 0) {
            for (let j = 0; j < boardColumns[i].length; j++) {
                removeClasslist(`ticket-container-${i}-${j}`, 'd-none');
            }
        }
    }
}

/** 
 * That function hides tickets (depending on the board searchbar input) with display:none and push's their column- and ticket-number
 * to the array 'hiddenTickets'.
 * @param {number} column - column is the column number starting at 0
 * @param {number} ticket - ticket is the row or the ticket-number in that column 
 */
function hideTicket(column, ticket) {
    addClasslist(`ticket-container-${column}-${ticket}`, 'd-none');
    hiddenTickets.push([column, ticket]);
}

/** 
 * That function is important after searching for a ticket, edit it and let the previews search results staying still there 
 * (after rendering the board again). 
 */
function hideSomeTickets() {
    for (let i = 0; i < hiddenTickets.length; i++) {
        addClasslist(`ticket-container-${hiddenTickets[i][0]}-${hiddenTickets[i][1]}`, 'd-none');
    }
}


////////////////// AREA & TICKET - HIGHLIGHTING //////////////////////////
/**
 * That function highlights all areas where its possible to drop the dragged ticket.
 * @param {number} i - i is the column index in a for-loop
 * @param {number} column - column is the column number starting at 0
 * @param {number} ticket - ticket is the row or the ticket-number in that column
 */
function highlightAllAreas(i,column,ticket) {
    if(i != currentElement['board']) {
        addClasslist(`onhold-container-column-${i}-last`, `highlight-area`);
        if(window.innerWidth > 800 || boardColumns[i].length > 0)
            addClasslist(`onhold-container-column-${i}-first`, `highlight-area`);
        let myDiv = document.getElementById(`ticket-container-${column}-${ticket}`);
        let getHeight = myDiv.offsetHeight;
        document.getElementById(`onhold-container-column-${i}-last`).style.height = `${getHeight}px`;
    }
}

/** 
 * That function removes all highlight areas where its possible to drop the dragged ticket, after 600ms.
 * @param {number} i - i is the column index in a for-loop 
 */
function removeAllHighlightAreas(i) {
    setTimeout( () => {
        if(i != currentElement['board']) {
            addClasslist(`onhold-container-column-${i}-last`, `no-highlight-area`);
            if(window.innerWidth > 800 || boardColumns[i].length > 0)
                addClasslist(`onhold-container-column-${i}-first`, `no-highlight-area`);
        }
    }, 600)
}

/** 
 * That function will be executed ondragover an dropping area and highlights that area where its possible to drop the dragged ticket.
 * @param {number} i - i is the column index in a for-loop 
 */
function highlightAreas(i) {
    if(i != currentElement['board']) {
        addClasslist(`onhold-container-column-${i}-last`, `highlight-area-more`);
        if(window.innerWidth > 800 || boardColumns[i].length > 0)
            addClasslist(`onhold-container-column-${i}-first`, `highlight-area-more`);
    }
}

/** 
 * That function will be executed ondragleave an dropping area and removes the highlighting of that area.
 * @param {number} i - i is the column index in a for-loop 
 */
function removeHighlightAreas(i) {
    removeClasslist(`onhold-container-column-${i}-last`, `highlight-area-more`);
    if(window.innerWidth > 800 || boardColumns[i].length > 0)
        removeClasslist(`onhold-container-column-${i}-first`, `highlight-area-more`);
}

/** 
 * That function will be executed onmousedown on a ticket area and adds the class 'ticket-highlight' to that ticket.
 * @param {number} i - i is the column index in a for-loop 
 */
function highlightTicket(column, ticket) {
    addClasslist(`ticket-container-${column}-${ticket}`, `ticket-highlight`);
}

/** 
 * That function will be executed onmouseup on a ticket area and removes the class 'ticket-highlight' from that ticket.
 * @param {number} i - i is the column index in a for-loop 
 */
function removeHighlightTicket(column, ticket) {
    removeClasslist(`ticket-container-${column}-${ticket}`, `ticket-highlight`);
}




