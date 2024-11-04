# API Testing Documentation

This document provides an overview of the API tests, their organization, and instructions on how to run them.

## Table of Contents
- [API Testing Documentation](#api-testing-documentation)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Test Categories](#test-categories)
    - [Cart Tests](#cart-tests)
    - [Security Tests](#security-tests)
  - [Test Structure](#test-structure)
  - [Running Tests](#running-tests)
  - [Dependencies](#dependencies)
  - [License](#license)

## Introduction

The purpose of this document is to outline the automated tests implemented for the API of the online store. These tests cover critical functionalities such as cart operations and security measures, ensuring the API operates correctly and securely before deployment to production.

## Test Categories

### Cart Tests

The cart tests verify the functionality related to managing the shopping cart. This includes:

- **Adding Items to Cart**
  - Adding a single item.
  - Adding multiple items.
  - Adding the same item multiple times (increasing quantity).
  - Adding items with different attributes (e.g., size, color).
  - Adding out-of-stock items.

- **Removing Items from Cart**
  - Removing a single item.
  - Removing all items.
  - Removing items one by one.
  - Attempting to remove an item not added to the cart.

- **Updating Item Quantities**
  - Increasing item quantity.
  - Decreasing quantity to zero.
  - Attempting to set a negative quantity.
  - Attempting to set a quantity exceeding available stock.

- **Viewing Cart Contents**
  - Checking the correct display of items.
  - Verifying the total amount to be paid.
  - Checking the display of taxes and discounts.

- **Clearing the Cart**
  - Clearing a filled cart.
  - Clearing an empty cart.

- **Checkout Process**
  - Checking out with valid data.
  - Attempting checkout with invalid data (missing address, incorrect payment method).
  - Verifying successful completion of checkout.

- **Applying Coupons and Discounts**
  - Applying a valid coupon.
  - Applying an invalid coupon.
  - Applying an expired coupon.
  - Applying coupons with different conditions (percentage discounts, fixed amounts).

### Security Tests

The security tests ensure the API's resilience against common vulnerabilities and threats. These include:

- **SQL Injection Testing**
- **Cross-Site Scripting (XSS) Testing**
- **Authorization and Authentication Testing**
  - Attempting to access the API without a token.
  - Attempting to use an expired token.
  - Attempting to use another user's token.
  - Checking for CSRF protection.
  - Checking for DoS attack resilience.
  - Verifying SSL/TLS encryption.

## Test Structure

The tests are organized into the following directories:

- `cart/`: Contains all cart-related tests.
- `security/`: Contains all security-related tests.

Each test file follows a naming convention of `*.test.js` to indicate it contains tests.

## Running Tests

To run the tests, follow these instructions:

1. **Ensure Node.js is installed**: Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

2. **Clone the repository**: Clone the repository containing the tests to your local machine.

3. **Navigate to the project directory**:
   ```bash
   cd /path/to/your/project
   ```
4. **Install dependencies:** The first time you run the tests, you may need to install Jest (and other dependencies, if required):
    ```bash
    npm install --save-dev jest
    ```
5. **Run the tests**: You can choose to run all tests or a specific category:

   *  To run all tests:
        ```bash
        node runTests.js all
        ```
    * To run only cart tests:
        ```bash
        node runTests.js cart
        ```
    * To run only security tests:
        ```bash
        node runTests.js security
        ```
## Dependencies

The following dependencies are required to run the tests:

Jest: A JavaScript testing framework.

## License

Non-Commercial use only.