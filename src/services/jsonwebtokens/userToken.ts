import { $log, Inject, Service } from "@tsed/common";
import { User } from '../../models/users/User';
const jwt = require('jsonwebtoken');

const SECRET = "shhhhh"
@Service()
export class JWTService {

    generateUserToken(user: User): { token: string } {
        $log.debug("generating token for ", user);
        var token = jwt.sign(user, SECRET);
        $log.debug("generated", token, " for", user);
        return { token: token }
    }

    verifyUserToken(token: string): any {
        try {
            const user= jwt.verify(token, SECRET);
            $log.debug("Verified & Verified", user);
            return user;
        } catch (err) {
            // err
            throw err;
        }
    }
}