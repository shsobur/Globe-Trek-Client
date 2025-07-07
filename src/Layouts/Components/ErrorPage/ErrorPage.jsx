import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <>
      <section>
        <div className="h-screen">
          <div className="bg-white">
            <div className="container min-h-screen px-4 py-8 mx-auto sm:px-6 lg:px-12 lg:flex lg:items-center lg:gap-12">
              <div className="w-full lg:w-1/2">
                <p className="text-sm font-medium text-blue-500">404 error</p>
                <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl lg:text-4xl">
                  Page not found
                </h1>
                <p className="mt-4 text-gray-500 sm:text-base lg:text-lg">
                  Sorry, the page you are looking for does&lsquo;t exist. Here
                  are some helpful links:
                </p>

                <div className="flex flex-wrap items-center mt-6 gap-3 sm:gap-4">
                  <Link to="/">
                    <button className="w-full px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto hover:bg-blue-600">
                      Take Me Home
                    </button>
                  </Link>
                </div>
              </div>

              <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
                <img
                  loading="lazy"
                  className="w-full max-w-xs mx-auto sm:max-w-md lg:max-w-lg"
                  src="https://i.postimg.cc/0jyvSTT3/error404.jpg"
                  alt="404 illustration"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ErrorPage;