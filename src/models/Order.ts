import {Required, Name, Description, Property} from "@tsed/schema";

import {Model, Ref} from "@tsed/mongoose";


@Model({ schemaOptions: { timestamps: true, collection: 'transactions', }, collection: 'transactions', })
export class TransactionModel {
  @Name("id")
  _id: string;

  @Property()
  @Description("")
  created_at: Date = new Date();

  @Property()
  @Description("")
  updated_at: Date = new Date();

  @Name("buyer-email")
  @Description("")
  buyer_email: string;

  @Name("buyer-phone")
  @Description("")
  buyer_phone: string;

  @Name("project-id")
  @Description("")
  project_id: string;

  @Name("merchant-id")
  @Description("")
  merchant_id: string;

  @Property()
  @Description("")
  description: string;

  @Property()
  @Description("")
  status: string;

  @Property()
  @Description("")
  transaction_ref: string;

  @Property()
  @Description("")
  amount: number;

  @Property()
  @Description("")
  details: any;

}
