

function passwordValidation(password) {

    let valid = true;
    console.log(password);
    let upperV = password.match(/[A-Z]/)
    let lowerV = password.match(/[a-z]/)
    let numberV = password.match(/[0-9]/)
    let special = password.match(/[!-=]/) //'!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    console.log(special);
    if (numberV !== null && upperV !== null && lowerV !== null && special !== null) {
        valid = false
    }

    return valid
}
export default passwordValidation