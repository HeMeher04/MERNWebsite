import express from "express"

import {registerController,
        loginController,
        testController,
        forgotPasswordController,
        updateProfileController,
        getOrdersController,
        getAllOrdersController,
        orderStatusController,} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password",forgotPasswordController)
//test routes
router.get("/test",requireSignIn,isAdmin ,testController);

//Auth or protected user route
router.get('/user-auth',requireSignIn,(req,res) =>{
        res.status(200).send({ok : true});
}
)

//Auth or protected Admin route
router.get('/admin-auth',requireSignIn,isAdmin,(req,res) =>{
        res.status(200).send({ok : true});
}
)

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get('/orders',requireSignIn,getOrdersController);

//all orders admin
router.get('/all-orders',requireSignIn,isAdmin,getAllOrdersController);

//Order status Update
router.put('/order-status/:orderId',requireSignIn,isAdmin,orderStatusController);

export default router;