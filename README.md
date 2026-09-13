# Coffee Cart E2E Tests 🎓

Project containing end-to-end tests for the [Coffee Cart](https://coffee-cart.app) application using Playwright.


## 🚀 Quick Start

### Prerequisites

- Node.js (v22 or higher)
- npm

### Installation

```bash
# Install dependencies
npm install
```

### Running Tests

```bash
# Run all tests
npx playwright test

# Run tests in UI mode (interactive)
npx playwright test --ui

# Run specific test file
npx playwright test tests/successfullPayment.spec.ts

# Run tests in headed mode (see browser)
npx playwright test --headed

# Debug tests
npx playwright test --debug
```

### Viewing Test Results

After running tests, open the HTML report:

```bash
npx playwright show-report
```
