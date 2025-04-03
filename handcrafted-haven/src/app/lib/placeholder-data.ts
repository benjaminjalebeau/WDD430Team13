//This is initial seed data used in the /seed route.
const users = [
    {
        id: 1,
        name: 'Ben LeBeau',
        email: 'ben@fakemail.com',
        password: 'password',
        userType: 'seller',
        bio: 'I am a seller who can add items',
        photoURL: "./placeholder-profile.jpg"
    },
    {
        id: 2,
        name: 'Mickael Harijoa Randriamihaja',
        email: 'mickael@fakemail.com',
        password: 'password',
        userType: 'seller',
        bio: 'I am a seller who can add items',
        photoURL: "./placeholder-profile.jpg"
        
    },
    {
        id: 3,
        name: 'Aaron Magallanes',
        email: 'aaron@fakemail.com',
        password: 'password',
        userType: 'seller',
        bio: 'I am a seller who can add items',
        photoURL: "./placeholder-profile.jpg"
    },
    {
        id: 4,
        name: 'Juliana Jesus Lemos',
        email: 'juliana@fakemail.com',
        password: 'password',
        userType: 'seller',
        bio: 'I am a seller who can add items',
        photoURL: "./placeholder-profile.jpg"
    },
    {
        id: 5,
        name: 'Basic User',
        email: 'basic@fakemail.com',
        password: 'password',
        userType: 'basic',
        bio: 'I am a basic user that can add reviews.',
        photoURL: "./placeholder-profile.jpg"
    }
];

const products = [
    {
        id: 1,
        description: 'Paper Airplane',
        userId: users[0].id,
        imageURL: '',
        forSale: true,
        sold: false,
        price: 99999,
        listedDate: '2025-3-20',
    },
    {
        id: 2,
        description: 'Duct-Tape Ball',
        userId: users[0].id,
        imageURL: '',
        forSale: false,
        sold: false,
        price: 25643,
        listedDate: '2025-4-13',
    },
    {
        id: 3,
        description: 'Stick Figure Drawing',
        userId: users[0].id,
        imageURL: '',
        forSale: true,
        sold: true,
        price: 1,
        listedDate: '2025-2-22',
    }
];

const reviews = [
    {
        id: 1,
        userId: users[4].id,
        productId: products[0].id,
        rating: 2, 
        comments: "Didn't really fly well, not very aero-dynamic...",
        date: "2025-3-25",
    },
    {
        id: 2,
        userId: users[4].id,
        productId: products[1].id,
        rating: 5, 
        comments: "I've never seen something more beautiful!",
        date: "2025-3-23",
    },
    {
        id: 3,
        userId: users[4].id,
        productId: products[2].id,
        rating: 1, 
        comments: "Not good enough to go on the fridge",
        date: "2025-3-24",
    }
];

export {users, reviews, products };