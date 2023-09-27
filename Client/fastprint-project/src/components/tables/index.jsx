import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,        
  flexRender,
  getFilteredRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  getFacetedRowModel,
} from '@tanstack/react-table';
import { Filter } from './utils';
import {
  HiOutlineChevronUpDown,
  HiChevronDown,
  HiChevronUp,
} from 'react-icons/hi2';
import { formatDate, formatNumber } from '../../helpers/useFormat';
import Pagination from './pagination';

const theadClass =
  'py-4 px-3 bg-primary-500 border-2 border-table-color text-white font-normal ';
    
export const CustomTable = ({
  data,
  pagination = true,
  tableHeaders,
  tableMeta,
  filterView,
  setValue,
}) => {
  const [columnFilters, setColumnFilters] = React.useState(
    []
  );
  const [checked, setChecked] = useState(null);
  const handleChange = (id, data) => {
    if (id === checked) {
      setChecked(null);
      setValue(null);
    } else {
      setChecked(id);
      setValue(data);
    }
  };

  // handle show data table
  const handleFilter = (header, getValue) => {
    if (header.filter_type === 'INT' || header.filter_type === 'decimal') {
      return (
        <p className="text-center w-full text-orange-400 font-bold text-base">
          {formatNumber(parseFloat(getValue()))}
        </p>
      );
    } else if (
      header.filter_type === 'date' ||
      header.filter_type === 'year' ||
      header.filter_type === 'time'
    ) {
      return (
        <p className="text-center w-full">
          {formatDate(getValue(), header.filter_type)}
        </p>
      );
    } else if (header.filter_type === 'select') {
      return (
        <p className="text-center w-full">
          <input type="checkbox" checked={getValue() == 'Y'} />
        </p>
      );
    } else if (header.filter_type === 'radio') {
      return <p className="text-center w-full">{getValue()}</p>;
    } else {
      return <p className="w-full">{getValue()}</p>;
    }
  };

  const [sorting, setSorting] = React.useState([]);
  const columns = [
    {
      id: 'no',
      size: 40,
      minSize: 50,
      enableHiding: false,
      enablePinning: false,
      enableSorting: false,
      enableResizing: false,
      maxSize: 80,
      header: ({ table, column, header }) => (
        <div className="flex justify-center w-full font-semibold">No</div>
      ),
      cell: ({ row, cell, table, ...rest }) => {
        return (
          <div className="flex justify-center items-center">
            {row.index + 1}
          </div>
        );
      },
    },
    {
      id: 'action',
      size: 40,
      minSize: 50,
      enableHiding: false,
      enablePinning: false,
      enableSorting: false,
      enableResizing: false,
      maxSize: 80,
      header: ({ table, column, header }) => (
        <div className="flex justify-center w-full font-semibold">Action</div>
      ),
      cell: ({ row, cell, table, ...rest }) => {
        if (row.getIsGrouped()) {
          return null;
        } else {
          return (
            <div className="flex justify-center items-center">
              <input
                type="checkbox"
                value={row}
                checked={row.id === checked}
                onChange={() => handleChange(row.id, row.original)}
              />
            </div>
          );
        }
      },
    },
    ...tableHeaders?.map((header) => {
      return {
        id: header.id,
        accessorKey: header.id,
        filterFn: 'arrIncludesSome',
        type: header.filter_type,
        size: 40,
        minSize: 50,
        maxSize: 80,
        header: (info) => (
          <div
            {...{
              className: info.column.getCanSort() ? 'select-none relative' : '',
            }}
            key={info.id}
          >
            <div className="flex justify-between px-2 w-full">
              <div className="flex flex-col justify-center font-semibold">
                {header.title}
              </div>
              {info.column.id === 'no' || info.column.id === 'action' ? (
                <></>
              ) : (
                <div className="flex justify-end">
                  <div className="flex flex-col justify-center">
                    <button
                      className="h-fit w-fit hover:bg-primary-400 p-1 rounded transition"
                      onClick={() => info.column.toggleSorting(false, false)}
                    >
                      <HiChevronUp className="text-[12px]" />
                    </button>
                    <button
                      className="h-fit w-fit hover:bg-primary-400 p-1 rounded transition"
                      onClick={() => info.column.toggleSorting(true, false)}
                    >
                      <HiChevronDown className="text-[12px]" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ),
        cell: ({ getValue }) => {
          return (
            <div className="flex items-center">
              {handleFilter(header, getValue)}
            </div>
          );
        },
      };
    }),
  ];

  const table = useReactTable({
    data: data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedRowModel: getFacetedRowModel(),
    debugTable: true,
  });
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full overflow-x-auto small-scroll-bar primary-bar">
          <table className="w-full font-semibold text-black">
            <thead>
              {table.getHeaderGroups().map((headerGroup, idx) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={theadClass}
                      {...{
                        style: {
                          width: header?.getSize(),
                        },
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
              {filterView ? (
                table.getHeaderGroups().map((headerGroup, index) => (
                  <tr className="border" key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className={theadClass}>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </th>
                    ))}
                  </tr>
                ))
              ) : (
                <></>
              )}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className=" px-2 py-2 h-16 border-2 border-primary-400"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {pagination ? (
          <div className="px-2 py-4 flex justify-between w-full">
            <div className="flex gap-2 items-center">
              <span className="text-gray-400">Row per page</span>
              <button className="flex items-center">
                <span className="font-bold">30</span>
                <HiOutlineChevronUpDown />
              </button>
            </div>
            <Pagination
              currentPage={tableMeta?.currentPage}
              pageSize={tableMeta?.totalPage}
              totalCount={tableMeta?.totalRecords}
              onPageChange={() => {}}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};