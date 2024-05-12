import { RequestHandler, Request, Response, NextFunction } from 'express';

export const log: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
    const date = new Date();
    const current = date.getHours() + ":" + date.getMinutes();
    if(response.statusCode == 200){
        console.log(`200: ${request.method} + ${request.url} : ${current}`);
    } else{ 
        console.log(`Error: ${request.method} + ${request.url} : ${current}`);
    }
    next();
};