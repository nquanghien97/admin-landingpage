export interface ProductEntity {
  id: number;
  name: string;
  price: number;
  images: {
    id: number;
    imageUrl: string;
    productId: number;
  }[];
  description: string;
  details: string;
}    