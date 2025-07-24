import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import passport from "passport";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router()


router.post("/login", AuthControllers.credentialsLogin)
router.post("/forgot-password", AuthControllers.forgotPassword)
router.post("/change-password", checkAuth(...Object.values(Role)), AuthControllers.changePassword)
router.post("/reset-password", checkAuth(...Object.values(Role)), AuthControllers.resetPassword)


export const AuthRoutes = router