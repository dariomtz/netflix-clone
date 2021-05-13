checkToken();

const emailF = document.getElementById("email-field");
const passwordF = document.getElementById("pwd-field");
const button = document.getElementById("login-button");

function checkToken() {
	if(sessionStorage.getItem("token"))window.location.replace("/menupelis");
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

button.onclick = async (e) => {
	let email = emailF.value;
	let password = passwordF.value;
	let response = await signIn(email, password);
	if(response.token === ""){
		alert("Wrong email or password");
	}else sessionStorage.setItem("token", response.token);
	checkToken();
};
