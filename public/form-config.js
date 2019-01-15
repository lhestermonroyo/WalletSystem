// function checkPassword() {
//   let pass = document.getElementById("password").value;
//   let conPass = document.getElementById("conPassword").value;
//   let displayErr = document.getElementById("displayErr");
//   let formSubmit = document.getElementById("formSubmit");
//   if (pass === conPass) {
//     formSubmit.removeClass("disabled");
//     displayErr.style.display = "none";
//   } else {
//     displayErr.style.display = "block";
//     formSubmit.addClass("disabled");
//   }
// }
history.pushState(null, null, location.href);
window.onpopstate = function() {
  history.go(1);
};
