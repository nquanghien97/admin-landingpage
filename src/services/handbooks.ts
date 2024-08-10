import api from "../config/api";

export function getHandbooks({ page = 1, pageSize = 10 } : { page?: number, pageSize?: number }) {
  return api.get(`/handbooks?page=${page}&pageSize=${pageSize}`)
}

export function createHandbook({ title, imageUrl, content } : { title: string, imageUrl: string, content: string}) {
  return api.post('handbooks', { title, imageUrl, content })
}

export function getHandbook(id: number) {
  return api.get(`/handbooks/${id}`)
}

export function updateHandbook({ title, imageUrl, content, id } : { title: string, imageUrl?: string, content: string, id: number }) {
  return api.put(`/handbooks/${id}`, { title, imageUrl, content })
}

export function deleteHandbook(id: number) {
  return api.delete(`/handbooks/${id}`)
} 

