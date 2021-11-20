import { Inject, Service } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { TransactionModel } from "../models/Order";
import { ProjectModel } from "../models/Project";
import { PaystackActions } from "./paystack/paystackAPIActions";
import { PaystackService } from "./paystack/sumbitBankInfo";
import { ProjectService } from "./projects/ProjectService";
import { UserService } from "./users/UserService";


const paystackService = new PaystackService;

const paystackActions = new PaystackActions;

@Service()
export class TransactionService {

    @Inject(TransactionModel)
    private model: MongooseModel<TransactionModel>;

    @Inject(UserService)
    private userService: UserService;

    @Inject(ProjectService)
    private projectService: ProjectService;

    initTransaction = async (buyer_email: string, project_id: string): Promise<TransactionModel> => {
        let transaction = await this.model.findOne({ buyer_email: buyer_email });

        if (transaction == null) {
            let project = await this.projectService.find(project_id);
            let merchant = await this.userService.find(project.creator_id);

            let ref = "tran-" + project.creator_id+ "-" + "buyer-email";

            let paystack_trans_det = await paystackActions.initTransaction({
                reference: ref,
                subaccount: merchant.paystack_bank_integration.subaccount_code,
                email: buyer_email,
                amount: project.price.toString(),
                metadata: "",
                callback_url: "http://url.com",
                currency: ""
            });

            // @ts-ignore
            let tempT: TransactionModel = {
                amount: project.price,
                buyer_email: "buyer@gmail.com",
                merchant_id: project.creator_id,
                transaction_ref: ref,
                details: paystack_trans_det
            };
            transaction = await this.model.create(tempT);
        }

        return transaction;
    }

    verifyTransaction = () => {

    }

    getUserTransactions =async (user_id: string)=>{
        return await this.model.find({
            merchant_id: user_id
        }).exec()
    }
}