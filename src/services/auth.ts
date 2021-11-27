import { ProviderType, ProviderScope } from "@tsed/di";
import { Inject, Injectable } from "@tsed/di";
import { JWTService } from "./jsonwebtokens/userToken";

@Injectable({
  type: ProviderType.VALUE,
  scope: ProviderScope.REQUEST,
})
export class AuthService {
  user_id: string | null = null;

  @Inject(JWTService)
  jwtService: JWTService;

  verify = async (token: string) => {
    try {
      let decoded = await this.jwtService.verifyUserToken(token);
      console.log(decoded, "after verify")
      this.user_id = decoded._id;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}