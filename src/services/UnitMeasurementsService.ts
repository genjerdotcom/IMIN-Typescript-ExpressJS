import { Request } from "express";
import { Abreviation } from "../helper/Abreviation";

const db = require("../db/models");

class UnitMeasurementsService{
    credential:{
        id:number
    };
    body: Request['body'];
    params: Request['params'];
    query: Request['query'];
    attributes = [
        'id',
        'name',
        'abreviation',
        'precision',
        'created_at',
        'updated_at'
    ];
    include = [
        {
            model: db.user,
            as: '_created_by',
            attributes: ['id','username']
        },
        {
            model: db.user,
            as: '_updated_by',
            attributes: ['id','username']
        }
    ]

    constructor(req: Request){
        this.credential = req.app.locals.credential;
        this.body = req.body;
        this.params = req.params;
        this.query = req.query;
    }
    getAll = async () => {
        const { q } = this.query;
        return await db.unit_measurement.findAll({
            attributes: this.attributes,
            include: this.include,
            where: { name: { [db.Sequelize.Op.iLike]: `%${q ? q : "" }%` } }
        });
    }
    store = async () => {
        const { name, precision } = this.body;
        const abrs = await Abreviation(name);
        try{
            return await db.unit_measurement.create({
                created_by:this.credential.id,
                abreviation: abrs,
                name, precision
            });
        }catch(error: any){
            return {errors:error}
        }
    }
    getOne = async () => {
        const { id } = this.params;
        try{
            return await db.unit_measurement.findOne({
                where: { id },
                attributes: this.attributes,
                include: this.include
            });
        }catch(error: any){
            return {errors:error}
        }
    }
    update = async () => {
        const { id } = this.params;
        const { name, precision } = this.body;
        const abreviation = name ? await Abreviation(name) : undefined ;
        try{
            const data = await db.unit_measurement.update({
                updated_by:this.credential.id,
                abreviation,
                name, precision
            },{
                where: { id }
            });
            return data > 0 ? "Success Updated" : "ID parameter Not found"
        }catch(error: any){
            return {errors:error}
        }
    }
    delete = async () => {
        const { id } = this.params;
        try{
            const data = await db.unit_measurement.destroy({
                where: { id }
            });
            return data > 0 ? "Success Deleted" : "ID parameter Not found"
        }catch(error: any){
            return {errors:error}
        }
    }
}

export default UnitMeasurementsService;