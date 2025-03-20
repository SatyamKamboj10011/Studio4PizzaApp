// invoice.js

class PizzaInvoice {
    constructor(customerName, pizzas) {
        this.customerName = customerName;
        this.pizzas = pizzas;
        this.taxRate = 0.08; // 8% tax rate
    }

    calculateTotal() {
        let subtotal = this.pizzas.reduce((total, pizza) => total + pizza.price, 0);
        let tax = subtotal * this.taxRate;
        let total = subtotal + tax;

        return {
            subtotal: subtotal.toFixed(2),
            tax: tax.toFixed(2),
            total: total.toFixed(2)
        };
    }

    generateInvoice() {
        const totals = this.calculateTotal();

        console.log(`Invoice for: ${this.customerName}`);
        console.log("---------------------------------");
        this.pizzas.forEach((pizza, index) => {
            console.log(`Pizza ${index + 1}: ${pizza.size} - $${pizza.price.toFixed(2)}`);
            console.log(`  Toppings: ${pizza.toppings.join(', ')}`);
        });
        console.log("---------------------------------");
        console.log(`Subtotal: $${totals.subtotal}`);
        console.log(`Tax (8%): $${totals.tax}`);
        console.log(`Total: $${totals.total}`);
        console.log("---------------------------------");
        console.log("Thank you for your order!");
    }
}

// Example usage:

const pizzas = [
    {
        size: "Large",
        toppings: ["Pepperoni", "Mushrooms"],
        price: 12.99
    },
    {
        size: "Medium",
        toppings: ["Cheese", "Olives"],
        price: 9.99
    }
];

const customerName = "John Doe";
const invoice = new PizzaInvoice(customerName, pizzas);
invoice.generateInvoice();