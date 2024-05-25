import { FaInstagram } from "react-icons/fa6";
import { FaTwitter, FaFacebook, FaGithub, FaRegEdit } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import useGlobalContext from "../../hooks/useGlobalContext";
import { useQuery } from "@tanstack/react-query";
import { Loading, Error } from "../Utils";
import { Link } from "react-router-dom";

function Profile() {
  const axiosInstance = useAxios();
  const { userID } = useGlobalContext();

  const { error, isPending, data } = useQuery({
    queryKey: ["user", userID],
    queryFn: async () => {
      const response = await axiosInstance.get(`users/user/${userID}/`);
      return response.data;
    },
  });

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="p-5 shadow-xl border mx-5 rounded text-center text-muted max-w-full md:max-w-sm md:mx-auto mt-5 md:mt-20">
      <img
        className="w-32 h-32 rounded-full mx-auto"
        // src={data?.profile_image}
        src="https://loremflickr.com/320/320/girl"
        alt={data?.first_name + data?.last_name}
      />
      <div className="text-sm mt-6">
        <a
          href="#"
          style={{ textTransform: "capitalize" }}
          className="font-medium leading-none text-3xl md:text-4xl mb-2 transition duration-500 ease-in-out"
        >
          {data?.first_name} {data?.last_name}
        </a>
        <p className=" text-lg md:text-xl my-3">Blogger &amp; Youtuber</p>
      </div>
      <p className="mt-2 text-sm">
        {data?.about ? data?.about : "Please write about yourself..."}
      </p>
      <div className="flex mt-4 justify-center gap-3">
        <FaInstagram />
        <FaTwitter />
        <FaGithub />
        <FaFacebook />
      </div>
      <div className="mt-3">
        <Link
          to={`/update/${userID}/`}
          state={data}
          className=" flex justify-center items-center gap-2 text-indigo-500"
        >
          <FaRegEdit /> <span>Edit your profile</span>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
