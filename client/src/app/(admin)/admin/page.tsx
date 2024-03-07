
import AdminDashboardSkeleton from "@/components/AdminDashboard/AdminSkeletons/AdminDashboardSkeleton"
import AdminTest from "@/components/AdminDashboard/AdminTest"
import dynamic from "next/dynamic"

const AdminDashboard = dynamic(() => import('@/components/AdminDashboard/AdminDashboard'), {
  loading: () =><AdminDashboardSkeleton/>,
})
const AdminPage = () => {
  return (
    <>
    <AdminTest />

    <AdminDashboard/>
    </>

  )
}

export default AdminPage