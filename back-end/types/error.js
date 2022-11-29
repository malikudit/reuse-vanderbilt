class LoginError extends Error {
    constructor(message) {
        super(message);
        this.name = "LoginError";
    }
}

module.exports = {
    LoginError
}