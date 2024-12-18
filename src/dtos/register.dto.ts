export default interface RegisterDto {
  username: string;
  email: string;
  password: string;
  role: string; // The role assigned to the user, e.g., "USER"
}
