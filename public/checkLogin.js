"use strict";

function logOut() {
    sessionStorage.removeItem("token");
}

if(!sessionStorage.getItem('token')){
    window.location.replace('/signin');
}