export interface User {
  _id: string;
  email: string;
  password: string;
  role: 'student' | 'teacher';
}
