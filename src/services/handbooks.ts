import api from "../config/api";

export function getHandbooks({ page = 1, pageSize = 10 } : { page?: number, pageSize?: number }) {
  return api.get(`/handbooks?page=${page}&pageSize=${pageSize}`)
}

export function createHandbook(data: FormData) {
  return api.post('handbooks', data)
}

export function getHandbook(id: number) {
  return api.get(`/handbooks/${id}`)
}

export function updateHandbook(id: number, data: FormData) {
  return api.put(`/handbooks/${id}`, data)
}

export function deleteHandbook(id: number) {
  return api.delete(`/handbooks/${id}`)
} 

