import { Request } from "express";

const db = require("../db/models");

class InflowsService{
    credential:{
        id:number
    };
    body: Request['body'];
    params: Request['params'];
    attributes = [
        'id',
        'qty',
        'price',
        'reason',
        'additional_details',
        'created_at',
        'updated_at'
    ];
    include = [
        {
            model: db.ingredient,
            as: '_ingredient',
            attributes: ['id','name'],
            include:[
                {
                    model: db.ingredient_states,
                    as: '_ingredient_states',
                    attributes: ['id','name']
                },
                {
                    model: db.ingredient_types,
                    as: '_ingredient_types',
                    attributes: ['id','name']
                },
                {
                    model: db.unit_measurement,
                    as: '_unit_measurement',
                    attributes: ['id','name']
                }
            ]
        },
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
    ];
    group = [
        '_ingredient._unit_measurement.id',
        '_ingredient._ingredient_types.id',
        '_ingredient._ingredient_states.id',
        '_ingredient.id','inflows.id',
        '_created_by.id',
        '_updated_by.id'
    ]
    
    constructor(req: Request){
        this.credential = req.app.locals.credential;
        this.body = req.body;
        this.params = req.params;
    }
    getAll = async () => {
        return await db.inflows.findAll({
            attributes: this.attributes,
            include: this.include,
            group: this.group
        });
    }
    store = async () => {
        let dataArr: any = [];
        this.body.map((i: any) => {
            dataArr.push({
                id_ingredient:i.id_ingredient,
                price: i.price,
                qty: i.qty,
                reason: i.reason,
                additional_details: i.additional_details,
                created_by:this.credential.id
            })
        });
        try{
            return await db.sequelize.transaction(async (t: any) => {
                return await db.inflows.bulkCreate(dataArr, { transaction: t });
            });
        }catch(error: any){
            return {errors:error}
        }
    }
    getOne = async () => {
        const { id } = this.params;
        try{
            return await db.inflows.findOne({
                attributes: this.attributes,
                where: { id },
                include: this.include,
                group: this.group
            });
        }catch(error: any){
            return {errors:error}
        }
    }
    update = ():void => {
        //
    }
    delete = async () => {
        const { id } = this.params;
        try{
            const data = await db.inflows.destroy({
                where: { id }
            });
            return data > 0 ? "Success Deleted" : "ID parameter Not found"
        }catch(error: any){
            return {errors:error}
        }
    }
}

export default InflowsService;