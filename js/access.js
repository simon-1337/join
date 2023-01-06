setURL('https://gruppe-348.developerakademie.net/smallest_backend_ever');

//Delete local Storage items
localStorage.removeItem('usersEmail');
localStorage.removeItem('currentUserHeaderData');
localStorage.removeItem('guestUser');

let users;
let usersContact;
let user;

async function inits() {
    await downloadFromServer();
    users =  await JSON.parse(backend.getItem('users')) || [];
    usersContact =  await JSON.parse(backend.getItem('usersContact')) || [];
}


/**
 * This function loads users data from the server
 * 
 * */ /*async function init() { 
       
        await downloadFromServer();
        users = JSON.parse(backend.getItem('users')) || [];
        user = JSON.parse(backend.getItem('currentUser'));
    }*/


/**
 * This function manages following:
 * - Checking if array is empty or not for various actions
 * 
 *  */ async function addUser() {
    let userName = document.getElementById('username');
    let email = document.getElementById('email');
    console.log('Email is,', email);
    let password = document.getElementById('password');

    let name= userName.value.split(' ');
    let firstLetter = name.toString().charAt(0).toUpperCase();
    let secondLetter = name[1].toString().charAt(0).toUpperCase();
    let initials = firstLetter + secondLetter;

        if(users.length == 0) {
            pushUser(userName, email, password, initials);
        } else {
            checkMail(userName, email, password, initials);
    
    }
}


/**
 * This function manages following:
 * - Checking typed email if user was already registered
 * - If email is unused checkmail() will redirect users typed information to pushuser()
 * 
 */function checkMail(userName, email, password, initials) {
if (users.find(o => o.email == email.value)) {
alert('Diese E-Mail ist bereits registriert!');
} else {
   /* let fullName = userName.split(' ');
    let initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    return initials.toUpperCase();*/

pushUser(userName, email, password, initials);
}
}




/**
 * This function manages following:
 * - pushing the typed informations into the array 'users'
 * - Clearing the inputfield after submitting the formular  
 * - Saving the new data in the backend
 * - Redirecting to the login site
 * 
 */async function pushUser(userName, email, password, initials) {

    let color = giveColor();


    let newUser = {
        'name':userName.value,
        'valid'   : false,
        'loggedIn': false,
        'abbreviation':initials,
        'email'   :email.value,
        'password':password.value,
        'phone'   :'',
        'color'   : color
    }


    let newUserContact = {
        'name':userName.value,
        'valid'   : false,
        'loggedIn': false,
        'abbreviation':initials,
        'email'   :email.value,
        'phone'   :'',
        'color'   : color
    }

    userName.value ='';
    email.value ='';
    password.value ='';
    
    users.push(newUser);
    usersContact.push(newUserContact);

    let allUsersAsString = JSON.stringify(users);
    await backend.setItem('users', allUsersAsString);
    let allUsersContactAsString = JSON.stringify(usersContact);
    await backend.setItem('usersContact', allUsersContactAsString);

    window.location.href = 'index.html?msg=Du hast dich erfolgreich registriert';
}

function giveColor() {
    let randomNumber1 = Math.floor(Math.random() * 10);
    let randomNumber2 = Math.floor(Math.random() * 10);
    let randomNumber3 = Math.floor(Math.random() * 10);
    let randomNumber4 = Math.floor(Math.random() * 10);
    let randomNumber5 = Math.floor(Math.random() * 10);
    let randomNumber6 = Math.floor(Math.random() * 10);
    return color =  '#' + randomNumber1 + randomNumber2 + randomNumber3 + randomNumber4 + randomNumber5 + randomNumber6;
}

function isLoggedIn() {

    let itemSet = localStorage.getItem('usersEmail');
    if(!itemSet) {
        window.location.href = 'index.html?msg=Du hast dich erfolgreich angemeldet';
    }
    }

/**
 * This function manages following:
 * - Checking if email and password are matching for a successfull login
 * - Redirecting user to the join main page
 * - If email and password are not matching, an error message will show up under the input field
 * 
 * */function login() {
  

    let usersEmail = document.getElementById('email');
    let password = document.getElementById('password');

    user = users.find(u => u.email == usersEmail.value && u.password == password.value);
    console.log(user);
    if(user) {
        console.log('user gefunden');

        localStorage.setItem('usersEmail', usersEmail.value);
        setCurrentUserHeaderData(user);
        console.log('user saved in key');
       
        window.location.href = 'summary.html?msg=Du hast dich erfolgreich angemeldet';

    

    } else {
        document.getElementById('indexError').classList.remove('d-none');
        document.getElementById('password').classList.add('border-color');
    }
}


let usersEmail;

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
 * */function load() {

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
 * */async function newPassword() {

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
 * */function preventRefresh() {
       newPassword();
       return false;
    }

    function preventRefreshForgot() {
        preventDefault();
        return false;
    }