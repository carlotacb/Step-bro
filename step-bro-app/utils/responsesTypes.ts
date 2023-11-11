export interface LoginBody {
  user_mail: string;
  password: string;
}

export interface LoginResponse {
  readonly token?: string;
  readonly error: boolean;
}

export interface RegisterBody {
  username: string;
  user_mail: string;
  phone: string;
  password: string;
  bio?: string;
  icon?: string;
}

export interface RegisterResponse {
  readonly token?: string;
  readonly error: boolean;
}
