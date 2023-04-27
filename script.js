let getAllData;

// get all user
function getUser() {

    fetch("http://localhost:8080/getUser/allUser").then((data) => {
        return data.json();
    }).then((objectData) => {
        getAllData = objectData;
        let userData = "";
        objectData.map((values) => {
            // for show contact list 
            let contactsList = '';
            values.contacts.forEach((contact, index) => {
                contactsList += contact.number;
                if (index !== values.contacts.length - 1) {
                    contactsList += ', ';
                }
            });

            userData += `<tr>
      <td>${values.firstName} ${values.lastName}</td>
      <td>${values.joiningDate}</td>
      <td>${values.age}</td>
      <td>${values.married}</td>
      <td>${values.address}</td>
      <td>${values.position}</td> 
      <td>${contactsList}</td>
      
      <td><button id="editButton" onclick="editFunction(${values.userId})"><i class="fa-solid fa-pen-to-square" style="color: #265cba;"></i></button> <button id="deleteButton" onclick="deleteFunction(${values.userId})"><i class="fa-solid fa-trash " style="color: #e00000;"></i></button></td>
      </tr>`;
        });
        document.getElementById("table_body").innerHTML = userData;
    })
};
getUser();


// get married user
function getMarriedUser() {

    fetch("http://localhost:8080/getUser/married").then((data) => {
        return data.json();
    }).then((objectData) => {
        let userData = "";
        objectData.map((values) => {
            // for show contact list 
            let contactsList = '';
            values.contacts.forEach((contact, index) => {
                contactsList += contact.number;
                if (index !== values.contacts.length - 1) {
                    contactsList += ', ';
                }
            });
            userData += `<tr>
      <td>${values.firstName} ${values.lastName}</td>
      <td>${values.joiningDate}</td>
      <td>${values.age}</td>
      <td>${values.married}</td>
      <td>${values.address}</td>
      <td>${values.position}</td> 
      <td>${contactsList}</td>
      <td><button id="editButton" onclick="editFunction(${values.userId})"><i class="fa-solid fa-pen-to-square" style="color: #265cba;"></i></button> <button id="deleteButton" onclick="deleteFunction(${values.userId})"><i class="fa-solid fa-trash " style="color: #e00000;"></i></button></td>
      </tr>`;

        });
        document.getElementById("table_body").innerHTML = userData;
    })
};


// get unMarried user
function getUnMarriedUser() {

    fetch("http://localhost:8080/getUser/unMarried").then((data) => {
        return data.json();
    }).then((objectData) => {
        // for show contact list 
        let userData = "";
        objectData.map((values) => {
            let contactsList = '';
            values.contacts.forEach((contact, index) => {
                contactsList += contact.number;
                if (index !== values.contacts.length - 1) {
                    contactsList += ', ';
                }
            });
            userData += `<tr>
      <td>${values.firstName} ${values.lastName}</td>
      <td>${values.joiningDate}</td>
      <td>${values.age}</td>
      <td>${values.married}</td>
      <td>${values.address}</td>
      <td>${values.position}</td> 
      <td>${contactsList}</td>
      <td><button id="editButton" onclick="editFunction(${values.userId})"><i class="fa-solid fa-pen-to-square" style="color: #265cba;"></i></button> <button id="deleteButton" onclick="deleteFunction(${values.userId})"><i class="fa-solid fa-trash " style="color: #e00000;"></i></button></td>
      </tr>`;

        });
        document.getElementById("table_body").innerHTML = userData;
    })
};


// dropdown selection
function selectType() {
    var user = document.getElementById("getUser");

    var value = user.options[user.selectedIndex].value;

    if (value == 1) {
        getMarriedUser();
    }
    else if (value == 2) {
        getUnMarriedUser();
    }
    else {
        getUser();
    }
};


// delete user
function deleteFunction(userId) {

    if (confirm("Are you sure??")) {
        fetch("http://localhost:8080/deleteUser/" + userId, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(res => console.log(res))
        window.location.reload();
    }
};

// for edit user
function editFunction(userId) {

    let a = getAllData.filter(ele => ele.userId == userId);
    console.log(a);
    if (a) {
        localStorage.setItem("userData", JSON.stringify(a[0]))
    }
    window.location.href = "form.html"
};