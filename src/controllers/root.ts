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

@Controller({
  path: "/public",
})
export class RootCtrl {
  constructor(
    private service: PostService,
    private transactionService: TransactionService
  ) {}

  @Get("/posts")
  async get() {
    return await this.service.query({});
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
