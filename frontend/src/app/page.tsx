"use client"

import {LogbookTableInterface} from "@/type/logbook.interface";
import {createColumnHelper} from "@tanstack/table-core";
import {useState} from "react";
import {DataTable} from "@/components/DataTable/DataTable";

export default function Home() {
  const columnHelper = createColumnHelper<LogbookTableInterface>();
  const [data, setData] = useState<LogbookTableInterface[]>([
    {
      id: 0,
      plane: 'PA28',
      start: {
        date: '12-03-2024',
        place: "XXX"
      },
      end: {
        date: '12-03-2024',
        place: "XXX"
      }
    },
    {
      id: 1,
      plane: 'PA28',
      start: {
        date: '12-03-2024',
        place: "XXX"
      },
      end: {
        date: '123',
        place: "XXX"
      }
    }
  ]);

  const columns = [
    columnHelper.display({
      id: 'id',
      header: "Id",
      cell: (info) => {
        const { id } = info.row.original;

        return(
            <p className='text-black'>{id}</p>
        )
      }
    }),
    columnHelper.display({
      id: 'plane',
      header: "Samolot",
      cell: (info) => {
        const { plane } = info.row.original;

        return(
            <p className='text-black'>{plane}</p>
        )
      }
    }),
    columnHelper.display({
      id: 'start',
      header: "Start",
      cell: (info) => {
        const { start } = info.row.original;

        return(
            <div className='flex flex-col gap-3'>
              <p className='text-black'>{start.date}</p>
              <p className='text-black'>{start.place}</p>
            </div>
        )
      }
    }),
    columnHelper.display({
      id: 'start',
      header: "Start",
      cell: (info) => {
        const { end } = info.row.original;

        return(
            <div className='flex flex-col gap-3'>
              <p className='text-black'>{end.date}</p>
              <p className='text-black'>{end.place}</p>
            </div>
        )
      }
    }),
  ];

  return (
    <div className="bg-white">
        <DataTable
            isLoading={false}
            data={data}
            columns={columns}
        />
    </div>
  );
}
