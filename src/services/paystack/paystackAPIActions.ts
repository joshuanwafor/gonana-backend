import { string } from "@tsed/schema";
import axios, { AxiosResponse } from "axios";
const SEC_KEY = "Bearer sk_test_9684e8c5e16ebdf4816bbfaac0c28086971cb6ca"


export class PaystackActions {

    addSubaccount = async (info: any): Promise<any> => {

        let response = await axios({
            method: "post",
            url: "https://api.paystack.co/subaccount",
            headers: {
                'Authorization': SEC_KEY,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(info)
        });


        if (response.status == 201 || response.status == 200) {
            if (response.data.status == true) {
                let addAccountData = response.data;
                return addAccountData;
            }
        } else {
            throw response.data;
        }

    }

    initTransaction = async (data:
        {
            email: string,
            amount: string,
            currency: string,
            callback_url: "http://url.com",
            metadata: string,
            reference: string,
            subaccount: string,

        }
    ): Promise<{
        authorization_url: string;
        access_code: string;
        reference: string;
    }> => {

        let response = await axios({
            method: "post",
            url: "https://api.paystack.co/transaction/initialize",
            headers: {
                'Authorization': SEC_KEY,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        });

        let initData: {
            authorization_url: string;
            access_code: string;
            reference: string;
        } = response.data

        return initData;
    }

    verifyTransaction = async (REFERENCE: string): Promise<boolean> => {
        let response = await axios({
            method: "get",
            url: `https://api.paystack.co/transaction/verify/${REFERENCE}`,
            headers: {
                'Authorization': SEC_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (response.status == 201 || response.status == 200) {
            if (response.data.status == true && response.data.data.status == "success") {
                return true;
            }
        } else {
            return false;
        }
    }
}