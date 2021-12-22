import { BodyParams, Controller, Delete, Get, Post, Put, QueryParams, Req, Res, UseAuth } from "@tsed/common";
import { TransactionService } from "../services/transactions";
import { AuthService } from "../services/auth";

@Controller({
  path: "/",
})

export class RootCtrl {
  constructor(private service: TransactionService, private authService: AuthService) {

  }

  @Post("/make-payment")
  async purchaseProject(@Res() res: Res, @Req() req: Req, @BodyParams() body: any) {
    let {project_id, email}=body;
    console.log(project_id, email)

    try{
        let transaction = await this.service.initTransaction(email, project_id);
        console.log(transaction.details);
        res.redirect(transaction.details.data.authorization_url);
        console.log(transaction)
    }catch(e){
        console.log(e);
        res.redirect("/")
    }
  }

  @Get("/verify-pay")
  async verifyPay(@Res() res: Res, @Req() req: Req, @QueryParams() query: any) {
    console.log(query)
    try{
        let transaction = await this.service.verifyTransaction(query['reference']);
        console.log(transaction)
    }catch(e){
        console.log(e);
        res.redirect("/")
    }
  }
}
