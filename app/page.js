"use client";
import Image from "next/image";
import { Bar } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
} from "chart.js";
import { Facebook, Twitter, Instagram } from "lucide-react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function Home() {
  // Sample data for the bar chart
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue",
        data: [65, 59, 80, 81, 56, 55, 40, 70, 45, 60, 55, 45],
        backgroundColor: "#556ee6",
      },
      {
        label: "Expenses",
        data: [28, 48, 40, 19, 86, 27, 90, 35, 30, 40, 25, 30],
        backgroundColor: "#34c38f",
      },
      {
        label: "Profit",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 55, 43, 40],
        backgroundColor: "#f1b44c",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  // Sample transaction data
  const transactions = [
    { id: "#SK2540", name: "Neal Matthews", date: "07 Oct, 2023", total: "$400", status: "Paid" },
    { id: "#SK2541", name: "Jamal Burnett", date: "07 Oct, 2023", total: "$380", status: "Chargeback" },
    { id: "#SK2542", name: "Juan Mitchell", date: "06 Oct, 2023", total: "$384", status: "Paid" },
    { id: "#SK2543", name: "Barry Dick", date: "05 Oct, 2023", total: "$412", status: "Paid" },
    { id: "#SK2544", name: "Ronald Taylor", date: "04 Oct, 2023", total: "$404", status: "Refund" },
  ];

  return (
 
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column */}
      <div className="lg:col-span-4">
        {/* Welcome Card */}
        <div className="bg-[#556ee6] text-white rounded-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold mb-2">Welcome Back!</h2>
              <p className="text-white/80">Dashboard</p>
            </div>
            <Image
              src="/images/profile-img.png"
              alt="Profile"
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>
        </div>

        {/* Monthly Earning */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Monthly Earning</h3>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-bold text-gray-900">$34,252</h4>
              <p className="text-gray-500">This month</p>
            </div>
            <div className="w-20 h-20 rounded-full border-4 border-primary/20 flex items-center justify-center">
              <span className="text-primary font-semibold">+12%</span>
            </div>
          </div>
        </div>

        {/* Social Source */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Social Source</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Facebook className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold">Facebook</p>
                <p className="text-sm text-gray-500">125 sales</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Twitter className="text-blue-400" />
              </div>
              <div>
                <p className="font-semibold">Twitter</p>
                <p className="text-sm text-gray-500">112 sales</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-pink-100 rounded-lg">
                <Instagram className="text-pink-600" />
              </div>
              <div>
                <p className="font-semibold">Instagram</p>
                <p className="text-sm text-gray-500">104 sales</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-8">
        {/* Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold mb-4">Email Sent</h3>
          <Bar data={chartData} options={chartOptions} height={300} />
        </div>

        {/* Latest Transactions */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Latest Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Billing Name</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Payment Status</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="py-3">{transaction.id}</td>
                    <td>{transaction.name}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.total}</td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === "Paid" ? "bg-green-100 text-green-800" :
                          transaction.status === "Chargeback" ? "bg-red-100 text-red-800" :
                            "bg-yellow-100 text-yellow-800"
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td>
                      <button className="text-primary hover:underline">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  
  );
}
