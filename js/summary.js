// #### SUMMARY ####
let months = ['January','February','March','April','May','Jun','Jul','August','September','October','November','December', 'Nothing here'];
let today;
let hour;


/**
 * This function is used to greet the user by his name and also with the correct phrase according to the current time
 */
function greet() {
    getCurrentTime();
    if(guestUser) {
        insertGuestUser();
    } else {
        insertLoggedUser();
    }
    resolveGreetingTime();
}


/**
 * This function is used to get the current time (later used for greeting the user)
 */
function getCurrentTime() {
    today = new Date();
    hour = today.getHours();
}


/**
 * This function is used to insert the Guest in the greeting text
 */
function insertGuestUser() {
    document.getElementById('user').innerHTML = `Guest`;
    document.getElementById('user2').innerHTML = `Guest`;
}


/**
 * This function is used to insert the name of the user in the greeting text
 */
function insertLoggedUser() {
    document.getElementById('user').innerHTML = getUserName();
    document.getElementById('user2').innerHTML = getUserName();
}


/** 
 * That function gehts the current user name, if a user is logged in with a password.
 * Its is necessary for greeting the user on the summary.html page. 
 */
function getUserName() {
    return usersContact[indexOfCurrentUser]['name'];
}


/**
 * This function is used to use the correct phrase to greet someone depending on the time
 */
function resolveGreetingTime() {
    if (timeIsMorning()) {
        insertGreetingText('Good morning,')
    } else if (timeIsDay()) {
        insertGreetingText('Good day,')
    } else if(timeIsEvening()) {
        insertGreetingText('Good evening,')
    }
}


/**
 * This function is used question if the current time is in the morning
 * 
 * @returns a condition which is true when the hour is smaller 11 and greater or equal 07
 */
function timeIsMorning() {
    return hour < 11 && hour >= 07
}


/**
 * This function is used question if the current time is between morning and evening
 * 
 * @returns a condition which is true when the hour is greater or equal 11 and smaller or equal 18
 */
function timeIsDay() {
    return hour >= 11 && hour < 18
}


/**
 * This function is used question if the current time is in the evening
 * 
 * @returns a condition which is true when the hour is greater or equal 18
 */
function timeIsEvening() {
    return hour >= 18
}


/**
 * This function is used to insert the greeting text (e.g. Good morning,) in the HTML
 * 
 * @param {*} text 
 */
function insertGreetingText(text) {
    document.getElementById('greet').innerHTML = text;
    document.getElementById('greet2').innerHTML = text;
}


/**
 * This function renders informations about the number of tasks in the categories 
 */
function renderSummary() {
    document.getElementById('task-count1').innerHTML = `${getNumberOfAllTasks()}`;
    document.getElementById('task-count2').innerHTML = `${boardColumns[1].length}`;
    document.getElementById('task-count3').innerHTML = `${boardColumns[2].length}`;

    document.getElementById('task-info-count').innerHTML = `${boardColumns[0].length}`;
    document.getElementById('task-info-count2').innerHTML = `${boardColumns[3].length}`;   

    filterPriorities();
}


/** 
 * This function returns the number of all tasks in board 
 */
function getNumberOfAllTasks() {
    let tasks = 0;
    for (let i = 0; i < boardColumns.length; i++) tasks += (boardColumns[i].length);
    return tasks;
}


let urgent = 0;
let mid = 0;
let low = 0;
let upcomingDeadline = 0;


/** 
 * That function checks if a priority is existing and filters the right date after that. 
 */
function filterPriorities() {
    if(filterPrios('Urgent')) filterDate('Urgent');
    else if(filterPrios('Medium') > filterPrios('Low')) filterDate('Medium');
    else filterDate('Low');
    renderPriorityContainer(upcomingDeadline);
}


/** 
 * That function checks the available priorities of all tickets. 
 * 
 * @param {string} prios - prios is a string of the priority name 
 */
function filterPrios(prio) {
    // boardColumns.length - 1 -> because the tasks in done should not be counted
    for (let i = 0; i < boardColumns.length - 1; i++) filterLoopPrios(prio, i);
    if(prio == 'Urgent') return urgent;
    else if(prio == 'Medium') return mid;
    else if(prio == 'Low') return low;
}


/** 
 * That function checks in a loop for the given prio (priority). 
 * 
 * @param {string} prios - prios is a string of the priority name 
 * @param {number} i - i is the index of the board column in boardColumns 
 */
function filterLoopPrios(prio, i) {
    if(boardColumns[i].length > 0) {
        for (let j = 0; j < boardColumns[i].length; j++) {
            if(boardColumns[i][j]['prior']['name'] == prio) {
                if(prio == 'Urgent') urgent++;
                else if(prio == 'Medium') mid++;
                else if(prio == 'Low') low++;
            }
        }
    }
}


/** 
 * That function filters the available dates of all, depending of the prio, tickets. 
 * 
 * @param {string} prios - prios is a string of the priority name 
 */
function filterDate(prio) {
    let dates = [];
    for (let i = 0; i < boardColumns.length; i++) 
        if(boardColumns[i].length > 0) 
            for(let j = 0; j < boardColumns[i].length; j++) 
                if(boardColumns[i][j]['prior']['name'] == prio) dates.push(boardColumns[i][j]['due-date'].toString());
    if(dates.length > 1) upcomingDeadline = getUpcomingDate(dates);
    else if(dates.length == 1) upcomingDeadline = dates[0].split('-');
    else upcomingDeadline = [[''],['13'],['']];
}


/** 
 * That function returns the next upcoming date.
 * 
 * @param {array} dates - dates is a array of due-dates (string) 
 */
function getUpcomingDate(dates) {
    let splittedDates = [];
    for (let i = 0; i < dates.length; i++) splittedDates.push(dates[i].split('-'));
    return orderDates(splittedDates);
}


/** 
 * That function gets splitted dates and compares the date years.
 * 
 * @param {array} dates - dates is a array of due-dates (string) 
 */
function orderDates(dates) {
    let currentDate = dates[0];
    for (let i = 1; i < dates.length; i++) {
        if(currentDate[0] > dates[i][0]) currentDate = dates[i];
        else if(currentDate[0] == dates[i][0]) currentDate = checkMonth(i, dates, currentDate);
    }
    return currentDate;
}


/** 
 * That function gets splitted dates and compares the date months.
 * 
 * @param {array} dates - dates is a array of due-dates (string) 
 * @param {number} i - i is the index of a date element in the date string 
 * @param {string} currentDate - currentDate is the current next upcoming date, which is compared to another date in the date array. 
 */
function checkMonth(i, dates, currentDate) {
    if(currentDate[1] > dates[i][1]) currentDate = dates[i];
    else if(currentDate[1] == dates[i][1]) currentDate = checkDay(i, dates, currentDate);
    return currentDate;
}


/** 
 * That function gets splitted dates and compares the date days.
 * 
 * @param {array} dates - dates is a array of due-dates (string) 
 * @param {number} i - i is the index of a date element in the date string 
 * @param {string} currentDate - currentDate is the current next upcoming date, which is compared to another date in the date array. 
 */
function checkDay(i, dates, currentDate) {
    if(currentDate[2] > dates[i][2]) currentDate = dates[i];
    return currentDate;
}


/** 
 * That function renders the priority, that will be displayed in summary.html in the middle section.
 * - If there is a task with prio urgent the priority tasks number will be shown
 * - Else either the mid or low priority tasks will be shown depending on the number 
 */
function renderPriorityContainer(j) {
    if(urgent >= 1) {
        displayUrgentPriority();
    } 
    else if(mid >= low) {
        displayMidPriority();
    } 
    else if(low > mid) {
        displayLowPriority();
    }
    document.getElementById('date').innerHTML = `${months[parseInt(j[1])-1]} ${j[2]}, ${j[0]}`;
}


/**
 * This function displays the number of tasks with priority urgent in the summary page
 */
function displayUrgentPriority() {
    document.getElementById('priority-Icon').src = 'assets/img/red.png';
    document.getElementById('priority-Icon').classList.add('priority-Icon');
    document.getElementById('priorities-radius').classList.remove('priorities-radius-mid');
    document.getElementById('priorities-radius').classList.remove('priorities-radius-low');
    document.getElementById('priorities-radius').classList.add('priorities-radius-urgent');
    document.getElementById('priority-count').innerHTML = `${urgent}`;
    document.getElementById('priority-text').innerHTML = `Urgent`;
}


/**
 * This function displays the number of tasks with priority mid in the summary page
 */
function displayMidPriority() {
    document.getElementById('priority-Icon').src = 'assets/img/orange.png';
    document.getElementById('priority-Icon').classList.add('priority-Icon');
    document.getElementById('priorities-radius').classList.remove('priorities-radius-urgent');
    document.getElementById('priorities-radius').classList.remove('priorities-radius-low');
    document.getElementById('priorities-radius').classList.add('priorities-radius-mid');
    document.getElementById('priority-count').innerHTML = `${mid}`;
    document.getElementById('priority-text').innerHTML = 'Mid';
}


/**
 * This function displays the number of tasks with priority low in the summary page
 */
function displayLowPriority() {
    document.getElementById('priority-Icon').src = 'assets/img/green.png';
    document.getElementById('priority-Icon').classList.add('priorities-Color');
    document.getElementById('priorities-radius').classList.remove('priorities-radius-urgent');
    document.getElementById('priorities-radius').classList.remove('priorities-radius-mid');
    document.getElementById('priorities-radius').classList.add('priorities-radius-low');
    document.getElementById('priority-count').innerHTML = `${low}`;
    document.getElementById('priority-text').innerHTML = 'Low';
}