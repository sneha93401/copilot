let signIn = document.getElementById("Sign-in");
let signUp = document.getElementById("SignUP");

function showSignUpForm() {
    document.getElementById("sign-in-form").classList.add("hidden");
    document.getElementById("sign-up-form").classList.remove("hidden");
}

function showSignInForm() {
    document.getElementById("sign-up-form").classList.add("hidden");
    document.getElementById("sign-in-form").classList.remove("hidden");
}

function myLogPassword() {
    var a = document.getElementById("password");
    var b = document.getElementById("eye");
    var c = document.getElementById("eye-slash");

    if (a.type === "password") {
        a.type = "text";
        b.style.opacity = "1";
        c.style.opacity = "0";
    } else {
        a.type = "password";
        b.style.opacity = "0";
        c.style.opacity = "1";
    }
}



function myRegPassword() {
    var d = document.getElementById("password1");
    var b = document.getElementById("eye-2");
    var c = document.getElementById("eye-slash-2");

    if (d.type === "password") {
        d.type = "text";
        b.style.opacity = "1";
        c.style.opacity = "0";
    } else {
        d.type = "password";
        b.style.opacity = "0";
        c.style.opacity = "1";
    }
}


//   validation

document.querySelector(".sign_in").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission to show validation errors

    validateSignIn();
});

function validateSignIn() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let isValid = true;

    // Reset error messages
    document.getElementById("email-error").textContent = "";
    document.getElementById("password-error").textContent = "";

    // Validate email
    if (!email.includes("@gmail.com")) {
        document.getElementById("email-error").textContent = "Enter a valid email id";
        isValid = false;
    }

    // Validate password
    let specialCharacterMatch = /[!@#$%^&*(),.?":{}|<>]/g;
    if (password.length < 8 || !specialCharacterMatch.test(password)) {
        document.getElementById("password-error").textContent = "Password must contain at least 8 characters and a special character";
        isValid = false;
    }

    if (isValid) {
        console.log("Validation passed. Implement further logic here.");
        // Further logic here
    }
}

function validateSignIn() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Reset error messages
    document.getElementById("email-error").textContent = "";
    document.getElementById("password-error").textContent = "";

    let user_data = JSON.parse(localStorage.getItem("users")) || [];
    let userFound = user_data.find(user => user.email === email && user.password === password);

    if (!userFound) {
        // Show an error message if the credentials do not match
        document.getElementById("password-error").textContent = "Invalid email or password";
        return false; // Prevent sign in
    } else {
        // Redirect to "ai.html" if credentials match
        alert("login successfully");
        window.location.href = "ai.html";
        return true; // Allow sign in (though the redirect will occur)
    }
}


document.querySelector(".sign_up").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    if (!validateSignUp()) {
        return false; // Stay on the page if validation fails
    }
    let name = document.getElementById('new_name').value;
    let email = document.getElementById('new_email').value;
    let phone = document.getElementById('new_phone').value;
    let password = document.getElementById('password1').value;
    let checkStatus = 0;
    
    let user_data = JSON.parse(localStorage.getItem("users")) || [];
    console.log('Current users before adding new:', user_data); // Debugging line
    
    for (
    let v of user_data) {
    if (v.email === email || v.phone === phone) {
    checkStatus = 1;
    break;
    }
    }
    
    if (checkStatus === 1) {
    alert("Email or phone already exists");
    } else {
    user_data.push({
    'name': name,
    'email': email,
    'phone': phone,
    'password': password
    });
    localStorage.setItem("users", JSON.stringify(user_data));
    console.log('New user added:', {name, email, phone, password}); // Debugging line
    console.log('Updated users:', user_data); // Debugging line
    }
    
    // Debugging: Check localStorage after attempting to add
    console.log('Final content in localStorage:', JSON.parse(localStorage.getItem("users")));

    // google data 

    let url = 'https://script.google.com/macros/s/AKfycbwYJ0_JwBZFwQzeHCKjkmeFeL_LWmxpKI6CgFaDok-LsZnBZCfXZ5GaKlKv4Fd2Oi_v-g/exec';
    let formData = new FormData(form);
    fetch(url, {
        method: "POST",
        body: formData
    })
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error('Error:', error));

    // event.target.reset();
    alert("sign Up succefully")
    window.location.href = "ai.html";

});


function validateSignUp() {
    // Clear previous errors
    document.getElementById('signUpEmailError').textContent = '';
    document.getElementById('signUpPasswordError').textContent = '';
    document.getElementById('phoneError').textContent = '';
    document.getElementById('userError').textContent = '';

    let email = document.getElementById('new_email').value;
    let password = document.getElementById('password1').value;
    let phoneNumber = document.getElementById('new_phone').value;
    let user = document.getElementById('new_name').value;
    let valid = true;
    if (!email.includes('@gmail.com')) {
        document.getElementById('signUpEmailError').textContent = 'Enter a valid email id';
        valid = false;
    }

    if (password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/g.test(password)) {
        document.getElementById('signUpPasswordError').textContent = 'Password must contain at least 8 characters and a special character';
        valid = false;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
        document.getElementById('phoneError').textContent = 'Number must contain 10 digits';
        valid = false;
    }
    if (user.length < 4) {
        document.getElementById('userError').textContent = 'name should contain at least 4 character';
        valid = false;

    }

    if (!valid) {
        return false; // Prevent form submission
    }
    console.log('Sign Up Validated');
    return true; // Allow form submission if everything is valid
}

document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Always prevent default to manually handle submission.

    // Perform validation first.
    if (!validateSignUp()) {
        // If validation fails, stop the function here.
        return false;
    }

    // Assuming validation passed if we reach this point.
    let name = document.getElementById('new_name').value;
    let email = document.getElementById('new_email').value;
    let phone = document.getElementById('new_phone').value;
    let password = document.getElementById('password1').value;

    let user_data = JSON.parse(localStorage.getItem("users")) || [];
    let checkStatus = user_data.some(user => user.email === email || user.phone === phone);

    if (checkStatus) {
        alert("Email or phone already exists");
        return false; // Prevent further execution for duplicate users.
    }

    // If it's a new user, proceed to save in local storage.
    user_data.push({ name, email, phone, password });
    localStorage.setItem("users", JSON.stringify(user_data));

    // Submit to Google Sheets as before.
    let formData = new FormData(event.target);
    fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec', {
        method: "POST",
        body: formData
    })
        .then(response => response.text())
        .then(result => {
            console.log(result);
            alert("Sign Up successfully");
            window.location.href = "ai.html"; // Redirect after successful submission
        })
        .catch(error => console.error('Error:', error));
});

