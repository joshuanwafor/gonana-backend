import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { OrderModel, TransactionModel} from "../models/Order";
import { PaystackActions } from "./paystack/paystackAPIActions";
import { PaystackService } from "./paystack/sumbitBankInfo";
import { ProductService } from "./product/ProductService";
import { UserService } from "./users/UserService";

const paystackService = new PaystackService();

const paystackActions = new PaystackActions();

@Service()
export class TransactionService {
  @Inject(TransactionModel)
  private model: MongooseModel<TransactionModel>;

  @Inject(UserService)
  private userService: UserService;

  @Inject(ProductService)
  private productService: ProductService;

  initTransaction = async (
    buyer_email: string,
    project_id: string
  ): Promise<TransactionModel> => {
    let transaction = await this.model.findOne({ buyer_email: buyer_email });

    if (transaction == null) {
      console.log(
        "creating transaction for ",
        buyer_email,
        "- for -",
        project_id
      );
      let project = await this.productService.find(project_id);
      let merchant = await this.userService.find(project.publisher_id);

      if (merchant == null || project == null) {
        console.log(project, merchant);
        throw "Somthing went wrong";
      }
      let ref = "tran-" + project._id + "-" + Date.now();

      let paystack_trans_det = await paystackActions.initTransaction({
        reference: ref,
        subaccount: merchant.paystack_bank_integration.subaccount_code,
        email: buyer_email,
        amount: "",
      });

      // @ts-ignore
      let tempT: TransactionModel = {
        amount: 1,
        buyer_email: buyer_email,
        merchant_id: project.publisher_id,
        transaction_ref: ref,
        details: paystack_trans_det,
      };
      transaction = await this.model.create(tempT);
    }

    return transaction;
  };

  verifyTransaction = (ref: string) => {
    paystackActions.verifyTransaction(ref).then((res) => {
      if (res == true) {
        // payment successfull
        // disburse item
      }
    });
  };

  getUserTransactions = async (user_id: string) => {
    return await this.model
      .find({
        merchant_id: user_id,
      })
      .exec();
  };
}
