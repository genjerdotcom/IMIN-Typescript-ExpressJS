import { Request, Response } from "express";
import Authentication from "../utils/Authentication";

const db = require("../db/models");

class AuthController{
    register = async (req: Request, res: Response): Promise<Response> => {
        let { username, password } = req.body;
        const hashedPassword: string = await Authentication.passwordHash(password);
        const user = await db.user.findOne({
            where: { username }
        })
        if(user == null){
            await db.user.create({username, password: hashedPassword});
            return res.send({
                message:"register success"
            })
        }
        return res.send({
            message:"Username exists"
        })
    }
    login = async (req: Request, res: Response): Promise<Response> => {
        let { username, password } = req.body;
        const user = await db.user.findOne({
            where: { username }
        })
        // check password
        let compare = await Authentication.passwordCompare(password, user.password);
        // generate token
        if(compare){
            let token = Authentication.generateToken(user.id, username, user.password);
            return res.send({
                token
            })
        }
        return res.status(401).send({
            message:"Auth failed"
        });
    }
    profile = (req: Request, res: Response): Response => {
        return res.send(req.app.locals.credential);
    }
}

export default new AuthController();