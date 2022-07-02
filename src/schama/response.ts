import { PostModel } from "../models/post";
import { TaxonomyModel } from "../models/taxonomy/taxonomy";
import { User } from "../models/users/user";
import { Property, CollectionOf } from "@tsed/schema";

export class UserFeedSchema {
  @Property()
  @CollectionOf(PostModel)
  products: PostModel[];
  @Property()
  @CollectionOf(PostModel)
  posts: PostModel[];
  @Property()
  @CollectionOf(TaxonomyModel)
  topics: TaxonomyModel[];
  @CollectionOf(User)
  @Property()
  users: User[];
  @Property()
  state: string;
}
