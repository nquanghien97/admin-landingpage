import api from "../config/api";

export function login({ username, password } : { username: string, password: string }) {
  return api.post('/auth/login' , {username, password })
} 

export function logout() {
  localStorage.removeItem('token');
  window.location.href = '/login';
}