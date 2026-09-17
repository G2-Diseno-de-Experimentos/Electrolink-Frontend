export class ProfileResponse {
  public id: number;
  public role: string;

  constructor(id: number, role: string) {
    this.id = id;
    this.role = role;
  }
}
