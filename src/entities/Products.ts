export interface ProductEntity {
  id: number;
  name: string;
  price: number;
  discountPrice: number;
  images: {
    id: number;
    imageUrl: string;
    productId: number;
  }[];
  description: string;
  details: string;
}    