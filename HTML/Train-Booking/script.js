function validate(){
    if(document.getElementById('loginUsername').value === 'abhi' && document.getElementById('loginPassword').value === '123'){
        console.log("Logged in successfully!");
        window.location.href = 'login.html'
    }else{
        alert('Invalid credentials!')
    }
}

function bookTicket(){
    var price = 0;
    var snd = "";
    if(document.getElementById('d2b').checked){
        console.log("Dharwad to banglore");
        snd = "Dharwad to banglore";
        price = 800;
    }else if(document.getElementById('m2b').checked){
        console.log("Mysore to banglore");
        snd = "Mysore to banglore";
        price = 650;
    }else if(document.getElementById('h2g').checked){
        console.log("Hubli to Goa")
        snd = "Hubli to Goa";
        price = 400;
    }

    let name = document.getElementById('bookingName').value
    let age = document.getElementById('bookingAge').value
    let phoneNumber = document.getElementById('bookingNumber').value

    console.log("Name: " + name + ' ' + "Age: " + age + ' ' + "Phone number: " + phoneNumber);

    //removing existing html tags to make it look like redirecting to another page

    document.getElementById('d2b').remove()
    document.getElementById('d2bspan').remove()
    document.getElementById('m2b').remove()
    document.getElementById('m2bspan').remove()
    document.getElementById('h2g').remove()
    document.getElementById('h2gspan').remove()
    
    
    document.getElementById('bookingName').remove()
    document.getElementById('bookingAge').remove()
    document.getElementById('bookingAgeSpan').remove()
    document.getElementById('bookingNumber').remove()
    document.getElementById('bookingButton').remove()

    document.getElementById('bookingHeading').innerHTML = "Ticket Booked"


    //displaying the booking status
    let currentElement = document.getElementById('bookingHeading');
    let newElement = document.createElement('h3');
    newElement.setAttribute("id", "name-id");
    insertAfter(newElement,  currentElement);
    document.getElementById("name-id").innerHTML = "<div class='patient-details-div'><h3>Source and Destination: " + snd + "</h3><h3>Name: " + name + "</h3><h3>Age: " + age + "</h3><h3>Phone Number: " + phoneNumber + "</h3></div>";

}

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}
