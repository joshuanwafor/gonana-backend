import {Required, Name, Description, Property, CollectionOf} from "@tsed/schema";

import {Model, Ref} from "@tsed/mongoose";

class Media {
    status: string;
    file_type: string;
    source: string;
    source_id: string;
    content_url: string;
    name: string;
}

@Model({
    schemaOptions: {timestamps: true, collection: "posts"},
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

