function NotFound() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center space-y-3">
        <img
          className="w-1/2"
          src="https://i.ibb.co.com/CPqQ6dY/not-found.webp"
          alt=""
        />
        <h2 className="text-3xl font-semibold">Something Went Wrong!</h2>
        <p className="text-red-600">Invalid Route</p>
      </div>
    </div>
  );
}

export default NotFound;
