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
  private User: MongooseModel<User>;
  $onInit() {}
  async find(id: string): Promise<User> {
    const user = await this.User.findById(id).exec();
    return user;
  }
  async save(user: any): Promise<User> {
    const model = new this.User(user);

    await model.updateOne(user, { upsert: true });

    if (user.id == undefined) {
      // emit user create event
      this.eventEmitter.emit("user.created", model);
    } else {
      // emit user update event
      this.eventEmitter.emit("user.updated", model);
    }

    return model;
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
