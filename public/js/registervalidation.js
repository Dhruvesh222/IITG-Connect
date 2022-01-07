//@@@@@@@@@@@@@@@@@@@@ code for validating email @@@@@@@@@@@@@@@@@@@@@@@@
// console.log('form validation');
let email = document.getElementById('email');
let username = document.getElementById('name');
let password = document.getElementById('password');
let password2 = document.getElementById('password2');
let emailvalid = document.getElementById('emailvalid');
let emailinvalid = document.getElementById('emailinvalid');
let namevalid = document.getElementById('namevalid');
let nameinvalid = document.getElementById('nameinvalid');
let passwordvalid = document.getElementById('passwordvalid');
let passwordinvalid = document.getElementById('passwordinvalid');
let password2valid = document.getElementById('password2valid');
let password2invalid = document.getElementById('password2invalid');
let regbtn = document.getElementById('regbtn');

let valid = false;
let filledName = false;
let filledEmail = false;
let filledPassword = false;
let filledPassword2 = false;


username.addEventListener('blur', () => {
    // console.log('name is blurred');
    // let regex = /^([a-zA-Z])([0-9a-zA-z]{1,10})$/;
    let regex = /^([a-zA-Z]+)([a-zA-Z_ ]+)$/;
    if (regex.test(username.value)) {
        // console.log('it is valid username');
        username.classList.add('is-valid');
        username.classList.remove('is-invalid');
        namevalid.innerHTML = `
            looks good !
        `;
        filledName = true;
    } else {
        // console.log('it is invalid username');
        username.classList.remove('is-valid');
        username.classList.add('is-invalid');
        nameinvalid.innerHTML = `
            Your name must not contain a number and should be atleast 2 characters long
        `;
        filledName = false;
    }

})

email.addEventListener('blur', () => {
    // console.log('email is blurred');
    let regex = /^([a-z]+)([a-z.]*)@(iitg.ac.in([_])*)$/;
    if (regex.test(email.value)) {
        // console.log('valid email');
        email.classList.add('is-valid');
        email.classList.remove('is-invalid');
        emailvalid.innerHTML = `
            looks good !
        `;
        filledEmail = true;
    } else {
        // console.log('Invalid email');
        email.classList.remove('is-valid');
        email.classList.add('is-invalid');
        emailinvalid.innerHTML = `
            please enter your valid IITG Outlook id
        `;
        filledEmail = false;
    }
})

password.addEventListener('blur', () => {
    if (password.value.length >= 6) {
        // console.log('valid password');
        password.classList.add('is-valid');
        password.classList.remove('is-invalid');
        passwordvalid.innerHTML = `
            
        `;
        filledPassword = true;
    } else {
        // console.log('Invalid password');
        password.classList.remove('is-valid');
        password.classList.add('is-invalid');
        passwordinvalid.innerHTML = `
            password should be atleast 6 characters long
        `;
        filledPassword = false;
    }
})

password2.addEventListener('input', () => {

    if (password2.value.length >=6 && password2.value === password.value) {
        // console.log('valid confirm password');
        password2.classList.add('is-valid');
        password2.classList.remove('is-invalid');
        password2valid.innerHTML = `
            password matched
        `;
        filledPassword2 = true;
    } else {
        // console.log('Invalid confirm password');
        password2.classList.remove('is-valid');
        password2.classList.add('is-invalid');
        password2invalid.innerHTML = `
            password didn't matched
        `;
        filledPassword2 = false;
    }
    check();
})

function check(){
    valid = filledName && filledEmail && filledPassword && filledPassword2;
    if(valid){
        regbtn.disabled = false;
    }else{
        regbtn.disabled = true;
    }
}

setInterval(() => {
    check();
}, 1);

// formsubmittion.addEventListener('submit',(e)=>{
//     e.preventDefault();
//     // console.log('form is submitted');
//     valid = filledEmail && filledName;
//     console.log(filledEmail,filledName);
//     if(valid){
//         console.log("its valid");
//         fetch('/users/register', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body : JSON.stringify({
//                 email : email.value,
//                 name : username.value,
//                 password = password.value,
//                 password2 : password2.value,
//             })
//           })
//     }else{
//         dismissAlert.innerHTML = `
//             <div class="alert alert-danger alert-dismissible fade show" role="alert" >
//             <strong>Error !</strong> your tarvel request has not heen sent due to errors....kindly correct the errors 
//             <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//             </div>
//         `;
//     }

// })
