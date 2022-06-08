//IMPORTING ROUTER FROM EXPRESS
import { Router } from "express";

//IMPORTING ROUTE CONTROLLER FUNCTIONS
import deleteUser from "../../functions/user/delete";
import login from "../../functions/user/login";
import logout from "../../functions/user/logout";
import logoutAll from "../../functions/user/logoutAll";
import signup from "../../functions/user/signup";
import updateUser from "../../functions/user/update";

//IMPORTING MIDDLEWARE AUTH FUNCTION
import authFunction from "../../middlewares/authentication";

//CREATING INSTANCE OF ROUTER
const router = Router();

//ROUTE THAT IS USED FOR SIGNUP OF USER
router.post("/signup", signup);

//ROUTE FOR LOGIN
router.get("/login", login);

//ROUTER USES AUTHFUNCTION AS MIDDLEWARE FOR ALL ROUTES HENCEFORTH
router.use(authFunction);

//ROUTE FOR LOGGING OUT
router.post("/logout", logout);

//ROUTE FOR LOGGING OUT OF ALL DEVICES
router.post("/logoutAll", logoutAll);

//ROUTE TO UPDATE USER
router.patch("/:id", updateUser);

//ROUTE TO DELETE USER
router.delete("/", deleteUser);

//EXPORTING THE ROUTER
export default router;
