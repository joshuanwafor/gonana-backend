import {Required, Name, Description, Property} from "@tsed/schema";

import {Model, Ref} from "@tsed/mongoose";


@Model({ schemaOptions: { timestamps: true, collection: 'taxonomies', }, collection: 'taxonomies', })
export class TaxonomyModel {
  @Name("id")
  _id: string;

  @Name("created_at")
  @Property()
  created_at: any;

  @Name("updated_at")
  @Property()
  updated_at: any;


  @Name("name")
  @Description("The name of the event")
  name: string;

  @Property()
  @Description("Description the event")
  description: string;

  @Property()
  parent_id: string;

  @Property()
  photo_url: string;

  @Property()
  type: string;

}
