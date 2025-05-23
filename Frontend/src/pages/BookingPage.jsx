import React, { useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { createBookingService } from "../api/bookingServices";
import { viewPropertyService } from "../api/propertyServices";
import { toast } from "react-toastify";
import { createRazorpayOrder } from "../api/paymentServices";

const BookingPage = () => {
  const { search } = useLocation();
  const { id } = useParams();
  // console.log(data);
  const data = decodeURIComponent(search)
    .split("?")[1]
    .split("&")
    .reduce((acc, item) => {
      const [key, value] = item.split("=");
      // Remove surrounding quotes from value if present
      acc[key] = value.replace(/^"|"$/g, "");
      return acc;
    }, {});

  const [paymentId, setpaymentId] = useState("");
  const [property, setproperty] = useState(null);
  const [status, setstatus] = useState("");
  const [totalAmount, settotalAmount] = useState(0);
  const navigate = useNavigate();

  //edit|
  const handleConfirmOrder = async () => {
    try {
      const payment = await createRazorpayOrder(totalAmount);
      console.log(payment);

      if (!payment) {
        toast.error("Payment failed!");
        return;
      }

      const { status, id } = payment;
      setstatus(status);
      setpaymentId(id);
    } catch (error) {
      toast.error("Something went wrong in payment!");
      console.error(error);
    }
  };
  //edit^

  const createBooking = async () => {
    const bookingData = {
      propertyId: id,
      status: "Confirmed",
      paymentId,
      checkInDate: new Date(data.checkinDate),
      checkOutDate: new Date(data.checkoutDate),
      totalAmount,
      guests: Number(data.guests),
    };

    console.log(bookingData);

    await createBookingService(bookingData);
    navigate("/");
  };

  const getproperty = async (id) => {
    const property = await viewPropertyService(id);
    setproperty(property);
  };

  useEffect(() => {
    getproperty(id);
    settotalAmount(data.price * data.nights * data.guests);
  }, []);

  useEffect(() => {
    if (status === "authorized") {
      createBooking();
      toast.success("Order Confirmed");
    } else if (status != "") {
      toast.error("Payment failed. Please try again.");
      navigate("/");
    }
  }, [status]);

  console.log(data);

  return (
    <div className="h-screen w-full bg-zinc-50 px-40 flex flex-col justify-center items-center">
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="col-span-2">
          <h1 className="text-2xl font-bold mb-6">Request to book</h1>

          {/* Trip Details */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-5">Your trip</h2>
            <div className="flex gap-20 items-center">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-semibold text-black">Dates</p>
                  <p className="text-lg font-medium">
                    {new Date(data.checkinDate).getDate() +
                      " " +
                      new Date(data.checkinDate).toLocaleString("default", {
                        month: "short",
                      }) +
                      " " +
                      new Date(data.checkinDate).getFullYear()}{" "}
                    –{" "}
                    {new Date(data.checkoutDate).getDate() +
                      " " +
                      new Date(data.checkoutDate).toLocaleString("default", {
                        month: "short",
                      }) +
                      " " +
                      new Date(data.checkoutDate).getFullYear()}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center text-center">
                <div>
                  <p className="text-xl font-semibold text-black">Guests</p>
                  <p className="text-lg font-medium">{data.guests}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleConfirmOrder}
              className="bg-[#b17f44] text-white font-bold py-2 px-10 rounded-lg mt-8"
            >
              Book Now
            </button>
          </section>
        </div>

        {/* Right Section */}
        <div>
          <div className="border rounded-lg p-4">
            {/* Hotel Info */}
            <div className="flex gap-4 mb-6">
              <img
                src={property?.images?.[0] || "https://via.placeholder.com/80"} // Replace with actual image
                alt="Hotel"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium font-semibold">
                  {" "}
                  {property?.title || "Loading..."}
                </p>
                <p className="text-sm text-gray-600">
                  {property?.description || "Room info loading..."}
                </p>
              </div>
            </div>

            {/* Price Details */}
            <h2 className="text-lg font-semibold mb-4">Price details</h2>
            <div className="flex justify-between text-sm mb-2">
              <p>
                ₹{data.price} x {data.nights} nights X {data.guests} guests
              </p>
              <p>₹{data.price * data.nights * data.guests}</p>
            </div>
            <div className="flex justify-between font-semibold text-md mt-4 border-t pt-4">
              <p>Total (INR)</p>
              <p>₹{data.price * data.nights * data.guests}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
