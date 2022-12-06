function logout(){
    localStorage.setItem('user',null) 
    location.href = './login.html'
}

if( JSON.parse(localStorage.getItem('user')) ){
    document.getElementById('nombre').innerHTML = JSON.parse(localStorage.getItem('user')).nombre
}


