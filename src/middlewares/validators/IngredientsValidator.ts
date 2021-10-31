import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const validate = [
    check('name').isString(),
    check('id_unit_measurement').isInt(),
    check('id_ingredient_types').isInt(),
    check('id_ingredient_states').isInt(),
    ( req: Request, res: Response, next: NextFunction ) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).send({ message:{errors: errors.array() }});
        }
        return next();
    }
]

export default validate;