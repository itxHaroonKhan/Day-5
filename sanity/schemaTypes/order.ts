
// schemas/order.js
export default {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "address", title: "Address", type: "string" },
    { name: "phone", title: "Phone", type: "string" },
    { name: "zipCode", title: "Zip Code", type: "string" },
    { name: "country", title: "Country", type: "string" },
    {
      name: "orderItems",
      title: "Order Items",
      type: "array",
      of: [{ type: "reference", to: [{ type: "products" }] }],
    },
    { name: "totalPrice", title: "Total Price", type: "number" },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
    },
  ],
};
