function getID(id){
    return document.getElementById(id);
}
getID('adminPage').addEventListener("click",function(){
    window.location.href = "http://127.0.0.1:5501/Admin/HTML/admin.html";
   
})
getID('Customer').addEventListener("click",function(){
    window.location.href = "http://127.0.0.1:5501/Customer/HTML/user2.html";
})