import { Router } from "express";
import IRouter from "../interface/IRouter";

abstract class BaseRoutes implements IRouter{
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    abstract routes(): void;
}

export default BaseRoutes;