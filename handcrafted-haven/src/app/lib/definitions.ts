// Type definitions to be used in the application. Feel free to add types as needed. Types are a typescript feature.


export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    userType: 'basic' | 'seller';
    bio: string; // Only will be populated if the user is a seller.
    photoURL: string; // Optional, will be populated if the user has a profile picture.
};

export type Review = {
    id: string;
    userId: string;
    productId: string;
    rating: number; //Out of 5 stars maybe.
    comments: string;
    date: string;
};

export type Product = {
    id: string;
    name: string;
    description: string;
    userId: string;
    imageURL: string;
    forSale: boolean;
    sold: boolean;
    //price should be converted to cents when stored in db.
    price: number;
    listedDate: string;
};

export type ProductForm = {
    id: string;
    user_id: string;
    name: string;
    description: string;
    image_url: string;
    for_sale: boolean;
    sold: boolean;
    //price should be converted to cents when stored in db.
    price: number;
};

export type ReviewForm = {
    id: string;
    user_id: string;
    product_id: string;
    rating: number; //Out of 5 stars maybe.
    comments: string;
}

export type UserForm = {
    id: number;
    name: string;
    email: string;
    bio: string;
    photoURL: string;
};

//I made this type becuase the DB query returned user_type to an object that expects userType.
export type LoggedInUser = {
    id: string;
    name: string;
    email: string;
    password: string;
    user_type: 'basic' | 'seller';
    bio: string; // Only will be populated if the user is a seller.
    photoURL: string;
}

export interface ProductData {
  id: string;
  user_id: string;
  product_name: string;
  description: string;
  price: number;
  for_sale: boolean;
  image_url: string;
  artisan_name: string;
  formattedDate: string;
  listed_date: Date;
}

export interface ProductProps {
  // I attempted adding this as a string but I also had to add it under the all-products.tsx page
  id: string;
  product_name: string;
  description: string;
  price: number;
  for_sale: boolean;
  image_url: string;
  artisan_name: string;
  formattedDate: string;
}