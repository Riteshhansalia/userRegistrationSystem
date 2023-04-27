// clear validation message
function clearErrors() {
  errors = document.getElementsByClassName('formerror');
  for (let item of errors) {
    item.innerHTML = "";
  }
}

// show validation message
function seterror(id, error) {
  //sets error inside tag of id 
  element = document.getElementById(id);
  element.getElementsByClassName('formerror')[0].innerHTML = error;

}

// validate form 
function validateForm() {
  var returnval = true;
  clearErrors();

  // firstName validation
  var fname = document.forms['form']["firstName"].value;
  if (fname.length < 3) {
    seterror("fname", "*name is too short!");
    returnval = false;
  }
  if (fname.trim() === '') {
    seterror("fname", "*please fill name field!")
    returnval = false;
  }

  // lastName validation
  var lname = document.forms['form']["lastName"].value;
  if (lname.length < 3) {
    seterror("lname", "last name is too short!");
    returnval = false;
  }
  if (lname.trim() === '') {
    seterror("lname", "*please fill name field!")
    returnval = false;
  }

  // number validation
  var num1 = document.forms['form']["contacts[0].number"].value;
  var pattern = /^[0-9]{10}$/;
  if (!pattern.test(num1)) {
    seterror("num1", "*please enter valid number!");
    returnval = false;
  }

  var num2 = document.forms['form']["contacts[1].number"].value;
  if (!pattern.test(num2)) {
    seterror("num2", "*please enter valid number!");
    returnval = false;
  }

  // joiningDate validation
  
  var date = document.forms['form']["joiningDate"].value;
  const inputDate = new Date(date);
  const currentDate = new Date();
  if (inputDate > currentDate) {
    seterror("Date", "*can't input future date!");
    returnval = false;
  }
  if(inputDate == "null"){
    seterror("Date", "*please select date!");
    returnval = false;
  }


  // agge validation
  var age = document.forms['form']["age"].value;
  const ageValue = parseInt(age);
  if (ageValue < 18 || age.trim() === '') {
    seterror("Age", "*Age must be above 18!");
    returnval = false;
  }

  // address validation
  var address = document.forms['form']["address"].value;
  if (address.length < 5) {
    seterror("Address", "*please enter valid address!");
    returnval = false;
  }

  return returnval;
}


// store local storage object to variable
let user = JSON.parse(localStorage.getItem("userData"));


// for changing button submit to update at updating existing userData
if (user) {
  document.getElementById("submit").style.display = "none";
} else {
  document.getElementById("update").style.display = "none";
}


const form = document.getElementById('form');

// for add new user
function onAdd() {
  const data = new FormData(form);
  const payload = {};
  // two contact number to store in one list
  for (const [key, value] of data.entries()) {

    if (key === 'contacts[0].number' || key === 'contacts[1].number') {
      if (!payload.contacts) {
        payload.contacts = [{ number: value }];
      } else {
        payload.contacts.push({ number: value });
      }
    } else {
      payload[key] = value;
    }
  }
  console.log(payload);
  if (validateForm()) {

    fetch("http://localhost:8080/addUser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        window.location.href = 'index.html';
      })
  }
};

// existing data put to form at update time
function putData() {
  if (user) {
    // document.getElementById('userId').value = user.userId;
    document.getElementById('firstName').value = user.firstName;
    document.getElementById('lastName').value = user.lastName;
    document.getElementById('joiningDate').value = user.joiningDate;
    document.getElementById('age').value = user.age;
    document.getElementById('address').value = user.address;
    document.getElementById('position').value = user.position;
    document.getElementById('number').value = user.contacts[0].number;
    document.getElementById('number1').value = user.contacts[1].number;
    document.querySelector(`input[name="married"][value="${user.married}"]`).checked = true;
  }
}

// update user using existing userdata
function onUpdate() {
  const data = new FormData(form);

  const payload = {};

  for (const [key, value] of data.entries()) {
    if (key === 'contacts[0].number') {
      if (!payload.contacts) {
        payload.contacts = [{ number: value, contactId: user.contacts[0].contactId }];
      } else {
        payload.contacts.push({ number: value, contactId: user.contacts[0].contactId });
      }
    } else if (key === 'contacts[1].number') {
      if (!payload.contacts) {
        payload.contacts = [{ number: value, contactId: user.contacts[1].contactId }];
      } else {
        payload.contacts.push({ number: value, contactId: user.contacts[1].contactId });
      }
    } else {
      payload[key] = value;
    }
  }

  if (validateForm()) {

    fetch("http://localhost:8080/updateUser/" + user.userId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(data => {
        console.log('Success:', data);
        window.location.href = 'index.html';
      });
    localStorage.removeItem('userData')
  }
};
