setURL('https://simon-besenbaeck.developerakademie.net/smallest_backend_ever');
//Delete local Storage items
localStorage.removeItem('usersEmail');
localStorage.removeItem('currentUserHeaderData');
localStorage.removeItem('guestUser');

let users;
let usersContact;
let user;
let usersEmail;

let newUser = {
    'name': '',
    'abbreviation':'',
    'email'   : '',
    'password': '',
    'phone'   :'',
    'color'   : ``
}

let newUserContact = {
    'name': '',
    'abbreviation': '',
    'email'   : '',
    'phone'   : '',
    'color'   : ''
}

async function inits() {
    await downloadFromServer();
    users =  await JSON.parse(backend.getItem('users')) || [];
    usersContact =  await JSON.parse(backend.getItem('usersContact')) || [];
    console.clear();
}

/**
 * This function manages following:
 * - Checking if array is empty or not for various actions
 * 
 */ 
async function addUser() {
    let userName = document.getElementById('username');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    userName = checkAndGetName(userName);
    let initials = getNameLetters(userName);
    if(users.length == 0) await pushUser(userName, email, password, initials);
    else await checkMail(userName, email, password, initials);
    console.clear();
}

/** That function checks if the user name inlcudes two or only one name. If its only one name, it defines a shortletter as second name. */
function checkAndGetName(userName) {
    let name = userName.value.split(' ');
    name[0] = name[0].slice(0, 1).toUpperCase() + name[0].slice(1);
    if(name.length == 1) return name[0] + ' ' + name[0].charAt(0);
    else {
        name[1] = name[1].slice(0, 1).toUpperCase() + name[1].slice(1);
        return name[0] + ' ' + name[1];
    }

}

/**
 * That function renders a to digit shortletter, that are seen in the board ticket or when signed in, in the header top right corner.
 * @returns 
 */
function getNameLetters(userName) {
    let name = userName.split(' ');
    let firstLetter = name.toString().charAt(0).toUpperCase();
    let secondLetter = name[1].toString().charAt(0).toUpperCase();
    return firstLetter + secondLetter;
}

/**
 * This function manages following:
 * - Checking typed email if user was already registered
 * - If email is unused checkmail() will redirect users typed information to pushuser()
 * 
 */
async function checkMail(userName, email, password, initials) {
    if (users.find(o => o.email == email.value)) alert('Diese E-Mail ist bereits registriert!');
    else await pushUser(userName, email, password, initials);
}

/**
 * This function manages following:
 * - pushing the typed informations into the array 'users'
 * - Clearing the inputfield after submitting the formular  
 * - Saving the new data in the backend
 * - Redirecting to the login site
 * 
 */
async function pushUser(userName, email, password, initials) {
    let color = giveColor();
    addingValuesToUser(userName, email, password, initials , color)
    addingValuesToUsersContact(userName, email, initials, color)
    userName ='';
    email.value ='';
    password.value ='';
    await pushAndAddUsers(newUser, newUserContact);
    window.location.href = 'index.html?msg=Du hast dich erfolgreich registriert';
}

/**
 * That function adds the input values to the 'newUser' object-keys.
 */
function addingValuesToUser(userName, email, password, initials, color) {
    newUser['name'] = userName;
    newUser['abbreviation'] = initials;
    newUser['email'] = email.value;
    newUser['password'] = password.value;
    newUser['color'] = color;
}

/**
 * That function adds the input values to the 'newUserContact' object-keys.
 */
function addingValuesToUsersContact(userName, email, initials, color) {
    newUserContact['name'] = userName;
    newUserContact['abbreviation'] = initials;
    newUserContact['email'] = email.value;
    newUserContact['color'] = color;
}

/**
 * That function pushes the new signed user to an array before adding that array to the backend database.
 * @param {array} object1 - users array with password info
 * @param {array} object2 - userContact array (like users) but without password stored
 */
async function pushAndAddUsers(object1, object2) {
    users.push(object1);
    usersContact.push(object2);
    let allUsersAsString = JSON.stringify(users);
    await backend.setItem('users', allUsersAsString);
    let allUsersContactAsString = JSON.stringify(usersContact);
    await backend.setItem('usersContact', allUsersContactAsString);
}

/**
 * That function renders a random colorcode using the math.floor(math.random()*10) method.
 * @returns a color code in hexadecimal
 */
function giveColor() {
    let randomNumber1 = Math.floor(Math.random() * 10);
    let randomNumber2 = Math.floor(Math.random() * 10);
    let randomNumber3 = Math.floor(Math.random() * 10);
    let randomNumber4 = Math.floor(Math.random() * 10);
    let randomNumber5 = Math.floor(Math.random() * 10);
    let randomNumber6 = Math.floor(Math.random() * 10);
    return color =  '#' + randomNumber1 + randomNumber2 + randomNumber3 + randomNumber4 + randomNumber5 + randomNumber6;
}

// function isLoggedIn() {
//     let itemSet = localStorage.getItem('usersEmail');
//     if(!itemSet) window.location.href = 'index.html?msg=Du hast dich erfolgreich angemeldet';
// }

/**
 * This function manages following:
 * - Checking if email and password are matching for a successfull login
 * - Redirecting user to the join main page
 * - If email and password are not matching, an error message will show up under the input field
 * 
 * */
function login() {
    let usersEmail = document.getElementById('email');
    let password = document.getElementById('password');
    user = users.find(u => u.email == usersEmail.value && u.password == password.value);
    if(user) {
        localStorage.setItem('usersEmail', usersEmail.value);
        setCurrentUserHeaderData(user);
        window.location.href = 'summary.html?msg=Du hast dich erfolgreich angemeldet';
    } else {
        document.getElementById('indexError').classList.remove('d-none');
        document.getElementById('password').classList.add('border-color');
    }
}

/**
 * This function manages following:
 * - Saves the email typed from the forgot_password.html for further verification in reset_Password.html
 * - Redirecting user to reset_password.html to reset his password
 * - If email doesn't exist, an error message will show up under the input field
 * */
function giveID() {
    usersEmail = document.getElementById('forgotEmail').value;
    if (users.find(o => o.email == usersEmail)) {
        localStorage.setItem('usersEmail', usersEmail); 
        document.getElementById('forgotPopup').classList.add("flex");
        setTimeout(function() {
            window.location.href = 'reset_password.html?msg=Du hast dich erfolgreich angemeldet';
        }, 1500);
    } else { 
        document.getElementById('forgotError').classList.remove('d-none');
        document.getElementById('forgotEmail').classList.add('border-color');
    }
}


async function onSubmit(event) {
    event.preventDefault();
    giveID(); 
    let formData = new FormData(event.target);
    let response = await action(formData);
    if(response.ok) 
    console.log('email was send!');
    else
    alert('Email not send!');
}


function action(formData) {
    const input = 'https://gruppe-348.developerakademie.net/join/send_mail.php';
    const requestInit = {
        method: 'post',
        body: formData
    };
    return fetch(
        input,
        requestInit
        );
}

function sendData() {
    
}


/**
 * This function manages following:
 * - Loads the typed email saved from the give() function for the verification process in newPassword()
 *
 * */
function load() {
    usersEmail = localStorage.getItem('usersEmail');
}

let userArray;
let changedPassword;




/**
 * This function manages following:
 * - Making sure the passwords from reset_password.html got matched together to create the new password
 * - filtering the exact object in the array where the typed email from forgot_password.html is located at to change the password of the user
 * - Saving the new password in the backend
 * - Redirecting user to the login page
 * - If the passwords are not matching, an error message will show up under the input field
 * 
 * */
async function newPassword() {
    let newPassword = document.getElementById('newPassword').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    for (let u = 0; u < users.length; u++) {
        userArray = users[u];
        if(newPassword == confirmPassword) {
            console.log('Email identified and password matched');
            changedPassword  = confirmPassword;
            console.log('The new password is,', changedPassword);
            if (users[u].email == usersEmail) {
                users[u].password = changedPassword;
                let allUsersAsString = JSON.stringify(users);
                await backend.setItem('users', allUsersAsString);

                document.getElementById('resetPopup').classList.add("flex");
                setTimeout(function() {
                window.location.href = 'reset_password.html?msg=Du hast dich erfolgreich angemeldet';
                }, 1500);
            }
        }
    }

    if(newPassword !== confirmPassword && users.find(o => o.email !== usersEmail)) {
        document.getElementById('resetError').classList.remove('d-none');
        document.getElementById('confirmPassword').classList.add('border-color');
    }
}


/**
 * This function manages following:
 * - Prevents the form from refreshing the page
 * 
 * */
function preventRefresh() {
    newPassword();
    return false;
}

function preventRefreshForgot() {
    preventDefault();
    return false;
}