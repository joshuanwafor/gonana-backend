import {
  Name,
  Description,
  Property,
  CollectionOf,
  Default,
} from "@tsed/schema";

import { Model, Ref, Schema } from "@tsed/mongoose";

@Schema()
class Media {
  @Property()
  status: string;
  @Property()
  file_type: string;
  @Property()
  source: string;
  @Property()
  source_id: string;
  @Property()
  content_url: string;
  @Property()
  name: string;
}

class GeoLocation {
  @Property()
  type: string;
  @CollectionOf(Number)
  @Property()
  coordinates: number[];
}

@Model({
  schemaOptions: { timestamps: true, collection: "posts" },
  collection: "posts",
})
export class PostModel {
  @Name("id")
  _id: string;

  @Name("created_at")
  @Property()
  createdAt: any;

  @Name("updated_at")
  @Property()
  updatedAt: any;

  @Property()
  @Description("")
  publisher_id: string;

  @Property()
  @Default("post")
  type: string;

  @Property()
  name: string;

  @Property()
  body: string;

  @Property()
  @Description("")
  @CollectionOf(String)
  categories: string[];

  @Property()
  @Description("")
  @CollectionOf(Media)
  media: Media[];

  @Property()
  @Default(0)
  amount: number;

  @Property()
  @CollectionOf(GeoLocation)
  location: any
}
