import {Required, Name, Description, Property} from "@tsed/schema";

import {Model, Ref} from "@tsed/mongoose";


@Model()
export class TransactionModel {
  @Name("id")
  _id: string;

  @Property()
  @Description("Creation's date")
  created_at: Date = new Date();

  @Property()
  @Description("Last modification date")
  updated_at: Date = new Date();

  @Name("buyer-email")
  @Description("Buyer phone")
  buyer_email: string;

  @Name("buyer-phone")
  @Description("Buyer email")
  buyer_phone: string;

  @Name("project-id")
  @Description("Buyer email")
  project_id: string;

  @Name("merchant-id")
  @Description("")
  merchant_id: string;

  @Property()
  @Description("Order description")
  description: string;

  @Property()
  @Description("pending | paid | completed")
  status: string;

  @Property()
  @Description("Transaction ref")
  transaction_ref: string;

  @Property()
  @Description("Project status")
  amount: number;

  @Property()
  @Description("Project status")
  details: any;

}
