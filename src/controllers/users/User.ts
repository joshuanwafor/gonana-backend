import {
  BodyParams,
  Controller,
  Delete,
  Get,
  PathParams,
  Post,
  Put,
  UseAuth,
} from "@tsed/common";
import { NotFound } from "@tsed/exceptions";
import { UserService } from "../../services/users/user-service";
import { User } from "../../models/users/user";
import { FirebaseAuth } from "../../services/firebase/auth";

import { AuthMiddleware } from "../../middlewares/auth";
import { AuthService } from "../../services/auth";
import { JWTService } from "../../services/jsonwebtokens/userToken";

@Controller({
  path: "/user",
})
export class UserCtrl {
  constructor(
    private userService: UserService,
    private firebaseU: FirebaseAuth,
    private authService: AuthService,
    private jwt: JWTService
  ) {}

  @Post("/auth")
  async auth(@BodyParams() body: { token: string }): Promise<any> {
    try {
      return await this.firebaseU.auth(body.token);
    } catch (e) {
      throw e;
    }
  }

  @Get("/verify")
  async verifyy() {
    return await this.userService.save({ fuid: Date.now().toString() });
  }

 

  @Get("/")
  @UseAuth(AuthMiddleware)
  async get(): Promise<User> {
    const user = await this.userService.find(this.authService.user_id);

    if (user) {
      return user;
    }

    throw new NotFound("User not found");
  }

  @Put("/")
  @UseAuth(AuthMiddleware)
  async update(@BodyParams() body: any): Promise<User> {
    body.id = this.authService.user_id;
    body._id = this.authService.user_id;
    console.log(body, " to update");
    return this.userService.save(body);
  }
}
