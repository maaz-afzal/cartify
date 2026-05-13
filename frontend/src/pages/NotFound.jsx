import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <section className="flex-1 flex items-center justify-center p-16">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl text-gray-200 dark:text-gray-800">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl text-gray-900 dark:text-white">
              Sorry, we couldn't find this page.
            </p>
            <p className="mt-4 mb-8 text-gray-600 dark:text-gray-400">
              But don't worry, you can find plenty of other things on our
              homepage.
            </p>
            <Link
              to="/"
              className="px-8 py-3 font-semibold rounded bg-amber-500 hover:bg-amber-600 text-white transition transform active:scale-95 shadow-lg shadow-amber-500/20"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
