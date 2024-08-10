import api from "../config/api";

export function getProducts({ page = 1, pageSize = 10 } : { page?: number, pageSize?: number }) {
  return api.get(`/products?page=${page}&pageSize=${pageSize}`)
}

export function createProduct({ name, price, description, details, images } : { name: string, price: number, description: string, details: string, images: string[] }) {
  return api.post('products', { name, price, description, details, images })
}

export function getProduct(id: number) {
  return api.get(`/products/${id}`)
}

export function updateProduct({ name, price, description, details, images, id } : { name: string, price: number, description: string, details: string, images: string[], id: number }) {
  return api.put(`/products/${id}`, { name, price, description, details, images })
}

export function deleteProduct(id: number) {
  return api.delete(`/products/${id}`)
} 

