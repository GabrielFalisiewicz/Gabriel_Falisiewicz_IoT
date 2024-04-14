import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import {checkIdParam} from '../middlewares/deviceldParam.middleware';
import DataService from "../modules/services/data.service"

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class DataController implements Controller {
    public path = '/api/data';
    public router = Router();
    public dataService = new DataService;
 
    constructor() {
        this.initializeRoutes();
    }
 
    private initializeRoutes() {
        this.router.get(`${this.path}/latest`, this.getLatestReadingsFromAllDevices);
        this.router.post(`${this.path}/:id`, checkIdParam, this.addData);
        this.router.get(`${this.path}/:id`,checkIdParam, this.getAllDeviceData);
        this.router.get(`${this.path}/:id/latest`, checkIdParam, this.getLatestDataById);
        this.router.get(`${this.path}/:id/:num`, checkIdParam, this.getRangeDataById);
        this.router.delete(`${this.path}/all`, this.deleteAllData);
        this.router.delete(`${this.path}/:id`, checkIdParam, this.deleteDataById);
    }

    private getLatestReadingsFromAllDevices = async (request: Request, response: Response, next: NextFunction) => {
        const id = Number(request.params.id);
        const data = testArr;
        console.log("Text")
        response.status(200).json(data);
    };

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { air } = request.body;
        const { id } = request.params;
     
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
        const { id } = request.params;
        const data = await this.dataService.query(id);
        response.status(200).json(data);
    }

    private getLatestDataById = async (request: Request, response: Response, next: NextFunction) => {
        const id = Number(request.params.id);
        const data = Math.max(...testArr);
        response.status(200).json(data);
    };

    private getRangeDataById = async (request: Request, response: Response, next: NextFunction) => {
        const id = Number(request.params.id);
        const num = Number(request.params.num);
        const data = testArr.slice(id, id + num);
        response.status(200).json(data);
    };

    private deleteAllData = async (request: Request, response: Response, next: NextFunction) => {
        testArr = [];
        response.status(200).json({message: 'All data deleted.'});
    };

    private deleteDataById = async (request: Request, response: Response, next: NextFunction) => {
        const id = Number(request.params.id);
        testArr.splice(id, 1);
        response.status(200).json({message: `Data at index ${id} deleted.`});
    };

 }
 
 export default DataController;