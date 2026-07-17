export default function Budget() {
  return (
    <div className="p-6 w-full">
      <h1 className="text-4xl font-bold">
        FMOS Financial Command Center
      </h1>

      <p className="text-gray-500 mb-6">
        Dodd Family Financial Overview
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold">Monthly Income</h2>
          <p className="text-2xl font-bold text-green-600">
            $9,700
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold">Total Debt</h2>
          <p className="text-2xl font-bold text-red-600">
            $40,955
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold">Monthly Interest</h2>
          <p className="text-2xl font-bold text-orange-500">
            $740
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold">Minimum Payments</h2>
          <p className="text-2xl font-bold">
            $1,095
          </p>
        </div>

      </div>

      <div className="mt-8 bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">
          Debt Accounts
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Account</th>
              <th className="text-left p-2">Balance</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="p-2">Discover</td>
              <td className="p-2">$25,480</td>
            </tr>

            <tr>
              <td className="p-2">Citi</td>
              <td className="p-2">$8,378</td>
            </tr>

            <tr>
              <td className="p-2">Amazon</td>
              <td className="p-2">$3,586</td>
            </tr>

            <tr>
              <td className="p-2">United</td>
              <td className="p-2">$3,510</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}