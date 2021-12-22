import { Required, Name, Description, Property } from "@tsed/schema";

import { Model, Ref } from "@tsed/mongoose";

@Model({
  schemaOptions: { timestamps: true, collection: "vouchers" },
  collection: "vouchers",
})
export class VoucherModel {
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
