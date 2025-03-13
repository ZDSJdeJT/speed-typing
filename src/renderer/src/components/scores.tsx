import { useEffect, useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { TableProperties } from 'lucide-react';
import { toast } from 'sonner';

import { type ScoreAttributes } from '~/src/main/models/score';
import { Button } from '@renderer/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@renderer/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@renderer/components/ui/table';
import { COUNTDOWN_SECONDS } from '@renderer/constants';
import {
  calculateAccuracyPercentage,
  calculateSpeed,
  formatPercentage,
  formatSpeed,
} from '@renderer/helpers/results';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({
  columns,
  data,
  page,
  totalPages,
  onPageChange,
}: DataTableProps<TData, TValue> & {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            onPageChange(page - 1);
          }}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            onPageChange(page + 1);
          }}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </>
  );
}

type Column = ScoreAttributes & {
  time: string;
  accuracyPercentage: string;
  speed: string;
};

const columns: ColumnDef<Column>[] = [
  {
    accessorKey: 'errors',
    header: 'Errors',
  },
  {
    accessorKey: 'typed',
    header: 'Typed',
  },
  {
    accessorKey: 'accuracyPercentage',
    header: 'AccuracyPercentage',
  },
  {
    accessorKey: 'speed',
    header: 'Speed',
  },
  {
    accessorKey: 'time',
    header: 'Time',
  },
];

function Scores() {
  const [open, setOpen] = useState(false);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: 5,
  });
  const [scores, setScores] = useState<Column[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (pagination?: Pagination) => {
    try {
      const data = await window.api.findScores(pagination);
      setScores(
        data.rows.map((row) => ({
          ...row.dataValues,
          time: row.dataValues.createdAt!.toLocaleString('en-US'),
          accuracyPercentage: formatPercentage(
            calculateAccuracyPercentage(
              row.dataValues.errors,
              row.dataValues.typed,
            ),
          ),
          speed: formatSpeed(
            calculateSpeed(row.dataValues.typed, COUNTDOWN_SECONDS),
          ),
        })),
      );
      setTotalPages(data.totalPages);
    } catch {
      toast.error('Scores retrieval failed.');
    }
  };

  useEffect(() => {
    if (open) {
      fetchData(pagination);
    }
  }, [open, pagination]);

  const onPageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      page,
    }));
    fetchData(pagination);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <TableProperties />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scores</DialogTitle>
          <DialogDescription>This is your history scores.</DialogDescription>
        </DialogHeader>
        <DataTable
          columns={columns}
          data={scores}
          page={pagination.page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              setOpen(false);
            }}
          >
            close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { Scores };
