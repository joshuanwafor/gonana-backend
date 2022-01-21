import { Required, Name, Description, Property, Schema } from "@tsed/schema";

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
  publisher_id: string;

  @Property()
  @Description("")
  farmer_id: string;

  @Name("created_at")
  @Property()
  createdAt: any;

  @Name("updated_at")
  @Property()
  updatedAt: any;

  @Property()
  @Description("")
  status: string;

  @Property()
  @Description("")
  note: string;

  @Property()
  repayment_date: string;
  @Property()
  interest_rate: string;

  loan_response: VoucherLenderResponse;
}

@Schema({})
class VoucherLenderResponse {
  @Property()
  lender_id: string;

  @Property()
  status: string;

  @Property()
  note: string;

  @Property()
  repayment_date: string;
  @Property()
  interest_rate: string;

  @Name("created_at")
  @Property()
  createdAt: any;

  @Name("updated_at")
  @Property()
  updatedAt: any;
}
