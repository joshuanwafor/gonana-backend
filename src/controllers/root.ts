import {
  Controller,
  Get,
  Inject,
  PlatformCache,
  Post,
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
import { Description, Returns, Summary } from "@tsed/schema";
import { UserFeedSchema } from "../schama/response";
import { OrderModel } from "../models/order/order";
import { OrderService } from "../services/order-service";

@Controller({
  path: "/public",
})
export class RootCtrl {
  @Inject()
  cache: PlatformCache;
  constructor(
    private postService: PostService,
    private transactionService: TransactionService,
    private orderService: OrderService,
    private users: UserService,
    private taxonomyService: TaxonomyService
  ) {}

  @Get("/posts")
  @Summary("Summary of this route")
  @Description("Description of this route")
  @Returns(200, Array).Of(PostModel).Description("Success")
  @Returns(500, Object)
  async get(): Promise<PostModel[]> {
    return await this.postService.query({});
  }

  @Get("/open-orders")
  @Summary("Summary of this route")
  @Description("Description of this route")
  @Returns(200, Array).Of(OrderModel).Description("Success")
  @Returns(500, Object)
  async getOpenOrders(): Promise<OrderModel[]> {
    return await this.orderService.query({ tracking_id: null });
  }

  @Get("/profile-feed")
  @Returns(200, UserFeedSchema).Description("Success")
  async getUserFeed(@QueryParams("id") id: string) {
    let all = await this.postService.model.find({ publisher_id: id });
    let products = await this.postService.model.find({
      type: "product",
      publisher_id: id,
    });
    let posts = await this.postService.model.find({
      type: "post",
      publisher_id: id,
    });

    return {
      all,
      posts,
      products,
    };
  }

  @Get("/category-feed")
  @Returns(200, UserFeedSchema).Description("Success")
  async getCategoryFeed(@QueryParams("id") id: string) {
    let products = await this.postService.model.find({
      type: "product",
      category: id,
    });
    return {
      products,
    };
  }

  @Get("/feed")
  // @UseCache({ ttl: 60000 })
  @Summary("Summary of this route")
  @Description("Description of this route")
  @Returns(200, UserFeedSchema).Description("Success")
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

  @Get("/feed-within-location")
  // @UseCache({ ttl: 60000 })
  @Summary("Summary of this route")
  @Description("Description of this route")
  @Returns(200, UserFeedSchema).Description("Success")
  @Returns(500, Object)
  async getFeedWithinLocation(
    @QueryParams("long") long: string,
    @QueryParams("lat") lat: string
  ) {
    let locationQuery = {
      $geometry: {
        type: "Point",
        coordinates: [-73.9667, 40.78],
      },
      $minDistance: 10,
      $maxDistance: 5000,
    };

    let users = await this.users.User.find({
      paystack_bank_integration: { $ne: undefined },
      photo: { $ne: undefined },
      phone: { $ne: undefined },
    });
    let products = await this.postService.model.find({
      location: {
        $nearSphere: locationQuery,
      },
      type: "product",
    });
    let posts = await this.postService.model.find({
      location: {
        $nearSphere: locationQuery,
      },
      type: "post",
    });
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
  async hook(@Res() res: Res, @Req() req: Req) {
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
