import { ProviderType, ProviderScope } from "@tsed/di";
import { Inject, Injectable } from "@tsed/di";
import { JWTService } from "./jsonwebtokens/userToken";

@Injectable({
    type: ProviderType.VALUE,
    scope: ProviderScope.REQUEST,
  })
export class AuthService{
    user_id:string|null= null;

    @Inject(JWTService)
    private jwtService: JWTService;

    verify = (token: string)=> {
        try{
          let decoded=this.jwtService.verifyUserToken(token);
          this.user_id= decoded._id;
        }catch(e){
            console.log(e);
        }
    }
}