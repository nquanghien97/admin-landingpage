import api from "../config/api";

export function getFeedbacks({ page = 1, pageSize = 10 } : { page?: number, pageSize?: number }) {
  return api.get(`/feedbacks?page=${page}&pageSize=${pageSize}`)
}

export function createFeedback({ title, imageUrl, content } : { title: string, imageUrl: string, content: string}) {
  return api.post('feedbacks', { title, imageUrl, content })
}

export function getFeedback(id: number) {
  return api.get(`/feedbacks/${id}`)
}

export function updateFeedback({ title, imageUrl, content, id } : { title: string, imageUrl?: string, content: string, id: number }) {
  return api.put(`/feedbacks/${id}`, { title, imageUrl, content })
}

export function deleteFeedback(id: number) {
  return api.delete(`/feedbacks/${id}`)
} 

