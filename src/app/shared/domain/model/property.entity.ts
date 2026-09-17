export interface OwnerId {
  ownerId: string;
}

export interface Address {
  street     : string;
  number     : string;
  city       : string;
  postcode   : string;
  country    : string;
  latitude   : number;
  longitude  : number;
}

export interface Region {
  name: string;
}

export interface District {
  name: string;
}

export interface PropertyPhoto {
  photoUrl: string;
}

export interface Property {
  id: string;
  ownerId: OwnerId;
  address: Address;
  region: Region;
  district: District;
  photo: PropertyPhoto | null;
}
