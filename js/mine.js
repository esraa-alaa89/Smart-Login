let userNameInput= document.querySelector('.userName-input');
let userEmailInput= document.querySelector('.userEmail-input');
let userPasswordInput= document.querySelector('.userPassword-input');
let nameAlert= document.querySelector('.name-alert');
let emailAlert= document.querySelector('.email-alert');
let passwordAlert= document.querySelector('.password-alert');
let usersList= [];

// check user exisetance into localStorage before (login)
if(localStorage.getItem('login-system') == null){ //localStorage mesh mawgoda
    usersList= []
}
else{ //localStorage mawgoda w feha string data
    usersList= JSON.parse( localStorage.getItem('login-system') );
}

// to present user_name in welcome page
let userName= localStorage.getItem('userName-loginSystem');
console.log(userName);
if(userName !== null){
    $('.user-name').text(userName);
}


//************************* Start Validation *****************************
//check name Validation (name regex)
function nameValidation() {
    let nameRegex= /^[A-Z]\w{2,}\s{1}\w{3,}$/
    return nameRegex.test(userNameInput.value) ? true : false;
}
//check email Validation (email regex)
function emailValidation() {
    let emailregex= /^(\w){3,}(\d[0-9]+)(@(g(oogle)?mail|yahoo)\.com)$/
    return emailregex.test(userEmailInput.value) ? true : false;
}
//check password Validation (password regex)
function passwordValidation() {
    let passwordRegex= /^[a-z]{4,}(\d{2,}[a-z]*)$/
    return passwordRegex.test(userPasswordInput.value) ? true : false;
}
//************************* End Validation *****************************

function removeAlerts() {
    $('.allInputs-alert').addClass('d-none');
    $('.name-alert').addClass('d-none');
    $('.email-alert').addClass('d-none');
    $('.password-alert').addClass('d-none');
}

// to get base url (localhost)
var pathparts = location.pathname.split('/');
console.log(pathparts);
var baseURL = ''
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]
}
console.log(baseURL);

// click on login btn
$('.login-btn').click(function (e) { 
    e.preventDefault();

    $('.name-container').addClass('d-none');

    if(userEmailInput.value== '' && userPasswordInput.value== ''){
        removeAlerts()
        $('.allInputs-alert').removeClass('d-none');
    }

    else if(!emailValidation()){
        removeAlerts()
        $('.email-alert').removeClass('d-none');
    }

    else if(!passwordValidation()){
        removeAlerts()
        $('.password-alert').removeClass('d-none');
    }
    // check email existance in userList array & localStorage
    else{
        removeAlerts();
        for (let i = 0; i < usersList.length; i++) 
        {
            if(usersList[i].email.toLowerCase() == userEmailInput.value.toLowerCase  () && usersList[i].password.toLowerCase() == userPasswordInput.value.toLowerCase())
            {
                localStorage.setItem('userName-loginSystem', usersList[i].name);

                if (baseURL == '/') {
                    location.replace('https://' + location.hostname + '/welcome.html')
                    $('.welcome-message').text(usersList[i].name);
                    console.log(usersList[i].name);

                } else {
                    location.replace(baseURL + '/welcome.html');
                    $('.welcome-message').text(usersList[i].name);
                    console.log(usersList[i].name);

                }
                console.log(usersList[i].name);
                $('.welcome-message').text(usersList[i].name);
                $('.login-btn button').html('success <i class="fa-solid fa-check fa-1x"></i>');
                $('.login-btn button').css('textShadow', '0 0 0 4px');
                console.log('email already existed before!');
            }
            else{
                $('.allInputs-alert').removeClass('d-none');
                $('.allInputs-alert').text('Email or password is incorrect!');
            }
        }
    }
    
});

console.log(usersList);
// check email existance in userList array & localStorage
function checkEmailExistance() {
    for (let i = 0; i < usersList.length; i++) {
        if( usersList[i].email.toLowerCase() == userEmailInput.value.toLowerCase() )
        return true; //email is already existed before
    }
}


//click on register btn
$('.register-btn').click(function (e) { 
    e.preventDefault();
    $('.name-container').removeClass('d-none');

    $('.register-btn').click(function (e) {
        if(userNameInput.value== '' && userEmailInput.value== '' &&             userPasswordInput.value== '')
        {
            // removeAlerts();
            $('.allInputs-alert').removeClass('d-none');
            $('.register-btn button').html('Create New Account');
        }

        else if(!nameValidation()){
            removeAlerts();
            $('.name-alert').removeClass('d-none');
        }

        else if(!emailValidation()){
            removeAlerts();
            $('.email-alert').removeClass('d-none');
        }

        else if(!passwordValidation()){
            removeAlerts();
            $('.password-alert').removeClass('d-none');
        }

        
        else{
            console.log('i am in storeUsers function');
            storeUsers();
        }
    })
});



function clearAllInputs() {
    userNameInput.value= '';
    userEmailInput.value= '';
    userPasswordInput.value= '';
}



// store new users (in case signup)
function storeUsers() {
    // sign up new user
    let user= {
        name: userNameInput.value,
        email: userEmailInput.value,
        password: userPasswordInput.value
    }

    // the first user that sign up in login-system
    if(usersList.length == 0){
        console.log(`i'm here in usersList.length & it == ${usersList.length}`);
        $('.email-alert').addClass('d-none');
        usersList.push(user);
        localStorage.setItem('login-system', JSON.stringify(usersList));
        $('.register-btn button').html('Your account is created successfully <i class="fa-solid fa-check fa-1x"></i>');
        $('.register-btn button').css('textShadow', '0 0 0 4px');
        clearAllInputs();
        return true;
    }
    if(checkEmailExistance()){
        $('.email-alert').removeClass('d-none');
        $('.email-alert').text("This email is already existed");
        console.log('yes i am false');
        return true ;
    }
    // check array has previous users or not
    else{
        $('.email-alert').addClass('d-none');
        usersList.push(user);
        localStorage.setItem('login-system', JSON.stringify(usersList));
        $('.register-btn button').html('Your account is created successfully <i class="fa-solid fa-check fa-1x"></i>');
        $('.register-btn button').css('textShadow', '0 0 0 4px');
        clearAllInputs();
        return true;
    }

}

// for logout
$('.logout-btn').click(function () {
    for (let i = 0; i < usersList.length; i++) {
        let currentUser= usersList[i].name;
    }
    localStorage.removeItem('userName-loginSystem')
})