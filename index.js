function categories(){
		$.ajax({
            url: 'http://localhost:8081/wt2_project/Category/Fetch',
            type: 'get',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                //var x = document.getElementById()
                var s = document.getElementById("category");
                for(var i=0;i<data["data"].length;i++){
                    var o = document.createElement("option");
                    var value=data["data"][i].Category;
                    var name=data["data"][i].CategoryID;
                    o.innerHTML=value;
                    o.value=name;
                    s.append(o);
                }
            },
            error:function(data){
                alert("error fetching categories");
                console.log(data.error);
            }
        });
	}
function expenses(){
var user={
    UserID:userid
}
        $.ajax({
            url: 'http://localhost:8081/wt2_project/Expense/Fetch',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                var x = document.getElementById("exptable");
                x.innerHTML="";
                for(var i=0;i<data["result_got"].length;i++){
                    var tr = document.createElement("tr");
                    var expdate=new Date(data["result_got"][i].Date).toDateString();
                    var expname=data["result_got"][i].ExpenseName;
                    var expamt = data["result_got"][i].Amount;
                    var Category = data["result_got"][i].Category;
                    var id=data["result_got"][i].ExpenseID;
                    var td1=document.createElement("td");
                    td1.innerHTML=expname;
                    tr.appendChild(td1);
                    var td2=document.createElement("td");
                    td2.innerHTML=expdate;
                    var td3=document.createElement("td");
                    td3.innerHTML=expamt;
                    var td4=document.createElement("td");
                    td4.innerHTML=Category;
                    var td5 = document.createElement("td");
                    var img = document.createElement("img");
                    img.src="clear.png";
                    img.setAttribute("onclick","deleteexpense("+id+")");
                    td5.appendChild(img);
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tr.appendChild(td5);
                    x.append(tr);
                }

                console.log(data);
            },
            error:function(data){
                alert("error fetching expenses");
                console.log(data.error);
            },
            data: JSON.stringify(user)
        });
    }
function add_expense()
{
var exp = $("#expname").val();
var cat =$("#category").val();
var expdate=$("#expdate").val();
var expamt=$("#expamt").val();
var expense ={
    UserID:userid,
    Name:exp,
    Category:cat,
    Date:expdate,
    Amount:expamt
}
console.log(JSON.stringify(expense));
$.ajax({
            url: 'http://localhost:8081/wt2_project/Expense/Add',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                // var myArr = JSON.parse(data);
                console.log(data);
                //console.log(data.error);
                console.log(userid);
                expenses(userid);
                $("#squarespaceModal").modal("hide");
                money_spent();

            },
            error:function(data){
                alert("error adding expense");
                console.log(data.error);
            },
            data: JSON.stringify(expense)
        });
}
function deleteexpense(id)
{
 var txt;
var r = confirm("Are you sure you want to delete??");
if (r == true) {
 var expense ={
ID:id
}  
console.log(expense);
$.ajax({
            url: 'http://localhost:8081/wt2_project/Expense/Delete',
            type: 'delete',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                // var myArr = JSON.parse(data);
                console.log(data);
                expenses(userid);
                money_spent();
            },
            error:function(data){
                alert("error deleting expense");
                console.log(data.error);
            },
            data: JSON.stringify(expense)
        });
}
}

function add_reminder()
{
var rem = $("#remname").val();
var remmsg =$("#remmsg").val();
var remdate=$("#remdate").val();
var remamt=$("#remamt").val();
console.log(rem);
var reminder ={
    Name:rem,
    Message:remmsg,
    Date:remdate,
    Amount:remamt,
    UserID:userid
}
console.log(JSON.stringify(reminder));
$.ajax({
            url: 'http://localhost:8081/wt2_project/Reminder/Add',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                // var myArr = JSON.parse(data);
                console.log(data);
                //console.log(data.error);
                fetch_reminders();
                $("#remainder").modal("hide");

            },
            error:function(data){
                alert("error adding reminders");
                console.log(data.error);
            },
            data: JSON.stringify(reminder)
        });   
}
function fetch_reminders()
{
    var user={
        UserID:userid
    }
    $.ajax({
            url: 'http://localhost:8081/wt2_project/Reminder/Fetch',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                var x = document.getElementById("remcarousel");
                x.innerHTML="";
                x.innerHTML="";
                for(var i=0;i<data["result_got"].length;i++){
                    var remdate=new Date(data["result_got"][i].ReminderDate).toDateString();
                    var remname=data["result_got"][i].ReminderName;
                    var remamt = data["result_got"][i].ReminderAmount;
                    var remmsg = data["result_got"][i].ReminderMessage;
                    var d = document.createElement("div");
                    var dout = document.createElement("div");
                    dout.classList.add("item");
                    d.classList.add("pad15");
                    var id=data["result_got"][i].ReminderID;
                    var p1=document.createElement("p");
                    p1.innerHTML=remname;
                    p1.setAttribute("class","black");
                    p1.style.fontSize="large";
                    d.appendChild(p1);
                    var p2=document.createElement("p");
                    p2.innerHTML=remmsg;
                    p2.setAttribute("class","black");
                    d.appendChild(p2);
                    var p3=document.createElement("p");
                    p3.innerHTML=remdate;
                    p3.setAttribute("class","black");
                    d.appendChild(p3);
                    var p4=document.createElement("p");
                    p4.innerHTML=remamt;
                    p4.setAttribute("class","black");
                    var img = document.createElement("img");
                    img.src="clear.png";
                    img.setAttribute("onclick","deletereminder("+id+")");
                    img.setAttribute("class","center");
                    d.appendChild(p4);
                    dout.appendChild(img);
                    dout.appendChild(d);
                    x.appendChild(dout);
                }

                console.log(data);
            },
            error:function(data){
                alert("error fetching reminders");
                console.log(data.error);
            },
            data:JSON.stringify(user)
     
       });
}


function deletereminder(id)
{
 var txt;
var r = confirm("Are you sure you want to delete??");
if (r == true) {
 var reminder ={
ID:id
}  
console.log(reminder);
$.ajax({
            url: 'http://localhost:8081/wt2_project/Reminder/Delete',
            type: 'delete',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                // var myArr = JSON.parse(data);
                console.log(data);
                fetch_reminders();
            },
            error:function(data){
                alert("error deleting reminders");
                console.log(data.error);
            },
            data: JSON.stringify(reminder)
        });
}
}
function fetch_search_expenses()
{
    var key = $("#srch").val();
    var exp={
        Key:key,
        UserID:userid
    }
    $.ajax({
            url: 'http://localhost:8081/wt2_project/Expense/Search',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                // var myArr = JSON.parse(data);
                console.log(data);
                var x = document.getElementById("exptable");
                x.innerHTML="";
                for(var i=0;i<data["result_got"].length;i++){
                    var tr = document.createElement("tr");
                    var expdate=new Date(data["result_got"][i].Date).toDateString();
                    var expname=data["result_got"][i].ExpenseName;
                    var expamt = data["result_got"][i].Amount;
                    var Category = data["result_got"][i].Category;
                    var id=data["result_got"][i].ExpenseID;
                    var td1=document.createElement("td");
                    td1.innerHTML=expname;
                    tr.appendChild(td1);
                    var td2=document.createElement("td");
                    td2.innerHTML=expdate;
                    var td3=document.createElement("td");
                    td3.innerHTML=expamt;
                    var td4=document.createElement("td");
                    td4.innerHTML=Category;
                    var td5 = document.createElement("td");
                    var img = document.createElement("img");
                    img.src="clear.png";
                    img.setAttribute("onclick","deleteexpense("+id+")");
                    td5.appendChild(img);
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tr.appendChild(td5);
                    x.append(tr);
                }

            },
            error:function(data){
                alert("error searching expenses");
                console.log(data.error);
            },
            data: JSON.stringify(exp)
        });

}
function money_spent()
{
    console.log(userid);
 var user={
    UserID:userid
 }
$.ajax({
            url: 'http://localhost:8081/wt2_project/Money/Spent',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                // var myArr = JSON.parse(data);
                var moneyspent = (data["result_got"][0].moneyspent);
                var ms =document.getElementById("ms");
                ms.innerHTML=moneyspent;
            },
            error:function(data){
                alert("error fetching moneyspent");
                console.log(data.error);
            },
            data: JSON.stringify(user)
        });

}