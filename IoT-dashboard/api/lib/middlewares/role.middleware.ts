import { Request, Response, NextFunction } from 'express';
import UserService from "../modules/services/user.service";
import { login_user } from "../controllers/user.controller";


export const role = async (request: Request, response: Response, next: NextFunction) => {
    const userService = new UserService();
    console.log(login_user);
    const user = await userService.getByEmailOrName(login_user);
    if(request.method == "POST" || request.method == "DELETE" || request.method == "PUT" || request.method == "PATCH"){
        //Wymagana rola to admin
        if(user?.role == "admin"){
            console.log("Spełnia uprawnienia (admin)");
            next();
        } else {
            console.log("Nie posiadasz uprawnień");
        }
    } else {
        //Nie wymaga roli admina
        next();
    }
}