/*
You need to create a function in TypeScript that takes an array of purchases and returns an object containing:

1. The total sum of all purchases.
2. A list of all unique categories present in the purchases.
3. The count of purchases in each category.

Requirements:

- Each element in the purchases array is an object with the fields `id`, `name`, `price`, and `category`.
- The function should make use of the `filter`, `map`, and `reduce` methods.
- The data types must be strictly typed.

### Example Input:
*/
const purchases = [
    { id: 1, name: 'Laptop', price: 1500, category: 'Electronics' },
    { id: 2, name: 'Headphones', price: 200, category: 'Electronics' },
    { id: 3, name: 'Shoes', price: 100, category: 'Apparel' },
    { id: 4, name: 'Shirt', price: 50, category: 'Apparel' },
    { id: 5, name: 'Coffee', price: 5, category: 'Groceries' }
];

console.log(purchases);



/*
Expected Output:
The function should return an object in the following format:

{
    totalAmount: 1855, // Total sum of all purchases
    uniqueCategories: ['Electronics', 'Apparel', 'Groceries'], // Unique categories
    categoryCounts: {
        Electronics: 2,
        Apparel: 2,
        Groceries: 1
    }
}
*/