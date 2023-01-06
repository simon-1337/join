/** 
 * That object is important to store data for displaying the user-profil in the top right corner on the header (not important if guest-login used)
 * Familiar functions: setCurrentUserHeaderData(user) (access.js), anyCurrentUserHeaderData()
 */
let currentUserHeaderData = {
    'abbreviation': '',
    'color': '',
};

/** 
 * That variable is important in summary.js to display the greeting.
 */
let guestUser = false;

/**
 * Data to load on every page the header-profile, if user is registered
 * @param {JSON} user - json object/user info, that is registered.
 */
function setCurrentUserHeaderData(user) {
    currentUserHeaderData['abbreviation'] = user['abbreviation'];
    currentUserHeaderData['color'] = user['color'];
    localStorage.setItem('currentUserHeaderData', JSON.stringify(currentUserHeaderData));
}

/** 
 * That function is for getting user information to display the user profile in the header top right corner. 
 */
function anyCurrentUserHeaderData() {
    let currentUserHeaderDataAsText = localStorage.getItem('currentUserHeaderData') || '';
    if(currentUserHeaderDataAsText) {
        currentUserHeaderData['abbreviation'] = JSON.parse(currentUserHeaderDataAsText).abbreviation;
        currentUserHeaderData['color'] = JSON.parse(currentUserHeaderDataAsText).color;
        return true;
    } else return false;
}

/** 
 * That function will be executed when someone logins as guest on the index.html page. 
 */
function setGuestUser() {
    guestUser = true;
    localStorage.setItem('guestUser', JSON.stringify(guestUser));
    window.location.href = 'summary.html';
}

/** 
 * That function is important to check if someone is loggid in as guest. 
 */
function isGuestUser() {
    guestUser = localStorage.getItem('guestUser') || '';
    if(guestUser) return true;
    else return false;
}