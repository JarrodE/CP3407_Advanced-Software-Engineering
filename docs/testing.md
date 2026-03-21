# Testing — FeedMe App

## Testing Strategy

We follow a **Test-Driven Development (TDD)** approach as outlined in Chapter 8 of the textbook.
Business logic is extracted into pure, side-effect-free modules under `prototype/js/lib/`,
making them fully testable without DOM or browser dependencies.

### Testing Pyramid

| Layer | Tool | Count | Description |
|-------|------|-------|-------------|
| Unit tests | Jest | 89 | Individual function behaviour |
| Acceptance tests | Jest | 6 scenarios | End-to-end user workflow validation |

## Running Tests

```bash
# Install dependencies (one-time)
npm install

# Run all tests with verbose output
npm test

# Run with coverage report
npm run test:coverage
```

## Coverage Report

```
File               | % Stmts | % Branch | % Funcs | % Lines
-------------------|---------|----------|---------|--------
All files          |   100   |   94.84  |   100   |   100
cart-logic.js      |   100   |   91.66  |   100   |   100
checkout-logic.js  |   100   |   95.83  |   100   |   100
filter-logic.js    |   100   |   92.85  |   100   |   100
menu-logic.js      |   100   |   97.22  |   100   |   100
order-logic.js     |   100   |   90.90  |   100   |   100
```

## Test Modules

### 1. Cart Logic (`tests/cart-logic.test.js`)
Tests for `prototype/js/lib/cart-logic.js` — covers US-03 and US-04.

- **addToCart**: Adding new items, incrementing existing items, immutability
- **updateQty**: Increment/decrement, auto-removal at zero, non-existent item handling
- **removeItem**: By ID, not-found cases, last item removal
- **cartTotal**: Multi-item totals, empty cart, single item
- **cartItemCount**: Summing all quantities
- **groupByRestaurant**: Grouping, multi-restaurant carts, empty carts

### 2. Checkout Logic (`tests/checkout-logic.test.js`)
Tests for `prototype/js/lib/checkout-logic.js` — covers US-05.

- **validateCheckout**: Required fields, phone regex (international prefix, spaces, length), null handling, multi-error collection
- **generateOrderId**: Prefix format, deterministic output, uniqueness
- **buildOrder**: Complete order construction, total calculation, ISO date, empty cart edge case

### 3. Order Logic (`tests/order-logic.test.js`)
Tests for `prototype/js/lib/order-logic.js` — covers US-07 and US-08.

- **updateOrderStatus**: Status updates, immutability, invalid status rejection
- **filterByRestaurant**: Filtering by restaurant ID, unknown IDs, empty arrays
- **sortNewestFirst**: Date-based descending sort, immutability
- **isValidTransition**: Forward-only progression, skip validation, backward rejection

### 4. Menu Logic (`tests/menu-logic.test.js`)
Tests for `prototype/js/lib/menu-logic.js` — covers US-06.

- **getMenu**: Custom vs seed fallback, unknown restaurant, copy safety
- **addMenuItem**: Validation (empty name, negative price, NaN), trimming, immutability
- **deleteMenuItem**: By ID, not-found handling
- **editMenuItem**: Field updates, availability toggle, validation on edit
- **validateMenuItem**: Valid data, edge cases (zero price = free items), multi-error

### 5. Filter Logic (`tests/filter-logic.test.js`)
Tests for `prototype/js/lib/filter-logic.js` — covers US-01 and US-02.

- **filterRestaurants**: Text search (case-insensitive), category filter, combined filters, empty results, null handling
- **extractCategories**: Unique extraction, sorting, deduplication

### 6. Acceptance Tests (`tests/acceptance.test.js`)
End-to-end workflow scenarios simulating real user journeys:

- **Browse & filter restaurants** (US-01 + US-02): View all → filter by category → search within category
- **Complete ordering workflow** (US-03 + US-04 + US-05): View menu → add items → adjust qty → remove → checkout → confirmation
- **Checkout validation rejection** (US-05): Invalid phone, missing address
- **Restaurant menu management** (US-06): Add item → delete item
- **Restaurant order management** (US-07 + US-08): Filter orders → sort → progress through all statuses

## Test Data

Test fixtures use realistic data matching the FeedMe domain:
- Restaurant names: "Thai Palace", "Sushi Bar", "Burger Joint"
- Menu items with realistic prices ($5.00–$14.00)
- Phone numbers with Australian format (+61...)
- Order IDs using the app's actual generation algorithm

## Architecture: Testable by Design

```
prototype/js/
├── lib/                    ← Pure business logic (testable)
│   ├── cart-logic.js       ← Cart operations
│   ├── checkout-logic.js   ← Validation & order building
│   ├── filter-logic.js     ← Restaurant filtering
│   ├── menu-logic.js       ← Menu CRUD
│   └── order-logic.js      ← Order status management
├── app.js                  ← DOM layer (uses filter-logic)
├── cart.js                 ← DOM layer (uses cart-logic)
├── checkout.js             ← DOM layer (uses checkout-logic)
├── menu.js                 ← DOM layer (uses cart-logic)
├── manage-menu.js          ← DOM layer (uses menu-logic)
└── restaurant-orders.js    ← DOM layer (uses order-logic)
```

The DOM-coupled files (`app.js`, `cart.js`, etc.) delegate all business decisions to the
pure `lib/` modules. This separation follows the **Humble Object** pattern, ensuring that
business rules can be tested independently of the browser environment.
