import { Request, Response, NextFunction } from "express";
import { validationResult, body } from "express-validator";

enum Reason {
    PURCHASE = 'Purchase',
    RECOUNT = 'Recount'
}

const validate = [
    body('*.reason').exists().isString().isIn([
        Reason.PURCHASE,
        Reason.RECOUNT 
    ]),
    body('*.price').exists().isNumeric(),
    body('*.qty').exists().isNumeric(),
    body('*.id_ingredient').exists().isInt(),
    ( req: Request, res: Response, next: NextFunction ) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).send({ message:{errors: errors.array() }});
        }
        return next();
    }
]

export default validate;