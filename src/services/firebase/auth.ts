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

    
        if (user == null || user== undefined) {
            try {
                let newUserObj = {
                    email: decoded.email,
                    fuid: decoded.uid,
                    photo: decoded.picture,
                    fullname:"Default Fullname"
                };
                let model = new this.User(newUserObj);
                model.isNew= true;
            
                await model.save()
                console.log("after saving new user", model);

                user = model;
            } catch (e) {
                console.log(e);
                throw e;
            }
        }

        // generate token
        const token =  this.jwtService.generateUserToken(user);
        console.log("generated - ", token, "for ", user);
        return token;
    }
}