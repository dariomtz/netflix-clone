checkToken();
function checkToken() {
	if(sessionStorage.getItem("token"))window.location.replace("/movies");
}
function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}
function showWheel(wheel, button, show) {
	if(show){
		wheel.classList.remove("d-node");
		wheel.classList.add("d-flex");

		button.classList.add("d-none");
	}else {
		wheel.classList.remove("d-flex");
		wheel.classList.add("d-none");

		button.classList.remove("d-none");
	}
}

const nameF = document.getElementById("name-field");
const lastNameF = document.getElementById("last-name-field");
const emailF = document.getElementById("email-field");
const passF = document.getElementById("password-field");
const rePassF = document.getElementById("re-password-field");
const birthF = document.getElementById("birthday-field");
const loadingWheel = document.getElementById("loading-wheel");

if(window.location.pathname === "/signin"){
	const signInbutton = document.getElementById("signin-button");
	signInbutton.onclick = async (e) => {
		showWheel(loadingWheel, signInbutton, true);

		let email = emailF.value;
		let password = passF.value;
		let response = await signIn(email, password);
		showWheel(loadingWheel, signInbutton, false);
		if(response.token === ""){
			alert("Wrong email or password");
		}else sessionStorage.setItem("token", response.token);
		checkToken();
	};
	
}else{
	const signUpButton = document.getElementById("signup-button");
	signUpButton.addEventListener("click", async (e) => {
		showWheel(loadingWheel, signUpButton, true);
		let name = nameF.value;
		let lastName = lastNameF.value;
		let email = emailF.value;
		let pass = passF.value;
		let rePass = rePassF.value;
		let birth = birthF.value;
	
		console.log(name);
		console.log(lastName);
		console.log(pass);
		console.log(email);
		console.log(rePass);
		console.log(birth);
	
		if(name === ""){
			alert("Name can't be empty");
			return;
		}
		if(lastName === ""){
			alert("Last name can't be empty");
			return;
		}
		if(!validateEmail(email)){
			alert("Write a correct email");
			return;
		}
		if(pass === "" || rePass === ""){
			alert("Password and Repeat Password can't be empty")
			return;
		}
		if(pass !== rePass){
			alert("Passwords don't coincide");
			return;
		}
		if(birth === ""){
			alert("Date invalid");
			return;
		}
		let user = {
			name:name,
			last_name:lastName,
			email:email,
			password:pass,
			confirm_password:rePass,
			birthday:birth
		}
		console.log(user);
		let response = await signUp(user);
	
		if(response.name === ""){
			alert("Error creating the user, try again");
		}else {
			let response = await signIn(email, pass);
			sessionStorage.setItem("token", response.token);
		}
		showWheel(loadingWheel, signUpButton, false);
		checkToken();
	})
}

async function signIn(email, password) {
	console.log(window.location);
	let body = JSON.stringify({
		email:(!email) ? "":email,
		password:(!password) ? "":password
	});
	let response = await fetch(window.location.origin + "/api/signin",{
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			"api-key": sessionStorage.getItem("key")
		},
		body:body
	});
	if(response.status !== 200){
		return {
			token:""
		};
	}
	return await response.json();
}

async function signUp(user) {
	let body = JSON.stringify(user);
	let response = await fetch(window.location.origin + "/api/users",{
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			"api-key": sessionStorage.getItem("key")
		},
		body:body
	});
	if(response.status !== 201){
		console.log(response);
		return {
			name:""
		};
	}
	return await response.json();
	
}



