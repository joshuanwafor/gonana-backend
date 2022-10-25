import {
  Required,
  Name,
  Description,
  Property,
  Enum,
  CollectionOf,
  Default,
} from "@tsed/schema";

import { Model, Ref, Schema } from "@tsed/mongoose";

export class TransactionModel {
  @Property()
  authorization_url: string;
  @Property()
  access_code: string;
  @Property()
  reference: string;
  @Property()
  status?: string;
}

class OrderCollectionItem {
  @Property()
  item_id: string;
  @Property()
  name: string;
  @Property()
  photo: string;
  @Property()
  description: string;
  @Property()
  quantity: number;
  @Property()
  amount: number;
}

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

  @Property()
  @Description("")
  publisher_id?: string;

  @Property()
  @Description("")
  @Enum(["pending", "processing", "completed"])
  status: string;

  @Property()
  @Description("")
  tracking_id: string;

  @Property()
  @Description("")
  provider_id: string;

  @Property()
  @Description("")
  total: number;

  @Property()
  @Description("")
  @Enum(["pending", "processing", "completed", "rejected"])
  provider_status: string;

  @Property()
  @Description("")
  @Enum(["pending", "completed"])
  @Default("pending")
  payment_status?: string;

  @Property()
  @Description("")
  delivery_method: string;

  @Property()
  @Description("")
  payment_method: string;

  @Property()
  @CollectionOf(OrderCollectionItem)
  items: OrderCollectionItem[];

  @Property()
  paystack_trans?: TransactionModel;
}
