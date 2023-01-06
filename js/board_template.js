/**
 *  Returns the template for a colum in board.
 * @param {number} i - i is the index of the boardColumns array 
 */
function renderTemplateBoardColumn(i) {
    return `<div class="board-column flex column">
                <div class="board-column-header flex cursor-p">
                    <p>${boardColumnTitle[i]}</p>
                    <div class="board-column-header-plus flex" onclick="openBoardAddtaskPopup()">+</div>
                </div>
                <div class="board-tickets w-100 flex column" id="board-column-${i}" ondrop="drop(${i})" ondragover="allowDrop(event);highlightAreas(${i})" ondragleave="removeHighlightAreas(${i})"></div>
            </div>`;
}

////////////////// CATEGORY
/** 
 * Returns the template for the category of a ticket.
 * @param {number} j - j is the row or the ticket-number in that column
 * @param {number} n - n is the column number starting at 0 
 */
function templateTicketCategory(n,j) {
    return `<div class="ticket-category-container flex">
                <p class="ticket-category" id="ticket-category-${n}-${j}">${boardColumns[n][j]['category']['name']}</p>
            </div>`;
}

////////////////// DESCRIPTION
/** 
 * Returns the template for the description of a ticket.
 * @param {number} j - j is the row or the ticket-number in that column
 * @param {number} n - n is the column number starting at 0  
 */
function templateTicketDescription(n,j) {
    return `<div class="ticket-description-container flex column">
                <p class="ticket-description-title">${boardColumns[n][j]['title']}</p>
                <div class="ticket-description" id="ticket-description-${n}-${j}">
                    ${boardColumns[n][j]['description']}
                </div>
            </div>`;
}

////////////////// PROGRESSBAR
/** 
 * Returns the template for the progressbar of a ticket.
 * @param {number} j - j is the row or the ticket-number in that column
 * @param {number} n - n is the column number starting at 0  
 */
function templateTicketProgressbar(n,j) {
    return `<div class="process-bar-container flex" id="process-bar-container-${n}-${j}">
                <progress class="process-bar" id="process-bar-${n}-${j}" value="" max="1"></progress>
                <div class="process-state">${boardColumns[n][j]['finished-subtasks']}/${boardColumns[n][j]['subtasks']}</div>
            </div>`;
}

/** 
 * Returns the template for the footer container of a ticket.
 * @param {number} j - j is the row or the ticket-number in that column
 * @param {number} n - n is the column number starting at 0  
 */
function templateTicketFooter(n,j) {
    return `<div class="ticket-footer-container flex" id="ticket-footer-container-${n}-${j}">
                <div class="ticket-contacts-container flex" id="ticket-contacts-container-${n}-${j}"></div>
            </div>`
}

/** 
 * Returns the priority template with image in the footer container of a ticket.
 * @param {number} j - j is the row or the ticket-number in that column
 * @param {number} n - n is the column number starting at 0  
 */
function templatePrioFooter(n,j) {
    return ` <img class="state-img" src="${boardColumns[n][j]['prior']['image']}">`
}

////////////////// TEAM
/** 
 * Returns the priority template with image in the footer container of a ticket.
 * @param {number} j - j is the row or the ticket-number in that column
 * @param {number} n - n is the column number starting at 0 
 */
function renderContactPlaceholder(k,column,ticket,content) {
    if (k < boardColumns[column][ticket]['team'].length) {
        content.innerHTML += `<div class="ticket-contact contact-placeholder">+${getRestNumberOfMembers(column, ticket)}</div>`;
    }
}

////////////////// ONHOLD

/** 
 * That function is for rendering an empty div-template in every column in board, after the column content is rendered. 
 * Its used and showed when the user drag-and-drop a ticket. It shows a target area where the ticket can be dropped. 
 */
function renderOnholdTicketTarget() {
    let content;
    for (let i = 0; i < boardColumns.length; i++) {   
        content = document.getElementById(`board-column-${i}`);
        content.innerHTML += `<div class="onhold-container-last w-100" id="onhold-container-column-${i}-last"></div>`;
    }
}

/** 
 * That function is for rendering an empty div-template in every column in board, before the column content is rendered.
 * Its used and showed when the user drag-and-drop a ticket. It shows a target area where the ticket can be dropped (in responsive view).
 * @param {number} i - i is the index of a board column starting at 0 
 */
function renderOnholdTicketTargetResponsive(i) {
    let content;  
    content = document.getElementById(`board-column-${i}`);
    content.innerHTML = `<div class="onhold-container-first w-100" id="onhold-container-column-${i}-first"></div>`;
}