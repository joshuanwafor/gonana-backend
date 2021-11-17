import { Required, Name, Description, Property } from "@tsed/schema";

import { Model, Ref } from "@tsed/mongoose";



@Model({ schemaOptions: { timestamps: true, collection: 'projects', }, collection: 'projects', })
export class ProjectModel {
  @Name("id")
  _id: string;

  @Property()
  @Description("ownr")
  creator_id: string;

  @Name("created_at")
  @Property()
  createdAt: any;

  @Name("updated_at")
  @Property()
  updatedAt: any;


  @Description("The name of the event")
  title: string;

  @Property()
  @Description("Description the event")
  description: string;

  @Property()
  @Description("Chapter one MD")
  body: string;

  @Property()
  @Description("Chapter one MD")
  tags: string[];

  @Property()
  @Description("Chapter one MD")
  resource_url: string;

  @Property()
  @Description("Project status")
  status: string;

  @Property()
  @Description("Project status")
  audience_type: string;



  @Property()
  @Description("Project status")
  categories: string[];



  @Property()
  @Description("ownr")
  pages_count: number;

  @Property()
  @Description("ownr")
  chapters_count: number;

  @Property()
  @Description("ownr")
  has_questionnaire: boolean;


  @Property()
  @Description("ownr")
  has_abstract: boolean;

  @Property()
  @Description("ownr")
  downloads_count: number;

  @Property()
  @Description("ownr")
  other_props: any;

  @Property()
  @Description("Price")
  price: number;

}
