import { Middleware, Req, Context, Res } from "@tsed/common";
import { Forbidden, Unauthorized } from "@tsed/exceptions";
import { AuthService } from '../services/auth';

@Middleware()
export class AuthMiddleware  {

    constructor(private readonly authService: AuthService) {
        return
    }

    public use(@Req() request: any, @Res() res: any, @Context() ctx: Context) {
        // retrieve options given to the @UseAuth decorator
        if (request.headers['authorization']) {
            let authorization = request.headers['authorization'];
            console.log(authorization, "goes here auth")
            try {
                this.authService.verify(authorization);
             
            } catch (e) {
                res.status(401).send("Not authenticated");
                return
            }
        } else {
            res.status(401).send("Not authenticated - auth token not provided");
            return
        }

        if (this.authService.user_id == null) {
            res.status(401).send("Not authenticated - id no provided");
            return 
        }
    }
}