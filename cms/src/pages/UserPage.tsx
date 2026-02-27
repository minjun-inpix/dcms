import { useState } from "react"
import { useUsers } from "../hooks/useUsers"
import { useSoftDeleteUser } from "../hooks/useUsers"
import { useCreateUser } from "../hooks/useUsers"


const UserPage = () => {
  /* 1️⃣ hooks */
  const { data, isLoading, isError } = useUsers()
  const { mutate } = useSoftDeleteUser()
  const { mutate: createMutate } = useCreateUser()

  /* 2️⃣ state */
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")

  /* 3️⃣ handlers */
  const handleCheck = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((v) => v !== id)
        : [...prev, id]
    )
    console.log("Check handler");
  }

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "user"
  })

  /* 4️⃣ early return */
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  /* 5️⃣ return */
  return (
    <div>
      <h2>회원 관리</h2>
      <button onClick={() => setIsOpen(true)}>
        회원 등록
      </button>
      <button
        disabled={selectedIds.length === 0}
        onClick={() => {
          if (window.confirm("선택한 항목을 삭제하시겠습니까?")) {
            console.log("삭제");
            selectedIds.forEach((id) => mutate(id))  // 👈 여기 들어감
            setSelectedIds([])
          }
        }}
      >
        선택 삭제
      </button>
      <button style={{ marginLeft: 10 }} onClick={() => setShowDatePicker(!showDatePicker)}>
        {showDatePicker ? "날짜 선택 닫기" : "날짜 선택 열기"}
      </button>

      {showDatePicker && (
        <div style={{ marginBottom: 10, marginTop: 10 }}>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>선택</th>
            <th>ID</th>
            <th>이름</th>
            <th>이메일</th>
            <th>권한</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(user.id)}
                  onChange={() => handleCheck(user.id)}
                />
              </td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.3)"
        }}>
          <div style={{
            background: "#fff",
            padding: 20,
            width: 300,
            margin: "100px auto"
          }}>
            <h3>회원 등록</h3>

            <input
              placeholder="이름"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="이메일"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>

            <button
              onClick={() => {
                createMutate(
                  { ...form, isDeleted: false },
                  {
                    onSuccess: () => {
                      setIsOpen(false)
                      setForm({ name: "", email: "", role: "user" })
                    }
                  }
                )
                console.log("저장 클릭됨");
              }}
            >
              저장
            </button>

            {/* <button onClick={() => setIsOpen(false)}> */}
            <button onClick={() => {
              console.log("닫기 버튼 클릭됨");
              setIsOpen(false);
            }}>
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserPage;