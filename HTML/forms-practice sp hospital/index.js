var age;

function printDetails(){
    var firstName = document.getElementById("firstName").value;
    console.log("First name" + firstName);
    var lastName = document.getElementById("SecondName").value;
    console.log("Last name: " + lastName);
    age = document.getElementById("age").value;
    console.log("Age: " + age);
    var address = document.getElementById("address").value;
    console.log("Address: " + address);
    var phoneNumber = document.getElementById("phoneNumber").value;
    console.log("Phone number: " + phoneNumber);
    var radioBox = document.getElementById("radioBoxm");
    if(radioBox.checked)
    {
        console.log("Checked")
    }
    else{
        console.log("not checked")
    }
    var radioBox = document.getElementById("radioBoxfm");
    if(radioBox.checked)
    {
        console.log("Checked")
    }
    else{
        console.log("not checked")
    }

    document.getElementById("firstName").remove();
    document.getElementById("SecondName").remove();
    document.getElementById("age").remove();
    document.getElementById("address").remove();
    document.getElementById("phoneNumber").remove();
    document.getElementById("btn").remove();

    document.getElementById("form-tl").innerHTML = "Registered Successfully!";


    let menu = document.getElementById('form-tl');
    let h1 = document.createElement('h3');
    h1.setAttribute("id", "tSestID");
    h1.innerHTML = "<div><h3 id='display-id'>First Name: " + firstName + "</h3>" + 
    "<h3 id='display-id'>Last Name: " + lastName + "</h3>" +
    "<h3 id='display-id'>Age: " + age + "</h3>" +
    "<h3 id='display-id'>Address: " + address + "</h3>" + 
    "<h3 id='display-id'>Phone number: " + phoneNumber + "</h3>" + 
    "</div>";
    insertAfter(h1,  menu);
    function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

    
    
}





// let menu = document.getElementById('form-tl');
    // let h1 = document.createElement('h3');
    // h1.setAttribute("id", "testID");
    // h1.textContent = 'Name: ' + firstName;
    // insertAfter(h1,  menu);

    // let menu2 = document.getElementById('testID');
    // let h1a = document.createElement('h3');
    // h1.textContent = 'SecondName: ' + lastName;
    // insertAfter(h1a,  menu2);

    // let h1b = document.createElement('h3');
    // h1.textContent = 'Age: ' + age;
    // insertAfter(h1b,  menu);

    // let h1c = document.createElement('h3');
    // h1.textContent = 'Address: ' + address;
    // insertAfter(h1c,  menu);

    // let h1d = document.createElement('h3');
    // h1.textContent = 'phone: ' + Number;
    // insertAfter(h1d,  menu);

    
    // let h1e = document.createElement('h3');
    // h1.textContent = 'Name: ' + firstName;
    // insertAfter(h1e,  menu);
