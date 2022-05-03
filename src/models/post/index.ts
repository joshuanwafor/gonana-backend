import {
  Required,
  Name,
  Description,
  Property,
  CollectionOf,
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
  body: string;

  @Property()
  @Description("")
  categories: string[];

  @Property()
  @Description("")
  @CollectionOf(Media)
  media: Media[];
}
