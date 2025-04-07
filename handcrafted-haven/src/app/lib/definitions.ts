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
    name: string;
    description: string;
    image_url: string;
    for_sale: boolean;
    sold: boolean;
    //price should be converted to cents when stored in db.
    price: number;
};
