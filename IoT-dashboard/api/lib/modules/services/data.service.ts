import DataModel from '../schemas/data.schema';
import {IData, Query} from "../models/data.model";
import { config } from "../../config";

export default class DataService {

public async createData(dataParams: IData) {
   try {
       const dataModel = new DataModel(dataParams);
       await dataModel.save();
   } catch (error) {
       console.error('Wystąpił błąd podczas tworzenia danych:', error);
       throw new Error('Wystąpił błąd podczas tworzenia danych');
   }
}

public async query(deviceID: string) {
   try {
       const data = await DataModel.find({deviceId: deviceID}, { __v: 0, _id: 0 });
       return data;
    } catch (error) {
        throw new Error(`Query failed: ${error}`);
    }
 }

public async get(deviceID: string){
    try{
        const data = await DataModel.find({deviceId: deviceID}, {__v: 0, _id: 0}).limit(1).sort({$natural:-1});
        return data;
    } catch(error){
        throw new Error(`Get failed:" ${error}`);
    }
}

public async getAllNewest(start: any = 1, range: any = config.supportedDevicesNum){
    let lastestData: Array<any> = [];
    lastestData = Array.from({length: range});
    await Promise.all(
        Array.from({length: config.supportedDevicesNum}, async (_, i) => {
            try{
                const data = await DataModel.find({deviceId: start + i}, {__v: 0, _id: 0}).limit(1).sort({$natural:-1});
                if(data.length){
                    lastestData.push(data[0]);
                } else {
                    lastestData.push({deviceId: start + i});
                }
            } catch (error){
                console.log(`Błąd podczas pobierania danych dla urządzenia ${start + i}: ${error.message}`);
                lastestData.push({});
            }
        })
    )
}

public async deleteData(deviceID: any = {}):Promise<void>{
    try{
        await DataModel.deleteMany({deviceId: deviceID});
    } catch(error){
        throw new Error(`Delete error:" ${error}`);
    }
}

}
 