import type { Product } from "@/components/product/ProductCard";

export const bestSellingProducts: Product[] = [
  {
    id: 1,
    name: "Hydrating Honey Sheet Mask",
    price: 1299,
    image: "/images/image_3.jpg",
    category: "Hydrating",
    description: "Deep hydration with organic honey extract",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Brightening Vitamin C Mask",
    price: 1499,
    image: "/images/image_4.jpg",
    category: "Brightening",
    description: "Glowing skin with vitamin C and hyaluronic acid",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: "Anti-Aging Collagen Mask",
    price: 1699,
    image: "/images/image_2.jpg",
    category: "Anti-Aging",
    description: "Firming and lifting with marine collagen",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: "Soothing Aloe Vera Mask",
    price: 1199,
    image: "/images/image_3.jpg",
    category: "Soothing",
    description: "Calming relief for sensitive skin",
    rating: 4.6,
    reviews: 203,
  },
];
