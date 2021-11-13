import {Required, Name, Description, Property} from "@tsed/schema";

import {Model, Ref} from "@tsed/mongoose";


@Model()
export class ProductModel {
  @Name("id")
  _id: string;

  @Property()
  @Description("Creation's date")
  created_at: Date = new Date();

  @Property()
  @Description("Last modification date")
  updated_at: Date = new Date();

  @Name("name")
  @Description("The name of the event")
  name: string;

  @Property()
  @Description("Description the event")
  description: string;

  @Property()
  @Description("Chapter one MD")
  md_chapter_1: string;

  @Property()
  @Description("Chapter one MD")
  product_url: string;

  @Property()
  @Description("Project status")
  status: string;

  @Property()
  @Description("Project status")
  categories: string[];
}
