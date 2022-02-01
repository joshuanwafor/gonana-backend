import { Injectable } from "@tsed/common";
import { OnEvent } from "@tsed/event-emitter";
import { User } from "../models/users/user";
import { EVENT_TYPES } from "../events/index";



@Injectable()
export class TestEventListener {
  @OnEvent("test-event")
  testListener(event: any) {
    // implement something here
    console.log("✅  event listener works if this can be seen on the console");
  }
}

@Injectable()
export class UserEventListener {
  @OnEvent("user.created")
  onCreateUserCreate(user: User) {
    // implement something here
    console.log("✅  create user");
  }
  @OnEvent("user.updated")
  onUpdateUserCreate(user: User) {
    // implement something here
    console.log("✅  update user");
  }

  @OnEvent("user.deleted")
  onDeleteUserCreate(user_id: string) {
    // implement something here
    console.log("✅  delete user");
  }
}
