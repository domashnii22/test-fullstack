import { CircularProgress, Stack } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useEffect, useState } from 'react';
import { useGetProductsQuery } from '../../utils/ProductApi';

export default function Tables() {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { field: 'product_name', headerName: 'Name' },
    {
      field: 'product_price',
      headerName: 'Price',
      valueFormatter: p => '$' + p.value.toLocaleString(),
    },
    { field: 'product_acceptance_date', headerName: 'Acceptance date' },
  ]);
  // const gridRef = useRef(null);

  const { data, isLoading } = useGetProductsQuery();

  useEffect(() => {
    if (!isLoading) {
      setRowData(data['products'][0]);
    }
  }, [isLoading]);

  console.log(rowData);

  // console.log(data['products'][0]);
  // const onGridReady = params => {
  //   gridRef.current = params.api;
  // };

  // const onFirstDataRendered = params => {
  //   params.api.getRowsToLoadParams({ startRow: 0, endRow: 10 });
  // };

  return (
    <Stack direction="column" gap="25px">
      {isLoading ? (
        <CircularProgress size="3rem" />
      ) : (
        <div className="ag-theme-quartz" style={{ height: 500, width: 600 }}>
          <AgGridReact
            // ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            // rowModelType="infinite"
            // cacheBlockSize={50}
            // maxBlocksInCache={2}
            // getRowData={fetchData}
            // onGridReady={onGridReady}
            // onFirstDataRendered={onFirstDataRendered}
          />
        </div>
      )}
    </Stack>
  );
}
