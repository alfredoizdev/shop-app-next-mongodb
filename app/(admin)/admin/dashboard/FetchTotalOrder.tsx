const FetchTotalOrder = () => {
  return (
    <div className='bg-white shadow-md p-6 m-4'>
      <h1 className='text-2xl font-bold text-center py-4'>Total Orders</h1>
      <div className='flex justify-center items-center'>
        <span className='text-4xl font-semibold'>0</span>
      </div>
      <p className='text-center text-gray-500 mt-2'>
        Total number of orders available in the store.
      </p>
    </div>
  )
}

export default FetchTotalOrder
