export interface RegisterModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  imageFile?: File | null;
}

export interface TokenResponse {
  token: string;
}
