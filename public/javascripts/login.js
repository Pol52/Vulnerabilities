function login(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    $.post('/users/login',{
        username: username,
        password: password
    })
    .done(function(user){
        window.localStorage.setItem("userId", user.id);
        window.location.replace('http://localhost:3000')
    })
    .fail(function(xhr, _status, _error){
        alert(xhr.responseJSON.error);
    })
}
