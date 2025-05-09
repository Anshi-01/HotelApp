import React, { useEffect, useState } from "react";
import Cards from "./partials/Cards";
import { Link, useFetcher } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deletePropertyService,
  viewMyPropertyService,
} from "../api/propertyServices";
import {
  cancelBookingService,
  viewUserBookingService,
} from "../api/bookingServices";
import { toast } from "react-toastify";
import { calculateDuration } from "../utils/Math";
import { updateProfilePicService } from "../api/userServices";
import { setUser } from "../store/reducers/userSlice";

const ProfilePage = () => {
  const { user } = useSelector((store) => store.user);
  const [bookingsData, setbookingsData] = useState([]);
  const [propertiesData, setpropertiesData] = useState([]);
  const dispatch = useDispatch();
  const [profilePicInput, setProfilePicInput] = useState(
    user?.profilePic || ""
  );

  const loadProperty = async () => {
    const res = await viewMyPropertyService();
    setpropertiesData(res);
  };
  const loadBooking = async () => {
    const res = await viewUserBookingService();
    setbookingsData(res);
  };

  console.log(bookingsData);

  useEffect(() => {
    if (user) {
      loadProperty();
      loadBooking();
    }
  }, [user]);

  const deleteHandler = async (id) => {
    const res = await deletePropertyService(id);
    res?.message && toast.success(res.message);
    loadProperty();
  };

  const bookingCancelHandler = async (id) => {
    const response = await cancelBookingService(id);
    toast.success(response.message);
    loadBooking();
  };

  const handleProfilePicUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfilePicService(profilePicInput);
      toast.success(res.message);
      dispatch(setUser(res.user));
    } catch (error) {
      toast.error("Failed to update profile picture");
    }
  };

  const formateDate = (data) => {
    const d = new Date(data);
    return `${d.getDate()} ${d.toLocaleString("default", {
      month: "short",
    })} ${d.getFullYear()}`;
  };

  return user ? (
    <div className="h-full w-full pt-28 px-20 bg-zinc-50">
      <div className="flex h-full relative w-full gap-8">
        <div className="w-[30vw] p-6 py-10 sticky top-[16vh] bg-white rounded-3xl h-fit shadow-[0px_0px_30px_2px_#e4e4e7] flex flex-col items-center">
          {/* Profile Circle */}
          <div>
            <img
              src={
                user.profilePic ||
                "https://ui-avatars.com/api/?name=" + user.username
              }
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mx-auto"
            />
            {/* Update Profile Pic Form */}
            <form
              onSubmit={handleProfilePicUpdate}
              className="mt-4 flex flex-col items-center"
            >
              <input
                type="url"
                value={profilePicInput}
                onChange={(e) => setProfilePicInput(e.target.value)}
                placeholder="Profile picture URL"
                className="border rounded px-2 py-1 w-48"
              />
              <button
                type="submit"
                className="mt-2 bg-[#b17f44] text-white px-4 py-1 rounded"
              >
                Update Picture
              </button>
            </form>
          </div>
          {/* Name and Role */}
          <div className="text-center mt-4">
            <h2 className="text-4xl text-black font-semibold">
              {user?.username}
            </h2>
            <p className="text-gray-500 text-sm">
              {user.isAdmin ? "Admin" : "Guest"}
            </p>
          </div>
          {/* Month Info */}
          <div className="">
            <p className="text-lg font-bold">
              {calculateDuration(user.createdAt)}
            </p>
            <p className="text-gray-500 text-xs">on Airbnb</p>
          </div>
        </div>

        <div className=" w-full pt-2">
          <h1 className="text-3xl font-bold mb-4">My properties</h1>
          <div className="grid grid-cols-4 gap-6">
            {propertiesData.length > 0 ? (
              propertiesData.map((property) => (
                <div
                  key={property._id}
                  className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition "
                >
                  <Link to={`/property/${property._id}`}>
                    <div className="w-full h-40 relative">
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="w-full h-full flex items-center overflow-x-auto overflow-y-hidden no-scrollBar">
                          {property.images &&
                            property.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={property.location}
                                className="w-full object-cover"
                              />
                            ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h2 className="font-semibold text-lg">
                        {property.location}
                      </h2>
                      <p className="text-black font-bold">{property.price}</p>
                    </div>
                  </Link>

                  <div className="flex gap-2 px-4">
                    <Link
                      to={`/property/edit/${property._id}`}
                      className="cursor-pointer text-center border border-[#b17f44] text-[#b17f44] rounded-md py-2 w-full"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteHandler(property._id)}
                      className="cursor-pointer text-center bg-[#b17f44] text-white rounded-md py-2 w-full"
                      type="submit"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h1>No Property Yet!</h1>
            )}
          </div>

          <h1 className="text-3xl font-bold my-4 mt-10">My Bookings</h1>
          <div className="grid grid-cols-3 gap-x-3">
            {bookingsData.map((booking) => (
              <div
                key={booking._id}
                className={`py-5 px-8 mb-2 rounded-xl shadow-[0px_0px_30px_2px_#e4e4e7] `}
              >
                <div className="flex items-center w-full justify-between">
                  <h1 className="text-md font-bold ">Place </h1>
                  <h1 className="text-sm font-light">
                    {booking.property?.location || "Null"}
                  </h1>
                </div>

                <div className="flex items-center w-full justify-between">
                  <h3 className="text-md font-bold ">Price </h3>
                  <h3 className={`text-sm font-light`}>
                    ₹{booking.totalPrice}
                  </h3>
                </div>
                <div className="flex items-center w-full justify-between">
                  <h3 className="text-md font-bold ">Staus </h3>
                  <h3
                    className={`text-sm ${
                      booking.status.toLowerCase() == "confirmed" &&
                      "text-green-600"
                    } ${
                      booking.status.toLowerCase() == "pending" &&
                      "text-orange-600"
                    } ${
                      booking.status.toLowerCase() == "cancelled" &&
                      "text-red-600"
                    } font-bold `}
                  >
                    {booking.status}
                  </h3>
                </div>
                <div className="flex items-center w-full justify-between">
                  <h3 className="text-md font-bold ">Order ID </h3>
                  <h3 className="text-sm font-light">
                    {booking.razorpayOrderID}
                  </h3>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex flex-col w-full justify-between">
                    <h3 className="text-md font-bold ">Check In </h3>
                    <h3 className="text-sm font-light">
                      {new Date(booking.checkInDate).getDate() +
                        " " +
                        new Date(booking.checkInDate).toLocaleString(
                          "default",
                          { month: "short" }
                        ) +
                        " " +
                        new Date(booking.checkInDate).getFullYear()}
                    </h3>
                  </div>
                  <div className="flex items-end flex-col w-full justify-between">
                    <h3 className="text-md font-bold ">Check Out </h3>
                    <h3 className="text-sm font-light">
                      {new Date(booking.checkOutDate).getDate() +
                        " " +
                        new Date(booking.checkOutDate).toLocaleString(
                          "default",
                          { month: "short" }
                        ) +
                        " " +
                        new Date(booking.checkOutDate).getFullYear()}
                    </h3>
                  </div>
                </div>

                {booking.status.toLowerCase() !== "cancelled" && (
                  <button
                    onClick={() => bookingCancelHandler(booking._id)}
                    className="cursor-pointer text-center border-[#b17f44] text-[#b17f44]  border rounded-md mt-3 py-2 w-full"
                    type="submit"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading....</h1>
  );
};

export default ProfilePage;
