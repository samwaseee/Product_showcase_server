
---

# Product Management Server

This API provides endpoints for managing and querying product data with features like pagination, search, categorization, and sorting.

## Features

- **Product Search**: Search for products by keyword, category, or brand.
- **Sorting**: Sort products by price or creation date.
- **Pagination**: Paginate the product list with configurable page sizes.
- **Filtering**: Filter products by price range.

## Prerequisites

- Node.js
- MongoDB

## Getting Started

### Installation

1. Clone the repository:
    ```bash
    git clone <https://github.com/samwaseee/Product_showcase_server>
    cd <Product_showcase_server>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of your project and add your MongoDB credentials:
    ```env
    DB_USER=<your_db_username>
    DB_PASS=<your_db_password>
    DB_NAME=<your_db_name>
    ```

### Running the Server

1. Start the server:
    ```bash
    npm start
    ```

2. The server will be running on `http://localhost:5000`.

## API Endpoints

### Get All Products

- **Endpoint**: `/products`
- **Method**: `GET`
- **Query Parameters**:
    - `sort`: `highToLow`, `lowToHigh`, `newestFirst`
    - `keyword`: Search by product name
    - `category`: Filter by category name
    - `brand`: Filter by brand name
    - `priceValue`: Filter by price range (e.g., `[minPrice, maxPrice]`)
    - `page`: Page number (default is `0`)
    - `rowsPerPage`: Number of products per page (default is `10`)

- **Response**:
    ```json
    {
      "products": [ ... ],
      "totalCount": <total_number_of_products>
    }
    ```

## CORS Configuration

The API has CORS enabled with specific origins allowed:
- `https://product-showcase-82903.web.app`
- `http://product-showcase-82903.firebaseapp.com`

## Error Handling

In case of errors, the API returns an error response with the appropriate status code.

### Example Error Response

- **Status**: `500`
- **Response**:
    ```json
    {
      "error": "Failed to fetch products"
    }
    ```