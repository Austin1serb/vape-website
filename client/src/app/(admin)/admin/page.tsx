
import AdminDashboardSkeleton from "@/components/AdminDashboard/AdminSkeletons/AdminDashboardSkeleton"
import dynamic from "next/dynamic"

const AdminDashboard = dynamic(() => import('@/components/AdminDashboard/AdminDashboard'), {
  loading: () =><AdminDashboardSkeleton/>,
})
const AdminPage = () => {
  return (
  

    <AdminDashboard/>
 

  )
}

export default AdminPage