import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { $log } from "@tsed/logger";
import { TaxonomyModel } from "../../models/Taxonomy";

@Service()
export class TaxonomyService {
  @Inject(TaxonomyModel)
  public model: MongooseModel<TaxonomyModel>;

  /**
   * Find a item by his ID.
   * @param id
   * @returns {undefined|ProductModel}
   */
  async find(id: string): Promise<TaxonomyModel> {
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
  async save(item: TaxonomyModel): Promise<TaxonomyModel> {
    $log.debug({ message: "Validate item", item });

    const model = new this.model(item);
    $log.debug({ message: "Save item", item });
    await model.updateOne(item, { upsert: true });

    $log.debug({ message: "Item saved", model });

    return model;
  }

  /**
   *
   * @returns {ProductModel[]}
   */
  async query(options = {}): Promise<TaxonomyModel[]> {
    return this.model.find(options).exec();
  }

  /**
   *
   * @param id
   * @returns {Promise<TaxonomyModel>}
   */
  async remove(id: string): Promise<TaxonomyModel> {
    return await this.model.findById(id).remove().exec();
  }
}
