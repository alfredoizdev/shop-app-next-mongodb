import { auth } from '@/auth'
import { columns } from './columns'
import UserDataTable from './UserDataTable'
import { getUsersListAction } from '@/lib/actions/user.action'

const FetchUsers = async () => {
  // const { error, message, results } = await fetchProductsListAction()
  const { results } = await getUsersListAction()
  const session = await auth()

  if (!results) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <h1 className='text-2xl font-bold'>No Users found</h1>
      </div>
    )
  }

  const filterOutCurrentUser = results.filter(
    (user) => user.email !== session?.user?.email
  )

  return (
    <>
      <UserDataTable columns={columns} data={filterOutCurrentUser} />
    </>
  )
}

export default FetchUsers
