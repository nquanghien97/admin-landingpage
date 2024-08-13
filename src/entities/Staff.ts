export enum StaffType {
  IDENTIFIER = "Số điện thoại hoặc ID page",
  BANK = "Tài khoản ngân hàng"
}
export interface StaffEntity {
  id: number;
  name: string;
  identifier?: number;
  imageUrl?: string;
  bankName?: string;
  bankNumber?: string;
  type: StaffType
}