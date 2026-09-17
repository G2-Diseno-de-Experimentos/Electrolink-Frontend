export class ProfileRequest {
  public firstName: string;
  public lastName: string;
  public email: string;
  public street: string;
  public role: string; // "HOMEOWNER" o "TECHNICIAN"
  public additionalInfoOrCertification: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    street: string,
    role: string,
    additionalInfoOrCertification: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.street = street;
    this.role = role;
    this.additionalInfoOrCertification = additionalInfoOrCertification;
  }
}
