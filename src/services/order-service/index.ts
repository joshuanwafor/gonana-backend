import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { User } from "../../models/users/user";
import { OrderModel } from "../../models/order/order";
import { UserService } from "../users/user-service";
import { PaystackActions } from "../paystack/paystack-actions";
import { PostService } from "../post";

const paystackActions = new PaystackActions();

@Service()
export class OrderService {
  @Inject(OrderModel)
  model: MongooseModel<OrderModel>;

  @Inject(UserService)
  userService: UserService;

  @Inject(PostService)
  postService: PostService;

  async find(id: string): Promise<OrderModel> {
    const item = await this.model.findById(id).exec();
    return item;
  }

  async getOrderDetails(
    id: string
  ): Promise<{ order: OrderModel; provider: User; publisher: User }> {
    const order = await this.model.findById(id).exec();
    const publisher = await this.userService.find(order.publisher_id);
    const provider = await this.userService.find(order.provider_id);
    return { order, publisher, provider };
  }

  async save(item: OrderModel): Promise<OrderModel> {
    const model = new this.model(item);
    await model.updateOne(item, { upsert: true });
    return model;
  }

  async query(options = {}): Promise<OrderModel[]> {
    return this.model.find(options).exec();
  }

  async generatePaystackPaymentTransaction(
    order_id: string
  ): Promise<OrderModel> {
    let order = await this.find(order_id);
    let provider: User;
    let buyer: User;

    if (order.paystack_trans != undefined) {
      return order;
    }

    try {
      provider = await this.userService.find(order.provider_id);
      buyer = await this.userService.find(order.publisher_id);

      if (provider.paystack_bank_integration == undefined) {
        throw "Provider Bank Account Info Not Set";
      }

      let paystack_trans_det = await paystackActions.initTransaction({
        reference: "order-" + order._id,
        subaccount: provider.paystack_bank_integration.subaccount_code,
        email: buyer.email,
        amount: order.total * 100,
      });

      // @ts-ignore
      console.log(paystack_trans_det.data, "after creating det");
      // @ts-ignore
      await this.save(
        // @ts-ignore
        { _id: order_id, paystack_trans: paystack_trans_det.data }
      );

      return this.find(order_id);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<OrderModel> {
    return await this.model.findById(id).remove().exec();
  }
}
