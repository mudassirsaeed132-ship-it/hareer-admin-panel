const orderSeeds = [
  {
    id: "order-001",
    orderId: "SR-23 56",
    customerName: "Chris Taylor",
    customerAddress: "California, USA",
    storeName: "J. (Junaid Jamshed)",
    amount: 100,
    currency: "LYD",
    type: "Cash on Delivery",
    paymentStatus: "pending",
    orderStatus: "accepted",
  },
  {
    id: "order-002",
    orderId: "SR-23 56",
    customerName: "Mark Jansen",
    customerAddress: "California, USA",
    storeName: "J. (Junaid Jamshed)",
    amount: 100,
    currency: "LYD",
    type: "Cash on Delivery",
    paymentStatus: "pending",
    orderStatus: "accepted",
  },
  {
    id: "order-003",
    orderId: "SR-23 56",
    customerName: "Jos Butler",
    customerAddress: "California, USA",
    storeName: "J. (Junaid Jamshed)",
    amount: 100,
    currency: "LYD",
    type: "Online Payment",
    paymentStatus: "paid",
    orderStatus: "delivered",
  },
  {
    id: "order-004",
    orderId: "SR-23 56",
    customerName: "Steve Smith",
    customerAddress: "California, USA",
    storeName: "J. (Junaid Jamshed)",
    amount: 100,
    currency: "LYD",
    type: "Online Payment",
    paymentStatus: "paid",
    orderStatus: "delivered",
  },
  {
    id: "order-005",
    orderId: "SR-23 56",
    customerName: "Shan Marsh",
    customerAddress: "California, USA",
    storeName: "J. (Junaid Jamshed)",
    amount: 100,
    currency: "LYD",
    type: "Cash on Delivery",
    paymentStatus: "pending",
    orderStatus: "on-the-way",
  },
  {
    id: "order-006",
    orderId: "SR-23 56",
    customerName: "Shan Marsh",
    customerAddress: "California, USA",
    storeName: "J. (Junaid Jamshed)",
    amount: 100,
    currency: "LYD",
    type: "Cash on Delivery",
    paymentStatus: "pending",
    orderStatus: "on-the-way",
  },
  {
    id: "order-007",
    orderId: "SR-23 56",
    customerName: "Shan Marsh",
    customerAddress: "California, USA",
    storeName: "J. (Junaid Jamshed)",
    amount: 100,
    currency: "LYD",
    type: "Cash on Delivery",
    paymentStatus: "pending",
    orderStatus: "on-the-way",
  },
  {
    id: "order-008",
    orderId: "SR-23 56",
    customerName: "Shan Marsh",
    customerAddress: "California, USA",
    storeName: "J. (Junaid Jamshed)",
    amount: 100,
    currency: "LYD",
    type: "Cash on Delivery",
    paymentStatus: "pending",
    orderStatus: "on-the-way",
  },
  {
    id: "order-009",
    orderId: "SR-23 56",
    customerName: "Shan Marsh",
    customerAddress: "California, USA",
    storeName: "J. (Junaid Jamshed)",
    amount: 100,
    currency: "LYD",
    type: "Cash on Delivery",
    paymentStatus: "pending",
    orderStatus: "on-the-way",
  },
  {
    id: "order-010",
    orderId: "SR-23 56",
    customerName: "Shan Marsh",
    customerAddress: "California, USA",
    storeName: "J. (Junaid Jamshed)",
    amount: 100,
    currency: "LYD",
    type: "Cash on Delivery",
    paymentStatus: "pending",
    orderStatus: "on-the-way",
  },
];

function createOrderItems(quantity = 2) {
  return Array.from({ length: quantity }).map((_, index) => ({
    id: `item-${index + 1}`,
    productName: "Luxury Chiffon Hijab",
    quantity: 1,
    color: "Black",
    amount: 18,
    currency: "LYD",
    thumbnailLabel: "LH",
  }));
}

function createOrderDetail(seed, index) {
  return {
    id: seed.id,
    orderId: "#SR-23 343",
    customer: {
      name: index === 0 ? "Christopher Henry" : seed.customerName,
      avatarLabel: seed.customerName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      dateLabel: "Monday, Dec 23, 2026",
      timeLabel: "12:44 AM",
      location: "Office 56, St4 Wilson road, USA",
      status: seed.orderStatus,
    },
    store: {
      name: "J. (Junaid Jamshed)",
      avatarLabel: "J.",
    },
    items: createOrderItems(index % 2 === 0 ? 2 : 1),
    payment: {
      totalAmount: 18,
      currency: "LYD",
      type: seed.type,
      discount: -5,
      deliveryFees: 5,
    },
  };
}

export const ordersListMock = orderSeeds.map((seed) => ({ ...seed }));

export const orderDetailsByIdMock = orderSeeds.reduce((accumulator, seed, index) => {
  accumulator[seed.id] = createOrderDetail(seed, index);
  return accumulator;
}, {});