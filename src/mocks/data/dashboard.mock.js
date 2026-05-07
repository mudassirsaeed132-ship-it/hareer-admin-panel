export const dashboardSummaryMock = {
  greetingName: "Kevin",
  dateRangeLabel: "July 23 - July 30, 2025",
  metrics: [
    {
      key: "revenue",
      label: "Total Revenue",
      value: 5456,
      currency: "LYD",
    },
    {
      key: "orders",
      label: "Total Orders",
      value: 534,
    },
    {
      key: "vendors",
      label: "Total Vendors",
      value: 53,
    },
    {
      key: "categories",
      label: "Total Categories",
      value: 54,
    },
    {
      key: "visitors",
      label: "Total Visitors",
      value: "4.6k",
    },
  ],
  ordersOverview: {
    axisLabels: ["5K", "1K", "500", "100", "0"],
    defaultPeriod: "this-week",
    periods: [
      {
        value: "this-week",
        label: "This Week",
        bars: [
          {
            day: "MON",
            value: 220,
            tooltip: { orders: 5, revenue: 1200, currency: "USD" },
          },
          {
            day: "TUE",
            value: 560,
            tooltip: { orders: 8, revenue: 2100, currency: "USD" },
          },
          {
            day: "WED",
            value: 1680,
            tooltip: { orders: 12, revenue: 3400, currency: "USD" },
          },
          {
            day: "THU",
            value: 1120,
            tooltip: { orders: 10, revenue: 2800, currency: "USD" },
          },
          {
            day: "FRI",
            value: 1480,
            tooltip: { orders: 11, revenue: 3200, currency: "USD" },
          },
          {
            day: "SAT",
            value: 220,
            tooltip: { orders: 4, revenue: 980, currency: "USD" },
          },
          {
            day: "SUN",
            value: 220,
            tooltip: { orders: 4, revenue: 1020, currency: "USD" },
          },
        ],
      },
      {
        value: "last-week",
        label: "Last Week",
        bars: [
          {
            day: "MON",
            value: 180,
            tooltip: { orders: 4, revenue: 920, currency: "USD" },
          },
          {
            day: "TUE",
            value: 420,
            tooltip: { orders: 6, revenue: 1680, currency: "USD" },
          },
          {
            day: "WED",
            value: 1320,
            tooltip: { orders: 10, revenue: 2890, currency: "USD" },
          },
          {
            day: "THU",
            value: 950,
            tooltip: { orders: 8, revenue: 2400, currency: "USD" },
          },
          {
            day: "FRI",
            value: 1210,
            tooltip: { orders: 9, revenue: 2610, currency: "USD" },
          },
          {
            day: "SAT",
            value: 200,
            tooltip: { orders: 3, revenue: 760, currency: "USD" },
          },
          {
            day: "SUN",
            value: 170,
            tooltip: { orders: 3, revenue: 690, currency: "USD" },
          },
        ],
      },
      {
        value: "this-month",
        label: "This Month",
        bars: [
          {
            day: "MON",
            value: 900,
            tooltip: { orders: 22, revenue: 6200, currency: "USD" },
          },
          {
            day: "TUE",
            value: 1180,
            tooltip: { orders: 28, revenue: 7800, currency: "USD" },
          },
          {
            day: "WED",
            value: 2100,
            tooltip: { orders: 34, revenue: 9150, currency: "USD" },
          },
          {
            day: "THU",
            value: 1680,
            tooltip: { orders: 31, revenue: 8420, currency: "USD" },
          },
          {
            day: "FRI",
            value: 2400,
            tooltip: { orders: 39, revenue: 10480, currency: "USD" },
          },
          {
            day: "SAT",
            value: 740,
            tooltip: { orders: 16, revenue: 3880, currency: "USD" },
          },
          {
            day: "SUN",
            value: 680,
            tooltip: { orders: 15, revenue: 3520, currency: "USD" },
          },
        ],
      },
    ],
  },
  paymentsOverview: {
    defaultPeriod: "this-week",
    periods: [
      {
        value: "this-week",
        label: "This Week",
        totalAmount: 5345,
        currency: "LYD",
        totalLabel: "Total Amount",
        stats: [
          {
            key: "paid",
            label: "Paid Payments",
            amount: 3620,
            currency: "LYD",
            color: "#E4B2B2",
          },
          {
            key: "pending",
            label: "Pending Payments",
            amount: 1725,
            currency: "LYD",
            color: "#F2EBE8",
          },
        ],
      },
      {
        value: "last-week",
        label: "Last Week",
        totalAmount: 4280,
        currency: "LYD",
        totalLabel: "Total Amount",
        stats: [
          {
            key: "paid",
            label: "Paid Payments",
            amount: 2810,
            currency: "LYD",
            color: "#E4B2B2",
          },
          {
            key: "pending",
            label: "Pending Payments",
            amount: 1470,
            currency: "LYD",
            color: "#F2EBE8",
          },
        ],
      },
      {
        value: "this-month",
        label: "This Month",
        totalAmount: 18340,
        currency: "LYD",
        totalLabel: "Total Amount",
        stats: [
          {
            key: "paid",
            label: "Paid Payments",
            amount: 12980,
            currency: "LYD",
            color: "#E4B2B2",
          },
          {
            key: "pending",
            label: "Pending Payments",
            amount: 5360,
            currency: "LYD",
            color: "#F2EBE8",
          },
        ],
      },
    ],
  },
  topSellingStores: [
    {
      id: 1,
      storeName: "J. Junaid Jamshed",
      category: "Clothing",
      location: "California, USA",
      totalProducts: 546,
      totalOrders: 446,
      totalRevenue: 33454,
      currency: "LYD",
    },
    {
      id: 2,
      storeName: "J. Junaid Jamshed",
      category: "Footwear",
      location: "California, USA",
      totalProducts: 55,
      totalOrders: 446,
      totalRevenue: 33454,
      currency: "LYD",
    },
    {
      id: 3,
      storeName: "J. Junaid Jamshed",
      category: "Fragrances",
      location: "California, USA",
      totalProducts: 767,
      totalOrders: 446,
      totalRevenue: 33454,
      currency: "LYD",
    },
    {
      id: 4,
      storeName: "J. Junaid Jamshed",
      category: "Glasses",
      location: "California, USA",
      totalProducts: 98,
      totalOrders: 446,
      totalRevenue: 33454,
      currency: "LYD",
    },
  ],
};