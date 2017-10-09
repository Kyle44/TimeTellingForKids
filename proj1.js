/* Name: Kyle Fritz
   File: proj1.js
   Date Created: 3/8/17
   Description: JS file to accompany proj1.html. This file focuses on switching screens and adding data to the studentTable element.
   Reference for adding data to table: https://www.w3schools.com/jsref/met_table_insertrow.asp
*/

// Get the name of the person playing currently
function getName() {
  return document.getElementById("name").value;
}

// Remove a page from view, using input string pageId
function removePage(pageId) {
  var page = document.getElementById(pageId);
  page.setAttribute("style", "display: none");
}

// Display a new page to the screen, using input string pageId
function displayPage(pageId) {
  var page = document.getElementById(pageId);
  page.setAttribute("style", "display: block");
}

// After a correct password, display the student table
function viewTable() {
  removePage("passwordPage");
  displayPage("studentTablePage");
}

// Used in 2 scenarios, so removing both pages from the screen. Then the input page is displayed.
function returnToStart() {
  removePage("studentTablePage"); // if viewing table
  removePage("wrongPasswordPage"); // if wrong password inputted

  displayPage("studentInputPage");
}

// User typed in the wrong password
function wrongPassword() {
  removePage("passwordPage");
  displayPage("wrongPasswordPage");
}

// Check the password to see if it is correct. Display the appropriate page.
function reviewPassword() {
  var password = document.getElementById("password").value; // get password value

  if (password == "kminyf657"){
    viewTable();
  }
  else{
    wrongPassword();
  }
}

// When the "View Table" button is clicked, remove the clockPage from view and display the passwordPage
function typePassword() {
  removePage("studentInputPage");
  displayPage("passwordPage");
}

// Add the correct data to the student table
function addDataToTable(){
  var name = getName(); // from level.js
  var table = document.getElementById("studentTable");
  var row = table.insertRow(-1); // Create an empty <tr> element and add it to the last position of the table

  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);

  // Add some text to the new cells:
  cell1.innerHTML = name;
  cell2.innerHTML = totalCorrectAnswers + "/" + totalAnswers + " = " + studentGrade + "%"; // variables from level.js
}

// After a game ends, add data to the student table, then switch pages and reset the game for the next user
function returnToHomescreen() {
  if(studentGrade > 100){ // studentGrade defined in level.js
    studentGrade = 100;
  }
  addDataToTable();
  removePage("clockPage");
  displayPage("studentInputPage");
  resetGame(); // from level.js
}

// When the student clicks "Submit" on the opening page: Add their name to the table, remove studentInputPage from view, display the clockPage
function submitName() {
  removePage("studentInputPage");
  displayPage("clockPage");
}