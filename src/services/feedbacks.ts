import api from "../config/api";

export function getFeedbacks({ page = 1, pageSize = 10 } : { page?: number, pageSize?: number }) {
  return api.get(`/feedbacks?page=${page}&pageSize=${pageSize}`)
}

export function createFeedback(data: FormData) {
  return api.post('feedbacks', data)
}

export function getFeedback(id: number) {
  return api.get(`/feedbacks/${id}`)
}

export function updateFeedback(id: number, data: FormData) {
  return api.put(`/feedbacks/${id}`, data)
}

export function deleteFeedback(id: number) {
  return api.delete(`/feedbacks/${id}`)
} 

