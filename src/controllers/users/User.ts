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
import { JWTService } from "../../services/jsonwebtokens/userToken";


@Controller({
  path: "/user"
})
export class UserCtrl {
  constructor(private userService: UserService, private firebaseU: FirebaseAuth,
    private paystackService: PaystackService, private authService: AuthService,
    private transactionsService: TransactionService, private jwt: JWTService) {

  }

  /**
   *
   * @param {string} id
   * @returns {Promise<ICalendar>}
   */
  @Post("/auth")
  async auth(@BodyParams() body: { token: string}): Promise<any> {
    try {
      const res = await this.firebaseU.auth(body.token);
      return res;
    } catch (e) {
      throw e;
    }
  }

  @Get("/verify")
  verifyy(){
    return this.jwt.verifyUserToken("eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwNTg1Zjk5MjExMmZmODgxMTEzOTlhMzY5NzU2MTc1YWExYjRjZjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmluYWxseS14eXoiLCJhdWQiOiJmaW5hbGx5LXh5eiIsImF1dGhfdGltZSI6MTYzODAwMDkxMCwidXNlcl9pZCI6ImFGWjJDM0Nmc01XMzMyMGRlMlZWMXJlUmxYdDEiLCJzdWIiOiJhRloyQzNDZnNNVzMzMjBkZTJWVjFyZVJsWHQxIiwiaWF0IjoxNjM4MDAwOTExLCJleHAiOjE2MzgwMDQ1MTEsImVtYWlsIjoiMTB4am9zaHVhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyIxMHhqb3NodWFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.UOTyzCdPjB7jz_rGbVO7kD4f-tUFeubFOa1BHyU5iVHU-KiAUa4XWviDOcr5GIUnmF_wRq_indKU9kAe-9DYVkbGLI7VBIy1eqVpU9oUwm8P8oGCCEE3CLwUwf7rY9W1CbKtArHPnoUKyGyGnv2Wauvz1gGKoCmV06ZRCsCffaEvc9d7Rivzv0LzThb1yqVCXGIb0hH9l0DmklNIBRUZxIv2JwNa5_y7YFVF2hPbbyDRQuoPd3wzw6FIf4gHc-UXS-GLJ7CDF5hFTEvxgwWfmoj_Y8dKcCfY0LW_7hpKKqQjLw-OINjf59oyKkbaesooE7DqAvILTXgC80gMsJnIag")
   // return this.jwt.verifyUserToken("eyJhbGciOiJSUzI1NiIsImtpZCI6IjJlMzZhMWNiZDBiMjE2NjYxOTViZGIxZGZhMDFiNGNkYjAwNzg3OWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmluYWxseS14eXoiLCJhdWQiOiJmaW5hbGx5LXh5eiIsImF1dGhfdGltZSI6MTYzNzY5MDA2OSwidXNlcl9pZCI6Ijd1dTJleDZLWlhRY1dWM1dGeUVGczltaDFhRjIiLCJzdWIiOiI3dXUyZXg2S1pYUWNXVjNXRnlFRnM5bWgxYUYyIiwiaWF0IjoxNjM3NjkwMDY5LCJleHAiOjE2Mzc2OTM2NjksImVtYWlsIjoiam9zaHVhbndhZm9yMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImpvc2h1YW53YWZvcjAxQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.MjTnCOcaB5Mo0v3fFyifFbDVArBkLSSVClET6-Hfy2lW6tjV_327XokyTHmhV5LmqHSeUGFshmAmxT30mISYvzLii2-9-Ra4GOFOg_vVMNpBIsoN4meIbJ3EIfaF_ZH0Pfmj5lqrW0Y_XFr0gDl6QITQeQe9I0rjTCQs_SFEjVqHTcKn7ahiRkP4P7Zo-LMjDqkkhTCD6rnOpmgn_8Wlngqy9czm7_Xqe9SzPokQQeBw-EiPzOHEgOnsJs8N5fQI7t8TCa7S702zEx7VPeqZKtg266XaJMQPw3qQ064BMGEQVsSwjIxyuWOeQVj1rZNFKELbTVFNEuFgtKCwOTXf3w")
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
