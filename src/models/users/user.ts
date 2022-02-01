import {} from "@tsed/common";
import { Model, Schema } from "@tsed/mongoose";
import { Required, Name, Property, CollectionOf } from "@tsed/schema";

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

@Schema()
class Address {
  country: string;
  state: string;
  street: string;
  zip_code: string;
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
  first_name: string;

  @Property()
  last_name: string;

  @Property()
  bio: string;

  @Property()
  verified: boolean;

  @Property()
  isProvider: boolean;
  @Property()
  isBank: boolean;

  @Name("fuid")
  @Required()
  @Property()
  fuid: string;

  @Property()
  email: string;

  @Property()
  phone: string;

  @Property()
  account_status: string;

  @Property()
  photo: string;

  @CollectionOf(PaystackBankIntegrationSchema)
  @Property()
  paystack_bank_integration: PaystackBankIntegrationSchema;

  @Property()
  address: Address;
}