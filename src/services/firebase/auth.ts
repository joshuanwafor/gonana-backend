import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { User } from '../../models/users/user';
import { JWTService } from "../jsonwebtokens/userToken";
import firebase from "firebase-admin";
import { UserService } from "../users/user-service";

@Service()
export class FirebaseAuth {

    @Inject(User)
    private User: MongooseModel<User>;

    @Inject(UserService)
    private userService: UserService;

    @Inject(JWTService)
    public jwtService: JWTService;

    async auth(idToken: string) {

        let decoded: firebase.auth.DecodedIdToken;
        try {
            decoded = await firebase.auth().verifyIdToken(idToken);
        } catch (e) {
            throw e;
        }

        let user: User = await this.User.findOne({
            email: decoded.email
        }).exec();

        console.log("on find user ", user)

        if (user == null || user == undefined) {
            try {
               let newUser = await this.userService.save({
                    email: decoded.email,
                    fuid: decoded.uid,
                    fullname: "Default Fullname"
                });

                return this.generateUserToken(newUser);

            } catch (e) {
                console.log(e);
                throw e;
            }
        }

        return this.generateUserToken(user);
    }

    generateUserToken(user: User) {
        return this.jwtService.generateUserToken(user);
    }
}