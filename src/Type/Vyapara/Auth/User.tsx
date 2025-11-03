export interface User {
  first_name: string;
  last_name: string;
  email: string;
  role_id: number;
}

export interface AuthData {
  user: User;
  token: string;
  expiresIn: number;
}

export interface UserSliceProp {
  isLoggedIn: boolean;
  currentUser: User | null;
  loading: boolean;
  error: boolean;
  loggedInUserData: any; // keep flexible for now
}
