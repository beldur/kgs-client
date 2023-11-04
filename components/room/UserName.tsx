import type { KGSUser } from '@/lib/api/types'

interface UserNameProps {
  user: KGSUser
}

const UserName = ({ user }: UserNameProps) => {
  return (
    <span className="whitespace-nowrap">
      {user.name} [{user.rank || '-'}]
    </span>
  )
}

export default UserName
