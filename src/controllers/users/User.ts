import { BodyParams, Controller, Delete, Get, PathParams, Post, Put, UseAuth } from "@tsed/common";
import { NotFound } from "@tsed/exceptions";
import { UserService } from '../../services/users/UserService';
import { User } from '../../models/users/User';
import { FirebaseAuth } from "../../services/firebase/auth";
import { CreateAccountForm, PaystackService } from '../../services/paystack/sumbitBankInfo';
import { AuthMiddleware } from '../../middlewares/auth';
import { AuthService } from "../../services/auth";


@Controller({
  path: "/user"
})
export class UserCtrl {
  constructor(private userService: UserService, private firebaseU: FirebaseAuth, private paystackService: PaystackService, private authService:AuthService) {

  }

  /**
   *
   * @param {string} id
   * @returns {Promise<ICalendar>}
   */
  @Post("/auth")
  async auth(@BodyParams() body: { token: string }): Promise<any> {
    const res = await this.firebaseU.auth(body.token);
    return res;
  }

  /**
   *
   * @param {string} id
   * @returns {Promise<ICalendar>}
   */
  @Post("/bank-account")
  @UseAuth(AuthMiddleware)
  async updateUserPaystackBankAccount(@BodyParams() accountForm: CreateAccountForm): Promise<User> {
    console.log(accountForm, " Form to create for user");
    return await this.paystackService.addUserSubaccount(accountForm, this.authService.user_id)
  }


  /**
   *
   * @param {string} id
   * @returns {Promise<ICalendar>}
   */
  @Get("/")
  @UseAuth(AuthMiddleware)
  async get(): Promise<User> {

    const user = await this.userService.find(this.authService.user_id);

    if (user) {
      return user;
    }

    throw new NotFound("User not found");
  }


  /**
   *
   * @param id
   * @param user
   * @returns {Promise<User>}
   */
  @Put("/")
  @UseAuth(AuthMiddleware)
  async update(@PathParams("id") id: string,
    @BodyParams() user: any): Promise<User> {
    user._id = id;

    return this.userService.save(user);
  }
}
