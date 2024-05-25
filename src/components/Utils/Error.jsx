import PropTypes from "prop-types";

function Error({ error }) {
  console.log(error);
  return (
    <div className="px-2 text-center">
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-8xl font-extrabold text-red-500">
          {error?.response?.status}
        </h1>
        <p className="text-4xl font-medium text-muted">{error.message}</p>
        <p className="text-xl text-muted mt-4">
          {error?.response?.data.errors}
        </p>
        <p className="text-xl text-muted mt-4">
          We apologize for the inconvenience. Please try again later.
        </p>
      </div>
    </div>
  );
}

Error.propTypes = {
  error: PropTypes.string,
};

export default Error;
