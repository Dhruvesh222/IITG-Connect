// console.log("password chnge validation");
let password = document.getElementById('password');
let password2 = document.getElementById('password1');

let passwordvalid = document.getElementById('passwordvalid');
let passwordinvalid = document.getElementById('passwordinvalid');
let password2valid = document.getElementById('password2valid');
let password2invalid = document.getElementById('password2invalid');

let filledPassword = false;
let filledPassword2 = false;

if(password){
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
}

if(password2){
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
}

function check(){
    let passbtn = document.getElementById('passbtn');
    let valid = filledPassword && filledPassword2;
    // console.log(valid,passbtn);
    if(valid){
        passbtn.disabled = false;
    }else{
        passbtn.disabled = true;
    }
}

setInterval(() => {
    check();
}, 1);