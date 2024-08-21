import api from "../config/api";

export function getProducts({ page = 1, pageSize = 10 } : { page?: number, pageSize?: number }) {
  return api.get(`/products?page=${page}&pageSize=${pageSize}`)
}

export function createProduct(data: FormData) {
  return api.post('products', data)
}

export function getProduct(id: number) {
  return api.get(`/products/${id}`)
}

export function updateProduct(id: number, data: FormData) {
  return api.put(`/products/${id}`, data)
}

export function deleteProduct(id: number) {
  return api.delete(`/products/${id}`)
} 

