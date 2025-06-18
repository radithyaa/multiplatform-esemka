import { Card, CardContent } from "@/components/ui/card"
import { columns } from "@/components/employeesColumns"
import { DataTable } from "@/components/data-table"
import { useQuery } from '@tanstack/react-query'
import type { Employee } from './../lib/types';

const fetchEmployees = async () => {
  const res = await fetch('http://localhost:3000/employees', {
    method: 'GET',
    credentials: 'include'
  })
  if (!res.ok) {
    throw new Error('Gagal fetch data karyawan')
  }
  return res.json()
}

function EmployeesPage() {
  const { data, error, isLoading } = useQuery<Employee[]>({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
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
