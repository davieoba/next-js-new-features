'use client'

import ProductImage from "@/components/productImage";
import { Dialog } from "@headlessui/react";
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from 'swr'

const fetcher = async (url: string) => (await fetch(url)).json()

function Modal() {
  let [isOpen, setIsOpen] = useState(true)
  const router = useRouter()
  const { id } = useParams()

  const { data, error, isLoading } = useSWR(`https://fakestoreapi.com/products/${id}`, fetcher)
  console.log(data)

  if (isLoading) {
    return <div className='h-8 w-8 rounded-full border-2 border-dotted border-blue-600 animate-spin' />
  }

  if (error) {
    return notFound()
  }

  return (
    <Dialog open={isOpen} onClose={() => {
      setIsOpen(false)
      router.back()
    }} className='relative z-50'>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className='mx-auto max-w-3xl rounded bg-white p-10'>
          <div className="flex flex-col items-center md:flex-row gap-x-8 h-96">
            <div className="relative w-72 h-full md:inline mb-12 md:mb-0">
              <ProductImage product={data} fill />
            </div>

            <div className="flex-1 flex flex-col">
              <div className="flex-1">
                <h4 className='font-semibold'>{data?.title}</h4>
                <p className="font-medium text-sm">${data.price}</p>

                <div className="flex items-center text-sm my-4 gap-x-4">
                  <p>{data.rating.rate}</p>
                  <p className="flex items-center gap-x-1">
                    {new Array(Math.floor(data.rating.rate)).fill(0).map((_, index) => {
                      return <StarIcon key={index} className="h-4 w-4 text-yellow-500" />
                    })}

                    {new Array(5 - Math.floor(data.rating.rate)).fill(0).map((_, index) => {
                      return <StarIconOutline key={index} className="h-4 w-4 text-yellow-500" />
                    })}
                  </p>
                  <p className="text-blue-500 hover:underline cursor-pointer text-xs">
                    See all {data?.rating.count} reviews
                  </p>
                </div>

                <p className="line-clamp-5 text-sm">{data.description}</p>
              </div>

              <div className="space-y-3 text-sm">
                <button className='button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black'>Add to bag</button>
                <button
                  onClick={() => window.location.reload()}
                  className='button w-full bg-transparent border-blue-600 hover:bg-blue-600 hover:text-white hover:border-transparent'
                >
                  View full details
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default Modal