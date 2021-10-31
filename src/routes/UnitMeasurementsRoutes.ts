import BaseRoutes from "./base/BaseRouter";
import validate from "../middlewares/validators/UnitMeasurementsValidator";
import { auth } from "../middlewares/AuthMiddleware";
// Controller
import UnitMeasurementsController from "../controllers/implements/UnitMeasurementsController";

class UnitMeasurementsRoutes extends BaseRoutes{
    public routes():void{
        this.router.get("/", auth, UnitMeasurementsController.index)
        this.router.post("/", auth, validate, UnitMeasurementsController.create)
        this.router.get("/:id", auth, UnitMeasurementsController.show)
        this.router.put("/:id", auth, UnitMeasurementsController.update)
        this.router.delete("/:id", auth, UnitMeasurementsController.delete)
    }
}

export default new UnitMeasurementsRoutes().router;