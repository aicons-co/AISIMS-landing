import { apiClient } from '../client';
// import { SignUpRequest, LoginRequest } from './auth.type'

export const login = (data: LoginRequest) =>
  apiClient.post('/auth/login', data);

export const signUp = (data: SignUpRequest) =>
  apiClient.post('/auth/signup', data);
