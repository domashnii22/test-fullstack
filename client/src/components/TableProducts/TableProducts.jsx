import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useRef, useState } from 'react';

export default function TableProducts({ products }) {
  const gridRef = useRef();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'product_id', headerName: 'Id' },
    { field: 'product_name', headerName: 'Product' },
    {
      field: 'product_price',
      headerName: 'Price',
      valueFormatter: p => '$' + p.value.toLocaleString(),
    },
    { field: 'product_acceptance_date', headerName: 'Acceptance date' },
  ]);

  return (
    <div
      className="ag-theme-quartz"
      style={{ height: '65vh', width: 800, marginTop: 58 }}
    >
      <AgGridReact ref={gridRef} rowData={products} columnDefs={columnDefs} />
    </div>
  );
}
