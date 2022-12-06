class LoginError extends Error {
    constructor(message) {
        super(message);
        this.name = "LoginError";
    }
}

class BidError extends Error {
    constructor(message) {
        super(message);
        this.name = "BidError";
    }
}

class ReviewError extends Error {
    constructor(message) {
        super(message);
        this.name = "BidError";
    }
}

module.exports = {
    LoginError,
    BidError,
    ReviewError
}