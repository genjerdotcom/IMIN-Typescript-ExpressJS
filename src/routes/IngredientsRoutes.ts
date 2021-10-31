import BaseRoutes from "./base/BaseRouter";
import validate from "../middlewares/validators/IngredientsValidator";
import { auth } from "../middlewares/AuthMiddleware";
// Controller
import IngredientsController from "../controllers/implements/IngredientsController";

class IngredientStatesRoutes extends BaseRoutes{
    public routes():void{
        this.router.get("/", auth, IngredientsController.index)
        this.router.post("/", auth, validate, IngredientsController.create)
        this.router.get("/:id", auth, IngredientsController.show)
        this.router.put("/:id", auth, IngredientsController.update)
        this.router.delete("/:id", auth, IngredientsController.delete)
        this.router.patch("/assigned", auth, IngredientsController.assignIngredient)
        
    }
}

export default new IngredientStatesRoutes().router;