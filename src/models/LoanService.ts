import { Required, Name, Description, Property } from "@tsed/schema";

import { Model, Ref } from "@tsed/mongoose";

@Model({
  schemaOptions: { timestamps: true, collection: "loan-services" },
  collection: "loan-services",
})
export class LoanServiceModel {
  @Name("id")
  _id: string;

  @Property()
  @Description("")
  creator_id: string;

  @Name("created_at")
  @Property()
  createdAt: any;

  @Name("updated_at")
  @Property()
  updatedAt: any;
}
