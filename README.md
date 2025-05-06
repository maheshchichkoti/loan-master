# Loan Master

A modern, single-page web application built using React JS and Material UI that allows users to calculate loan EMIs (Equated Monthly Installments), view a detailed amortization schedule, and see real-time currency conversions of their EMI using live exchange rates.

🚀 **Live Demo**
[View Live Demo](https://your-deployed-app-link.vercel.app) <--- _REPLACE THIS LINK_

✨ **Features**

- Loan EMI calculation using standard financial formulas
- Dynamic amortization schedule table with monthly breakdown
- Real-time currency conversion of EMI using a live exchange rate API
- Paginated exchange rate table for 160+ currencies
- Dark/Light mode toggle for a customizable experience
- Collapsible header navigation on mobile screens
- Fully responsive UI built with Material UI

🔣 **EMI Formula Used**
The EMI (Equated Monthly Installment) is calculated using the standard formula:

`EMI = [P × R × (1+R)^N] / [(1+R)^N – 1]`

Where:

- `P` = Principal loan amount
- `R` = Monthly interest rate (annual rate / 12 / 100)
- `N` = Loan duration in months

🛠️ **Technologies Used**

- React (Hooks, Routing, Context API)
- Material UI for styling and responsive components
- Axios for API calls
- ExchangeRate API for real-time currency conversion
- Vite as the build tool

📦 **Installation and Setup**

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-github-username/loan-master.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd loan-master
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Create a `.env.local` file in the root directory and add your ExchangeRate API key:
    ```env
    VITE_EXCHANGE_RATE_API_KEY=your_api_key_here
    VITE_EXCHANGE_RATE_API_BASE_URL=https://v6.exchangerate-api.com/v6
    ```
5.  Start the development server:
    ```bash
    npm run dev
    ```
6.  Open your browser and navigate to `http://localhost:5173`

🌍 **Currency Conversion API**
This app integrates with the free tier of the [ExchangeRate-API](https://www.exchangerate-api.com/) to fetch live exchange rates.

API Endpoint Example:
`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD`

You must register and obtain a free API key to use this endpoint. Then, add it to the `.env.local` file as `VITE_EXCHANGE_RATE_API_KEY`.

📱 **Responsive Design**
The application is fully responsive and works well on:

- Desktop computers
- Tablets
- Mobile phones
  The header navigation collapses into a drawer menu on smaller screens for better usability.

🔄 **State Management**

- **Context API** is used for global state management (theme, currency selection).
- **Custom React Hooks** are implemented for reusable logic such as EMI calculation (`useEmiCalculator`), amortization schedule generation (`useAmortizationSchedule`), and fetching exchange rates (`useExchangeRates`).

🧪 **Project Structure**

src/
├── components/
│ ├── calculator/
│ │ ├── AmortizationTable.jsx
│ │ ├── LoanForm.jsx
│ │ └── ResultSummary.jsx
│ ├── common/
│ │ ├── ErrorBoundary.jsx
│ │ ├── Header.jsx
│ │ ├── Loader.jsx
│ │ └── NotFound.jsx
│ └── currency/
│ ├── CurrencyConverter.jsx
│ └── ExchangeRateTable.jsx
├── context/
│ ├── CurrencyContext.jsx
│ └── ThemeContext.jsx
├── hooks/
│ ├── useAmortizationSchedule.js
│ ├── useEmiCalculator.js
│ └── useExchangeRates.js
├── pages/
│ ├── Calculator.jsx
│ ├── ErrorPage.jsx
│ ├── ExchangeRates.jsx
│ └── Home.jsx
├── utils/
│ └── formatters.js
├── App.jsx
└── main.jsx

🚀 **Deployment**
The app is deployed on [Vercel](https://your-deployed-app-link.vercel.app). <--- _REPLACE WITH YOUR ACTUAL PLATFORM AND LINK_

To deploy your own version:

1.  Build the project:
    ```bash
    npm run build
    ```
2.  Deploy the `dist` folder to your preferred hosting platform (e.g., Vercel, Netlify, GitHub Pages).

📝 **License**
This project is licensed under the MIT License - see the `LICENSE` file for details.

🙏 **Acknowledgements**

- [ExchangeRate-API](https://www.exchangerate-api.com/) for providing the currency conversion data.
- [Material UI](https://mui.com/) for the component library.
- [React Router](https://reactrouter.com/) for routing.

---

Made with ❤️ by [Your Name] <--- _REPLACE THIS_
