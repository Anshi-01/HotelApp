import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editProperty } from "../store/reducers/propertySlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  viewPropertyService,
  updatePropertyService,
} from "../api/propertyServices"; // Assuming you have this service to fetch a property

const EditProperty = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch existing property details to pre-fill form
  useEffect(() => {
    const fetchProperty = async () => {
      if (id) {
        const property = await viewPropertyService(id);
        if (property) {
          setValue("id", property._id); // Important to set id
          setValue("title", property.title);
          setValue("description", property.description);
          setValue("location", property.location);
          setValue("price", property.price);
          setValue("amenities", property.amenities.join(" "));
          setValue("images", property.images.join(" "));
        }
      }
    };
    fetchProperty();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    data.images = data.images.split(" ");
    data.amenities = data.amenities.split(" ");

    try {
      // Call the backend to update the property
      const updated = await updatePropertyService({
        ...data,
        _id: data.id, // backend expects _id
      });
      if (updated) {
        // Optionally, update Redux state here if you want
        // dispatch(editProperty(updated.updateProperty)); // If you want to update global state
        navigate(`/property/${data.id}`);
      }
    } catch (error) {
      // Handle error (toast, etc.)
    }
  };

  return (
    <div className="loginPage flex z-[2] top-0 left-0 w-full bg-zinc-100 h-screen items-center justify-center">
      <div className="py-1 w-[35%] bg-zinc-50 rounded-xl shadow-xl">
        <div className="w-full py-4 relative">
          <h1 className="text-center font-bold text-lg text-zinc-800">
            Edit Property
          </h1>
        </div>

        <div className="py-5 px-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Hidden field for ID */}
            <input type="hidden" {...register("id", { required: true })} />

            <div className="w-full border border-zinc-500 rounded-lg">
              {/* Title */}
              <div className="w-full p-4 text-md relative flex justify-center items-center gap-3 border-b border-zinc-500">
                <label>Title:</label>
                <input
                  className="w-full h-full focus:outline-none text-xl"
                  type="text"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <p className="error">{errors.title.message}</p>
                )}
              </div>

              {/* Description */}
              <div className="p-4 text-md relative w-full flex justify-center items-center gap-3 border-b border-zinc-500">
                <label>Description:</label>
                <input
                  className="w-full h-full focus:outline-none text-xl"
                  type="text"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                {errors.description && (
                  <p className="error">{errors.description.message}</p>
                )}
              </div>

              {/* Location */}
              <div className="p-4 text-md relative w-full flex justify-center items-center gap-3 border-b border-zinc-500">
                <label>Location:</label>
                <input
                  className="w-full h-full focus:outline-none text-xl"
                  type="text"
                  {...register("location", {
                    required: "Location is required",
                  })}
                />
                {errors.location && (
                  <p className="error">{errors.location.message}</p>
                )}
              </div>

              {/* Price */}
              <div className="p-4 text-md relative w-full flex justify-center items-center gap-3 border-b border-zinc-500">
                <label>Price (INR per night):</label>
                <input
                  className="w-[65%] h-full focus:outline-none text-xl"
                  type="number"
                  {...register("price", { required: "Price is required" })}
                />
                {errors.price && (
                  <p className="error">{errors.price.message}</p>
                )}
              </div>

              {/* Amenities */}
              <div className="p-4 text-md relative w-full flex justify-center items-center gap-3 border-b border-zinc-500">
                <label>Amenities:</label>
                <input
                  className="w-full h-full focus:outline-none text-xl"
                  type="text"
                  {...register("amenities", {
                    required: "Amenities are required",
                  })}
                />
                {errors.amenities && (
                  <p className="error">{errors.amenities.message}</p>
                )}
              </div>

              {/* Images */}
              <div className="p-4 text-md relative w-full flex justify-center items-center gap-3">
                <label>Images:</label>
                <input
                  className="w-full h-full focus:outline-none text-xl"
                  type="text"
                  {...register("images", {
                    required: "Images are required",
                  })}
                />
                {errors.images && (
                  <p className="error">{errors.images.message}</p>
                )}
              </div>
            </div>

            <button
              className="w-full text-center bg-[#b17f44] mt-4 text-white rounded-md py-3"
              type="submit"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProperty;
