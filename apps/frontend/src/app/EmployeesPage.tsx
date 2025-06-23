import { Card, CardContent } from "@/components/ui/card"
import { columns } from "@/components/employeesColumns"
import { DataTable } from "@/components/data-table"
import { useQuery } from '@tanstack/react-query'
import type { Employee } from './../lib/types';
import { useAuth } from "@/context/AuthContext"


function EmployeesPage() {
  const { accessToken, isAuthReady } = useAuth()
  const fetchEmployees = async () => {
    const res = await fetch(`${ import.meta.env.VITE_BACKEND_URL }/employees`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      method: 'GET',
      credentials: 'include'
    })
    if (!res.ok) {
      throw new Error('Gagal fetch data karyawan')
    }
    return res.json()
  }
  
  const { data } = useQuery<Employee[]>({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
    enabled: isAuthReady, // Hanya jalankan query jika auth sudah siap
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false
  })
  

  return (
    <div className=" justify-center flex w-full">
      <Card className="w-full py-0 border-none rounded-none">
        <CardContent>
          <DataTable
            columns={columns}
            data={data || []}
          
          />
        </CardContent>
      </Card>
      
    </div>
  )
}

export default EmployeesPage
