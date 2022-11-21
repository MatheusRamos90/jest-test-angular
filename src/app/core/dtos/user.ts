export interface User {
  id?: string;
  name?: string;
  lastname?: string;
  email?: string;
  telephone?: string;
  location?: Location;
}

export interface Location {
  address?: string,
  zipcode?: string,
  number?: string,
  city?: string
}
