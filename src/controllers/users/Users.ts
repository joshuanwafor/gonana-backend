import { BodyParams, Controller, Get, PathParams, Post } from "@tsed/common";
import { NotFound } from "@tsed/exceptions";
import { UserService } from "../../services/users/user-service";
import { User } from "../../models/users/user";
import { FirebaseAuth } from "../../services/firebase/auth";
import { CreateUserDto } from "../../models/users/user.dto";

@Controller({
  path: "/users",
})
export class UsersCtrl {
  constructor(
    private userService: UserService,
    private firebaseU: FirebaseAuth
  ) {}

  @Get("/:id")
  async get(@PathParams("id") id: string): Promise<User> {
    const user = await this.userService.find(id);
    if (user) {
      return user;
    }
    throw new NotFound("User not found");
  }

}
