"use client"

import { useState } from "react"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

const categories = [
  { name: "All Categories", href: "#", current: true },
  { name: "Category 1", href: "#", current: false },
  { name: "Category 2", href: "#", current: false },
  { name: "Category 3", href: "#", current: false },
  { name: "Category 4", href: "#", current: false },
]

export default function Catalogue() {
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white">
      {/* Mobile filter dialog */}
      <div className="relative z-40 lg:hidden" role="dialog" aria-modal="true">
        {/*
        Background backdrop, show/hide based on slide-over state.

        Entering: "transition-opacity ease-linear duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "transition-opacity ease-linear duration-300"
          From: "opacity-100"
          To: "opacity-0"
      */}
        <div className="fixed inset-0 bg-black bg-opacity-25"></div>

        <div className="fixed inset-0 z-40 flex">
          {/*
          Mobile filter sidebar, show/hide based on slide-over state.

          Entering: "transition ease-in-out duration-300 transform"
            From: "-translate-x-full"
            To: "translate-x-0"
          Leaving: "transition ease-in-out duration-300 transform"
            From: "translate-x-0"
            To: "-translate-x-full"
        */}
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4 border-t border-gray-200">
              <h3 className="sr-only">Categories</h3>
              <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                {categories.map((category) => (
                  <li key={category.name}>
                    <a href={category.href} className="block px-2 py-3">
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </form>
          </div>
        </div>
      </div>

      <section aria-labelledby="products-heading" className="pb-24 pt-6">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <form className="hidden lg:block">
              <h3 className="sr-only">Categories</h3>
              <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                {categories.map((category) => (
                  <li key={category.name}>
                    <a href={category.href}>{category.name}</a>
                  </li>
                ))}
              </ul>
            </form>

            {/* Product grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between">
                <div className="w-full">
                  <label htmlFor="search" className="sr-only">
                    Search products
                  </label>
                  <div className="relative text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                      <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-ekwip focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-ekwip sm:text-sm"
                      placeholder="Search products"
                      type="search"
                      name="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M2.628 1.601C5.028 1.601 7 3.573 7 5.972v7.253c0 2.4-1.972 4.372-4.372 4.372H2.628c-2.4 0-4.372-1.972-4.372-4.372V5.972c0-2.4 1.972-4.372 4.372-4.372zM6.154 8.976a.75.75 0 00-1.5-.005v-.99c0-.414.336-.75.75-.75s.75.336.75.75v.99a.75.75 0 00-.75.75zM3.375 11.475a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM3.375 13.975a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                    <path d="M13.372 1.601c2.4 0 4.372 1.972 4.372 4.372v7.253c0 2.4-1.972 4.372-4.372 4.372h-.885c-2.4 0-4.372-1.972-4.372-4.372V5.972c0-2.4 1.972-4.372 4.372-4.372h.885zM14.196 8.976a.75.75 0 00-1.5-.005v-.99c0-.414.336-.75.75-.75s.75.336.75.75v.99a.75.75 0 00-.75.75zM16.625 11.475a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM16.625 13.975a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75z" />
                  </svg>
                </button>
              </div>

              {/* Replace hover gradient classes with solid Ekwip blue */}
              <div className="bg-white">
                <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

                  <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    <div className="group relative">
                      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/product-page-04-featured-product-shot.jpg"
                          alt="Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls."
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <a href="#">
                              <span aria-hidden="true" className="absolute inset-0" />
                              Zip tote bag
                            </a>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">Black</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">$192</p>
                      </div>
                    </div>

                    <div className="group relative">
                      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/product-page-04-featured-product-shot.jpg"
                          alt="Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls."
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <a href="#">
                              <span aria-hidden="true" className="absolute inset-0" />
                              Zip tote bag
                            </a>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">Black</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">$192</p>
                      </div>
                    </div>

                    <div className="group relative">
                      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/product-page-04-featured-product-shot.jpg"
                          alt="Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls."
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <a href="#">
                              <span aria-hidden="true" className="absolute inset-0" />
                              Zip tote bag
                            </a>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">Black</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">$192</p>
                      </div>
                    </div>

                    <div className="group relative">
                      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/product-page-04-featured-product-shot.jpg"
                          alt="Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls."
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <a href="#">
                              <span aria-hidden="true" className="absolute inset-0" />
                              Zip tote bag
                            </a>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">Black</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">$192</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white">
                <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 lg:px-8">
                  <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                      <h1 className="text-xl font-semibold text-gray-900">Categories</h1>
                      <p className="mt-2 text-sm text-gray-700">
                        A list of all the categories in your account including their name, description and date created.
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                      <button
                        type="button"
                        className="block rounded-md bg-ekwip py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-ekwip focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ekwip"
                      >
                        Add Category
                      </button>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                >
                                  Name
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Description
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                  <span className="sr-only">Edit</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              {categories.map((category) => (
                                <tr key={category.name}>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {category.name}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {category.name} Description
                                  </td>
                                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <a href="#" className="text-ekwip hover:text-ekwip">
                                      Edit
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="isolate bg-white py-24 px-6 sm:py-32 lg:px-8">
                <div
                  className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                  aria-hidden="true"
                >
                  <div
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:w-[72.1875rem]"
                    style={{
                      clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                  />
                </div>
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Subscribe to our newsletter
                  </h2>
                  <p className="mt-2 text-lg leading-8 text-gray-600">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
                    amet fugiat veniam.
                  </p>
                </div>
                <form action="#" method="POST" className="mt-16">
                  <div className="mx-auto max-w-xl sm:flex">
                    <div className="min-w-0 flex-1">
                      <label htmlFor="email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="block w-full appearance-none rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-ekwip sm:text-sm sm:leading-6"
                        placeholder="Enter your email"
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-4 flex w-full items-center justify-center rounded-md bg-ekwip px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-ekwip focus:outline-none focus:ring-2 focus:ring-ekwip focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto"
                    >
                      Subscribe
                    </button>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-gray-500">
                    We care about your data. Read our{" "}
                    <a href="#" className="font-semibold text-ekwip hover:text-ekwip">
                      privacy&nbsp;policy
                    </a>
                    .
                  </p>
                </form>
              </div>

              <div className="bg-white py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-ekwip">Transactions</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      A better way to send money
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit laboriosam saepe, cum
                      repellat aperiam doloremque doloribus eius assumenda perferendis!
                    </p>
                  </div>

                  <div className="mt-10">
                    <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
                      <div className="relative">
                        <dt>
                          <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-ekwip text-white">
                            {/* Heroicon name: outline/globe-alt */}
                            <svg
                              className="h-6 w-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 21a9.004 9.004 0 008.716-4.037m-7.32-1.732c.003-.208.007-.415.007-.622m0 7.544c-.003-.207-.007-.415-.007-.622m8.716-4.037a9.004 9.004 0 00-8.716-4.037m1.31-3.985a1.5 1.5 0 00-2.264 0c-.545.545-.793 1.281-.793 2.05t.793 2.05a1.5 1.5 0 002.264 0c.545-.545.793-1.281.793-2.05t-.793-2.05zm-7.32 7.32a1.5 1.5 0 00-2.264 0c-.545.545-.793 1.281-.793 2.05t.793 2.05a1.5 1.5 0 002.264 0c.545-.545.793-1.281.793-2.05t-.793-2.05z"
                              />
                            </svg>
                          </div>
                          <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                            Competitive exchange rates
                          </p>
                        </dt>
                        <dd className="mt-2 ml-16 text-base text-gray-500">
                          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit laboriosam saepe,
                          cum repellat aperiam doloremque doloribus eius assumenda perferendis!
                        </dd>
                      </div>

                      <div className="relative">
                        <dt>
                          <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-ekwip text-white">
                            {/* Heroicon name: outline/scale */}
                            <svg
                              className="h-6 w-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h12.75m-12.75 0l3 11.25m8.25-11.25h6m-6 0l3 3m3-3v3"
                              />
                            </svg>
                          </div>
                          <p className="ml-16 text-lg font-medium leading-6 text-gray-900">No hidden fees</p>
                        </dt>
                        <dd className="mt-2 ml-16 text-base text-gray-500">
                          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit laboriosam saepe,
                          cum repellat aperiam doloremque doloribus eius assumenda perferendis!
                        </dd>
                      </div>

                      <div className="relative">
                        <dt>
                          <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-ekwip text-white">
                            {/* Heroicon name: outline/bolt */}
                            <svg
                              className="h-6 w-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          </div>
                          <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Transfers are instant</p>
                        </dt>
                        <dd className="mt-2 ml-16 text-base text-gray-500">
                          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit laboriosam saepe,
                          cum repellat aperiam doloremque doloribus eius assumenda perferendis!
                        </dd>
                      </div>

                      <div className="relative">
                        <dt>
                          <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-ekwip text-white">
                            {/* Heroicon name: outline/device-phone-mobile */}
                            <svg
                              className="h-6 w-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75v-3.75m3 3.75v-3.75M15 12h3m-3 3H12m-3-3h3"
                              />
                            </svg>
                          </div>
                          <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Mobile friendly</p>
                        </dt>
                        <dd className="mt-2 ml-16 text-base text-gray-500">
                          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit laboriosam saepe,
                          cum repellat aperiam doloremque doloribus eius assumenda perferendis!
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
