export class SignInResponse {
  public id: number;
  public username: string;
  public token: string;
  public firstName: string;  // Nuevo
  public lastName: string;   // Nuevo

  constructor(id: number, username: string, token: string, firstName: string, lastName: string) {
    this.id = id;
    this.username = username;
    this.token = token;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
