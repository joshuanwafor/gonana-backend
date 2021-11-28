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
    return this.jwt.verifyUserToken("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTliOTdjYzM0NDYyODI4Njg2ZDQ3ODQiLCJlbWFpbCI6Impvc2h1YW53YWZvcjAxQGdtYWlsLmNvbSIsImZ1aWQiOiI3dXUyZXg2S1pYUWNXVjNXRnlFRnM5bWgxYUYyIiwiaWF0IjoxNjM4MDE2ODU1fQ.pBDxI5iTP6DiYhzj5N4fto15dxy7qrbB9dRIZjrWI_FXT9pwkp6fpOtM2Dgw_7bGr7YjKKf01owQZnmgTjsPIp_U79IN5d24HqfFRxvEe0vEP1IKmQvGnqOyegK3Y0PbAlGS-aQm0nhTqN3X-EELiGqwM1jFtza9Jbr0aj5Xz7qNyCdU3xOyP6IYF-oNGPIStOmrLmrhhZ7TaIX479drEsMB_vayOyahNqGdwqx2F-smzEzp9ZSJP6eMzSwPbPHG0nwcYYxkHUe0adF6qeX8V6Vl7z3JkcD592YDPJqAizg1WscfuROCcSRSoauizw2IpTca34gr6ybdhx6MCxYcJCV1ShSpWRpoV7wxWLyBPoXhB8Ers9mWaBlJyJ3-DhvA3LSf84BrmMMjDevl1-ggvWalXE6BC_UAYRwr6pH2ZKutQYSvEeiDteMsyqG7bUGrbgCbnsgVx05PiqS16SMMhvjx2k8LD7-vhCd5MtHTfbb8brLXIGdOo9ESsSdrLKHPxaDzgLoPXIhPQcAFITuVGcbDsOk-CjxLevKEKSfaWg_3gMozBmmmS6qJO95MWl9D9ywqEeTYRpIM8mMmrRNws8KOmFKHhLmOydSocKHZrzLpI0qs0cXaLjWXnAN7zBy8eoitLeraiFBk_b8k5IsEk_pXgL6Ij1nuvECPJuch7zY")
  }

  @Post("/bank-account")
  @UseAuth(AuthMiddleware)
  async updateUserPaystackBankAccount(@BodyParams() body: CreateAccountForm): Promise<User> {
    console.log(body, " Form to create for user");
    return await this.paystackService.addUserSubaccount(body, this.authService.user_id)
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

  @Get("/my-sales")
  @UseAuth(AuthMiddleware)
  async getTransactions(): Promise<TransactionModel[]> {
    const list = await this.transactionsService.getUserTransactions(this.authService.user_id);
    return list;
  }

  @Put("/")
  @UseAuth(AuthMiddleware)
  async update(
    @BodyParams() body: any): Promise<User> {
    body.id = this.authService.user_id;
    body._id = this.authService.user_id;
    return this.userService.save(body);
  }
}
