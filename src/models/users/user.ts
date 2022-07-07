import {} from "@tsed/common";
import { Model, Schema, Unique, Indexed } from "@tsed/mongoose";
import { Required, Name, Property, CollectionOf, Default } from "@tsed/schema";

@Schema({})
class Location {
  @Property()
  @Default("Point")
  type: string;

  @Property()
  coordinates: string[];
}

@Schema()
class PaystackBankIntegrationSchema {
  @Property()
  business_name: string;

  @Property()
  account_number: string;

  @Property()
  percentage_charge: Number;

  @Property()
  settlement_bank: string;

  @Property()
  currency: string;

  @Property()
  bank: Number;

  @Property()
  integration: Number;

  @Property()
  domain: string;

  @Property()
  subaccount_code: string;

  @Property()
  is_verified: boolean;

  @Property()
  settlement_schedule: string;

  @Property()
  active: boolean;

  @Property()
  migrate: boolean;

  @Property()
  id: Number;

  @Property()
  createdAt: string;

  @Property()
  updatedAt: string;
}

@Model({ schemaOptions: { timestamps: true } })
export class User {
  @Name("id")
  _id: string;

  @Name("created_at")
  @Property()
  createdAt: any;

  @Name("updated_at")
  @Property()
  updatedAt: any;

  @Property()
  fullname: string;
  @Property()
  first_name: string;
  @Property()
  last_name: string;
  @Property()
  bio: string;

  @Property()
  verified: boolean;

  @Name("fuid")
  @Required()
  @Property()
  @Unique()
  fuid: string;

  @Property()
  @Unique()
  @Required()
  email: string;


  @Property()
  phone: string;

  @Property()
  account_status: string;

  @Property()
  photo: string;

  @Property()
  cover: string;

  @CollectionOf(PaystackBankIntegrationSchema)
  @Property()
  paystack_bank_integration: PaystackBankIntegrationSchema;

  @Property()
  country: string;

  @Property()
  state: string;

  @Property()
  street: string;

  @Property()
  city: string;

  @Property()
  location: Location;
}
