import BaseRoutes from "./base/BaseRouter";
import validate from "../middlewares/validators/InflowsValidator";
import { auth } from "../middlewares/AuthMiddleware";
// Controller
import InflowsController from "../controllers/implements/InflowsController";

class InflowsRoutes extends BaseRoutes{
    public routes():void{
        this.router.get("/", auth, InflowsController.index)
        this.router.post("/", auth, validate, InflowsController.create)
        this.router.get("/:id", auth, InflowsController.show)
        // this.router.put("/:id", auth, validate, InflowsController.update)
        this.router.delete("/:id", auth, InflowsController.delete)
    }
}

export default new InflowsRoutes().router;