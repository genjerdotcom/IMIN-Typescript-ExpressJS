import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction): any => {
    if(!req.headers.authorization){
        return res.status(422).send({ 
            message:{
                errors: {
                    msg : "Auth Failed"
                } 
            }
        });
    }
    let secretKey = process.env.JWT_SECRET_KEY || "secret";
    const token: string = req.headers.authorization.split(" ")[1];
    try{
        const credential: string | object = jwt.verify(token, secretKey);
        
        if(credential){
            req.app.locals.credential = credential;
            return next();
        }
        return res.status(422).send({ 
            message:{
                errors: {
                    msg : "Token Invalid"
                } 
            }
        });
    }catch(error){
        return res.send(error)
    }
}