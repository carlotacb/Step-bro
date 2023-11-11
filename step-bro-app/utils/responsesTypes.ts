export interface LoginBody {
  user_mail: string;
  password: string;
}

export interface LoginOrRegisterResponse {
  readonly token?: string;
  readonly error: boolean;
}

export interface RegisterBody {
  username: string;
  user_mail: string;
  phone: string;
  password: string;
  bio?: string | null;
  icon?: string | null;
}

export interface MyInformationResponse {
  readonly information?: MyInformation;
  readonly error: boolean;
}

export interface WeekRecord {
  readonly token?: string;
  readonly steps: string | null;
}
export interface MyInformation {
  readonly username: string;
  readonly user_mail: string;
  readonly phone: string;
  readonly bio?: string | null;
  readonly icon?: string | null;
}
