import { Required, Name, Description, Property, Enum } from "@tsed/schema";

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
  voucher_id: string;

  @Property()
  @Description("")
  farmer_id: string;

  @Property()
  @Description("")
  service_id: string;

  @Property()
  @Description("")
  provider_id: string;

  @Property()
  @Description("")
  note: string;

  @Property()
  @Description("")
  @Enum(["pending", "processing", "completed"])
  status: string;

  @Property()
  @Description("")
  @Enum(["pending", "processing", "completed"])
  provider_status: string;

  @Name("created_at")
  @Property()
  createdAt: any;

  @Name("updated_at")
  @Property()
  updatedAt: any;
}
