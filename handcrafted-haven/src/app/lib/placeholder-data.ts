//This is initial seed data used in the /seed route.
const users = [
    {
        id: 1,
        name: 'Ben LeBeau',
        email: 'ben@fakemail.com',
        password: 'password',
        userType: 'seller',
        bio: 'I am a seller who can add items'
    },
    {
        id: 2,
        name: 'Mickael Harijoa Randriamihaja',
        email: 'mickael@fakemail.com',
        password: 'password',
        userType: 'seller',
        bio: 'I am a seller who can add items'
    },
    {
        id: 3,
        name: 'Aaron Magallanes',
        email: 'aaron@fakemail.com',
        password: 'password',
        userType: 'seller',
        bio: 'I am a seller who can add items'
    },
    {
        id: 4,
        name: 'Juliana Jesus Lemos',
        email: 'juliana@fakemail.com',
        password: 'password',
        userType: 'seller',
        bio: 'I am a seller who can add items'
    },
    {
        id: 5,
        name: 'Basic User',
        email: 'basic@fakemail.com',
        password: 'password',
        userType: 'basic',
        bio: 'I am a basic user that can add reviews.'
    }
];

const products = [
    {
        id: 1,
        name: 'Paper Airplane',
        description: 'It fies real good',
        userId: users[0].id,
        imageURL: '',
        forSale: true,
        sold: false,
        price: 99999,
        listedDate: '2025-3-20',
    },
    {
        id: 2,
        name: 'Duct-Tape Ball',
        description: 'My lifelong project, at least 4 dozen rolls',
        userId: users[0].id,
        imageURL: '',
        forSale: false,
        sold: false,
        price: 25643,
        listedDate: '2025-4-13',
    },
    {
        id: 3,
        name: 'Stick Figure Drawing',
        description: 'Worthy for the fridge door.',
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