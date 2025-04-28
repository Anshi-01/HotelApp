exports.bookingConfirmationTemplate = (
  userName,
  propertyTitle,
  propertyLocation,
  checkInDate,
  checkOutDate,
  totalAmount,
  guests
) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #222;">
      <h2>Hello ${userName},</h2>
      <p>Thank you for your booking!</p>
      <h3>Booking Details:</h3>
      <ul style="list-style: none; padding: 0;">
          <li><strong>Property Title:</strong> ${propertyTitle}</li>
          <li><strong>Location:</strong> ${propertyLocation}</li>
           <li><strong>Number of Guests:</strong> ${guests}</li>
          <li><strong>Check-in:</strong> ${checkInDate}</li>
          <li><strong>Check-out:</strong> ${checkOutDate}</li>
          <li><strong>Total Amount:</strong> ₹${totalAmount}</li>
      </ul>
      <p>If you have any questions, feel free to reach out to our support team.</p>
      <p>We hope you have a great stay!</p>
      <hr style="margin: 24px 0;">
      <p style="font-size: 12px; color: #888;">This is an automated message. Please do not reply directly to this email.</p>
    </div>
    `;
};

exports.paymentConfirmationTemplate = (userName, propertyDetails, amount) => {
  return `
    <h2>Hello ${userName},</h2>
    <p>Your payment has been successfully processed!</p>
    <h3>Payment Details:</h3>
    <ul>
        <li><strong>Amount:</strong> ₹${amount}</li>
        <li><strong>Property:</strong> ${propertyDetails}</li>
    </ul>
    <p>Thank you for choosing us!</p>
    <p>We look forward to hosting you soon.</p>
    `;
};
