import {
  BodyParams,
  Controller,
  Delete,
  Get,
  Inject,
  PathParams,
  PlatformCache,
  Post,
  Put,
  QueryParams,
  Req,
  Res,
} from "@tsed/common";
import { TransactionService } from "../services/transactions";
import { PostService } from "../services/post";
import { UserService } from "../services/users/user-service";
import { User } from "../models/users/user";
import { PostModel } from "../models/post";
import { TaxonomyModel } from "../models/taxonomy/taxonomy";
import { TaxonomyService } from "../services/taxonomy/taxonomy-service";
import {
  Deprecated,
  Description,
  Returns,
  Security,
  Summary,
} from "@tsed/schema";
import { UserFeedSchema } from "../schama/response";

@Controller({
  path: "/public",
})
export class RootCtrl {
  @Inject()
  cache: PlatformCache;
  constructor(
    private postService: PostService,
    private transactionService: TransactionService,
    private users: UserService,
    private taxonomyService: TaxonomyService
  ) {}

  @Get("/posts")
  @Summary("Summary of this route")
  @Description("Description of this route")
  @Returns(200, Array).Of(PostModel).Description("Success")
  @Returns(404, Object)
  @Returns(500, Object)
  async get(): Promise<PostModel[]> {
    return await this.postService.query({});
  }

  @Get("/feed")
  // @UseCache({ ttl: 60000 })
  @Summary("Summary of this route")
  @Description("Description of this route")
  @Returns(200, UserFeedSchema).Description("Success")
  @Returns(404, Object)
  @Returns(500, Object)
  async getFeed() {
    let users = await this.users.User.find({
      paystack_bank_integration: { $ne: undefined },
      photo: { $ne: undefined },
      phone: { $ne: undefined },
    });
    let products = await this.postService.model.find({ type: "product" });
    let posts = await this.postService.model.find();
    let topics = await this.taxonomyService.model.find({});
    let feed: {
      users: User[];
      products: PostModel[];
      posts: PostModel[];
      topics: TaxonomyModel[];
    } = {
      users,
      posts,
      products,
      topics,
    };
    return feed;
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
