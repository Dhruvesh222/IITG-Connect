// console.log("update validation");
let codeforces = document.getElementById('codeforces');
let codeforcesinvalid = document.getElementById('codeforcesinvalid');
let codeforcesvalid = document.getElementById('codeforcesvalid');

let codechef = document.getElementById('codechef');
let codechefinvalid = document.getElementById('codechefinvalid');
let codechefvalid = document.getElementById('codechefvalid');

let github = document.getElementById('github');
let githubinvalid = document.getElementById('githubinvalid');
let githubvalid = document.getElementById('githubvalid');

let insta = document.getElementById('insta');
let instainvalid = document.getElementById('instainvalid');
let instavalid = document.getElementById('instavalid');

let facebook = document.getElementById('facebook');
let facebookinvalid = document.getElementById('facebookinvalid');
let facebookvalid = document.getElementById('facebookvalid');

let linkedin = document.getElementById('linkedin');
let linkedininvalid = document.getElementById('linkedininvalid');
let linkedinvalid = document.getElementById('linkedinvalid');

let contact = document.getElementById('contact');
let contactinvalid = document.getElementById('contactinvalid');
let contactvalid = document.getElementById('contactvalid');

let filledcodeforces = true;
let filledcodechef = true;
let filledgithub = true;
let filledinsta = true;
let filledfacebook = true;
let filledlinkedin = true;
let filledcontact = true;

codeforces.addEventListener('input', () => {
    if (!codeforces.value || codeforces.value.includes('https://codeforces.com/profile/')) {
        codeforces.classList.remove('is-invalid');
        if(!codeforces.value){
            codeforcesvalid.innerHTML = `
            
            `;
        }else{
            codeforces.classList.add('is-valid');
            codeforcesvalid.innerHTML = `
                looks good !
            `;
        }
        filledcodeforces = true;
    } else {
        // console.log('it is invalid username');
        codeforces.classList.remove('is-valid');
        codeforces.classList.add('is-invalid');
        codeforcesinvalid.innerHTML = `
            It must be of this form - " https://codeforces.com/profile/username  "
        `;
        filledcodeforces = false;
    }
})

codechef.addEventListener('input', () => {
    if (!codechef.value || codechef.value.includes('https://www.codechef.com/users/')) {
        codechef.classList.remove('is-invalid');
        if(!codechef.value){
            codechefvalid.innerHTML = `
            
            `;
        }else{
            codechef.classList.add('is-valid');
            codechefvalid.innerHTML = `
                looks good !
            `;
        }
        filledcodechef = true;
    } else {
        // console.log('it is invalid username');
        codechef.classList.remove('is-valid');
        codechef.classList.add('is-invalid');
        codechefinvalid.innerHTML = `
            It must be of this form - " https://www.codechef.com/users/username "
        `;
        filledcodechef = false;
    }
})

github.addEventListener('input', () => {
    if (!github.value || github.value.includes('https://github.com/')) {
        github.classList.remove('is-invalid');
        if(!github.value){
            githubvalid.innerHTML = `
            
            `;
        }else{
            github.classList.add('is-valid');
            githubvalid.innerHTML = `
                looks good !
            `;
        }
        filledgithub = true;
    } else {
        // console.log('it is invalid username');
        github.classList.remove('is-valid');
        github.classList.add('is-invalid');
        githubinvalid.innerHTML = `
            It must be of this form - " https://github.com/username "
        `;
        filledgithub = false;
    }
})

insta.addEventListener('input', () => {
    if (!insta.value || insta.value.includes('https://www.instagram.com/')) {
        insta.classList.remove('is-invalid');
        if(!insta.value){
            instavalid.innerHTML = `
            
            `;
        }else{
            insta.classList.add('is-valid');
            instavalid.innerHTML = `
            looks good !
            `;
        }
        filledinsta = true;
    } else {
        // console.log('it is invalid username');
        insta.classList.remove('is-valid');
        insta.classList.add('is-invalid');
        instainvalid.innerHTML = `
            It must be of this form - " https://www.instagram.com/username "
        `;
        filledinsta = false;
    }
})

facebook.addEventListener('input', () => {
    if (!facebook.value || facebook.value.includes('https://www.facebook.com/')) {
        facebook.classList.remove('is-invalid');
        if(!facebook.value){
            facebookvalid.innerHTML = `
            
            `;   
        }else{
            facebook.classList.add('is-valid');
            facebookvalid.innerHTML = `
            looks good !
            `; 
        }
        filledfacebook = true;
    } else {
        // console.log('it is invalid username');
        facebook.classList.remove('is-valid');
        facebook.classList.add('is-invalid');
        facebookinvalid.innerHTML = `
            It must be of this form - " https://www.facebook.com/username "
        `;
        filledfacebook = false;
    }
})

linkedin.addEventListener('input', () => {
    if (!linkedin.value || linkedin.value.includes('https://www.linkedin.com/in/')) {
        linkedin.classList.remove('is-invalid');
        if(!linkedin.value){
            linkedinvalid.innerHTML = `
            
            `;           
        }else{
            linkedin.classList.add('is-valid');
            linkedinvalid.innerHTML = `
            looks good !
            `;
        }
        filledlinkedin = true;
    } else {
        // console.log('it is invalid username');
        linkedin.classList.remove('is-valid');
        linkedin.classList.add('is-invalid');
        linkedininvalid.innerHTML = `
            It must be of this form - " https://www.linkedin.com/in/username "
        `;
        filledlinkedin = false;
    }
})

contact.addEventListener('input', () => {
    regex = /^[6-9]\d{9}$/
    if (!contact.value || regex.test(contact.value)) {
        contact.classList.remove('is-invalid');
        if(!contact.value){
            contactvalid.innerHTML = `
            
            `;      
        }else{
            contact.classList.add('is-valid');
            contactvalid.innerHTML = `
                looks good !
            `;      
        }
        filledcontact = true;
    } else {
        // console.log('it is invalid username');
        contact.classList.remove('is-valid');
        contact.classList.add('is-invalid');
        contactinvalid.innerHTML = `
            It must be a 10 digit number "
        `;
        filledcontact = false;
    }
})





let email = document.getElementById('email');
let username = document.getElementById('name');
let emailvalid = document.getElementById('emailvalid');
let emailinvalid = document.getElementById('emailinvalid');
let namevalid = document.getElementById('namevalid');
let nameinvalid = document.getElementById('nameinvalid');
let filledName = true;
let filledEmail = true;

username.addEventListener('input', () => {
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

email.addEventListener('input', () => {
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
let updatebtn = document.getElementById('updatebtn');
let updatebtn1 = document.getElementById('updatebtn1');

function check(){
    let valid = filledcodeforces && filledcodechef && filledgithub && filledinsta && filledfacebook && filledlinkedin && filledcontact;
    if(valid){
        updatebtn.disabled = false;
    }else{
        updatebtn.disabled = true;
    }
}
function check1(){
    let valid = filledName && filledEmail;
    if(valid){
        updatebtn1.disabled = false;
    }else{
        updatebtn1.disabled = true;
    }
}

setInterval(() => {
    check();
    check1();
}, 1);