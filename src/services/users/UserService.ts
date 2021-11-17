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
  
  /**
   * Find a course by his ID.
   * @param id
   * @returns {undefined|Course}
   */
  async find(id: string): Promise<User> {
    $log.debug("Search a user from ID", id);
    const user = await this.User.findById(id).exec();

    $log.debug("Found", user);
    return user;
  }

  /**
   *
   * @param User
   * @returns {Promise<TResult|TResult2|User>}
   */
  async save(user: User): Promise<User> {
    $log.debug({ message: "Validate user", user });

    const model = new this.User(user);
    $log.debug({ message: "Save user", model });
    await model.updateOne(model, { upsert: true });

    $log.debug({ message: "User saved", model });

    return model;
  }

  /**
   *
   * @returns {User[]}
   */
  async query(options = {}): Promise<User[]> {
    return this.User.find(options).exec();
  }

  /**
   *
   * @param id
   * @returns {Promise<User>}
   */
  async remove(id: string): Promise<User> {
    return await this.User.findById(id).remove().exec();
  }
}
