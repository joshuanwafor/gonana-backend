import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { $log } from "@tsed/logger";
import { User } from '../../models/users/User';
import { JWTService } from "../jsonwebtokens/userToken";
import firebase from "firebase-admin";

@Service()
export class FirebaseAuth {
    @Inject(User)
    private User: MongooseModel<User>;

    @Inject(JWTService)
    private jwtService: JWTService;

    async auth(idToken: string) {

        let decoded = await firebase.auth().verifyIdToken(idToken);

        let user = await this.User.findOne({
            fuid: decoded.uid
        }).exec();

        console.log("pre-auth-user-", user);


        if (user == null) {
            try {
                user = new this.User({
                    email: decoded.email,
                    fuid: decoded.uid,
                    photo: decoded.picture
                });
                await user.save();
            } catch (e) {
                console.log(e);
                throw e;
            }
        }

        // generate token
        const token = this.jwtService.generateUserToken(user.toObject());
        $log.debug("Generated token for ", user, " -> ", token)
        return token;
    }
}