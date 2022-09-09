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



export type WebAuthPayload = {
  "iat": number
  "aud": string;
  "nonce": string;
  "iss": string;
  "wallets": {
    "public_key": string;
    "type": string;
    "curve": string;
  }[

  ],
  "email": string;
  "name": string;
  "profileImage": string;
  "verifier": string;
  "verifierId": string;
  "aggregateVerifier": string;
  "exp": number;
}