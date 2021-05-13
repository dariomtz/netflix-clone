"use strict";

if(!sessionStorage.getItem('token')){
    window.location.replace('/signin');
}