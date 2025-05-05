"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import { Bar, Line, Doughnut, PolarArea } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Filler,
} from "chart.js";
import { Facebook, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import PageHeader from "@/components/PageHeader";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Filler,
);

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if auth token exists
    const authToken = Cookies.get("auth_token");
    setIsAuthenticated(!!authToken);
    setIsLoading(false);
    
    // If not authenticated, redirect to login
    if (!authToken) {
      router.push("/login");
    }
  }, [router]);

  // Show nothing while checking authentication
  if (isLoading || !isAuthenticated) {
    return null;
  }

  // Original Email Sent Chart Data
  const emailChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Series A",
        data: [45, 52, 38, 45, 19, 23, 25, 35, 22, 20, 45, 35],
        backgroundColor: "#556ee6",
      },
      {
        label: "Series B",
        data: [15, 25, 20, 30, 15, 25, 20, 25, 20, 15, 20, 25],
        backgroundColor: "#f1b44c",
      },
      {
        label: "Series C",
        data: [20, 15, 18, 25, 22, 16, 12, 18, 13, 15, 13, 20],
        backgroundColor: "#34c38f",
      },
    ],
  };

  // Revenue Growth Chart Data
  const revenueChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [30, 45, 35, 50, 40, 60],
        borderColor: "#556ee6",
        backgroundColor: "rgba(85, 110, 230, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Expenses",
        data: [25, 35, 30, 45, 35, 55],
        borderColor: "#f1b44c",
        backgroundColor: "rgba(241, 180, 76, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Product Categories Chart Data
  const categoryChartData = {
    labels: ["Electronics", "Fashion", "Food", "Books", "Others"],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          "#556ee6",
          "#34c38f",
          "#f1b44c",
          "#50a5f1",
          "#f46a6a",
        ],
      },
    ],
  };

  // User Activity Chart Data
  const activityChartData = {
    labels: ["Downloads", "Uploads", "Shares", "Comments", "Likes"],
    datasets: [
      {
        data: [80, 50, 30, 40, 60],
        backgroundColor: [
          "rgba(85, 110, 230, 0.8)",
          "rgba(52, 195, 143, 0.8)",
          "rgba(241, 180, 76, 0.8)",
          "rgba(80, 165, 241, 0.8)",
          "rgba(244, 106, 106, 0.8)",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const lineChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      {/* Add header and navigation for the homepage */}
      <div className="sticky top-0 z-50 w-full bg-white">
        <div className="w-full">
          <Header />
          <SubHeader isMobileView={false} />
        </div>
      </div>
      <main className="container-custom py-6">
        <PageHeader />
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Orders</p>
                  <h3 className="text-2xl font-bold">1,235</h3>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Revenue</p>
                  <h3 className="text-2xl font-bold">$35,723</h3>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Average Price</p>
                  <h3 className="text-2xl font-bold">$16.2</h3>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-4 space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src="/images/profile-img.png"
                    alt="Henry Price"
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">Henry Price</h2>
                    <p className="text-gray-600">UI/UX Designer</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-600">Projects</p>
                    <p className="text-lg font-semibold">125</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Revenue</p>
                    <p className="text-lg font-semibold">$1245</p>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  View Profile
                </button>
              </div>

              {/* Monthly Earning */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Monthly Earning</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-2xl font-bold">$34,252</h4>
                    <p className="text-green-500 flex items-center gap-1">
                      <span>+12%</span>
                      <span className="text-sm">from previous period</span>
                    </p>
                  </div>
                  <div className="w-20 h-20 rounded-full border-4 border-blue-200 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">67%</span>
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
                    <div className="flex-1">
                      <p className="font-semibold">Facebook</p>
                      <p className="text-sm text-gray-500">125 sales</p>
                    </div>
                    <button className="text-blue-600">
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                  {/* Add Twitter and Instagram with similar structure */}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Email Sent Chart */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Email Sent</h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-lg text-sm text-gray-600 hover:bg-gray-100">Week</button>
                    <button className="px-3 py-1 rounded-lg text-sm text-gray-600 hover:bg-gray-100">Month</button>
                    <button className="px-3 py-1 rounded-lg text-sm text-white bg-blue-600">Year</button>
                  </div>
                </div>
                <div className="h-[300px]">
                  <Bar data={emailChartData} options={chartOptions} />
                </div>
              </div>

              {/* Revenue Growth Chart */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-6">Revenue Growth</h3>
                <div className="h-[300px]">
                  <Line data={revenueChartData} options={lineChartOptions} />
                </div>
              </div>

              {/* Additional Charts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Categories */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-6">Product Categories</h3>
                  <div className="h-[250px]">
                    <Doughnut data={categoryChartData} options={chartOptions} />
                  </div>
                </div>

                {/* User Activity */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-6">User Activity</h3>
                  <div className="h-[250px]">
                    <PolarArea data={activityChartData} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
