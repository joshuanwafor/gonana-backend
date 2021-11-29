import {Inject, Service} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {$log} from "@tsed/logger";
import {ProjectModel} from "../../models/Project";
import algoliasearch from 'algoliasearch';

const applicationID = "VEDUWHENK3";
const API = "1817dcbe9307df658821660a8f853e9d"

const searchClient = algoliasearch(applicationID, API);
const project_index = searchClient.initIndex('projects');


@Service()
export class ProjectService {
  @Inject(ProjectModel)
   model: MongooseModel<ProjectModel>;



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
  
    const model = new this.model(item);

    await model.updateOne(item, {upsert: true});

    if(process.env.PORT!=undefined){
      project_index.saveObject(model.toObject())
    }

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
