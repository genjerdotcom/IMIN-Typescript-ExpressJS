import { Request } from "express";

const db = require("../db/models");

class IngredientsService{
    credential:{
        id:number
    };
    body: Request['body'];
    params: Request['params'];
    query: Request['query'];
    attributes = [
        'id',
        'name',
        'created_at',
        'updated_at',
        [db.ingredient.sequelize.fn('count', db.ingredient.sequelize.col('_current_stock.id')) ,'_current_stock_count']
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
        },
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
        },
        {
            model: db.inflows,
            as: '_current_stock',
            attributes: []
        }
    ];
    group = ['_unit_measurement.id','_ingredient_types.id','_ingredient_states.id','ingredient.id','_created_by.id','_updated_by.id']
    
    constructor(req: Request){
        this.credential = req.app.locals.credential;
        this.body = req.body;
        this.params = req.params;
        this.query = req.query;
    }
    getAll = async () => {
        const { q } = this.query
        return await db.ingredient.findAll({
            attributes: this.attributes,
            include: this.include,
            group: this.group,
            where: { name: { [db.Sequelize.Op.iLike]: `%${q ? q : "" }%` } }
        });
    }
    store = async () => {
        const { name, id_unit_measurement, id_ingredient_types, id_ingredient_states } = this.body;
        try{
            return await db.ingredient.create({
                created_by:this.credential.id,
                name,
                id_unit_measurement,
                id_ingredient_types,
                id_ingredient_states
            });
        }catch(error: any){
            return {errors:error}
        }
    }
    getOne = async () => {
        const { id } = this.params;
        try{
            return await db.ingredient.findOne({
                attributes: this.attributes,
                where: { id },
                include: this.include,
                group: this.group
            });
        }catch(error: any){
            return {errors:error}
        }
    }
    update = async () => {
        const { id } = this.params;
        const { name, id_unit_measurement, id_ingredient_types, id_ingredient_states } = this.body;
        try{
            const data = await db.ingredient.update({
                updated_by:this.credential.id,
                name,
                id_unit_measurement,
                id_ingredient_types,
                id_ingredient_states
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
            const data = await db.ingredient.destroy({
                where: { id }
            });
            return data > 0 ? "Success Deleted" : "ID parameter Not found"
        }catch(error: any){
            return {errors:error}
        }
    }
    assigned = async () => {
        const { id_ingredient, id_ingredient_types, id_ingredient_states } = this.body;
        try{
            const data = await db.ingredient.update({
                updated_by:this.credential.id,
                id_ingredient_types,
                id_ingredient_states
            },{
                where: { id: { [db.Sequelize.Op.in]: id_ingredient } }
            });
            return data > 0 ? "Success Updated" : "ID parameter Not found"
        }catch(error: any){
            return {errors:error}
        }
    }
}

export default IngredientsService;