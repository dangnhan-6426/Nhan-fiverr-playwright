# 🎭 Fiverr Automation Testing (Playwright + TypeScript)

## 📌 Description

This project is an automation testing framework for the Fiverr website using **Playwright** with **TypeScript**.

It focuses on validating core user flows such as:

* 🔐 Login
* 🔎 Search & Filter
* 📦 Gig Management (Seller)
* 🛒 Booking / Order flow

---

## 🚀 Tech Stack

* Playwright
* TypeScript
* Node.js
* GitHub Actions (CI)

---

## ⚙️ Setup

### 1. Clone project

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

---

## ▶️ Run Test

### Run all tests

```bash
npx playwright test
```

### Run specific test file

```bash
npx playwright test tests/login.spec.ts
```

### Run with UI mode (debug)

```bash
npx playwright test --ui
```

---

## 📊 Test Report

After running tests:

```bash
npx playwright show-report
```

---

## 📂 Project Structure

```text
├── tests/                 # Test cases
│   ├── login.spec.ts
│   ├── search.spec.ts
│   └── gig-management.spec.ts
│
├── pages/                # Page Object Model (optional)
├── utils/                # Helper functions
├── playwright.config.ts  # Configuration
└── README.md
```

---

## 🧪 Test Coverage

* ✅ User Login
* ✅ Search gigs with filters
* ✅ View gig details
* ✅ Seller Gig Management
* ⏳ Booking flow (in progress)

---

## 🔄 CI/CD (GitHub Actions)

This project uses **GitHub Actions** to:

* Automatically run tests on push
* Validate pull requests before merge

---

## 🌿 Git Workflow

* `main` → stable branch (protected)
* `feature/*` → development branches

Example:

```bash
git checkout -b feature/test-login
git push -u origin feature/test-login
```

---

## 🐞 Known Issues

* Some dynamic elements on Fiverr may cause flaky tests
* CAPTCHA may block automation in some cases

---

## 💡 Notes

* Use test accounts for automation
* Avoid running tests too frequently to prevent blocking

---

## 👨‍💻 Author

Nhan Dang Nguyen

---

## ⭐ Future Improvements

* Add API testing
* Integrate test reporting (Allure / HTML)
* Parallel test execution
* Slack notification for test results
