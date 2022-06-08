//IMPORTING ROUTER FROM EXPRESS
import { Router } from "express";

//IMPORTING THE ROUTER CONTROLLERS
import deleteContact from "../../functions/contact/delete";
import getContact from "../../functions/contact/get";
import getMany from "../../functions/contact/getMany";
import getMatch from "../../functions/contact/getMatch";
import post from "../../functions/contact/post";
import postMany from "../../functions/contact/postMany";
import patch from "../../functions/contact/patch";

//IMPORTING THE AUTHENTICATION MIDDLEWARE FUNCTION
import authFunction from "../../middlewares/authentication";

//CREATING THE ROUTER INSTANCE
const router = Router();

//USING THE MIDDLEWARE FUNCTION FOR ALL ROUTES
router.use(authFunction);

//ROUTE TO POST A CONTACT
router.post("/", post);

//ROUTE TO POST MANY CONTACTS AT ONE GO
router.post("/many", postMany);

//ROUTE TO GET MANY CONTACTS (WITH PAGINATION)
router.get("/many", getMany);

//ROUTE TO GET CONTACTS MATCHING WITH GIVEN PHONE NUMBER OR NAME
router.get("/match", getMatch);

//ROUTE TO GET PARTICULAR CONTACT BY ID
router.get("/:id", getContact);

//ROUTE TO UPDATE PARTICULAR CONTACT BY ID
router.put("/:id", patch);

//ROUTE TO DELETE PARTICULAR CONTACT BY ID
router.delete("/:id", deleteContact);

//EXPORTING THE ROUTER
export default router;
