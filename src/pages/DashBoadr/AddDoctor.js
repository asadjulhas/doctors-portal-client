import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import auth from "../../firebaseinit";
import LoadingSpinnerSmall from "../Shared/LoadingSpinnerSmall";

const AddDoctor = () => {
  const [user, loading, error] = useAuthState(auth);
  const [loader, setLoader] = useState(false)
  const accessToken = localStorage.getItem("accessToken");
  const { data, isLoading } = useQuery(["specialty"], () =>
    fetch("https://sheltered-beyond-38485.herokuapp.com/specialty").then((res) => res.json())
  );
  const uploadKey = "3f8b872c2bffae9cfbe946b2b6c2985b";
  const {
    register,
    formState: { errors },
    handleSubmit, reset
  } = useForm();

  const onSubmit = async (data) => {
    setLoader(true)
    axios
      .get(
        `https://sheltered-beyond-38485.herokuapp.com/check-admin/${user.email}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((user) => {
        if (user.data) {
          const image = data.image[0];
          const formData = new FormData();
          formData.append("image", image);
          const url = `https://api.imgbb.com/1/upload?key=${uploadKey}`;
          fetch(url, {
            method: "POST",
            body: formData,
          })
            .then((res) => res.json())
            .then((image) => {
              if (image.success) {
                const imageUrl = image.data.url;
                const doctor = {
                  name: data.name,
                  email: data.email,
                  specialty: data.specialty,
                  image: imageUrl,
                };
                axios
                  .post("https://sheltered-beyond-38485.herokuapp.com/doctor", doctor, {
                    headers: {
                      authorization: `Bearer ${accessToken}`,
                    },
                  })
                  .then((res) => {
                    if (res.data.message) {
                      signOut(auth);
                      localStorage.removeItem("accessToken");
                    } else if (res.data.insertedId) {
                      toast.success("Doctor added successfully!", {
                        position: "top-center",
                      });
                      reset();
                      setLoader(false)
                    }
                  });
              }
            });
        } else {
          signOut(auth);
          localStorage.removeItem("accessToken");
        }
      });

  };
  return (
    <div className="doctor_form w-80 mt-5">
      <h3 className="mb-3 text-xl ">Add a new doctor</h3>
      {isLoading ? <LoadingSpinnerSmall /> : ""}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control mb-3 w-full max-w-xs">
          <input
            placeholder="Doctor name"
            className="input input-bordered"
            {...register("name", { required: true })}
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
            className="select w-full input-bordered max-w-xs"
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
          <input
            type="file"
            className="input input-bordered pt-[10px]"
            {...register("image", { required: true })}
          />
          <span className="text-[red] text-sm mt-1">
            {errors.firstName?.type === "required" && "Image is required"}
          </span>
        </div>
        <button className={`btn btn-primary w-80 ${loader ? 'loading' : ''}`}>Add doctor</button>
      </form>
    </div>
  );
};

export default AddDoctor;
