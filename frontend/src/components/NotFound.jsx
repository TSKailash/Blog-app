import Navbar from "./Navbar";
const NotFound = () => {
    return (
      <div>
        <Navbar/>
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl mb-2">Page Not Found</p>
        <p className="text-md text-gray-900">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. .</p>
      </div>
      </div>
    );
  };
  
  export default NotFound;
  