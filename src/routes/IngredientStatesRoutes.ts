import BaseRoutes from "./base/BaseRouter";
import validate from "../middlewares/validators/IngredientStatesValidator";
import { auth } from "../middlewares/AuthMiddleware";
// Controller
import IngredientStatesController from "../controllers/implements/IngredientStatesController";

class IngredientStatesRoutes extends BaseRoutes{
    public routes():void{
        this.router.get("/", auth, IngredientStatesController.index)
        this.router.post("/", auth, validate, IngredientStatesController.create)
        this.router.get("/:id", auth, IngredientStatesController.show)
        this.router.put("/:id", auth, validate, IngredientStatesController.update)
        this.router.delete("/:id", auth, IngredientStatesController.delete)
    }
}

export default new IngredientStatesRoutes().router;