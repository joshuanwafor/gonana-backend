import {
  Required,
  Name,
  Description,
  Property,
  Schema,
  CollectionOf,
} from "@tsed/schema";

import { Model, Ref } from "@tsed/mongoose";

@Schema({})
class MediaAttachment {
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
  schemaOptions: { timestamps: true, collection: "course" },
  collection: "course",
})
export class ResourceModel {
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
  @Description("")
  type: string; // lesson , post, course-taxonomy

  @Description("")
  @Property()
  title: string;

  @Property()
  body: string;

  @Property()
  status: string;

  @Property()
  @Description("")
  categories: string[];

  @CollectionOf(MediaAttachment)
  attachment?: MediaAttachment;
}
