import BaseRoutes from "./base/BaseRouter";
import validate from "../middlewares/validators/IngredientTypesValidator";
import { auth } from "../middlewares/AuthMiddleware";
// Controller
import IngredientTypesController from "../controllers/implements/IngredientTypesController";

class IngredientStatesRoutes extends BaseRoutes{
    public routes():void{
        this.router.get("/", auth, IngredientTypesController.index)
        this.router.post("/", auth, validate, IngredientTypesController.create)
        this.router.get("/:id", auth, IngredientTypesController.show)
        this.router.put("/:id", auth, validate, IngredientTypesController.update)
        this.router.delete("/:id", auth, IngredientTypesController.delete)
    }
}

export default new IngredientStatesRoutes().router;