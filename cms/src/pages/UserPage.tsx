import { useState } from "react"
import { useUsers } from "../hooks/useUsers"
import { useSoftDeleteUser } from "../hooks/useUsers"
import { useCreateUser } from "../hooks/useUsers"
import styles from "./UserPage.module.scss"


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
  const [page, setPage] = useState(1)

  /* 3️⃣ handlers */
  const handleCheck = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((v) => v !== id)
        : [...prev, id]
    )
    console.log("Check handler");
  }

  const handleCheckAll = () => {
    if (!data) return
    setSelectedIds((prev) =>
      prev.length === data.length ? [] : data.map((user) => user.id)
    )
  }

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "user"
  })

  /* 4️⃣ early return */
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  const totalPages = Math.ceil(((data?.length ?? 0) / 20))
  const paginatedData = data?.slice((page - 1) * 20, page * 20)

  /* 6️⃣ return */
  return (
    <div className={styles.userPage}>
      <h2 className={styles.title}>회원 관리</h2>
      <div className={styles.btnGroup}>
        <button onClick={() => setIsOpen(true)}>
          회원 등록
        </button>
        <button
          disabled={selectedIds.length === 0}
          onClick={() => {
            if (window.confirm("선택한 항목을 삭제하시겠습니까?")) {
              console.log("삭제");
              selectedIds.forEach((id) => mutate(id))
              setSelectedIds([])
            }
          }}
        >
          선택 삭제
        </button>
        <button onClick={() => setShowDatePicker(!showDatePicker)}>
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
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedIds.length === data?.length}
                onChange={() => handleCheckAll()}
              />
            </th>
            <th>ID</th>
            <th>이름</th>
            <th>이메일</th>
            <th>권한</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData?.map((user) => (
            <tr
              key={user.id}
              className={user.isDeleted ? styles.deletedRow : undefined}
            >
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

      <div className={styles.pagination}>
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        >
          이전
        </button>
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1
          return (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              disabled={pageNumber === page}
            >
              {pageNumber}
            </button>
          )
        })}
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
        >
          다음
        </button>
      </div>

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

            <div className={styles.rowGroup}>
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
            </div>

            <div className={styles.colGroup} style={{marginTop : 16}}>
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
              <button onClick={() => {
                console.log("닫기 버튼 클릭됨");
                setIsOpen(false);
              }}>
                취소
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserPage;