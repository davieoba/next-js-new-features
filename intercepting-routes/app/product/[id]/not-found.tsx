import Link from "next/link"

const NotFound = () => {
  return (
    <div className='mt-48 flex items-center flex-col'>
      <h1>Not Found</h1>
      <p>Return to the <Link href='/' className="text-[#3e92f2] text-cursor">Home</Link>  page </p>
    </div>
  )
}

export default NotFound
