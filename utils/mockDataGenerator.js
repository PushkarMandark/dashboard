// Deterministic mock data generators to avoid hydration issues

export const generateProducts = (count = 30) =>
  Array.from({ length: count }, (_, i) => {
    // Use index-based deterministic values
    const priceBase = ((i * 37) % 990) + 10;
    const categoryIndex = (i * 7) % productCategories.length;
    const statusIndex = (i * 3) % productStatuses.length;
    const rating = ((i * 5) % 5) + 1;

    return {
      id: i + 1,
      name: `Product ${i + 1}`,
      price: priceBase,
      category: productCategories[categoryIndex],
      status: productStatuses[statusIndex].value,
      rating,
    };
  });

export const generateUsers = (count = 25) => {
  const firstNames = ["John", "Jane", "Mike", "Sarah", "David", "Lisa", "Tom", "Emma"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller"];
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "company.com"];
  const roles = ["Admin", "User", "Manager", "Editor"];

  return Array.from({ length: count }, (_, i) => {
    // Use deterministic values based on index
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[(i * 3) % lastNames.length];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domains[i % domains.length]}`;
    const phoneArea = ((i * 17) % 900) + 100;
    const phoneExchange = ((i * 23) % 900) + 100;
    const phoneNumber = ((i * 31) % 9000) + 1000;
    const daysAgo = (i * 7) % 365;

    return {
      id: i + 1,
      name: `${firstName} ${lastName}`,
      email,
      phone: `+1 (${phoneArea}) ${phoneExchange}-${phoneNumber}`,
      status: userStatuses[i % userStatuses.length].value,
      isActive: i % 4 !== 0, // 75% active
      createdAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
      avatar: `https://i.pravatar.cc/40?img=${(i % 50) + 1}`,
      role: roles[i % roles.length],
    };
  });
};

export const generateOrders = (count = 40) => {
  const customers = [
    "John Smith",
    "Jane Doe",
    "Mike Johnson",
    "Sarah Wilson",
    "David Brown",
    "Lisa Garcia",
    "Tom Miller",
    "Emma Davis",
  ];
  const paymentMethods = ["Credit Card", "PayPal", "Bank Transfer", "Cash"];

  return Array.from({ length: count }, (_, i) => {
    // Use deterministic values based on index
    const daysAgo = (i * 2) % 90; // Orders from last 90 days
    const orderDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
    const items = ((i * 3) % 5) + 1; // 1-5 items
    const itemPrice = ((i * 13) % 90) + 10; // $10-$100
    const total = items * itemPrice;
    const streetNumber = ((i * 17) % 9999) + 1;
    const zipCode = ((i * 23) % 90000) + 10000;

    return {
      id: `ORD-${String(i + 1).padStart(4, "0")}`,
      orderNumber: `#${String(i + 1001).padStart(6, "0")}`,
      customer: customers[i % customers.length],
      items,
      total,
      status: orderStatuses[i % orderStatuses.length].value,
      orderDate: orderDate.toISOString(),
      shippingAddress: `${streetNumber} Main St, City, State ${zipCode}`,
      paymentMethod: paymentMethods[i % paymentMethods.length],
      discount: i % 5 === 0 ? (i % 20) + 1 : 0, // 20% of orders have discount
    };
  });
};

// Status configurations
const productStatuses = [
  { value: "In Stock", label: "In Stock", severity: "success" },
  { value: "Low Stock", label: "Low Stock", severity: "warning" },
  { value: "Out of Stock", label: "Out of Stock", severity: "danger" },
];

const userStatuses = [
  { value: "Active", label: "Active", severity: "success" },
  { value: "Inactive", label: "Inactive", severity: "secondary" },
  { value: "Suspended", label: "Suspended", severity: "danger" },
];

const orderStatuses = [
  { value: "Pending", label: "Pending", severity: "warning" },
  { value: "Processing", label: "Processing", severity: "info" },
  { value: "Shipped", label: "Shipped", severity: "primary" },
  { value: "Delivered", label: "Delivered", severity: "success" },
  { value: "Cancelled", label: "Cancelled", severity: "danger" },
];

const productCategories = [
  "Electronics",
  "Clothing",
  "Accessories",
  "Furniture",
  "Books",
  "Sports",
];

// Chart data generators
export const generateChartData = (type = "bar", dataPoints = 12) => {
  const labels = Array.from({ length: dataPoints }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (dataPoints - 1 - i));
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  });

  const generateDataset = (label, color, baseValue = 100) => ({
    label,
    data: Array.from({ length: dataPoints }, (_, i) => {
      // Deterministic data generation
      const variation = ((i * 17) % 50) - 25; // -25 to +25 variation
      return Math.max(0, baseValue + variation + ((i * 7) % 30));
    }),
    backgroundColor: color,
    borderColor: color,
    borderWidth: 2,
    fill: type === "area",
  });

  switch (type) {
    case "line":
      return {
        labels,
        datasets: [
          generateDataset("Revenue", "#3B82F6", 150),
          generateDataset("Orders", "#10B981", 80),
        ],
      };

    case "doughnut":
      return {
        labels: productCategories,
        datasets: [
          {
            data: productCategories.map((_, i) => ((i * 23) % 50) + 10),
            backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"],
          },
        ],
      };

    case "polar":
      return {
        labels: ["Desktop", "Mobile", "Tablet", "Other"],
        datasets: [
          {
            data: [45, 35, 15, 5],
            backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
          },
        ],
      };

    default: // bar
      return {
        labels,
        datasets: [generateDataset("Sales", "#3B82F6", 120)],
      };
  }
};

// Export status configurations for use in other components
export { productStatuses, userStatuses, orderStatuses, productCategories };
