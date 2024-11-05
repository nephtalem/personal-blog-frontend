const Error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600">Oops!</h1>
        <p className="mt-2 text-gray-600">
          Something went wrong. Please try again later.
        </p>
      </div>
    </div>
  );
};

export default Error;
