import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { $log } from "@tsed/logger";
import { User } from '../../models/users/User';
import { JWTService } from "../jsonwebtokens/userToken";
import firebase from "firebase-admin";
import { UserService } from "../users/UserService";

@Service()
export class FirebaseAuth {
    @Inject(User)
    private User: MongooseModel<User>;

    @Inject(UserService)
    private userService: UserService;

    @Inject(JWTService)
    private jwtService: JWTService;

    async auth(idToken: string) {

        let decoded = await firebase.auth().verifyIdToken(idToken);

        console.log(decoded, " --- decoded token goes here")

        let user: User = await this.User.findOne({
            fuid: decoded.uid
        }).exec();

        console.log("pre-auth-user-", user);

        if (user == null) {
            try {
                let newUserObj= { email: decoded.email,
                    fuid: decoded.uid,
                    photo: decoded.picture};

                let model = await this.userService.save(newUserObj);

                console.log("after saving new user", model);
                user = model;

            } catch (e) {
                console.log(e);
                throw e;
            }
        }

        // generate token
        const token = this.jwtService.generateUserToken(user);
        console.log("generated - ", token, "for ", user);
        $log.debug("Generated token for ", user, " -> ", token)
        return token;
    }
}