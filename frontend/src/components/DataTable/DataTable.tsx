import * as React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    chakra,
    InputGroup,
    InputLeftElement,
    Input,
    Spinner,
    Center,
    Text,
    Box
} from "@chakra-ui/react";

import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    ColumnDef,
    SortingState,
    getSortedRowModel
} from '@tanstack/react-table';

import './DataTable.css';
import { ReactNode, useState, useMemo } from "react";
// import IconComponent from '../IconComponent/IconComponent';

export type DataTableProps<Data extends object> = {
    data: Data[];
    columns: ColumnDef<Data, any>[];
    extraThead?: ReactNode;
    isLoading: boolean;
    disableFilters?: boolean;
    filterComponent?: ReactNode;
    hideSearch?: boolean;
    customSearchAction?: (value: string) => void;
    striped?: boolean;
    noVerticalLineIndices?: number[];
};


export function DataTable<Data extends object>({
                                                   data,
                                                   columns,
                                                   extraThead,
                                                   isLoading,
                                                   disableFilters,
                                                   filterComponent,
                                                   hideSearch = false,
                                                   customSearchAction,
                                                   striped = true,
                                                   noVerticalLineIndices
                                               }: DataTableProps<Data>) {
    const [searchPhrase, setSearchPhrase] = useState<string>('');
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const filteredData = useMemo(() => {
        if (customSearchAction) {
            return data;
        } else {
            return data.filter((row) =>
                Object.entries(row).some(([key, value]) => {
                    if (key === 'id') return false;
                    if (typeof value === 'object' && value !== null) {
                        return Object.values(value).some((subValue) =>
                            String(subValue).toLowerCase().includes(searchPhrase.toLowerCase())
                        );
                    }
                    return String(value).toLowerCase().includes(searchPhrase.toLowerCase());
                })
            );
        }
    }, [data, searchPhrase]);


    const table = useReactTable({
        columns,
        data: filteredData,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });

    return (
        <Box display="flex" flexDirection="column" height="100%" style={{ backgroundColor: '#fff'}}>
            <Table variant="simple">
                {extraThead && extraThead}
                <Thead
                    className="border border-gray-300"
                    style={{ height: '60px', position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#fff' }}>
                    <Tr>
                        <Th
                            className="border border-gray-300"
                            colSpan={columns.length}
                            style={{ height: '60px', verticalAlign: 'middle' }}>
                            <div className="flex items-center justify-between w-full" style={{ height: "100%" }}>
                                <div style={{ visibility: hideSearch ? "hidden" : "visible" }}>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none">
                                            {/*<IconComponent iconName="search" />*/}
                                        </InputLeftElement>
                                        <Input
                                            value={searchPhrase}
                                            type="text"
                                            placeholder="Szukaj..."
                                            className="font-normal text-base"
                                            onChange={(e) => {
                                                if (customSearchAction) {
                                                    customSearchAction(e.target.value);
                                                }
                                                setSearchPhrase(e.target.value);
                                            }}
                                        />
                                    </InputGroup>
                                </div>

                                {!disableFilters && (<p>Filtruj</p>)}
                                {filterComponent}
                            </div>
                        </Th>
                    </Tr>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr
                            className="bg-grayLight-25 border border-gray-300"
                            key={`DataTableHeader-${headerGroup.id}`}
                        >
                            {headerGroup.headers.map((header) => {
                                const meta = header.column.columnDef.meta as { isNumeric?: boolean } | undefined;
                                return (
                                    <Th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        isNumeric={meta?.isNumeric}
                                        style={{
                                            height: "60px",
                                            padding: '5px 5px 5px 12px',
                                            verticalAlign: "middle",
                                            position: "relative",
                                            textTransform: "none"
                                        }}
                                        className="bg-grayLight-25 border border-gray-300"
                                    >
                                        <div className="flex items-center" style={{ height: "100%", textTransform: "none" }}>
                      <span className='text-xs font-medium text-gray-800'>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </span>
                                            <chakra.span pl="4">
                                                {header.column.getIsSorted() ? (
                                                    header.column.getIsSorted() === "desc" ? (
                                                        // <IconComponent iconName="arrow" />
                                                        <p>1</p>
                                                    ) : (
                                                        <p>2</p>
                                                        // <IconComponent iconName="arrow" className="rotate-180" />
                                                    )
                                                ) : null}
                                            </chakra.span>
                                        </div>
                                    </Th>
                                );
                            })}
                        </Tr>
                    ))}
                </Thead>
                <Tbody style={{ overflowY: 'auto', maxHeight: '400px' }}>
                    {isLoading ? (
                        <Tr>
                            <Td colSpan={columns.length}>
                                <Center>
                                    <Spinner size="xl" />
                                </Center>
                            </Td>
                        </Tr>
                    ) : filteredData.length === 0 ? (
                        <Tr>
                            <Td colSpan={columns.length}>
                                <Center>
                                    <Text>Brak danych</Text>
                                </Center>
                            </Td>
                        </Tr>
                    ) : (
                        table.getRowModel().rows.map((row) => {
                            // @ts-ignore
                            const rowBackgroundColor = row.original?.rowBackgroundColor;

                            return (
                                <Tr
                                    key={`TableSingleRow--${row.id + row.original}`}
                                    className={
                                        striped
                                            ? row.index % 2 === 0
                                                ? 'even-row row'
                                                : 'odd-row row'
                                            : ''
                                    }
                                    style={{ backgroundColor: rowBackgroundColor }}
                                >
                                    {row.getVisibleCells().map((cell, cellIndex) => {

                                        const noLine = noVerticalLineIndices?.includes(cellIndex);

                                        const meta = cell.column.columnDef.meta as { isNumeric?: boolean } | undefined;
                                        return (
                                            <Td
                                                key={`Cell-${cell.id + cell.column.id}`}
                                                isNumeric={meta?.isNumeric}
                                                style={{
                                                    padding: '5px 5px 5px 12px',
                                                    minHeight: '50px',
                                                    borderRight: noLine ? 'none' : '1px solid #EAECF0'
                                                }}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </Td>
                                        );
                                    })}
                                </Tr>
                            );
                        })
                    )}
                </Tbody>


            </Table>
        </Box>
    );
}