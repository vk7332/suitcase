export interface JwtPayload {
  id: string;
  email: string;
  role?: string;
  chamber_id?: string;
  user_id?: string;
}
