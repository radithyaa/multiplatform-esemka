import { ColumnDef } from "@tanstack/react-table"
import type { Employee } from "@/lib/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "./ui/checkbox"

export const columns: ColumnDef<Employee>[] = [
    {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
    // {
    //     accessorKey: "id",
    //     header: ({ column }) => {
    //     return (
    //         <Button
    //         variant="ghost"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //         className="w-full h-full"
    //         >
    //         Id
    //         <ArrowUpDown className="text-muted-foreground size-3 " />
    //         </Button>
    //     )
    //     },
    // },
    {
        id: "no",
        header: "No",
        cell: ({ row }) => row.index + 1,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full h-full"
            >
            Name
            <ArrowUpDown className="text-muted-foreground size-3" />
            </Button>
        )
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full h-full"
            >
            Email
            <ArrowUpDown className="text-muted-foreground size-3" />
            </Button>
        )
        },
    },
    {
        accessorKey: "phone",
        header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full h-full"
            >
            Phone
            <ArrowUpDown className="text-muted-foreground size-3 " />
            </Button>
        )
        },
    },
    {
        accessorKey: "address",
        header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full h-full"
            >
            Address
            <ArrowUpDown className="text-muted-foreground size-3 " />
            </Button>
        )
        },
    },
    {
        accessorKey: "dob",
        header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full h-full"
            >
            Birth Date
            <ArrowUpDown className="text-muted-foreground size-3 " />
            </Button>
        )
        },
    },
    {
        accessorKey: "job",
        header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full h-full"
            >
            Job
            <ArrowUpDown className="text-muted-foreground size-3 " />
            </Button>
        )
        },
    },
    {
        accessorKey: "salary",
        header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full h-full"
            >
            Salary
            <ArrowUpDown className="text-muted-foreground size-3 " />
            </Button>
        )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const employee = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className=" font-[Inter]" align="center" >
                        <DropdownMenuItem>Detail</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                console.log("Edit", employee)
                            }}
                        >
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                console.log("Delete", employee)
                            }}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]
