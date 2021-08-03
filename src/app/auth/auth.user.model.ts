export class AuthUser{
  constructor(public userId: string, private token: string, private tokenExpirationdate: Date){

  }
}
