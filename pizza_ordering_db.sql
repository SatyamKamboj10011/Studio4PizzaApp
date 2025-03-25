-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2025 at 02:40 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pizza_ordering_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `desserts`
--

CREATE TABLE `desserts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `desserts`
--

INSERT INTO `desserts` (`id`, `name`, `image`, `price`, `description`) VALUES
(1, 'Chocolate Lava Cake', 'lava_cake.jpeg', 7.99, 'A warm, gooey chocolate cake with a molten center.'),
(2, 'Cheesecake', 'cheesecake.jpg', 8.99, 'Rich and creamy cheesecake with a graham cracker crust.'),
(3, 'Apple Pie', 'applepie.jpg', 6.99, 'A classic apple pie with a flaky golden crust.'),
(4, 'Tiramisu', 'tiramisu.jpg', 9.49, 'Italian dessert made with coffee-soaked ladyfingers and mascarpone cheese.'),
(5, 'Chocolate Mousse', 'mousse.jpg', 5.49, 'A fudgy chocolate brownie with a crispy edge and soft center.'),
(6, 'Vanilla Ice Cream', 'vanilla_ice_cream.jpg', 4.99, 'Creamy vanilla ice cream made with real vanilla beans.');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_id` varchar(15) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `item_id` int(11) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `category` enum('Pizza','Side','Dessert','Drink') NOT NULL,
  `size` enum('Small','Medium','Large','None') DEFAULT 'None',
  `quantity` int(11) NOT NULL DEFAULT 1,
  `toppings` text DEFAULT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` enum('Pending','Preparing','Delivered','Cancelled') DEFAULT 'Pending',
  `payment_status` enum('Unpaid','Paid','Refunded') DEFAULT 'Unpaid',
  `order_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_id`, `user_id`, `item_id`, `item_name`, `category`, `size`, `quantity`, `toppings`, `total_price`, `status`, `payment_status`, `order_date`) VALUES
(1, '0f2ab49b-3', NULL, 5, 'Spicy Veg Trio', '', 'None', 1, '[\"Pineapple\",\"Olives\"]', 0.00, 'Pending', 'Unpaid', '2025-03-17 08:01:52'),
(2, 'cc9f7ecf-c', NULL, 1, 'Beef and Onion', '', 'None', 1, '[\"Pepperoni\",\"Mushrooms\"]', 3.00, 'Pending', 'Unpaid', '2025-03-17 08:14:25'),
(3, 'b7564ecd-9', NULL, 9, 'Veg Spicy Blast', '', 'None', 1, '[\"Pepperoni\",\"Mushrooms\"]', 3.00, 'Pending', 'Unpaid', '2025-03-17 08:17:43'),
(4, '8d4f89b8-4', NULL, 6, 'Hawaiian Pizza', '', 'None', 1, '[\"Pepperoni\",\"Mushrooms\"]', 3.00, 'Pending', 'Unpaid', '2025-03-17 08:19:42'),
(5, '9a1aee47-c', NULL, 2, 'Margherita Pizza', 'Pizza', 'Large', 1, '[\"Pepperoni\",\"Mushrooms\"]', 17.99, 'Pending', 'Unpaid', '2025-03-17 08:26:38'),
(6, '19406ae8-7', NULL, 9, 'Veg Spicy Blast', 'Pizza', '', 1, '[\"Mushrooms\",\"Olives\"]', 12.00, 'Pending', 'Unpaid', '2025-03-17 08:29:35');

-- --------------------------------------------------------

--
-- Table structure for table `pizzas`
--

CREATE TABLE `pizzas` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `small_price` decimal(5,2) DEFAULT NULL,
  `large_price` decimal(5,2) DEFAULT NULL,
  `extra_large_price` decimal(5,2) DEFAULT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pizzas`
--

INSERT INTO `pizzas` (`id`, `name`, `image`, `small_price`, `large_price`, `extra_large_price`, `description`) VALUES
(1, 'Beef and Onion', 'pizza1.jpg', 10.99, 15.99, 19.99, ''),
(2, 'Margherita Pizza', 'pizza2.jpg', 9.99, 14.99, 18.99, ''),
(3, 'BBQ Chicken Pizza', 'pizza3.jpg', 11.99, 16.99, 20.99, ''),
(4, 'Cheese Pizza', 'pizza4.jpg', 8.99, 12.99, 16.99, ''),
(5, 'Spicy Veg Trio', 'pizza5.jpg', 10.49, 14.49, 18.49, ''),
(6, 'Hawaiian Pizza', 'pizza6.jpg', 9.49, 13.49, 17.49, ''),
(9, 'Veg Spicy Blast', '1741385332509.jpg', 4.00, 7.00, 9.00, 'Best Pizza'),
(10, 'Cheesy Spicy Delight', '1742200480406.jpg', 8.00, 12.00, 15.00, 'Cheesy Loaded Spicy Pizza. Extra cooked and overloaded With Veggies.');

-- --------------------------------------------------------

--
-- Table structure for table `side`
--

CREATE TABLE `side` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `small_price` decimal(10,2) NOT NULL,
  `large_price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `side`
--

INSERT INTO `side` (`id`, `name`, `small_price`, `large_price`, `image`, `description`) VALUES
(1, 'Garlic Bread', 3.99, 5.99, 'side3.jpg', 0),
(2, 'Chicken Nuggets', 7.99, 8.50, 'side2.jpg', 0),
(3, 'French Fries', 2.99, 4.99, 'side1.jpg', 0),
(4, 'Onion Rings', 4.49, 6.49, 'side4.jpg', 0),
(5, 'Samosa', 5.49, 7.49, '1741147781796.jpg', 0),
(6, 'Samosa', 4.00, 7.00, '1741385629758.jpg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','customer') DEFAULT 'customer',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'John Doe', 'john@example.com', 'hashed_password_123', 'customer', '2025-02-28 00:48:45'),
(2, 'Jane Smith', 'jane@example.com', 'hashed_password_456', 'customer', '2025-02-28 00:48:45'),
(3, 'Admin User', 'admin@example.com', 'hashed_password_admin', 'admin', '2025-02-28 00:48:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `desserts`
--
ALTER TABLE `desserts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_id` (`order_id`);

--
-- Indexes for table `pizzas`
--
ALTER TABLE `pizzas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `side`
--
ALTER TABLE `side`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `desserts`
--
ALTER TABLE `desserts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `pizzas`
--
ALTER TABLE `pizzas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `side`
--
ALTER TABLE `side`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
