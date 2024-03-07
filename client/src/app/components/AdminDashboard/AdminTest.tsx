

import { getData } from "@/api/route";



const AdminTest = async () => {
    const endpoint = 'product'
    const _id = '65e129d55b01000cbf9166be'
    const res = await getData(endpoint, _id);
    return (
     
            <div className="h-32 w-32 bg-red-400 text-black">
                {res.name}
            </div>

   
    )
}

export default AdminTest;