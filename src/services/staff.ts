import api from "../config/api";
import { StaffType } from "../entities/Staff";

export function getStaffs({ page = 1, pageSize = 10 } : { page?: number, pageSize?: number }) {
  return api.get(`/staffs?page=${page}&pageSize=${pageSize}`)
}

export function createStaff({ name, bankName, bankNumber, identifier, type, imageUrl } : { name: string, bankName? : string, bankNumber?: string, identifier?: number, type: StaffType, imageUrl?: string }) {
  return api.post('/staffs', { name, bankName, bankNumber, identifier, type, imageUrl })
}

export function getStaff(id: number) {
  return api.get(`/staffs/${id}`)
}

export function updateStaff({ name, bankName, bankNumber, identifier, type, imageUrl, id } : { name: string, bankName? : string, bankNumber?: string, identifier?: number, type: StaffType, imageUrl?: string, id: number }) {
  return api.put(`/staffs/${id}`, { name, bankName, bankNumber, identifier, type, imageUrl })
}

export function deleteStaff(id: number) {
  return api.delete(`/staffs/${id}`)
} 

