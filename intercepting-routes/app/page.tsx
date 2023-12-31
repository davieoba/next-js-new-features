import Product from '@/components/product'
import Image from 'next/image'

export default async function Home() {
  const res = await fetch('https://fakestoreapi.com/products')
  const products: ProductType[] = await res.json()

  return (
    <main className='min-h-screen max-w-7xl mx-auto px-8'>
      <section className='flex flex-col space-y-12 pb-44'>
        <h1 className='text-5xl uppercase font-bold text-center'>
          Deals of the day
        </h1>

        <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {products.map((product: ProductType) => {
            return <Product key={product.id} product={product} />
          })}
        </div>
      </section>
    </main>
  )
}
