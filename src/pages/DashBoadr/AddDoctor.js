import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import LoadingSpinnerSmall from "../Shared/LoadingSpinnerSmall";

const AddDoctor = () => {
  const { data, isLoading } = useQuery(["specialty"], () =>
    fetch("http://localhost:5000/specialty").then((res) => res.json())
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="doctor_form w-80 mt-5">
      <h3 className="mb-3 text-xl ">Add a new doctor</h3>
      {isLoading ? <LoadingSpinnerSmall /> : ""}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control mb-3 w-full max-w-xs">
          <input
            placeholder="Doctor name"
            className="input input-bordered"
            {...register("firstName", { required: true })}
          />
          <span className="text-[red] text-sm mt-1">
            {errors.firstName?.type === "required" && "First name is required"}
          </span>
        </div>
        <div className="form-control mb-3">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered"
            {...register("email", {
              required: {
                value: true,
                message: "Email is Requied",
              },
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Provide a valid Email",
              },
            })}
          />
          <span className="text-[red] text-sm mt-1">
            {errors.email && "Provide a valid Email"}
          </span>
        </div>
        <div className="form-control mb-3">
          <select
            className="select w-full max-w-xs"
            {...register("specialty", { required: true })}
          >
            <option disabled defaultValue={true}>
              Doctor Specialty
            </option>
            {data?.map((s) => (
              <option key={s._id}>{s.name}</option>
            ))}
          </select>
          <span className="text-[red] text-sm mt-1">
            {errors.specialty?.type === "required" && "Specialty is required"}
          </span>
        </div>
        <div className="form-control mb-3 w-full max-w-xs">
          <input type='file'
            className="input"
            {...register("img", { required: true })}
          />
          <span className="text-[red] text-sm mt-1">
            {errors.firstName?.type === "required" && "Image is required"}
          </span>
        </div>
        <button className="btn btn-primary w-80">Add doctor</button>
      </form>
    </div>
  );
};

export default AddDoctor;
