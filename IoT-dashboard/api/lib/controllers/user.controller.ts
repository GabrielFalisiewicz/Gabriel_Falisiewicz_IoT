import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';
import {auth} from '../middlewares/auth.middleware';
import {admin} from '../middlewares/admin.middleware';
import UserService from "../modules/services/user.service";
import PasswordService from "../modules/services/password.service";
import TokenService from "../modules/services/token.service";
import { request } from 'http';
import internal from 'stream';
import * as jwt from 'jsonwebtoken';
import {IUser} from "../modules/models/user.model"

export let login_user: string;
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "softwaretestsmtp@gmail.com",
      pass: "xyz",
    },
    tls:{
        rejectUnauthorized: false
    }
  });

interface tokenType {
    userId: string;
    name: string;
    role: string;
    isAdmin: boolean;
    access: string;
    iat: number;
    exp: number;
}

class UserController implements Controller {
   public path = '/api/user';
   public router = Router();
   private userService = new UserService();
   private passwordService = new PasswordService();
   private tokenService = new TokenService();

   constructor() {
       this.initializeRoutes();
   }

   private initializeRoutes() {
       this.router.post(`${this.path}/create`, this.createNewOrUpdate);
       this.router.post(`${this.path}/auth`, this.authenticate);
       this.router.delete(`${this.path}/logout/:userId`,auth, this.removeHashSession);
       this.router.put(`${this.path}/reset`, this.resetPassword);
   }

   private generatePassword(length: number){
        let res = '';
        let source = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(let i = 0; i < length; i++){
            res += source.charAt(Math.floor(Math.random() * source.length));
        }
        return res;
   }

   private sendEmail = async(pass: string, email: string) => {
    const info = await transporter.sendMail({
        from: 'admin :D', 
        to: email,
        subject: "New password ✔", 
        text: "Your new password " + pass, 
      });
      console.log("Message sent: %s", info.messageId);
   }

   private resetPassword = async(request: Request, response: Response, next: NextFunction) => {
        const { email } = request.body;
        try{
            const data = await this.userService.getByEmailOrName(email);
            console.log(data);
            if(data){
               const newPassword = this.generatePassword(15);
               console.log(newPassword);
               const hashedPassword = await this.passwordService.hashPassword(newPassword);
               await this.passwordService.createOrUpdate({
                   userId: data._id,
                   password: hashedPassword
               });
                    this.sendEmail(newPassword, email);
            }
            response.status(200).json(data);
        }catch(error){
            console.error("Błąd podczas aktulizowania hasła");
        }
   }

   // 1 - token jest ważny, 0 - token jest nie ważny
   private checkToken(token: any){
        const dec = jwt.decode(token.token) as tokenType;
        //console.log(dec)
        if((Math.floor(Date.now()) / 1000) > dec.exp){
            return 0;
        } else {
            return 1;
        }
   }

   private checkAllToken = async() => {
        let UserArray:Array<IUser> = []
        UserArray = await this.userService.getAllUsers();
        //console.log(UserArray);
        await Promise.all(
            Array.from({length: UserArray.length}, async (_,i) => {
                try {
                    const user = await this.userService.getByEmailOrName(UserArray[i].email);
                    const token = await this.tokenService.create(user);
                    const decs = this.checkToken(this.tokenService.getToken(token));
                    if(!decs){
                        await this.tokenService.remove(user?.id);
                        console.log("Usuwam token");
                    } else {
                        //console.log("Nie usuwam tokenu");
                    }
                } catch(error){
                    console.error(`Validation Error: ${error.message}`);
                }
            })
        )
   }

   private authenticate = async (request: Request, response: Response, next: NextFunction) => {
    const {login, password} = request.body;
    login_user = login;
    //console.log("login_user: " + login_user);
    try {
        const user = await this.userService.getByEmailOrName(login);
        if (!user) {
            response.status(401).json({error: 'Unauthorized'});
        }
            await this.passwordService.authorize(user.id, await this.passwordService.hashPassword(password));
            const token = await this.tokenService.create(user);
            const decs = this.checkToken(this.tokenService.getToken(token));
            if(decs){
                console.log("Token jest ważny");
            } else {
                console.log("Token jest nie ważny");
            }
            this.checkAllToken();
            response.status(200).json(this.tokenService.getToken(token));
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(401).json({error: 'Unauthorized'});
        }
 };

 private createNewOrUpdate = async (request: Request, response: Response, next: NextFunction) => {
    const userData = request.body;
    try {
        const user = await this.userService.createNewOrUpdate(userData);
        if (userData.password) {
            const hashedPassword = await this.passwordService.hashPassword(userData.password)
            await this.passwordService.createOrUpdate({
                userId: user._id,
                password: hashedPassword
            });
        } 
        response.status(200).json(user);
    } catch (error) {
        console.error(`Validation Error: ${error.message}`);
        response.status(400).json({error: 'Bad request', value: error.message});
    }
 
 };

 private removeHashSession = async (request: Request, response: Response, next: NextFunction) => {
    console.log("removeHashSession");
    const {userId} = request.params;
    try {
        const result = await this.tokenService.remove(userId);
        response.status(200).send(result);
    } catch (error) {
        console.error(`Validation Error: ${error.message}`);
        response.status(401).json({error: 'Unauthorized'});
    }
 };
}

export default UserController;