var express = require('express');
var app = express();
var fs = require("fs");
const bodyParser = require('body-parser');
let mysql  = require("mysql");
console.log("server started");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
  next();
});

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'Expensio'
});

con.connect();

app.get('/wt2_project/Category/Fetch', function (req, res) {
    con.query('SELECT * FROM ExpenseCategory', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'All categories'});
    });
});

app.post('/wt2_project/Expense/Add', function (req, res) {
    var cat = req.body["Category"];
    var expname=req.body["Name"];
    var expamt = req.body["Amount"];
    var expdate = req.body["Date"];
    console.log(cat);
    con.query("INSERT INTO Expenses (`UserID`,`CategoryID`,`Amount`,`Date`,`ExpenseName`) VALUES (?, ?,?,?,?)",[1,cat,expamt,expdate,expname], function (err, result, fields) {
            if (err) throw err;
            console.log(result);            
            res.status(200).send({error: false, message: 'added expense', result_got : result});
          });
});

app.get('/wt2_project/Expense/Fetch', function (req, res) {
    con.query("SELECT * from Expenses natural join ExpenseCategory", function (err, result, fields) {
            if (err) throw err;
            console.log(result);            
            res.status(200).send({error: false, message: 'expenses fetched', result_got : result});
          });

});

app.delete('/wt2_project/Expense/Delete', function (req, res) {
  var id = req.body["ID"];
    con.query("Delete from Expenses Where ExpenseID = ?", [id],function (err, result, fields) {
            if (err) throw err;
            console.log(result);            
            res.status(200).send({error: false, message: 'expense deleted', result_got : result});
          });

});

app.post('/wt2_project/Reminder/Add', function (req, res) {
    var msg = req.body["Message"];
    var remname=req.body["Name"];
    var remamt = req.body["Amount"];
    var remdate = req.body["Date"];
    con.query("INSERT INTO Reminders (`UserID`,`ReminderName`,`ReminderMessage`,`ReminderDate`,`ReminderAmount`) VALUES (?, ?,?,?,?)",[1,remname,msg,remdate,remamt], function (err, result, fields) {
            if (err) throw err;
            console.log(result);            
            res.status(200).send({error: false, message: 'added reminder', result_got : result});
          });
});

app.get('/wt2_project/Reminder/Fetch', function (req, res) {
    con.query("SELECT * from Reminders", function (err, result, fields) {
            if (err) throw err;
            console.log(result);            
            res.status(200).send({error: false, message: 'reminders fetched', result_got : result});
          });

});

app.delete('/wt2_project/Reminder/Delete', function (req, res) {
  var id = req.body["ID"];
    con.query("Delete from Reminders Where ReminderID = ?", [id],function (err, result, fields) {
            if (err) throw err;
            console.log(result);            
            res.status(200).send({error: false, message: 'reminder deleted', result_got : result});
          });

});

app.post('/wt2_project/Expense/Search', function (req, res) {
    var term = req.body["Key"];
    var s = "Select * from Expenses natural join ExpenseCategory where ExpenseName Like \'%"+term+"%\'";
    console.log(s);
    con.query(s, function (err, result, fields) {
            if (err) throw err;
            console.log(result);            
            res.status(200).send({error: false, message: 'searching', result_got : result});
          });
});

app.post('/wt2_project/Money/Spent', function (req, res) {
  var user_id = req.body["UserID"];
    con.query("SELECT sum(Amount) as moneyspent from Expenses where UserID = ?",[user_id], function (err, result, fields) {
            if (err) throw err;
            console.log(result);            
            res.status(200).send({error: false, message: 'fetched money spent', result_got : result});
          });

});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})