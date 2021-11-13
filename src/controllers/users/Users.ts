import { BodyParams, Controller, Delete, Get, PathParams, Post, Put } from "@tsed/common";
import { NotFound } from "@tsed/exceptions";
import { UserService } from '../../services/users/UserService';
import { User } from '../../models/users/User';
import { FirebaseAuth } from "../../services/firebase/auth";
import { CreateAccountForm, PaystackService } from '../../services/paystack/sumbitBankInfo';


@Controller({
  path: "/users"
})
export class UsersCtrl {
  constructor(private userService: UserService, private firebaseU: FirebaseAuth, private paystackService: PaystackService) {

  }

  @Get("/:id")
  async get(@PathParams("id") id: string): Promise<User> {

    const user = await this.userService.find(id);

    if (user) {
      return user;
    }

    throw new NotFound("User not found");
  }

  /**
   *
   * @param {User} user
   * @returns {Promise<User>}
   */
  @Post("/")
  save(
    @BodyParams() user: User) {
    user._id = "custom"
    return this.userService.save(user);
  }


  /**
   *
   * @returns {Promise<IUser[]>}
   */
  @Get("/")
  async getAllUsers(): Promise<User[]> {
    return this.userService.query();
  }
}
