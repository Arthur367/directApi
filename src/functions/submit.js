const { ipcRenderer } = require('electron');
const submit = document.getElementById("submitButton");

submit.addEventListener("click", () => {return validateForm()});

function validate(e) {
  e.preventDefault();
  const firstNameField = document.getElementById("fullName");
  let valid = true;
  if (!firstNameField.value) {
    const nameError = document.getElementById("nameError");
    nameError.classList.add("visible");
    firstNameField.classList.add("invalid");
    nameError.setAttribute("aria-hidden", false);
    nameError.setAttribute("aria-invalid", true);
  }
  const acceptTerms = document.getElementById("Check").va  
  return valid;
}
function validateForm() {
  let x = document.forms["detailsForm"]["fullName"].value;
  let name = '';
  let compay = '';
  let email = '';
  let location = '';
  let address = '';
  if (x != "") {    
    console.log("here")
    
    
    
    return ipcRenderer.invoke('input_licenseKey' , x);
  }

  
  var loca = navigator.geolocation.getCurrentPosition;
  var device = window.document.forms["detailsForm"]["fullName"].value;
  console.log(device)
  console.log(loca)

}
  


   
