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
import {
  CreateAccountForm,
  PaystackService,
} from "../../services/paystack/submite-bank-info";
import { WebAuth } from "../../services/webauth/auth";

@Controller({
  path: "/user",
})
export class UserCtrl {
  constructor(
    private userService: UserService,
    private firebaseU: FirebaseAuth,
    private webauthService: WebAuth,
    private authService: AuthService,
    private jwt: JWTService,
    private paystackService: PaystackService
  ) {}

  @Post("/auth")
  async auth(@BodyParams() body: { token: string }): Promise<any> {
    try {
      return await this.firebaseU.auth(body.token);
    } catch (e) {
      throw e;
    }
  }

  @Post("/webauth")
  async webauth(@BodyParams() body: { token: string }): Promise<any> {
    try {
      return await this.webauthService.auth(body.token);
    } catch (e) {
      throw e;
    }
  }

  @Post("/bank-account")
  @UseAuth(AuthMiddleware)
  async updateUserPaystackBankAccount(
    @BodyParams() body: CreateAccountForm
  ): Promise<User> {
    console.log(body, " Form to create for user");
    return await this.paystackService.addUserSubaccount(
      body,
      this.authService.user_id
    );
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
  async update(@BodyParams() body: any) {
    try {
      this.userService.update(this.authService.user_id, body);
      return "Updated";
    } catch (error) {
      throw error;
    }
  }
}
