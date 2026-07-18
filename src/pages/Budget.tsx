import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  CircleDollarSign,
  CreditCard,
  RefreshCw,
  WalletCards,
} from "lucide-react";

type PayPeriod = "First" | "Second" | "Flexible";

type Bill = {
  id: string;
  title: string;
  amount: number;
  category: string;
  paymentType: "Auto" | "Manual";
  dueDate: string;
  payPeriod: PayPeriod;
  note?: string;
};

type PayrollEntry = {
  date: string;
  amount: string;
};

const bills: Bill[] = [
  // First paycheck: bills due from the 1st through the 14th
  {
    id: "mortgage",
    title: "Mortgage",
    amount: 2570.8,
    category: "Housing",
    paymentType: "Auto",
    dueDate: "1st",
    payPeriod: "First",
  },
  {
    id: "amazon-card",
    title: "Amazon Prime Visa",
    amount: 250,
    category: "Debt",
    paymentType: "Auto",
    dueDate: "1st",
    payPeriod: "First",
    note: "Fixed automatic payment",
  },
  {
    id: "microsoft-business",
    title: "Microsoft Business",
    amount: 20,
    category: "Business",
    paymentType: "Auto",
    dueDate: "2nd",
    payPeriod: "First",
  },
  {
    id: "amazon-prime",
    title: "Amazon Prime Membership",
    amount: 15,
    category: "Subscriptions",
    paymentType: "Auto",
    dueDate: "3rd",
    payPeriod: "First",
  },
  {
    id: "electric",
    title: "Electric",
    amount: 195,
    category: "Utilities",
    paymentType: "Auto",
    dueDate: "8th",
    payPeriod: "First",
  },
  {
    id: "zion",
    title: "Zion Broadband",
    amount: 75,
    category: "Internet",
    paymentType: "Auto",
    dueDate: "8th",
    payPeriod: "First",
  },
  {
    id: "tmobile",
    title: "T-Mobile",
    amount: 198,
    category: "Phone",
    paymentType: "Auto",
    dueDate: "8th",
    payPeriod: "First",
  },
  {
    id: "chase-fee",
    title: "Chase Checking Fee",
    amount: 15,
    category: "Bank Fees",
    paymentType: "Auto",
    dueDate: "8th",
    payPeriod: "First",
    note: "Review for possible waiver",
  },
  {
    id: "citi",
    title: "Citi Diamond Preferred",
    amount: 310,
    category: "Debt",
    paymentType: "Auto",
    dueDate: "10th",
    payPeriod: "First",
    note: "Statement amount may vary",
  },

  // Second paycheck: bills due from the 15th through month-end
  {
    id: "water-trash",
    title: "Water and Trash",
    amount: 286,
    category: "Utilities",
    paymentType: "Auto",
    dueDate: "15th",
    payPeriod: "Second",
  },
  {
    id: "discover",
    title: "Discover",
    amount: 550,
    category: "Debt",
    paymentType: "Auto",
    dueDate: "17th",
    payPeriod: "Second",
    note: "Budgeted payment",
  },
  {
    id: "f150",
    title: "F-150 Payment",
    amount: 600,
    category: "Vehicles",
    paymentType: "Auto",
    dueDate: "18th",
    payPeriod: "Second",
  },
  {
    id: "van",
    title: "Van Payment",
    amount: 700,
    category: "Vehicles",
    paymentType: "Auto",
    dueDate: "21st",
    payPeriod: "Second",
  },
  {
    id: "atmos",
    title: "Atmos Gas",
    amount: 58,
    category: "Utilities",
    paymentType: "Manual",
    dueDate: "24th",
    payPeriod: "Second",
    note: "Budgeted estimate",
  },
  {
    id: "amazon-kids",
    title: "Amazon Kids+",
    amount: 6.34,
    category: "Subscriptions",
    paymentType: "Auto",
    dueDate: "25th",
    payPeriod: "Second",
  },
  {
    id: "fitbit-ace",
    title: "Fitbit Ace",
    amount: 35,
    category: "Subscriptions",
    paymentType: "Auto",
    dueDate: "27th",
    payPeriod: "Second",
  },
  {
    id: "united-card",
    title: "United Business Card",
    amount: 350,
    category: "Debt",
    paymentType: "Auto",
    dueDate: "28th",
    payPeriod: "Second",
    note: "Fixed automatic payment",
  },
  {
    id: "irs",
    title: "IRS Payment",
    amount: 250,
    category: "Taxes",
    paymentType: "Auto",
    dueDate: "30th",
    payPeriod: "Second",
  },

  // Flexible, variable or date-not-set expenses
  {
    id: "state-farm",
    title: "State Farm",
    amount: 228,
    category: "Insurance",
    paymentType: "Manual",
    dueDate: "Date not set",
    payPeriod: "Flexible",
  },
  {
    id: "water-softener",
    title: "Water Softener",
    amount: 75,
    category: "Utilities",
    paymentType: "Manual",
    dueDate: "Date not set",
    payPeriod: "Flexible",
  },
  {
    id: "business-account",
    title: "Business Account",
    amount: 10,
    category: "Banking",
    paymentType: "Manual",
    dueDate: "Date not set",
    payPeriod: "Flexible",
  },
  {
    id: "church",
    title: "Church",
    amount: 100,
    category: "Giving",
    paymentType: "Manual",
    dueDate: "Twice monthly",
    payPeriod: "Flexible",
    note: "$50 allocated from each paycheck",
  },
  {
    id: "groceries",
    title: "Groceries",
    amount: 1200,
    category: "Food",
    paymentType: "Manual",
    dueDate: "Throughout month",
    payPeriod: "Flexible",
    note: "$600 allocated from each paycheck",
  },
  {
    id: "van-gas",
    title: "Van Gas",
    amount: 160,
    category: "Fuel",
    paymentType: "Manual",
    dueDate: "Throughout month",
    payPeriod: "Flexible",
    note: "$80 allocated from each paycheck",
  },
  {
    id: "truck-gas",
    title: "Truck Gas",
    amount: 40,
    category: "Fuel",
    paymentType: "Manual",
    dueDate: "Throughout month",
    payPeriod: "Flexible",
    note: "$20 allocated from each paycheck",
  },
  {
    id: "toiletries",
    title: "Toiletries",
    amount: 100,
    category: "Household",
    paymentType: "Manual",
    dueDate: "Throughout month",
    payPeriod: "Flexible",
    note: "$50 allocated from each paycheck",
  },
  {
    id: "youtube-premium",
    title: "YouTube Premium",
    amount: 25,
    category: "Subscriptions",
    paymentType: "Auto",
    dueDate: "Date not set",
    payPeriod: "Flexible",
  },
  {
    id: "coffee",
    title: "Coffee",
    amount: 80,
    category: "Food",
    paymentType: "Manual",
    dueDate: "Throughout month",
    payPeriod: "Flexible",
  },
  {
    id: "pest-control",
    title: "Pest Control",
    amount: 102,
    category: "Home",
    paymentType: "Auto",
    dueDate: "Quarterly on 27th",
    payPeriod: "Flexible",
    note: "January, April, July and October",
  },
  {
    id: "chatgpt",
    title: "ChatGPT",
    amount: 21.62,
    category: "Subscriptions",
    paymentType: "Auto",
    dueDate: "Date not set",
    payPeriod: "Flexible",
  },
  {
    id: "walmart-plus",
    title: "Walmart+",
    amount: 13.71,
    category: "Subscriptions",
    paymentType: "Auto",
    dueDate: "Date not set",
    payPeriod: "Flexible",
  },
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function parseAmount(value: string): number {
  const parsed = Number(value.replace(/[$,]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function readSavedPayroll(
  storageKey: string,
  fallback: PayrollEntry,
): PayrollEntry {
  const saved = localStorage.getItem(storageKey);

  if (!saved) {
    return fallback;
  }

  try {
    return JSON.parse(saved) as PayrollEntry;
  } catch {
    return fallback;
  }
}

export default function Budget() {
  const [firstPaycheck, setFirstPaycheck] = useState<PayrollEntry>(() =>
    readSavedPayroll("fmos-first-paycheck", {
      date: "",
      amount: "",
    }),
  );

  const [secondPaycheck, setSecondPaycheck] = useState<PayrollEntry>(() =>
    readSavedPayroll("fmos-second-paycheck", {
      date: "",
      amount: "",
    }),
  );

  const [paidBillIds, setPaidBillIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("fmos-paid-bills");

    if (!saved) {
      return [];
    }

    try {
      return JSON.parse(saved) as string[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "fmos-first-paycheck",
      JSON.stringify(firstPaycheck),
    );
  }, [firstPaycheck]);

  useEffect(() => {
    localStorage.setItem(
      "fmos-second-paycheck",
      JSON.stringify(secondPaycheck),
    );
  }, [secondPaycheck]);

  useEffect(() => {
    localStorage.setItem(
      "fmos-paid-bills",
      JSON.stringify(paidBillIds),
    );
  }, [paidBillIds]);

  const firstPaycheckBills = bills.filter(
    (bill) => bill.payPeriod === "First",
  );

  const secondPaycheckBills = bills.filter(
    (bill) => bill.payPeriod === "Second",
  );

  const flexibleBills = bills.filter(
    (bill) => bill.payPeriod === "Flexible",
  );

  const totals = useMemo(() => {
    const monthlyBudget = bills.reduce(
      (total, bill) => total + bill.amount,
      0,
    );

    const confirmedPaid = bills
      .filter((bill) => paidBillIds.includes(bill.id))
      .reduce((total, bill) => total + bill.amount, 0);

    const monthlyPayroll =
      parseAmount(firstPaycheck.amount) +
      parseAmount(secondPaycheck.amount);

    return {
      monthlyBudget,
      confirmedPaid,
      billsRemaining: monthlyBudget - confirmedPaid,
      monthlyPayroll,
      incomeAfterBudget: monthlyPayroll - monthlyBudget,
    };
  }, [firstPaycheck.amount, secondPaycheck.amount, paidBillIds]);

  const firstPaycheckAmount = parseAmount(firstPaycheck.amount);
  const secondPaycheckAmount = parseAmount(secondPaycheck.amount);

  const firstBillsTotal = firstPaycheckBills.reduce(
    (total, bill) => total + bill.amount,
    0,
  );

  const secondBillsTotal = secondPaycheckBills.reduce(
    (total, bill) => total + bill.amount,
    0,
  );

  const flexibleBillsTotal = flexibleBills.reduce(
    (total, bill) => total + bill.amount,
    0,
  );

  const firstAllocation = flexibleBillsTotal / 2;
  const secondAllocation = flexibleBillsTotal / 2;

  const firstAssignedTotal = firstBillsTotal + firstAllocation;
  const secondAssignedTotal = secondBillsTotal + secondAllocation;

  const firstRemaining = firstPaycheckAmount - firstAssignedTotal;
  const secondRemaining = secondPaycheckAmount - secondAssignedTotal;

  function toggleBill(billId: string) {
    setPaidBillIds((currentIds) =>
      currentIds.includes(billId)
        ? currentIds.filter((id) => id !== billId)
        : [...currentIds, billId],
    );
  }

  function resetMonth() {
    const confirmed = window.confirm(
      "Clear both payroll entries and all paid confirmations?",
    );

    if (!confirmed) {
      return;
    }

    setFirstPaycheck({
      date: "",
      amount: "",
    });

    setSecondPaycheck({
      date: "",
      amount: "",
    });

    setPaidBillIds([]);
  }

  return (
    <main className="w-full p-6">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          FMOS Financial Command Center
        </p>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-stone-900">
              Monthly Budget
            </h1>

            <p className="mt-2 text-stone-500">
              Enter payroll deposits and manage bills by paycheck.
            </p>
          </div>

          <button
            type="button"
            onClick={resetMonth}
            className="flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 font-semibold text-stone-700 shadow-sm transition hover:bg-stone-50"
          >
            <RefreshCw className="h-4 w-4" />
            Start New Month
          </button>
        </div>
      </header>

      <section className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-100 p-3">
            <WalletCards className="h-6 w-6 text-emerald-700" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-stone-900">
              Payroll Deposits
            </h2>

            <p className="text-sm text-stone-600">
              Enter the actual deposit date and take-home amount for each check.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <PayrollCard
            title="First Paycheck"
            entry={firstPaycheck}
            onChange={setFirstPaycheck}
            assignedBills={firstAssignedTotal}
            remaining={firstRemaining}
          />

          <PayrollCard
            title="Second Paycheck"
            entry={secondPaycheck}
            onChange={setSecondPaycheck}
            assignedBills={secondAssignedTotal}
            remaining={secondRemaining}
          />
        </div>
      </section>

      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <SummaryCard
          title="Monthly Payroll"
          amount={totals.monthlyPayroll}
        />

        <SummaryCard
          title="Monthly Budget"
          amount={totals.monthlyBudget}
        />

        <SummaryCard
          title="Confirmed Paid"
          amount={totals.confirmedPaid}
        />

        <SummaryCard
          title="Budget Remaining"
          amount={totals.billsRemaining}
        />

        <SummaryCard
          title="Income After Budget"
          amount={totals.incomeAfterBudget}
          highlight={
            totals.incomeAfterBudget < 0 ? "negative" : "positive"
          }
        />
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-stone-900">
            Bills by Paycheck
          </h2>

          <p className="text-sm text-stone-500">
            Fixed bills are grouped by due date. Flexible expenses are displayed
            separately and split evenly in the paycheck summaries above.
          </p>
        </div>

        <PayPeriodSection
          title="First Paycheck Bills"
          subtitle="Bills due from the 1st through the 14th"
          paycheckAmount={firstPaycheckAmount}
          fixedBillTotal={firstBillsTotal}
          flexibleAllocation={firstAllocation}
          assignedTotal={firstAssignedTotal}
          remaining={firstRemaining}
          bills={firstPaycheckBills}
          paidBillIds={paidBillIds}
          onToggleBill={toggleBill}
        />

        <PayPeriodSection
          title="Second Paycheck Bills"
          subtitle="Bills due from the 15th through the end of the month"
          paycheckAmount={secondPaycheckAmount}
          fixedBillTotal={secondBillsTotal}
          flexibleAllocation={secondAllocation}
          assignedTotal={secondAssignedTotal}
          remaining={secondRemaining}
          bills={secondPaycheckBills}
          paidBillIds={paidBillIds}
          onToggleBill={toggleBill}
        />

        <FlexibleSection
          bills={flexibleBills}
          total={flexibleBillsTotal}
          paidBillIds={paidBillIds}
          onToggleBill={toggleBill}
        />
      </section>
    </main>
  );
}

type PayrollCardProps = {
  title: string;
  entry: PayrollEntry;
  onChange: (entry: PayrollEntry) => void;
  assignedBills: number;
  remaining: number;
};

function PayrollCard({
  title,
  entry,
  onChange,
  assignedBills,
  remaining,
}: PayrollCardProps) {
  const paycheckAmount = parseAmount(entry.amount);

  return (
    <article className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold text-stone-900">
        {title}
      </h3>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label>
          <span className="mb-1 block text-sm font-medium text-stone-600">
            Deposit Date
          </span>

          <input
            type="date"
            value={entry.date}
            onChange={(event) =>
              onChange({
                ...entry,
                date: event.target.value,
              })
            }
            className="w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </label>

        <label>
          <span className="mb-1 block text-sm font-medium text-stone-600">
            Take-Home Amount
          </span>

          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={entry.amount}
            onChange={(event) =>
              onChange({
                ...entry,
                amount: event.target.value,
              })
            }
            className="w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </label>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-stone-200 pt-4 text-sm">
        <div>
          <p className="text-stone-500">Paycheck</p>
          <p className="font-bold text-stone-900">
            {currency.format(paycheckAmount)}
          </p>
        </div>

        <div>
          <p className="text-stone-500">Assigned</p>
          <p className="font-bold text-stone-900">
            {currency.format(assignedBills)}
          </p>
        </div>

        <div>
          <p className="text-stone-500">Remaining</p>
          <p
            className={`font-bold ${
              remaining < 0 ? "text-red-700" : "text-emerald-700"
            }`}
          >
            {currency.format(remaining)}
          </p>
        </div>
      </div>
    </article>
  );
}

type SummaryCardProps = {
  title: string;
  amount: number;
  highlight?: "positive" | "negative";
};

function SummaryCard({
  title,
  amount,
  highlight,
}: SummaryCardProps) {
  const amountClass =
    highlight === "negative"
      ? "text-red-700"
      : highlight === "positive"
        ? "text-emerald-700"
        : "text-stone-900";

  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-stone-500">
        {title}
      </p>

      <p className={`mt-2 text-2xl font-bold ${amountClass}`}>
        {currency.format(amount)}
      </p>
    </article>
  );
}

type PayPeriodSectionProps = {
  title: string;
  subtitle: string;
  paycheckAmount: number;
  fixedBillTotal: number;
  flexibleAllocation: number;
  assignedTotal: number;
  remaining: number;
  bills: Bill[];
  paidBillIds: string[];
  onToggleBill: (billId: string) => void;
};

function PayPeriodSection({
  title,
  subtitle,
  paycheckAmount,
  fixedBillTotal,
  flexibleAllocation,
  assignedTotal,
  remaining,
  bills,
  paidBillIds,
  onToggleBill,
}: PayPeriodSectionProps) {
  return (
    <section className="mb-10">
      <div className="mb-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-stone-900">
              {title}
            </h3>

            <p className="text-sm text-stone-500">
              {subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-5">
            <PaycheckStat
              label="Paycheck"
              amount={paycheckAmount}
            />

            <PaycheckStat
              label="Fixed Bills"
              amount={fixedBillTotal}
            />

            <PaycheckStat
              label="Flexible Share"
              amount={flexibleAllocation}
            />

            <PaycheckStat
              label="Total Assigned"
              amount={assignedTotal}
            />

            <PaycheckStat
              label="Remaining"
              amount={remaining}
              highlight={remaining < 0 ? "negative" : "positive"}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {bills.map((bill) => (
          <BillCard
            key={bill.id}
            bill={bill}
            isPaid={paidBillIds.includes(bill.id)}
            onToggle={() => onToggleBill(bill.id)}
          />
        ))}
      </div>
    </section>
  );
}

type FlexibleSectionProps = {
  bills: Bill[];
  total: number;
  paidBillIds: string[];
  onToggleBill: (billId: string) => void;
};

function FlexibleSection({
  bills,
  total,
  paidBillIds,
  onToggleBill,
}: FlexibleSectionProps) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-stone-900">
            Flexible and Monthly Allocations
          </h3>

          <p className="text-sm text-stone-500">
            Variable, split, quarterly or date-not-set expenses.
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-stone-500">
            Monthly Flexible Total
          </p>

          <p className="text-xl font-bold text-stone-900">
            {currency.format(total)}
          </p>

          <p className="text-xs text-stone-500">
            {currency.format(total / 2)} allocated from each paycheck
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {bills.map((bill) => (
          <BillCard
            key={bill.id}
            bill={bill}
            isPaid={paidBillIds.includes(bill.id)}
            onToggle={() => onToggleBill(bill.id)}
          />
        ))}
      </div>
    </section>
  );
}

type PaycheckStatProps = {
  label: string;
  amount: number;
  highlight?: "positive" | "negative";
};

function PaycheckStat({
  label,
  amount,
  highlight,
}: PaycheckStatProps) {
  const amountClass =
    highlight === "negative"
      ? "text-red-700"
      : highlight === "positive"
        ? "text-emerald-700"
        : "text-stone-900";

  return (
    <div>
      <p className="text-stone-500">{label}</p>

      <p className={`font-bold ${amountClass}`}>
        {currency.format(amount)}
      </p>
    </div>
  );
}

type BillCardProps = {
  bill: Bill;
  isPaid: boolean;
  onToggle: () => void;
};

function BillCard({
  bill,
  isPaid,
  onToggle,
}: BillCardProps) {
  return (
    <article
      className={`rounded-2xl border p-5 shadow-sm transition ${
        isPaid
          ? "border-emerald-300 bg-emerald-50"
          : "border-stone-200 bg-white"
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-stone-500">
            {bill.category}
          </p>

          <h4
            className={`text-lg font-bold ${
              isPaid
                ? "text-stone-500 line-through"
                : "text-stone-900"
            }`}
          >
            {bill.title}
          </h4>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            bill.paymentType === "Auto"
              ? "bg-blue-100 text-blue-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {bill.paymentType === "Auto"
            ? "AUTO"
            : "CHECK OFF"}
        </span>
      </div>

      <p className="text-2xl font-bold text-stone-900">
        {currency.format(bill.amount)}
      </p>

      <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-stone-700">
        <CalendarDays className="h-4 w-4 text-emerald-700" />
        Due: {bill.dueDate}
      </div>

      {bill.note && (
        <p className="mt-2 text-xs text-stone-500">
          {bill.note}
        </p>
      )}

      <button
        type="button"
        onClick={onToggle}
        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold transition ${
          isPaid
            ? "bg-emerald-700 text-white hover:bg-emerald-800"
            : "bg-stone-100 text-stone-700 hover:bg-stone-200"
        }`}
      >
        {isPaid ? (
          <>
            <Check className="h-5 w-5" />
            Confirmed Paid
          </>
        ) : bill.paymentType === "Auto" ? (
          <>
            <CreditCard className="h-5 w-5" />
            Confirm Auto Payment
          </>
        ) : (
          <>
            <CircleDollarSign className="h-5 w-5" />
            Mark Paid
          </>
        )}
      </button>
    </article>
  );
}