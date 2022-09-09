import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { User } from '../../models/users/user';
import { JWTService } from "../jsonwebtokens/userToken";
import firebase from "firebase-admin";
import { UserService } from "../users/user-service";
import jwt_decode from "jwt-decode"
import { WebAuthPayload } from "../../schama/response";

@Service()
export class WebAuth {

    @Inject(User)
    private User: MongooseModel<User>;

    @Inject(UserService)
    private userService: UserService;

    @Inject(JWTService)
    public jwtService: JWTService;

    async auth(idToken: string) {

        let decoded: WebAuthPayload;
        try {
            decoded = jwt_decode(idToken);

            console.log(decoded);
        } catch (e) {
            throw e;
        }

        let user: User = await this.User.findOne({
            email: decoded.email
        }).exec();

        if (user == null || user == undefined) {
            try {
                let newUser = await this.userService.create({
                    email: decoded.email,
                    fuid: decoded.email,
                    fullname: decoded.name
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