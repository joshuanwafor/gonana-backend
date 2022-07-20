import { Service } from "@tsed/di";
import firebase from "firebase-admin"
import { UserService } from "../users/user-service";


const messaging = firebase.messaging();
const historyCollection = firebase.firestore().collection("user-history");

@Service()
export class NotificationService {

    constructor(private userService: UserService) { }

    async sendNotification(user_id: string, message: {
        title: string,
        body: string,
    }) {
        let user = await this.userService.find(user_id);

        messaging.sendToDevice(
            user.messaging_token, { notification: message }
        );
        this.addToHistory(user_id, message);
    }

    addToHistory(user_id:string, message: any) {
        historyCollection.add({
            created_on: Date.now(),
            data: message
        })
    }

}