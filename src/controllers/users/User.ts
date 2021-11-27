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
  async verifyy(){
    return await this.userService.save({fuid: Date.now().toString()});
    return this.jwt.verifyUserToken("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTliOTdjYzM0NDYyODI4Njg2ZDQ3ODQiLCJlbWFpbCI6Impvc2h1YW53YWZvcjAxQGdtYWlsLmNvbSIsImZ1aWQiOiI3dXUyZXg2S1pYUWNXVjNXRnlFRnM5bWgxYUYyIiwiaWF0IjoxNjM4MDE2ODU1fQ.pBDxI5iTP6DiYhzj5N4fto15dxy7qrbB9dRIZjrWI_FXT9pwkp6fpOtM2Dgw_7bGr7YjKKf01owQZnmgTjsPIp_U79IN5d24HqfFRxvEe0vEP1IKmQvGnqOyegK3Y0PbAlGS-aQm0nhTqN3X-EELiGqwM1jFtza9Jbr0aj5Xz7qNyCdU3xOyP6IYF-oNGPIStOmrLmrhhZ7TaIX479drEsMB_vayOyahNqGdwqx2F-smzEzp9ZSJP6eMzSwPbPHG0nwcYYxkHUe0adF6qeX8V6Vl7z3JkcD592YDPJqAizg1WscfuROCcSRSoauizw2IpTca34gr6ybdhx6MCxYcJCV1ShSpWRpoV7wxWLyBPoXhB8Ers9mWaBlJyJ3-DhvA3LSf84BrmMMjDevl1-ggvWalXE6BC_UAYRwr6pH2ZKutQYSvEeiDteMsyqG7bUGrbgCbnsgVx05PiqS16SMMhvjx2k8LD7-vhCd5MtHTfbb8brLXIGdOo9ESsSdrLKHPxaDzgLoPXIhPQcAFITuVGcbDsOk-CjxLevKEKSfaWg_3gMozBmmmS6qJO95MWl9D9ywqEeTYRpIM8mMmrRNws8KOmFKHhLmOydSocKHZrzLpI0qs0cXaLjWXnAN7zBy8eoitLeraiFBk_b8k5IsEk_pXgL6Ij1nuvECPJuch7zY")
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
