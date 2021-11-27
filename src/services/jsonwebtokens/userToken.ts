import { $log, Inject, Service } from "@tsed/common";
import { PRIVATE_KEY } from "../../config/config";
import { User } from '../../models/users/User';
import JWT from "jsonwebtoken"
let fs = require("fs")
let jwt= require('jsonwebtoken');

var privateKey = PRIVATE_KEY;

@Service()
export class JWTService {

     generateUserToken(user: User): { token: any } {
        $log.debug("generating token for ", user);
        let pack = { _id: user._id.toString(), email: user.email, name: user.fullname, fuid: user.fuid };

        var token = jwt.sign(pack, { key: privateKey, passphrase: "15June199815June1998.." }, {
            algorithm: 'RS256'
        });

        return { token: token }
    }

    verifyUserToken(token: string): any {
        try {
            var decoded = jwt.decode(token);
            // var decoded = jwt.verify(token, {
            //     key: privateKey,
            //     passphrase: "15June199815June1998.."
            // }, {
            //     algorithms: ['RS256']
            // });
            const user = decoded;
            console.log(user, " decoded token")
            return user;
        } catch (err) {
            // err
            throw err;
        }
    }
}
