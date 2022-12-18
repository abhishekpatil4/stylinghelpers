const mongoose = require('mongoose');

//to connect to database
mongoose.connect('mongodb+srv://abhishek:zEUvCh1HZXuyMm5Q@cluster0.7k55j13.mongodb.net/nodeDatabase?retryWrites=true&w=majority').then(() => {
    console.log("Connected to the database!");
})
    .catch(err => {
        console.log(err);
    });


const express = require('express');
const bodyParser = require('body-parser');
const { stringify } = require('querystring');
const { ppid } = require('process');
const { resourceLimits } = require('worker_threads');
const { stat } = require('fs');
const app = express();

//Database Schema
const employeeSchema = new mongoose.Schema({
    name: String,
    ssn: Number,
    gender: String,
    salary: Number,
    designation: String,
    department: String,
    experience: Number,
    date_of_join: Date
});

// connecting to the collection using the collection name
const List = mongoose.model("employee", employeeSchema);

// configuring basic details
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', function (req, res) {
    res.render('login')
})

app.post('/login', function (req, res) {
    var username = req.body.loginUserName
    var password = req.body.loginPassword
    if (username === 'abhishek' && password === '123') {
        console.log("Admin logged in!")
        res.redirect('/admin')
    } else {
        if (username === 'user1' && password === '1') {
            console.log("Normal user RAHUL logged in")
            res.redirect('/user')
        } else if (username === 'user2' && password == '2') {
            console.log("Normal user ELON logged in")
            res.redirect('/user')
        } else {
            var message = 'Invalid username and password!'
            // res.redirect('/login', {msg: message})
            res.render('invalidCred')
        }
    }
})

app.post("/delete", function (req, res) {
    List.findById(req.body.deleteButton, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log("Experience: ", data.experience)
            if (data.salary > 1000000) {
                List.findByIdAndDelete(req.body.deleteButton, function (err, data) {
                    if (err) {
                        console.log(err)
                    } else (
                        console.log("Employee deleted")
                    )
                })
            }
        }
    })

    res.redirect('/admin')
})

app.get('/user', function (req, res) {
    List.find(function (err, items) {
        if (err) {
            console.log(err);
        } else {
            res.render('userView', { newEmployeeItems: items })
        }
    });
})

app.get('/admin', function (req, res) {
    List.find(function (err, items) {
        if (err) {
            console.log(err);
        } else {
            res.render('adminView', { newEmployeeItems: items })
        }
    });
})

app.post('/admin', function (req, res) {
    var employee = new List({
        name: req.body.newName,
        ssn: req.body.newSSN,
        gender: req.body.newGender,
        salary: req.body.newSalary,
        designation: req.body.newDesignation,
        department: req.body.newDepartment,
        experience: req.body.newExperience,
        date_of_join: req.body.newDateofjoin
    });
    console.log("New User: ",
        employee.name,
        employee.ssn,
        employee.gender,
        employee.salary,
        employee.designation,
        employee.department,
        employee.experience,
        employee.date_of_join
    )
    if (employee.ssn != "") {
        employee.save();
    }
    res.redirect('/admin');
})

app.post('/search', function (req, res) {
    var notFoundmsg = 'User not found'
    var status = 0;
    List.findOne({ ssn: req.body.searchBySSN }, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            if (data === null) {
                console.log('User Not found')
                res.render('search', { data: notFoundmsg, status: status })
            } else if (data.department != 'finance') {
                console.log('User found, but different department')
                status = 2
                res.render('search', { data: notFoundmsg, status: status })
                status = 0
            }
            else {
                console.log('User found')
                status = 1
                res.render('search', { data: data, status: status })
                status = 0
            }
        }
    })
})

app.post('/modify', function (req, res) {
    List.findById(req.body.modifyButton, function (err, data) {
        // 
        if (err) {
            console.log(err)
        } else {
            let id = Number(req.body.modifyButton)
            res.render('modify', { unique: id, data: data })
        }
    })
})
// }

app.post('/update', function (req, res){
    List.findOneAndUpdate({ ssn: req.body.newSSN}, { name: req.body.newName, gender: req.body.newGender, salary: req.body.newSalary, designation: req.body.newDesignation, department: req.body.newDepartment, experience: req.body.newExperience}, function (err, data){
        if(err){
            console.log(err)
        }
    })
console.log("Data modified for ssn: " + req.body.newSSN)
res.redirect('/admin')
})


app.listen(5000, function () {
    console.log("Server started on port 5000");
});

