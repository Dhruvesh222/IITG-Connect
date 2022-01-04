//@@@@@@@@@@@@@@@@@@@@ code for validating email @@@@@@@@@@@@@@@@@@@@@@@@
console.log('form validation');
const email = document.getElementById('email');
let emailvalid = document.getElementById('emailvalid');
let emailinvalid = document.getElementById('emailinvalid');
let formsubmittion = document.getElementById('formsubmittion');
let namevalid = document.getElementById('namevalid');
let nameinvalid = document.getElementById('nameinvalid');
let username = document.getElementById('name');
let password = document.getElementById('password');
let password2 = document.getElementById('password2');

let valid = false;
let filledName = true;
let filledEmail = false;

const dismissAlert = document.getElementById('dismissAlert');

username.addEventListener('blur', () => {
    // console.log('name is blurred');
    // let regex = /^([a-zA-Z])([0-9a-zA-z]{1,10})$/;
    let regex = /./;
    if (regex.test(username.value)) {
        console.log('it is valid username');
        username.classList.add('is-valid');
        username.classList.remove('is-invalid');
        namevalid.innerHTML = `
            looks good !
        `;
        filledName = true;
    } else {
        console.log('it is invalid username');
        username.classList.remove('is-valid');
        username.classList.add('is-invalid');
        nameinvalid.innerHTML = `
            Your username must be 2-10 characters long and should not start with a number
        `;
        filledName = false;
    }

})

email.addEventListener('blur', () => {
    // console.log('email is blurred');
    let regex = /^([_\-\.a-zA-Z0-9]+)@([_\-\.a-zA-Z0-9]+)\.([a-zA-Z]){2,7}$/;
    if (regex.test(email.value)) {
        console.log('valid email');
        email.classList.add('is-valid');
        email.classList.remove('is-invalid');
        emailvalid.innerHTML = `
            looks good !
        `;
        filledEmail = true;
    } else {
        console.log('Invalid email');
        email.classList.remove('is-valid');
        email.classList.add('is-invalid');
        emailinvalid.innerHTML = `
            invalid email
        `;
        filledEmail = false;
    }
})

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
