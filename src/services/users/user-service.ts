import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { $log } from "@tsed/logger";
import { User } from "../../models/users/user";
import { EventEmitterService } from "@tsed/event-emitter";

@Service()
export class UserService {
  @Inject()
  private eventEmitter: EventEmitterService;

  @Inject(User)
  public User: MongooseModel<User>;
  $onInit() { }
  async find(id: string): Promise<User> {
    const user = await this.User.findById(id).exec();
    return user;
  }

  async create(user: any): Promise<User> {
    try {
      const model = this.User.create(user);
      return model;
    } catch (error) {
      throw error;
    }
  }

  async update(user_id: string, user: any): Promise<void> {
    try {
      this.User.findOneAndUpdate({ _id: user_id }, user, { new: true }).exec();
    } catch (error) {
      throw error;
    }
  }


  async query(options = {}): Promise<User[]> {
    return this.User.find(options).exec();
  }
  async remove(id: string): Promise<User> {
    let res = await this.User.findById(id).remove().exec();
    // emit delete event
    this.eventEmitter.emit("user.deleted", id);
    return res;
  }
}
