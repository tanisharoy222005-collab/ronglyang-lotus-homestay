document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById("loginForm");

if (!form) return;

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const errorText = document.getElementById("loginError");
const modeText = document.getElementById("modeText");
const submitBtn = document.getElementById("submitBtn");

const savedEmail =
localStorage.getItem("adminEmail");

const savedPassword =
localStorage.getItem("adminPassword");

/* FIRST TIME SETUP */

if (!savedEmail || !savedPassword) {

modeText.textContent =
"No admin account found. Create a new admin account.";

submitBtn.textContent =
"Create Account";

}

/* LOGIN MODE */

else {

modeText.textContent =
"Login using your saved admin credentials.";

submitBtn.textContent =
"Login";

}

form.addEventListener("submit", (e) => {

e.preventDefault();

const email =
emailInput.value.trim();

const password =
passwordInput.value.trim();

const storedEmail =
localStorage.getItem("adminEmail");

const storedPassword =
localStorage.getItem("adminPassword");

/* CREATE ADMIN */

if (!storedEmail || !storedPassword) {

localStorage.setItem(
"adminEmail",
email
);

localStorage.setItem(
"adminPassword",
password
);

localStorage.setItem(
"adminLoggedIn",
"true"
);

alert(
"Admin account created successfully."
);

window.location.href =
"dashboard.html";

return;

}

/* LOGIN */

if (
email === storedEmail &&
password === storedPassword
) {

localStorage.setItem(
"adminLoggedIn",
"true"
);

window.location.href =
"dashboard.html";

}

else {

errorText.textContent =
"Invalid Email or Password.";

}

});

});

/* LOGOUT */

function logout(){

localStorage.removeItem(
"adminLoggedIn"
);

window.location.href =
"login.html";

}

/* RESET ACCOUNT */

function resetAdmin(){

if(
confirm(
"Delete current admin account?"
)
){

localStorage.removeItem(
"adminEmail"
);

localStorage.removeItem(
"adminPassword"
);

localStorage.removeItem(
"adminLoggedIn"
);

alert(
"Admin account removed."
);

location.reload();

}

}
