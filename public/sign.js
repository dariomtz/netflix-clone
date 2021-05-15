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

let validpass = false;
let coincide = false;
let valid = false;

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
	const rePassLegend = document.getElementById("re-password-legend");
	const validPassLegend = document.getElementById("password-legend");
	const form = document.getElementById("sigup-form");

	form.addEventListener("change", (e)=>{
		let userDate = new Date(birthF.value).getTime();
		let sysDate = new Date().getTime();
		valid = form.querySelectorAll(":invalid").length == 0 && (userDate<=sysDate);
		
		console.log((userDate<=sysDate));
		console.log(form.querySelectorAll(":invalid").length == 0);
		console.log(valid);
		
		if(!valid){
			$("#signup-button").prop("disabled", true);
			return;
		}
		$("#signup-button").prop("disabled", false);
	});

	$("#password-field").popover({
		placement: "right",
		trigger: 'focus',
		content: "Password must have at least:<br/>&#8226 1 of !@#$%^&* ❌<br/>&#8226 1 number ❌<br/>&#8226 1 upper case ❌<br/>&#8226 1 lower case ❌<br/>&#8226 6 to 16 caracters ❌",
		html:true
	});
	passF.addEventListener("keyup", (e)=>{
		let pass = passF.value;
		let checks = {
			simbol: /[!@#$%^&*]/.test(pass),
			number: /[0-9]/.test(pass),
			upper: /[A-Z]/.test(pass),
			lower: /[a-z]/.test(pass),
			length: (pass.length >= 6 && pass.length <=16)
		};
		let string = "Password must have at least:<br/>"+
									`&#8226 1 of !@#$%^&* ${checks.simbol?"✅":"❌"}<br/>`+
									`&#8226 1 number ${checks.number?"✅":"❌"}<br/>`+
									`&#8226 1 upper case letter${checks.upper?"✅":"❌"}<br/>`+
									`&#8226 1 lower case letter${checks.lower?"✅":"❌"}<br/>`+
									`&#8226 6 to 16 characters ${checks.length?"✅":"❌"}<br/>`;
		$("#password-field").attr("data-content", string);
		$("#password-field").popover('show');
		validpass = checks.simbol&&checks.number&&checks.upper&&checks.lower&&checks.length;
		conincide = pass.localeCompare(rePassF.value) === 0;

		if(validpass){
			validPassLegend.classList.add("d-none")
			$("#password-field").popover("hide");
			if(coincide && valid){
				$("#signup-button").prop("disabled", false);
				rePassLegend.classList.add("d-none");
			}else{
				$("#signup-button").prop("disabled", true);
				rePassLegend.classList.remove("d-none");
			}
			return;
		}
		validPassLegend.classList.remove("d-none")
	})
	
	rePassF.addEventListener("keyup", (e)=>{
		let pass = passF.value;
		let rePass = rePassF.value;
		conincide = pass.localeCompare(rePass) === 0;

		if(conincide){
			rePassLegend.classList.add("d-none");
			if(validpass && valid){
				$("#signup-button").prop("disabled", false);
			}else{
				$("#signup-button").prop("disabled", true);
			}
			return;
		}
		rePassLegend.classList.remove("d-none");
	});
	signUpButton.addEventListener("click", async (e) => {
		$("#error-alert").addClass("d-none");
		showWheel(loadingWheel, signUpButton, true);
		let name = nameF.value;
		let lastName = lastNameF.value;
		let email = emailF.value;
		let pass = passF.value;
		let rePass = rePassF.value;
		let birth = birthF.value;
	
		let user = {
			name:name,
			last_name:lastName,
			email:email,
			password:pass,
			confirm_password:rePass,
			birthday:birth
		}
		let response = await signUp(user);
		
		if(response.name === ""){
			$("#error-alert").removeClass("d-none");
		}else {
			let response = await signIn(email, pass);
			sessionStorage.setItem("token", response.token);
		}
		showWheel(loadingWheel, signUpButton, false);
		checkToken();
	});
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



