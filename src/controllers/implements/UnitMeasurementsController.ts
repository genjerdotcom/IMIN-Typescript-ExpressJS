import { Request, Response } from "express";
import IControllers from "../IControllers";
import Services from "../../services/UnitMeasurementsService";

class UnitMeasurementsController implements IControllers {
    index = async (req: Request, res: Response): Promise<Response> => {
        const service: Services = new Services(req);
        const srv = await service.getAll(); 
        return res.send({
            data: srv
        });
    }
    create = async (req: Request, res: Response): Promise<Response> => {
        const service: Services = new Services(req);
        const srv = await service.store(); 
        return res.send({
            message: srv
        });
    }
    show = async (req: Request, res: Response): Promise<Response> => {
        const service: Services = new Services(req);
        const srv = await service.getOne(); 
        return res.send({
            data: srv
        });
    }
    update = async (req: Request, res: Response): Promise<Response> => {
        const service: Services = new Services(req);
        const srv = await service.update(); 
        return res.send({
            message: srv
        });
    }
    delete = async (req: Request, res: Response): Promise<Response> => {
        const service: Services = new Services(req);
        const srv = await service.delete(); 
        return res.send({
            message: srv
        });
    }
}

export default new UnitMeasurementsController();