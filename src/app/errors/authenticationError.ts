export class authenticationError extends Error{
    constructor(message: string){
        super();
        this.message = message;
    } 
}