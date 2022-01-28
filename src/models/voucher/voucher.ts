import {
  Required,
  Name,
  Description,
  Property,
  Schema,
  Enum,
  Default,
} from "@tsed/schema";

import { Model, Ref } from "@tsed/mongoose";

@Model({
  schemaOptions: { timestamps: true, collection: "vouchers" },
  collection: "vouchers",
})
export class VoucherModel {
  @Name("id")
  _id?: string;

  @Property()
  @Description("")
  publisher_id: string;

  @Property()
  @Description("")
  farmer_id: string;

  @Name("created_at")
  @Property()
  createdAt?: any;

  @Name("updated_at")
  @Property()
  updatedAt?: any;

  @Property()
  @Description("")
  @Enum(["pending", "accepted", "completed", "processing", "overdue"])
  status: string;

  @Property()
  @Description("")
  description: string;

  @Property()
  @Description("")
  @Enum(["loan", "service"])
  @Default("loan")
  type: string;

  @Property()
  repayment_date: number;
  @Property()
  interest_rate: string;

  // @Property()
  // loan_response?: VoucherLenderResponse;
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

export type VoucherServiceAttach = {
  service_id: string;
  provider_id: string;
  amount: number;
  description: string;
};


export class NewVoucher {
  description: string;
  status: string;
  type: "loan"|"service";
  interest_rate: string;
  repayment_date: number;
  services: VoucherServiceAttach[];
}
