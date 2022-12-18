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

app.get('/login', function(req,res){
    res.render('login')
})

app.post('/login', function(req, res){
    var username = req.body.loginUserName
    var password = req.body.loginPassword
    if(username === 'abhishek' && password === '123'){
        console.log("Admin logged in!")
        res.redirect('/admin')
    }else{
        console.log("Normal user logged in")
        res.redirect('/user')
    }
})

app.post("/delete", function(req,res){
    List.findById(req.body.deleteButton, function(err, data){
        if(err){
            console.log(err)
        }else{
            console.log("Experience: " , data.experience)
            if(data.experience > 20){
                List.findByIdAndDelete(req.body.deleteButton, function(err, data){
                    if(err){
                        console.log(err)
                    }else(
                        console.log("Employee deleted")
                    )
                })    
            }
        }
    })
    
    
    // List.findByIdAndRemove(req.body.deleteButton, function(err){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log("Item deleted")
    //     }
    // });
    res.redirect('/admin')
})

app.get('/', function(req,res){
    List.find(function (err, items) {
        if (err) {
            console.log(err);
        } else {
            res.render('userView', {newEmployeeItems: items})   
        }
    });
})

app.get('/admin', function(req, res){
    List.find(function (err, items) {
        if (err) {
            console.log(err);
        } else {
            res.render('adminView', {newEmployeeItems: items})   
        }
    });
})

app.post('/admin', function(req,res){
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
    if(employee.ssn != ""){
        employee.save();
    }
    res.redirect('/admin');
})


app.post('/search', function(req,res){
    var msg = 'User not found'
    var status = 0;
    List.findOne({ssn: req.body.searchBySSN}, function(err, data){
        if(err){
            console.log(err)
        }else{
            if(data === null){
                console.log('User Not found')
                res.render('search', {data: msg, status: status})
            }else{
                console.log('User found')
                status = 1
                res.render('search', {data: data, status: status})
                status = 0
            }
        }
    })
})


app.listen(5000, function () {
    console.log("Server started on port 5000");
});

