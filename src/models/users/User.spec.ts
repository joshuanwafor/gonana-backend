// import { MongooseModel } from "@tsed/mongoose";
// import { TestMongooseContext } from "@tsed/testing-mongoose";
// import { expect } from "chai";
// import { User } from "./User";

// describe("UserModel", () => {
//   beforeEach(TestMongooseContext.create);
//   afterEach(TestMongooseContext.reset);

//   it("should run pre and post hook", TestMongooseContext.inject([User], async (userModel: MongooseModel<User>) => {
//     // GIVEN
//     const user = new userModel({
//       fullname: "name"
//     });

//     // WHEN
//     await user.save();

//     // THEN
//     expect(user.fullname).to.equal("name");
//   }));
// });
