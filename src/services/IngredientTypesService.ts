import { Request } from "express";

const db = require("../db/models");

class IngredientTypesService{
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
        [db.ingredient_types.sequelize.fn('count', db.ingredient_types.sequelize.col('_ingredients.id')) ,'_ingredient_assign_count']
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
            model: db.ingredient,
            as: '_ingredients',
            attributes: []
        }
    ];
    group = ['ingredient_types.id','_created_by.id','_updated_by.id'];

    constructor(req: Request){
        this.credential = req.app.locals.credential;
        this.body = req.body;
        this.params = req.params;
        this.query = req.query;
    }
    getAll = async () => {
        const { q } = this.query
        return await db.ingredient_types.findAll({
            attributes: this.attributes,
            include: this.include,
            group: this.group,
            where: { name: { [db.Sequelize.Op.iLike]: `%${q ? q : "" }%` } }
        });
    }
    store = async () => {
        const { name } = this.body;
        try{
            return await db.ingredient_types.create({
                created_by:this.credential.id,
                name
            });
        }catch(error: any){
            return {errors:error}
        }
    }
    getOne = async () => {
        const { id } = this.params;
        try{
            return await db.ingredient_types.findOne({
                where: { id },
                attributes: this.attributes,
                include: this.include,
                group: this.group
            });
        }catch(error: any){
            return {errors:error}
        }
    }
    update = async () => {
        const { id } = this.params;
        const { name } = this.body;
        try{
            const data = await db.ingredient_types.update({
                updated_by:this.credential.id,
                name
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
            const data = await db.ingredient_types.destroy({
                where: { id }
            });
            return data > 0 ? "Success Deleted" : "ID parameter Not found"
        }catch(error: any){
            return {errors:error}
        }
    }
}

export default IngredientTypesService;