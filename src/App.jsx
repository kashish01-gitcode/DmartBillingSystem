// src/App.jsx
import { BillingProvider, useBilling } from "./context/BillingContext";
import CustomerForm from "./components/CustomerForm";
import ItemEntry from "./components/ItemEntry";
import BagAndGift from "./components/BagAndGift";
import Receipt from "./components/Receipt";

// Step indicator + content router
function StepRouter() {
  const { step } = useBilling();

  const steps = ["Customer", "Items", "Extras", "Receipt"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      {/* Progress Bar */}
      <div className="max-w-xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={i} className="flex-1 text-center">
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center font-bold text-sm
                  ${step > i + 1 ? "bg-green-500 text-white" :
                    step === i + 1 ? "bg-blue-600 text-white" :
                    "bg-gray-200 text-gray-400"}`}
              >
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <p className={`text-xs mt-1 ${step === i + 1 ? "text-blue-700 font-semibold" : "text-gray-400"}`}>
                {s}
              </p>
            </div>
          ))}
        </div>
        {/* Progress line */}
        <div className="relative mt-1 h-1 bg-gray-200 rounded mx-4">
          <div
            className="absolute h-1 bg-blue-500 rounded transition-all duration-500"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      {step === 1 && <CustomerForm />}
      {step === 2 && <ItemEntry />}
      {step === 3 && <BagAndGift />}
      {step === 4 && <Receipt />}
    </div>
  );
}

export default function App() {
  return (
    <BillingProvider>
      <StepRouter />
    </BillingProvider>
  );
}