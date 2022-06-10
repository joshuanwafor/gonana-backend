import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { $log } from "@tsed/logger";
import { PostModel } from "../../models/post";

@Service()
export class PostService {
  @Inject(PostModel)
  model: MongooseModel<PostModel>;
  async find(id: string): Promise<PostModel> {
    const item = await this.model.findById(id).exec();
    return item;
  }

  async save(item: PostModel): Promise<PostModel> {
    const model = new this.model(item);
    await model.updateOne(item, { upsert: true });
    return model;
  }

  async query(options = {}): Promise<PostModel[]> {
    return this.model.find(options).exec();
  }

  async remove(id: string): Promise<PostModel> {
    return await this.model.findById(id).remove().exec();
  }
}
