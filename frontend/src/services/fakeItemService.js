import * as itemService from "./itemService.js";
let listOfItems = [
    {
        _id: "638d39e6131bea3198ca9a9d",
        name: "iPhone 9",
        description: "An apple mobile which is nothing like apple",
        category: "smartphones",
        price: 549,
        stock: 94,
        image: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
        reviews: [],
    },
    {
        _id: "638d39e6131bea3198ca9a9e",
        name: "iPhone X",
        description:
            "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
        category: "smartphones",
        price: 899,
        stock: 34,
        image: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
        reviews: [],
    },
    {
        _id: "638d39e6131bea3198ca9a9f",
        name: "Samsung Universe 9",
        description:
            "Samsung's new variant which goes beyond Galaxy to the Universe",
        category: "smartphones",
        price: 1249,
        stock: 36,
        image: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
        reviews: [],
    },
    {
        _id: "638d39e6131bea3198ca9ab0",
        name: "Freckle Treatment Cream- 15gm",
        description:
            "Fair & Clear is Pakistan's only pure Freckle cream which helpsfade Fre…",
        category: "skincare",
        price: 70,
        stock: 140,
        image: "https://i.dummyjson.com/data/products/20/thumbnail.jpg",
        reviews: [],
    },
    {
        _id: "638d39e6131bea3198ca9aab",
        name: "Eau De Perfume Spray",
        description:
            "Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality",
        category: "fragrances",
        price: 30,
        stock: 105,
        image: "https://i.dummyjson.com/data/products/15/thumbnail.jpg",
        reviews: [],
    },
    {
        _id: "638d39e6131bea3198ca9aa4",
        name: "Eau De PerfuMicrosoft Surface Laptop 4",
        description:
            "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
        category: "laptops",
        price: 1499,
        stock: 68,
        image: "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
        reviews: [],
    },
    {
        _id: "638d39e6131bea3198ca9aa5",
        name: "Infinix INBOOK",
        description:
            "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
        category: "laptops",
        price: 1099,
        stock: 96,
        image: "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
        reviews: [],
    },
    {
        _id: "638d39e6131bea3198ca9aa6",
        name: "HP Pavilion 15-DK1056WM",
        description:
            "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
        category: "laptops",
        price: 1099,
        stock: 89,
        image: "https://i.dummyjson.com/data/products/10/thumbnail.jpeg",
        reviews: [],
    },
];

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

const items = shuffle(listOfItems);

export async function getItems(filterCategory, filterQuery) {
    // console.log("Filter Category" , filterCategory)
    return await itemService.getItems(filterCategory, filterQuery);
}

export async function getItem(id) {
    return await itemService.getItem(id);
}

export async function postReview(id, reviews) {
    return await itemService.postReview(id, reviews);
}
