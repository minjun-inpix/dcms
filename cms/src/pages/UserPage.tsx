import { useUsers } from "../hooks/useUsers"
import { useSoftDeleteUser } from "../hooks/useUsers"

const UserPage = () => {
  const { data, isLoading, isError } = useUsers()
  const { mutate } = useSoftDeleteUser()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <div>
      <h2>회원 관리</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>이메일</th>
            <th>권한</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  onClick={() => {
                    if (window.confirm("정말 삭제하시겠습니까?")) {
                      mutate(user.id)
                    }
                  }}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserPage