import {
  BodyParams,
  Controller,
  Delete,
  Get,
  PathParams,
  Post,
  Put,
  QueryParams,
  Req,
  Res,
  UseAuth,
} from "@tsed/common";
import { TransactionService } from "../services/transactions";
import { PostService } from "../services/post";
import { UserService } from "src/services/users/user-service";

@Controller({
  path: "/public",
})
export class RootCtrl {
  constructor(
    private service: PostService,
    private transactionService: TransactionService,
    private users: UserService
  ) {}

  @Get("/posts")
  async get() {
    return await this.service.query({});
  }

  @Get("/farms")
  async getFarms() {
    return await this.users.User.find();
  }

  @Post("/hook")
  async hook(@Res() res: Res, @Req() req: Req, @QueryParams() query: any) {
    var body: any = req.body;

    console.log("in hook", body);
    if (body.event == "charge.success") {
      let reference = body.data.reference;
      try {
        let transaction = await this.transactionService.verifyTransaction(
          reference
        );
      } catch (e) {
        console.log(e);
        res.redirect("/");
      }
    }

    res.send(200);
  }
}
