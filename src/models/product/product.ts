import { Required, Name, Description, Property } from "@tsed/schema";

import { Model, Ref } from "@tsed/mongoose";

@Model({
  schemaOptions: { timestamps: true, collection: "product" },
  collection: "product",
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
  tags: string;

  @Property()
  status: string;

  @Property()
  @Description("")
  categories: string[];

  @Property()
  @Description("")
  price: number;

  @Property()
  @Description("")
  quantity: number;

  @Property()
  @Description("")
  approved: boolean;

  @Property()
  @Description("")
  type: string;
}
