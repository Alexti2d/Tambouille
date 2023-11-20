import { Router } from 'express'
import { AuthenticationService } from '~/resources/security/authentication.service'
import { UnauthorizedException } from '~/utils/exceptions'
import { config } from "dotenv";
config();

/**
 * We create a router, allowing us to create routes outside `src/index.ts`
 */
const AuthenticationController = Router();

/**
 * Service instance
 */
const service = new AuthenticationService();

/**
 * Method to get authenticated, return a jwt
 */
AuthenticationController.post('/', async (req, res, next) => {
    try {
        let cheatUser = {
            login: process.env.ADMIN_LOGIN,
            password: process.env.ADMIN_PASSWORD
        };
        if (req.body && req.body.login == process.env.ADMIN_LOGIN && req.body.password == process.env.ADMIN_PASSWORD) {
            const accessToken = service.generateAccessToken(cheatUser);
            res.send({
                accessToken,
            });
        } else {
            throw new UnauthorizedException("Login ou password incorrect")
        }
    } catch (error) {
        return next(error);
    }
});

export { AuthenticationController }