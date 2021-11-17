
import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { $log } from "@tsed/logger";
import { User } from '../../models/users/User';
import { Required } from "@tsed/schema";
import axios from "axios";
import { PaystackActions } from './paystackAPIActions';
import { ProjectModel } from '../../models/Project';
const SEC_KEY = "Bearer sk_live_b5592eabd7d3ca30737be9859586999fe6d76231"

let paystackActions = new PaystackActions;

@Service()
export class PaystackService {
    @Inject(User)
    private User: MongooseModel<User>;
   
    addUserSubaccount = async (info: CreateAccountForm, userID: string): Promise<User> => {
        if (process.env.NODE_ENV !== "production") {
            info.business_name = "10x store",
                info.settlement_bank = "033",
                info.account_number = "2204577180",
                info.percentage_charge = 18.2
        }

        let user = await this.User.findById(userID).exec();
        if (user == null) {
            throw "User must be set..."
        } else {
            // check if paystack set already
            if (user.paystack_bank_integration != null || user.paystack_bank_integration != undefined) {
                return user;
            }
        }

        try {
            let data = await paystackActions.addSubaccount(info);
            user.paystack_bank_integration = data.data;
            await user.save()
            return user;
        } catch (e) {
            throw e;
        }
    }

    // initUserCourseEnrollmentProcess = async (userID: string, courseID: string) => {

    //     let user = await this.User.findById(userID).exec();

    //     let course = await this..findById(courseID).exec();

    //     let instructor = await this.User.findOne({ _id: course.creator_id });

    //     if (instructor.paystack_bank_integration == undefined || instructor.paystack_bank_integration == null) {
    //         throw "Instructor banking details not setup...";
    //     }

    //     const ref = `${course._id}-${user._id}-en`;

    //     let response = await paystackActions.initTransaction({
    //         amount: `${course.course_price}`,
    //         currency: instructor.paystack_bank_integration.currency ?? "NGN",
    //         email: user.email,
    //         metadata: JSON.stringify({}),
    //         reference: ref,
    //         callback_url: "http://url.com",
    //         subaccount: instructor.paystack_bank_integration.subaccount_code
    //     });

    //     return response;

    // }

    // verifyEnrollmentTransaction = async (ref: string): Promise<Enrollment> => {
    //     let arr = ref.split('-');

    //     let course_id = arr[0];
    //     let user_id = arr[1];

    //     console.log(course_id, user_id);
    //     let check = paystackActions.verifyTransaction(ref);

    //     if (check) {
    //         let data = await this.Enrollment.create({ user_id: user_id, course_id: course_id, transaction_ref: ref });
    //         return data;
    //     }
    // }

}






export class CreateAccountForm {
    @Required()
    business_name: string;
    @Required()
    settlement_bank: string;
    @Required()
    account_number: string;
    @Required()
    percentage_charge: number
    primary_contact_email: string;
    primary_contact_name: string;
    primary_contact_phone: string;
}
