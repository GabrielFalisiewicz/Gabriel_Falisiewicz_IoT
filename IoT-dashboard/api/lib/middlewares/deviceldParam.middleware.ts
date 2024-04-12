import { RequestHandler, Request, Response, NextFunction } from 'express';
import { config } from "../config";

export const checkIdParam: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
   const { id } = request.params;
   console.log(id);
   const parsedValue = parseInt(id, 10);
   if (isNaN(parsedValue) || parsedValue >= config.supportedDevicesNum) {
       return response.status(400).send('Brak lub niepoprawny parametr ID urządzenia!');
   }
   next();
};