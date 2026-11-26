
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const formatOrderItems = (items) =>
  items
    .map(
      (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.colour}</td>
          <td>${item.lengthFeet} ft</td>
          <td>${item.quantity}</td>
          <td>₹${item.price}</td>
        </tr>
      `
    )
    .join("");

export const sendOrderEmails = async (order) => {
  const senderEmail = process.env.SENDER_EMAIL;

  const ownerEmails = [
    process.env.OWNER_EMAIL_1,
    process.env.OWNER_EMAIL_2,
  ].filter(Boolean);

  const itemRows = formatOrderItems(order.items);

  const orderDetails = `
    <h2>New Maanikamaalai Order</h2>
    <h3>Order ID: ${order.orderNumber}</h3>

    <h3>Customer Details</h3>
    <p>Name: ${order.customer.fullName}</p>
    <p>Phone: ${order.customer.phone}</p>
    <p>Email: ${order.customer.email}</p>

    <h3>Delivery Address</h3>
    <p>
      ${order.address.doorNo}, ${order.address.street},
      ${order.address.area || ""}, ${order.address.city},
      ${order.address.district}, ${order.address.state} -
      ${order.address.pincode}
    </p>

    <h3>Products</h3>
    <table border="1" cellpadding="8" cellspacing="0">
      <tr>
        <th>Product</th>
        <th>Colour</th>
        <th>Length</th>
        <th>Quantity</th>
        <th>Price</th>
      </tr>
      ${itemRows}
    </table>

    <p>Subtotal: ₹${order.subtotal}</p>
    <p>Shipping: ₹${order.shipping}</p>
    <h3>Total: ₹${order.total}</h3>
  `;

  const ownerResult = await Promise.allSettled(
    ownerEmails.map((email) =>
      resend.emails.send({
        from: senderEmail,
        to: email,
        subject: `New Order - ${order.orderNumber}`,
        html: orderDetails,
      })
    )
  );

  const customerResult = await resend.emails.send({
    from: senderEmail,
    to: order.customer.email,
    subject: `Order Confirmation - ${order.orderNumber}`,
    html: `
      <h2>Thank you for shopping with Maanikamaalai!</h2>
      <p>Your order has been placed successfully.</p>
      ${orderDetails}
    `,
  });

  return { ownerResult, customerResult };
};
