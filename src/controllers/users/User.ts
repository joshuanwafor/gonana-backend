import { BodyParams, Controller, Delete, Get, PathParams, Post, Put, UseAuth } from "@tsed/common";
import { NotFound } from "@tsed/exceptions";
import { UserService } from '../../services/users/UserService';
import { User } from '../../models/users/User';
import { FirebaseAuth } from "../../services/firebase/auth";
import { CreateAccountForm, PaystackService } from '../../services/paystack/sumbitBankInfo';
import { AuthMiddleware } from '../../middlewares/auth';
import { AuthService } from "../../services/auth";
import { TransactionService } from "../../services/transactions";
import { TransactionModel } from "../../models/Order";


@Controller({
  path: "/user"
})
export class UserCtrl {
  constructor(private userService: UserService, private firebaseU: FirebaseAuth,
    private paystackService: PaystackService, private authService: AuthService,
    private transactionsService: TransactionService) {

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
  async updateUserPaystackBankAccount(@BodyParams() body: CreateAccountForm): Promise<User> {
    console.log(body, " Form to create for user");
    return await this.paystackService.addUserSubaccount(body, this.authService.user_id)
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

  @Get("/my-sales")
  @UseAuth(AuthMiddleware)
  async getTransactions(): Promise<TransactionModel[]> {
    const list = await this.transactionsService.getUserTransactions(this.authService.user_id);
    return list;
  }


  /**
   *
   * @param id
   * @param user
   * @returns {Promise<User>}
   */
  @Put("/")
  @UseAuth(AuthMiddleware)
  async update(
    @BodyParams() body: any): Promise<User> {
    body.id = this.authService.user_id;
    body._id = this.authService.user_id;
    return this.userService.save(body);
  }
}
