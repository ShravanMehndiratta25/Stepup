export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  main_image_url: string | null;
  model_3d_url: string | null; // now optional, using image/video instead of 3D per product
  category: string | null;
  sizes: number[] | null;
  stock_quantity: number | null;
}
