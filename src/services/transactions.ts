import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { OrderModel, TransactionModel } from "../models/order/order";
import { PaystackActions } from "./paystack/paystack-actions";
import { UserService } from "./users/user-service";
import { OrderService } from "./order-service";
import { NotificationService } from "./firebase/notifications";

const paystackActions = new PaystackActions();

@Service()
export class TransactionService {
  @Inject(TransactionModel)
  private model: MongooseModel<TransactionModel>;

  @Inject(UserService)
  private userService: UserService;

  @Inject(OrderService)
  private orderService: OrderService;

  @Inject(NotificationService)
  private notificationService: NotificationService;

  verifyTransaction = async (ref: string) => {
    paystackActions.verifyTransaction(ref).then(async (res) => {
      if (res == true) {
        let type = ref.split("-")[0];
        let item_id = ref.split("-")[1];
        // payment for voucher
        // @ts-ignore
        this.orderService.save({
          _id: item_id,
          payment_status: "completed",
        });

        let order = await this.orderService.find(item_id);

        this.notificationService.sendNotification(order.provider_id, {
          title: "Order payment completed",
          body: "This is to notifify you that payment has been completed on your order; Proceed to delivering goods to customer"
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
