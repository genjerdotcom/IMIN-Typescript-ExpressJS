import BaseRoutes from "./base/BaseRouter";
import validate from "../middlewares/validators/AuthValidator";
import { auth } from "../middlewares/AuthMiddleware";
// Controller
import AuthController from "../controllers/AuthController";

class AuthRoutes extends BaseRoutes{
    public routes():void{
        this.router.post("/register", validate, AuthController.register)
        this.router.post("/login", validate, AuthController.login)
        this.router.get("/profile", auth, AuthController.profile);
    }
}

export default new AuthRoutes().router;