import { Required, Name, Description, Property, Enum } from "@tsed/schema";

import { Model, Ref } from "@tsed/mongoose";

@Model({
  schemaOptions: { timestamps: true, collection: "orders" },
  collection: "orders",
})
export class OrderModel {
  // Default
  @Name("id")
  _id?: string;

  @Name("created_at")
  @Property()
  createdAt?: any;

  @Name("updated_at")
  @Property()
  updatedAt?: any;

  // Primary info

  
  @Description("")
  @Enum(["voucher", "marketplace"])
  @Property()
  order_for: string;

  @Property()
  @Description("")
  service_id: string;

  @Property()
  @Description("")
  voucher_id?: string;

  @Property()
  @Description("")
  publisher_id?: string;

  @Property()
  @Description("")
  user_note: string;

  @Property()
  @Description("")
  @Enum(["pending", "processing", "completed"])
  status: string;

  @Property()
  @Description("")
  provider_id: string;

  @Property()
  @Description("")
  @Enum(["pending", "processing", "completed"])
  provider_status: string;
}

@Model({
  schemaOptions: { timestamps: true, collection: "transactions" },
  collection: "transactions",
})
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
