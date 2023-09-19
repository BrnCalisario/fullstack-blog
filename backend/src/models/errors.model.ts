export abstract class RequestError extends Error {
    
    statusCode: number;

    constructor(message : string, statusCode : number, ) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
    }
}

export class InvalidBodyError extends RequestError {
    
    constructor(message : string = 'Bad body provided') {
        super(message, 400)        
    }
}

export class InsertError extends RequestError {
    constructor(message : string = 'Failed to create object') {
        super(message, 500)
    }
}

export class BadEncryptError extends RequestError {
    constructor(message : string = "Bad Encrypted Body") {
        super(message, 400)
    }
}

export class TokenNotProvidedError extends RequestError {
    constructor(message : string = "Token not provided") {
        super(message, 403)
    }
}