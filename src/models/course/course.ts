import { Required, Name, Description, Property } from "@tsed/schema";

import { Model, Ref } from "@tsed/mongoose";

@Model({
  schemaOptions: { timestamps: true, collection: "course" },
  collection: "course",
})
export class CourseModel {
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
  code: string;

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

  @Property()
  @Description("")
  photo: string;
}
