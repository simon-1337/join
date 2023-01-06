Global

Members

alphabet
That variable is important to get an alphabetic order in the contacts list. Familiar functions: filterContacts(list)
Source:
script.js, line 89

colors
Array for choosing a random color out of this array. Find it in contacts.js Familiar functions: addColorToContact(identifier)
Source:
script.js, line 83

contactValues
That object is important to for the scroll function, after editting or creating a new contact in "contacts" Familiar functions: settingContactValuesGlobaly(index, letter, number), cleanContactValues()
Source:
script.js, line 60

createdContactName
That variable is important to scroll to the new contact after creating it. Find it in contacts.js. Familiar functions: filerContacts()
Source:
script.js, line 70

edittingNewContact
This two variables are important for loading the right templates and buttons, if a contact will be editted or not (creating new contact). Familiar functions: settingValuesForEdittingContact(index), cleanValuesForEdittingContact()
Source:
script.js, line 76

hiddenTickets
That array is important when using the board searchbar for searching a ticket and than editting it. After the board reloads, only the search results are still visible, because the hiden tickets are pushed before to 'hiddenTickets'.
Source:
script.js, line 34

newContact
That object is important when creating a new contact in contacts. Familiar functions: addAllInputValuesToContact()
Source:
script.js, line 48

priorities
That object is used in AddTask when creating a new task. Familiar functions: templatePrioritySelection(i), changeSelectedPrioBtn(i), resetOtherPrioBtns(i)
Source:
script.js, line 8

taskEditted
That variable is important in board.html when closing the ticket info popup. When the ticket was editted, the board needs to be reloaded.
Source:
script.js, line 39

Methods
URLequalsAddTaskHtml()
That function checks if the current site is equal to the add_taks.html url. If yes, it returns true.
Source:
script.js, line 315

Returns:
a boolean
(async) addBoard()
That function adds the boardColumns array to the server database and overwrites previous saved data on the server.
Source:
script.js, line 244

addClasslist(id, classe)
That function is a smaller helpfull function to add a class name to an element.
Parameters:
Name	Type	Description
id	string	id is the id of an element to which we want add a class to
classe	string	classe is a class name, that we want to add to the element
Source:
script.js, line 264

(async) addContact()
That function adds the contacts array to the server database and overwrites previous saved data on the server.
Source:
script.js, line 237

(async) deleteServerData()
That function helps us do delete all server-data, if we want to test for functionality.
Source:
script.js, line 150

doNotClose(event)
That function is needed in most popups, that have a close event onlick on the background. That function prevents the popup to close, if we click right on the popup.
Parameters:
Name	Type	Description
event	event	
Source:
script.js, line 282

getIndexOfCurrentUser()
That function gets the index of the current logged-in user by looping through usersContact and comparing the (in localstorage) stored email address.
Source:
script.js, line 328

getNameLetters(name)
That function gets the abbreviation of a given name (shortletter).
Parameters:
Name	Type	Description
name	string	name is a user/contact name
Source:
script.js, line 291

Returns:
an abbreviation, to letter from the name in uppercase.
getRandomNumberFromZeroToNine()
Returns a random integer from 0 to 9: Math.random returns a number lower than 1 Math.floor makes the decimal number to a 'no decimal' number 10 is the number of values we want, beginning from 0 Using this function to get a random color out of the array 'colors'
Source:
script.js, line 306

initAddtask(value)
That function is the site related init function with site related navbar-marking and content.
Parameters:
Name	Type	Description
value	string	value is the a site related number for marking the right navbar element, when entering that site.
Source:
script.js, line 204

initBoard(value)
That function is the site related init function with site related navbar-marking and content.
Parameters:
Name	Type	Description
value	string	value is the a site related number for marking the right navbar element, when entering that site.
Source:
script.js, line 194

initContacts(value)
That function is the site related init function with site related navbar-marking and content.
Parameters:
Name	Type	Description
value	string	value is the a site related number for marking the right navbar element, when entering that site.
Source:
script.js, line 214

initSummary(value)
That function is the site related init function with site related navbar-marking and content.
Parameters:
Name	Type	Description
value	number	value is the a site related number for marking the right navbar element, when entering that site.
Source:
script.js, line 182

isLoggedInn()
That function checks, if there are any login (signed-in user or guest) related data. If not, the user will be put back to the login site (index.html).
Source:
script.js, line 225

(async) loadJSONFromServer()
Loads a JSON or JSON Array to the Server payload {JSON | Array} - The payload you want to store
Source:
mini_backend.js, line 39

markNavItem(n)
That function marks the category/tab in the navbar on the same page.
Parameters:
Name	Type	Description
n	number	The id of the category/tab in the nav
Source:
script.js, line 108

removeClasslist(id, classe)
That function is a smaller helpfull function to remove a class name from an element.
Parameters:
Name	Type	Description
id	string	id is the id of an element from which we want remove a class from
classe	string	classe is a class name, that we want to remove from the element
Source:
script.js, line 273

renderNavAndHeader()
This function renders the navbar and the header. Almost on every site.
Source:
script.js, line 173

renderResponsiveHeaderTitle()
That function add a title-template into the content-container (in responsive view)
Source:
script.js, line 126

renderSiteRelatedTemplate()
That function renders the site (url) related templates.
Source:
script.js, line 161

saveJSONToServer()
Saves a JSON or JSON Array to the Server
Source:
mini_backend.js, line 79

unmarkAllNAvItems()
That function unmarks all categories/tabs in the navbar.
Source:
script.js, line 117