const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const signInForm = document.getElementById("patient-login-form");
const signUpForm = document.getElementById("patient-signup-form");
const SignInFormDoc = document.getElementById("doctor-login-form");
const signUpFormDoc = document.getElementById("doctor-signup-form");
const emailInput = document.getElementById('DoctorEmail');
const phoneInput = document.getElementById('phoneNo');


sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// document.getElementById('logout-button').addEventListener('click', function() {
//   window.location.href = 'http://127.0.0.1:5501/frontend/public/html/home.html'; // Replace '/' with the URL of your homepage
// });



const patientSignIn = (event) => {
  event.preventDefault();
  const Email = document.getElementById("patientLogInEmail").value;
  const Password = document.getElementById("patientPass").value;

  const logInData = { Email, Password };
  console.log(logInData);


  fetch("http://localhost:8000/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(logInData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data?.success) {
        window.location.href = 'http://127.0.0.1:5500/public/html/patient_portal.html';
        
        // console.log(data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred during login. Please try again.");
    });
}


const patientSignUp = (event) => {
  event.preventDefault();
  const FirstName = document.getElementById("fn").value;
  const LastName = document.getElementById("ln").value;
  const Email = document.getElementById("patientLogInmail").value;
  const PhoneNumber = document.getElementById("pnumber").value;
  const DateOfBirth = document.getElementById("dob").value;
  const Password = document.getElementById("patientass").value;

  const SignUpData = { FirstName, LastName, Email, PhoneNumber, DateOfBirth, Password };
  // console.log(SignUpData);

  fetch("http://localhost:8000/api/v1/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(SignUpData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data?.success) {
        window.location.href = 'http://127.0.0.1:5500/public/html/patient_portal.html';
        //console.log("success");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred during signup. Please try again.");
    });
}

const doctorSignIn = (event) => {
  event.preventDefault();
  const Email = document.getElementById("DoctorLogInEmail").value;
  const Password = document.getElementById("DoctorLogInPass").value;

  const loginData = { Email, Password };
  console.log(loginData);

  fetch("http://localhost:8000/api/v1/expert/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data?.success) {
        // console.log(payload);
        window.location.href = 'http://127.0.0.1:5500/public/html/doctor_portal.html';
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred during login. Please try again.");
    });
    //console.log(payload);
}



const doctorSignUp = (event) => {
  event.preventDefault();
  const FullName = document.getElementById("fn").value;
  const BMDC_reg = document.getElementById("bmdcRegNo").value;
  const Specialization = document.getElementById("specs").value;
  const Email = document.getElementById("DoctorEmail").value;
  const PhoneNumber = document.getElementById("phoneNo").value;
  const Password = document.getElementById("DoctorPass").value;

  const SignUpData = {FullName, BMDC_reg, Specialization, Email, PhoneNumber, Password };

  fetch("http://localhost:8000/api/v1/expert/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(SignUpData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data?.success) {
        window.location.href = 'http://127.0.0.1:5500/public/html/doctor_portal.html';      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred during signup. Please try again.");
    });
  // console.log(SignUpData);
}


function validateEmail(email) {
  const regex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z]{2,}$/;
  return regex.test(email);
}


document.getElementById('sigup').addEventListener('click', function() {
  
  
  var email = document.getElementById('DoctorEmail').value;
  if (validateEmail(email)) {
      console.log("Email is valid.");
      doctorSignUp(event);
      // Your signup code goes here
  } else {
      console.log("Email is invalid.");
      alert("Your email is invalid");
  }
});




function IsvalidEmail(emaill) {
  const regex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z]{2,}$/;
  return regex.test(emaill);
}


document.getElementById('signnup').addEventListener('click', function() {
  
  
  var emaill = document.getElementById('patientLogInmail').value;
  if (IsvalidEmail(emaill)) {
      console.log("Email is valid.");
      patientSignUp(event);
      // Your signup code goes here
  } else {
      console.log("Email is invalid.");
      alert("Your email is invalid");
  }
});
