import React from "react";

const Trusted = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Trusted by eCommerce Businesses
          </h2>

          <p className="mt-4 text-gray-500 sm:text-xl">
            Wouldn't it be easier if you could look at About Us page examples to
            create a killer About Us page? Well, truth be told, there are a few
            organizations out there with astounding "About Us" pages, the
            components of which you can imitate on your own site.
          </p>
        </div>

        <div className="mt-8 sm:mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col rounded-lg bg-blue-100 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Total Sales
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                $4.8m
              </dd>
            </div>

            <div className="flex flex-col rounded-lg bg-blue-100 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Registered Customers
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                24M
              </dd>
            </div>

            <div className="flex flex-col rounded-lg bg-blue-100 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Total Seller
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                86k
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Trusted;
