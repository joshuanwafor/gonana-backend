import {Inject, Service} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {$log} from "@tsed/logger";
import {ProjectModel} from "../../models/Project";


@Service()
export class ProjectService {
  @Inject(ProjectModel)
   model: MongooseModel<ProjectModel>;

  $onInit() {
    this.reload();
  }

  async reload() {
    // const calendars = await this.model.find({});

    // if (calendars.length === 0) {
    //   const promises = require("../../../resources/calendars.json").map(calendar => this.save(calendar));
    //   await Promise.all(promises);
    // }
  }

  /**
   * Find a item by his ID.
   * @param id
   * @returns {undefined|ProductModel}
   */
  async find(id: string): Promise<ProjectModel> {
    $log.debug("Search an item from ID", id);
    const item = await this.model.findById(id).exec();

    $log.debug("Found", item);
    return item;
  }

  /**
   *
   * @param item
   * @returns {Promise<TResult|TResult2|ProductModel>}
   */
  async save(item: ProjectModel): Promise<ProjectModel> {
    $log.debug({message: "Validate item", item});

    const model = new this.model(item);
    $log.debug({message: "Save item", item});
    await model.updateOne(item, {upsert: true});

    $log.debug({message: "Item saved", model});

    return model;
  }

  /**
   *
   * @returns {ProductModel[]}
   */
  async query(options = {}): Promise<ProjectModel[]> {
    return this.model.find(options).exec();
  }

  /**
   *
   * @param id
   * @returns {Promise<ProductModel>}
   */
  async remove(id: string): Promise<ProjectModel> {
    return await this.model.findById(id).remove().exec();
  }
}
