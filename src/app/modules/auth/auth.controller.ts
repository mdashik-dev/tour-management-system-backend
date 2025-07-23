import { NextFunction, Request, Response } from "express";
import passport from "passport";
import AppError from "../../errorHelpers/AppError";
import { createUserTokens } from "../../utils/createUserTokens";
import { setAuthCookie } from "../../utils/setAuthCookie";
import { sendResponse } from "../../utils/sendResponse";

import httpStatus from "http-status-codes";

const credentialsLogin = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", async (err: any, user: any, info: any) => {

        if (err) {
            return next(new AppError(401, err))
        }

        if (!user) {
            return next(new AppError(401, info.message))
        }
        const userTokens = await createUserTokens(user)

        const { password: pass, ...rest } = user.toObject()

        setAuthCookie(res, userTokens)

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User Logged In Successfully",
            data: {
                accessToken: userTokens.accessToken,
                refreshToken: userTokens.refreshToken,
                user: rest

            },
        })
    })(req, res, next)
}

export const AuthControllers = {
    credentialsLogin
}