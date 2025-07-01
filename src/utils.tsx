export function validateEmail(email: string){
    return email.trim() !== ""
}

export function isValidPassword(password: string){
    return password.split("").length > 6;
}
