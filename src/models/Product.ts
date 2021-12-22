import { Required, Name, Description, Property } from "@tsed/schema";

import { Model, Ref } from "@tsed/mongoose";

@Model({
  schemaOptions: { timestamps: true, collection: "vouchers" },
  collection: "vouchers",
})
export class ProductModel {
  @Name("id")
  _id: string;

  @Property()
  @Description("")
  publisher_id: string;

  @Name("created_at")
  @Property()
  createdAt: any;

  @Name("updated_at")
  @Property()
  updatedAt: any;

  @Description("")
  @Property()
  title: string;

  @Property()
  caption: string;

  @Property()
  body: string;

  @Property()
  tags: string[];

  @Property()
  status: string;

  @Property()
  audience_type: string;

  @Property()
  @Description("Project status")
  categories: string[];

  @Property()
  @Description("ownr")
  downloads_count: number;

  @Property()
  @Description("Price")
  price: number;
}
