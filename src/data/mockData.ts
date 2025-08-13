import { Product } from '../type/index';

export const mockProducts: Product[] = [
  {
    id: 1,
    title: "MacBook Pro 14-inch",
    price: 1999,
    description: "The most powerful MacBook Pro ever is here. With the blazing-fast M2 Pro or M2 Max chip — the first Apple silicon designed for pros — you get groundbreaking performance and amazing battery life.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop",
    rating: {
      rate: 4.8,
      count: 120
    }
  },
  {
    id: 2,
    title: "iPhone 15 Pro",
    price: 999,
    description: "iPhone 15 Pro. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action Button, and the most powerful iPhone camera system ever.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
    rating: {
      rate: 4.7,
      count: 89
    }
  },
  {
    id: 3,
    title: "Nike Air Jordan Retro",
    price: 150,
    description: "The Air Jordan Retro brings you legacy, style and Jordan Brand's greatest innovations. This classic basketball shoe features premium leather upper and Air-Sole unit for cushioning.",
    category: "shoes",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&h=500&fit=crop",
    rating: {
      rate: 4.5,
      count: 67
    }
  },
  {
    id: 4,
    title: "Levi's 511 Slim Jeans",
    price: 79,
    description: "The 511™ Slim is cut close to the body with a slim leg. Made with our classic denim, these jeans hold their shape and look great every day.",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=500&h=500&fit=crop",
    rating: {
      rate: 4.2,
      count: 45
    }
  },
  {
    id: 5,
    title: "Sony WH-1000XM4",
    price: 349,
    description: "Industry-leading noise canceling with Dual Noise Sensor technology. Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
    rating: {
      rate: 4.6,
      count: 234
    }
  },
  {
    id: 6,
    title: "Adidas Ultraboost 22",
    price: 180,
    description: "The Ultraboost 22 Shoes are made in part with Parley Ocean Plastic — upcycled plastic waste, intercepted on remote islands, beaches, coastal communities and shorelines.",
    category: "shoes",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
    rating: {
      rate: 4.4,
      count: 156
    }
  },
  {
    id: 7,
    title: "The Great Gatsby",
    price: 12,
    description: "F. Scott Fitzgerald's classic American novel. The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
    category: "books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop",
    rating: {
      rate: 4.3,
      count: 89
    }
  },
  {
    id: 8,
    title: "Vintage Leather Jacket",
    price: 245,
    description: "Genuine leather jacket with vintage styling. Perfect for casual wear with its classic design and comfortable fit.",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=500&h=500&fit=crop",
    rating: {
      rate: 4.1,
      count: 34
    }
  },
  {
    id: 9,
    title: "iPad Air 5th Generation",
    price: 599,
    description: "iPad Air with the M1 chip delivers incredible performance, featuring an 8-core CPU that delivers up to 60 percent faster performance than the previous generation.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop",
    rating: {
      rate: 4.7,
      count: 123
    }
  },
  {
    id: 10,
    title: "Converse Chuck Taylor",
    price: 55,
    description: "The Chuck Taylor All Star is the original basketball shoe and most authentic sneaker ever. Stay true to the legacy in canvas and rubber.",
    category: "shoes",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
    rating: {
      rate: 4.0,
      count: 78
    }
  },
  {
    id: 11,
    title: "Patagonia Fleece Jacket",
    price: 129,
    description: "Made from 100% recycled polyester fleece, this jacket provides warmth without weight. Perfect for outdoor activities and everyday wear.",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop",
    rating: {
      rate: 4.5,
      count: 92
    }
  },
  {
    id: 12,
    title: "1984 by George Orwell",
    price: 14,
    description: "A dystopian social science fiction novel and cautionary tale about totalitarianism. One of the most influential books of the 20th century.",
    category: "books",
    image: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=500&h=500&fit=crop",
    rating: {
      rate: 4.6,
      count: 167
    }
    
  }
];

export const categories = [
  'electronics',
  'clothing', 
  'shoes',
  'books'
];

export const brands = [
  'Apple',
  'Nike',
  'Adidas',
  'Sony',
  'Levi\'s',
  'Converse',
  'Patagonia'
];