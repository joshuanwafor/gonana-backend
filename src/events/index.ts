import { Inject, Service } from "@tsed/di";
import { TestEventListener } from "./sample-listeners";
import { EventEmitterService } from "@tsed/event-emitter";

export const EVENT_TYPES = {
  USER_CREATE: "user.create",
  USER_UPDATE: "user.update",
  USER_DELETE: "user.delete",
  VOUCHER_CREATE: "course.create",
  VOUCHER_UPDATE: "course.update",
  VOUCHER_DELETE: "course.delete",
  ORDER_CREATE: "order.create",
  ORDER_UPDATE: "order.update",
  ORDER_DELETE: "order.delete",
};

@Service()
export class RegisterEventListeners {
  @Inject() test: TestEventListener;

  constructor() {}
}
