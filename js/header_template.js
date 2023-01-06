/** 
 * That function renders the header. 
 */
function renderHeader() {
    let content = document.getElementById('header');
    content.innerHTML = templateHeader();
    if(anyCurrentUserHeaderData()) showUserInHeader();
    else showGuestUserInHeader();
}

/** 
 * Returns the header template. 
 */
function templateHeader() {
    return `<p class="header-title cursor-d">Kanban Project Management Tool</p>
            <div class="header-right-corner flex" id="header-right-corner">
                <a href="help.html"><img class="help-img cursor-p" src="assets/img/question-mark-icon.png"></a>
                <a class="logo-img-resp absolute" href="summary.html"><img class="logo-img-resp" src="assets/img/logo-big2.png"></a>
            </div>
            <div class="header-right-corner-addTask flex" id="header-right-corner-addTask">
            <a class="logo-img-resp absolute" href="summary.html"><img class="logo-img-resp" src="assets/img/logo-big2.png"></a>
                <button form="myform" value="update" class="create-btn-responsive">
                    Create
                    <img src="./assets/img/check-small.png">
                </button>
            </div>`;
}

/** 
 * That function shows the right user profile in the header top right corner, if a user is logged in with password. 
 */
function showUserInHeader() {
    let header = document.getElementById(`header-right-corner`);
    header.innerHTML += templateHeaderProfileContainer();
    document.getElementById(`header-profil-container-user`).style.backgroundColor = `${currentUserHeaderData['color']}`;
    document.getElementById(`header-profil-container-user-abbreviation`).style.color = `${currentUserHeaderData['color']}`;
    document.getElementById(`header-profil-container-user-abbreviation`).style.border = `2px solid ${currentUserHeaderData['color']}`;
    document.getElementById(`header-profil-container-user-abbreviation`).style.filter = `invert(1)`;
    
}

/** 
 * Returns the header profile container template. 
 */
function templateHeaderProfileContainer() {
    return `<div class="header-profil-container flex cursor-p" id="header-profil-container-user" onclick="openHeaderMenuPopup()">
                <p class="header-profil flex " id="header-profil-container-user-abbreviation">${currentUserHeaderData['abbreviation']}</p>
            </div>`;
}

/** 
 * That function renders the guest user profile in the header top right corner. 
 */
function showGuestUserInHeader() {
    let header = document.getElementById(`header-right-corner`);
    header.innerHTML += `<div class="header-profil-container flex cursor-p" id="header-profil-container" onclick="openHeaderMenuPopup()"><img class="header-profil" src="assets/img/add-contact-icon.png"></div>`;
}