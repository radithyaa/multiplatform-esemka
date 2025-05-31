import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import { Check, ChevronDown, ChevronLeft, ChevronRight, Plus, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useState } from "react"
import {  Search } from "./ui/input"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
 
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState<string>("")
    const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: 'includesString',
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
  })
 
  return (
    <div >
    <div className="flex justify-between  items-center py-4 ">
        <Search
          placeholder="Search by name, or anything..."
          value={globalFilter}
          onChange={(event) =>
            setGlobalFilter(event.target.value)
          }
          className="max-w-xs  h-full w-full"
        />
        <div className="gap-2 flex">
          {/* Delete Button if Some row selected */}
        {rowSelection &&
            <AlertDialog>
                <AlertDialogTrigger>
                    <Button
                        variant="outline"
                        hidden={table.getFilteredSelectedRowModel().rows.length === 0} 
                        className="ml-2"
                    >
                        <Trash className="size-4"/>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-sm h-3xl text-center justify-center flex flex-col font-[Inter]">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center">Delete This?</AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            This action cannot be undone. This will permanently delete your data
                            and remove it from servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex justify-center">
                        <AlertDialogCancel className="flex-1">Cancel</AlertDialogCancel>
                        <AlertDialogAction className="flex-1">Continue</AlertDialogAction>
                        </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        }
        
        <DropdownMenu>
          <DropdownMenuTrigger >
            <Button variant="outline" className=" text-muted-foreground">
                <span className="hidden sm:flex">Column</span>
                <ChevronDown/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="font-[Inter]" align="center">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"}>
              <Plus/>
              <span className="hidden min-w-10  sm:flex">
                Add Employee
              </span>
            </Button>
            </DialogTrigger>
          <DialogContent className="font-[Inter]">
            <DialogHeader>
              <DialogTitle>
                Add 
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </div>
    </div>
    <div className="rounded-md border">
      <Table>
        <TableHeader className="text-start">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className=" truncate max-w-14 min-w-2">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center gap-2 mr-4">
            <span className="text-sm text-muted-foreground">Rows per page</span>
            <DropdownMenu>
                <DropdownMenuTrigger className=" h-full flex">
                    <Button variant={"outline"}>
                    <span>{table.getState().pagination.pageSize}</span>
                    <ChevronDown/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="font-[Inter]" align="end">
                    {[10, 12, 15, 20, 25].map((pageSize) => (
                        <DropdownMenuItem
                            key={pageSize}
                            onSelect={() => table.setPageSize(pageSize)}
                        >
                            {table.getState().pagination.pageSize === pageSize ? <Check className="size-4 absolute ml-3"/> : ""}
                            <span className="self-center mx-auto">{pageSize}</span>
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem
                      key={"All"}
                      onSelect={() => table.setPageSize(table.getFilteredRowModel().rows.length)}
                    >
                      {table.getState().pagination.pageSize === table.getFilteredRowModel().rows.length ? <Check className="size-4 absolute ml-3"/> : ""}
                      <span className="self-center mx-auto">All</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div className="flex gap-1.5 text-muted-foreground items-center">
        {/* <Button
          variant="outline"
          size="sm"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowLeft  className="size-3"/>
        </Button> */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="size-3"/>
        </Button>
        <span className="text-sm px-1 text-muted-foreground">
            {`page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight  className="size-3"/>
        </Button>
        {/* <Button
          variant="outline"
          size="sm"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          <ArrowRight  className="size-3"/>
        </Button> */}
        </div>
      </div>
    </div>
  )
}