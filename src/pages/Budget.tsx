import { useEffect, useMemo, useState } from "react";
import {
  Check,
  CircleDollarSign,
  CreditCard,
  RefreshCw,
} from "lucide-react";

type Bill = {
  id: string;
  title: string;
  amount: number;
  category: string;
  paymentType: "Auto" | "Manual";
  note?: string;
};

const bills: Bill[] = [
  {
    id: "mortgage",
    title: "Mortgage",
    amount: 2571,
    category: "Housing",
    paymentType: "Manual",
  },
  {
    id: "van",
    title: "Van Payment",
    amount: 700,
    category: "Vehicles",
    paymentType: "Manual",
  },
  {
    id: "f150",
    title: "F-150 Payment",
    amount: 600,
    category: "Vehicles",
    paymentType: "Manual",
  },
  {
    id: "discover",
    title: "Discover",
    amount: 550,
    category: "Debt",
    paymentType: "Auto",
    note: "Budgeted payment",
  },
  {
    id: "chase-business",
    title: "United Business Card",
    amount: 350,
    category: "Debt",
    paymentType: "Auto",
    note: "Fixed automatic payment",
  },
  {
    id: "citi",
    title: "Citi Diamond Preferred",
    amount: 310,
    category: "Debt",
    paymentType: "Auto",
    note: "Statement amount may vary",
  },
  {
    id: "water-trash",
    title: "Water and Trash",
    amount: 286,
    category: "Utilities",
    paymentType: "Manual",
  },
  {
    id: "amazon-card",
    title: "Amazon Prime Visa",
    amount: 250,
    category: "Debt",
    paymentType: "Auto",
    note: "Fixed automatic payment",
  },
  {
    id: "irs",
    title: "IRS Payment",
    amount: 250,
    category: "Taxes",
    paymentType: "Manual",
  },
  {
    id: "state-farm",
    title: "State Farm",
    amount: 228,
    category: "Insurance",
    paymentType: "Manual",
  },
  {
    id: "tmobile",
    title: "T-Mobile",
    amount: 198,
    category: "Phone",
    paymentType: "Manual",
  },
  {
    id: "electric",
    title: "Electric",
    amount: 195,
    category: "Utilities",
    paymentType: "Manual",
  },
  {
    id: "zion",
    title: "Zion Broadband",
    amount: 75,
    category: "Internet",
    paymentType: "Manual",
  },
  {
    id: "agua-dulce",
    title: "Agua Dulce Water",
    amount: 70,
    category: "Utilities",
    paymentType: "Manual",
  },
  {
    id: "chatgpt",
    title: "ChatGPT",
    amount: 21.62,
    category: "Subscriptions",
    paymentType: "Auto",
  },
  {
    id: "walmart-plus",
    title: "Walmart+",
    amount: 13.71,
    category: "Subscriptions",
    paymentType: "Auto",
  },
  {
    id: "amazon-kids",
    title: "Amazon Kids+",
    amount: 6.34,
    category: "Subscriptions",
    paymentType: "Auto",
  },
  {
    id: "chase-fee",
    title: "Chase Checking Fee",
    amount: 15,
    category: "Bank Fees",
    paymentType: "Auto",
    note: "Review for possible waiver",
  },
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Budget() {
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
      "fmos-paid-bills",
      JSON.stringify(paidBillIds),
    );
  }, [paidBillIds]);

  const totals = useMemo(() => {
    const monthly = bills.reduce(
      (total, bill) => total + bill.amount,
      0,
    );

    const paid = bills
      .filter((bill) => paidBillIds.includes(bill.id))
      .reduce((total, bill) => total + bill.amount, 0);

    return {
      monthly,
      paid,
      remaining: monthly - paid,
    };
  }, [paidBillIds]);

  function toggleBill(billId: string) {
    setPaidBillIds((current) =>
      current.includes(billId)
        ? current.filter((id) => id !== billId)
        : [...current, billId],
    );
  }

  function resetMonth() {
    const confirmed = window.confirm(
      "Clear every paid confirmation and begin a new month?",
    );

    if (confirmed) {
      setPaidBillIds([]);
    }
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
              Monthly Bills
            </h1>

            <p className="mt-2 text-stone-500">
              Confirm manual payments and automatic withdrawals each month.
            </p>
          </div>

          <button
            type="button"
            onClick={resetMonth}
            className="flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 font-semibold text-stone-700 shadow-sm hover:bg-stone-50"
          >
            <RefreshCw className="h-4 w-4" />
            Reset Month
          </button>
        </div>
      </header>

      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          title="Monthly Bills"
          amount={totals.monthly}
        />

        <SummaryCard
          title="Confirmed Paid"
          amount={totals.paid}
        />

        <SummaryCard
          title="Remaining"
          amount={totals.remaining}
        />
      </section>

      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">
              Bill Checklist
            </h2>

            <p className="text-sm text-stone-500">
              Automatic payments should be checked after they post to the
              account.
            </p>
          </div>

          <p className="font-semibold text-emerald-700">
            {paidBillIds.length} of {bills.length} confirmed
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {bills.map((bill) => {
            const isPaid = paidBillIds.includes(bill.id);

            return (
              <article
                key={bill.id}
                className={`rounded-2xl border bg-white p-5 shadow-sm transition ${
                  isPaid
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-stone-200"
                }`}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-stone-500">
                      {bill.category}
                    </p>

                    <h3
                      className={`text-lg font-bold ${
                        isPaid
                          ? "text-stone-500 line-through"
                          : "text-stone-900"
                      }`}
                    >
                      {bill.title}
                    </h3>
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

                {bill.note && (
                  <p className="mt-1 text-xs text-stone-500">
                    {bill.note}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => toggleBill(bill.id)}
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
          })}
        </div>
      </section>
    </main>
  );
}

type SummaryCardProps = {
  title: string;
  amount: number;
};

function SummaryCard({ title, amount }: SummaryCardProps) {
  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-stone-500">{title}</p>

      <p className="mt-2 text-2xl font-bold text-stone-900">
        {currency.format(amount)}
      </p>
    </article>
  );
}