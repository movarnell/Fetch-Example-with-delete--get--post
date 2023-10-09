// NOTE - here is the URL for the mock API endpoint.
let URL = "https://6470f94a3de51400f72530fe.mockapi.io/users";
// NOTE - here is where the info pulled from MockAPI will be stored.
let users = [];
// NOTE - submit button event listner.
document.getElementById("submitBtn").addEventListener("click", addUser);

// NOTE - this function will be called when the page loads.
// SECTION - this is the function that will be called when the page loads and will call the getUsers Function to get the data from the MockAPI.
function getUsers() {
  // REVIEW - this is the fetch function. It will make a GET request to the URL above.
  fetch(URL)
    // REVIEW - this is the promise. It will return a response.
    .then((response) => {
      // REVIEW - this is the response. It will return the response in JSON format.
      return response.json();
    })
    // REVIEW - this is the promise. It will return the response in JSON format.
    .then((data) => {
      // REVIEW - this is the data. It will return the data in JSON format.
      users = data;
      console.log(users);
      // REVIEW - this is the function that will display the data on the page.
      displayUsers();
    })
    // REVIEW - this is the promise. It will return an error if the fetch fails.
    .catch((error) => {
      console.log(error);
    });
}
//!SECTION - End of getUsers Function

//SECTION - Add User Function
// REVIEW - this function will be called when the user clicks the "Add User" button.
function addUser(e) {
    //NOTE - This will prevent the page from refreshing when the user clicks the "Add User" button. If the page refreshes, the data will be lost before it can be sent to the API and then displayed on the page. It cancels the API call. 
 (e).preventDefault();
  // REVIEW - this is the variable that will store the user's name.
  let name = document.getElementById("name").value;
  // REVIEW - this is the variable that will store the user's age.
  let age = document.getElementById("age").value;


  // REVIEW - this is the fetch function. It will make a POST request to the URL above.
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // REVIEW - JSON.stringify will convert the data into a string.
    body: JSON.stringify({
      name: name,
      age: age,
    }),
  })
    // REVIEW - This is the promise. It will return a response.
    .then((response) => {
      return response.json();
    })
    // REVIEW - This will push the data to the users array and then run the displayUsers function.
    .then((data) => {
      users.push(data);
      displayUsers();
    })
    .then(() => {
      // REVIEW - this will clear the input fields.
      document.getElementById("name").value = "";
      document.getElementById("age").value = "";
    })
    .catch((error) => {
      console.log(error);
    });
}
//!SECTION - End of Add User Function

//SECTION - Delete User Function
// REVIEW - this function will be called when the user clicks the "Delete User" button.
function deleteUser(id) {
    // REVIEW - this is the fetch function. It will make a DELETE request to the URL above.
    fetch(`${URL}/${id}`, {
        method: "DELETE",
    })
    // REVIEW - this is the promise. It will return a response.
    .then((response) => {
        return response.json();
    })
    // REVIEW - this will filter out the user that was deleted and then run the displayUsers function.
    .then(() => {
        users = users.filter((user) => user.id != id);
        displayUsers();
    })
    .catch((error) => {
        console.log(error);
    });
}
//!SECTION - End of Delete User Function

function displayUsers() {
  if(document.getElementById("outputList").hasChildNodes()) {
    document.getElementById("outputList").innerHTML = "";
  }
  


  if (users.length > 0) {
    // append users to the DOM list as list elements
    for (let i = 0; i < users.length; i++) {
      // create the list element
      let li = document.createElement("li");
      // set the text of the list element to the user's name
      li.innerText = `${users[i].name} is ${users[i].age} years old.`;
      li.className = "list-group-item";
      // append the list element to the DOM list
      outputList.appendChild(li);
      // add a button to delete the user
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete User";
        deleteBtn.setAttribute("onclick", `deleteUser(${users[i].id})`);
        li.appendChild(deleteBtn);
      deleteBtn.style.float = "right";
      deleteBtn.className = "btn btn-danger btn-sm";
      outputList.style.fontSize = "1rem";
      outputList.style.textAlign = "center";
      outputList.style.listStyle = "none";
      outputList.className = "list-group list-group-flush";
      
    }

  } else {
    outputList.innerHTML = "No users to display";
    outputList.style.fontSize = "2rem";
    outputList.style.textAlign = "center";
  }
}
// NOTE - this is the function that will be called when the page loads.
getUsers();
