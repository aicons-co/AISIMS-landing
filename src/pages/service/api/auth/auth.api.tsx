import { apiClient } from '../client';

type LoginRequest = { email: string; password: string };
type SignUpRequest = { email: string; password: string; name: string };

export const login = (data: LoginRequest) =>
  apiClient.post('/auth/login', data);

export const signUp = (data: SignUpRequest) =>
  apiClient.post('/auth/signup', data);
