const items = [
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

export function getItems() {
    return items;
}

export function getItem(id) {
    return items.find((m) => m._id === id);
}
