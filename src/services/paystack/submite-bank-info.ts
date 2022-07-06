import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { $log } from "@tsed/logger";
import { User } from "../../models/users/user";
import { Required } from "@tsed/schema";
import axios from "axios";
import { PaystackActions } from "./paystack-actions";
const SEC_KEY = "Bearer sk_test_2e1670217f205c4b1182a7c303b8ee5a6b35dd89";

let paystackActions = new PaystackActions();

@Service()
export class PaystackService {
  @Inject(User)
  private User: MongooseModel<User>;

  addUserSubaccount = async (
    info: CreateAccountForm,
    userID: string
  ): Promise<User> => {
    info.percentage_charge = 30;
    if (process.env.NODE_ENV !== "production") {
      (info.business_name = "10x store"),
        (info.settlement_bank = "033"),
        (info.account_number = "2204577180"),
        (info.percentage_charge = 20);
    }

    let user = await this.User.findById(userID).exec();
    if (user == null) {
      throw "User must be set...";
    } else {
      // check if paystack set already
      if (
        user.paystack_bank_integration != null ||
        user.paystack_bank_integration != undefined
      ) {
        return user;
      }
    }

    try {
      let data = await paystackActions.addSubaccount(info);
      user.paystack_bank_integration = data.data;
      await user.save();
      return user;
    } catch (e) {
      throw e;
    }
  };
}

export class CreateAccountForm {
  @Required()
  business_name: string;
  @Required()
  settlement_bank: string;
  @Required()
  account_number: string;
  @Required()
  percentage_charge: number;
  primary_contact_email: string;
  primary_contact_name: string;
  primary_contact_phone: string;
}
