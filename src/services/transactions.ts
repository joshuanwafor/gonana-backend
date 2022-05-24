import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { OrderModel, TransactionModel } from "../models/order/order";
import { PaystackActions } from "./paystack/paystack-actions";
import { UserService } from "./users/user-service";
import { OrderService } from "./order-service";

const paystackActions = new PaystackActions();

@Service()
export class TransactionService {
  @Inject(TransactionModel)
  private model: MongooseModel<TransactionModel>;

  @Inject(UserService)
  private userService: UserService;

  @Inject(OrderService)
  private orderService: OrderService;

  verifyTransaction = async (ref: string) => {
    paystackActions.verifyTransaction(ref).then((res) => {
      if (res == true) {
        let type = ref.split("-")[0];
        let item_id = ref.split("-")[1];
        // payment for voucher
        // @ts-ignore
        this.orderService.save({
          _id: item_id,
          payment_status: "completed",
        });
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
