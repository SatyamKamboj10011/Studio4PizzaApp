-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2025 at 03:12 AM
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
-- Table structure for table `pizzas`
--

CREATE TABLE `pizzas` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `small_price` decimal(5,2) DEFAULT NULL,
  `large_price` decimal(5,2) DEFAULT NULL,
  `extra_large_price` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pizzas`
--

INSERT INTO `pizzas` (`id`, `name`, `image`, `small_price`, `large_price`, `extra_large_price`) VALUES
(1, 'Beef and Onion', 'pizza1.jpg', 10.99, 15.99, 19.99),
(2, 'Margherita Pizza', 'pizza2.jpg', 9.99, 14.99, 18.99),
(3, 'BBQ Chicken Pizza', 'pizza3.jpg', 11.99, 16.99, 20.99),
(4, 'Cheese Pizza', 'pizza4.jpg', 8.99, 12.99, 16.99),
(5, 'Spicy Veg Trio', 'pizza5.jpg', 10.49, 14.49, 18.49),
(6, 'Hawaiian Pizza', 'pizza6.jpg', 9.49, 13.49, 17.49);

-- --------------------------------------------------------

--
-- Table structure for table `side`
--

CREATE TABLE `side` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `small_price` decimal(10,2) NOT NULL,
  `large_price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `side`
--

INSERT INTO `side` (`id`, `name`, `small_price`, `large_price`, `image`) VALUES
(1, 'Garlic Bread', 3.99, 5.99, 'side3.jpg'),
(2, 'Chicken Nuggets', 7.99, 8.50, 'side2.jpg'),
(3, 'French Fries', 2.99, 4.99, 'side1.jpg'),
(4, 'Onion Rings', 4.49, 6.49, 'side4.jpg');

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
-- AUTO_INCREMENT for table `pizzas`
--
ALTER TABLE `pizzas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `side`
--
ALTER TABLE `side`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
