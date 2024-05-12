import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import {checkIdParam} from '../middlewares/deviceldParam.middleware';
import DataService from "../modules/services/data.service"
import { log } from "../middlewares/log.middleware";
import { role } from "../middlewares/role.middleware";
import Joi from 'joi';

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class DataController implements Controller {
    public path = '/api/data';
    public router = Router();
    public dataService = new DataService;
 
    constructor() {
        this.initializeRoutes();
    }
 
    private initializeRoutes() {
        this.router.get(`${this.path}/latest`, this.getLatestReadingsFromAllDevices, log);
        this.router.get(`${this.path}/:id`,checkIdParam, role, this.getAllDeviceData, log);
        this.router.get(`${this.path}/:id/latest`, checkIdParam, this.getLatestDataById, log);
        this.router.get(`${this.path}/:id/:num`, checkIdParam, this.getRangeDataById, log);
        this.router.post(`${this.path}/:id`, checkIdParam, role, this.addData, log);
        this.router.delete(`${this.path}/all`, this.deleteAllData, log);
        this.router.delete(`${this.path}/:id`, checkIdParam, this.deleteDataById, log);
    }

    private getLatestReadingsFromAllDevices = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const data = await this.dataService.getAllNewest();
            response.status(200).json(data);
        }catch(error){
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({ error: 'Error.' });
        }
    };

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { air } = request.body;
        const { id } = request.params;

        const schema = Joi.object({
            air: Joi.array()
                .items(
                    Joi.object({
                        id: Joi.number().integer().positive().required(),
                        value: Joi.number().positive().required()
                    })
                )
                .unique((a, b) => a.id === b.id),
            deviceId: Joi.number().integer().positive().valid(parseInt(id, 10)).required()
         });
     
        const data = {
            temperature: air[0].value,
            pressure: air[1].value,
            humidity: air[2].value,
            deviceId: Number(id),
        }
        try {
            await this.dataService.createData(data);
            response.status(200).json(data);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({ error: 'Invalid input data.' });
        }
     };
     
     
     private getAllDeviceData = async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        try{
            const data = await this.dataService.query(id);
            response.status(200).json(data);    
        }catch(error){
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({ error: 'Error.' });
        }
    }

    private getLatestDataById = async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        try{
            const data = await this.dataService.get(id);
            response.status(200).json(data);    
        }catch(error){
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({ error: 'Error.' });
        }
    };

    private getRangeDataById = async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        const num = request.params.num;
        try{
            const data = await this.dataService.getAllNewest(id, num);
            response.status(200).json(data);    
        }catch(error){
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({ error: 'Error.' });
        }
        
    };

    private deleteAllData = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const data = await this.dataService.deleteData();
            response.status(200).json();    
        }catch(error){
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({ error: 'Error.' });
        }
    };

    private deleteDataById = async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        try{
            const data = await this.dataService.deleteData(id);
            response.status(200).json();    
        }catch(error){
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({ error: 'Error.' });
        }
    };

 }
 
 export default DataController;