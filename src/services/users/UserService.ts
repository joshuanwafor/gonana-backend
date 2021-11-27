import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { $log } from "@tsed/logger";
import { User } from '../../models/users/User';

@Service()
export class UserService {
  @Inject(User)
  private User: MongooseModel<User>;
  $onInit() {
  }
  async find(id: string): Promise<User> {
    console.log(id ,"----ID goes here")
    $log.debug("Search a user from ID", id);
    const user = await this.User.findById(id).exec();

    $log.debug("Found", user);
    return user;
  }
  async save(user: any): Promise<User> {
    const model = new this.User(user);

    await model.updateOne(user, { upsert: true });

    return model;
  }
  async query(options = {}): Promise<User[]> {
    return this.User.find(options).exec();
  }
  async remove(id: string): Promise<User> {
    return await this.User.findById(id).remove().exec();
  }
}
