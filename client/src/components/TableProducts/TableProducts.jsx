import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useCallback, useState } from 'react';

export default function TableProducts() {
  const [columnDefs, setColumnDefs] = useState([
    { field: 'product_id', headerName: 'Id' },
    { field: 'product_name', headerName: 'Product' },
    {
      field: 'product_price',
      headerName: 'Price',
    },
    { field: 'product_acceptance_date', headerName: 'Acceptance date' },
  ]);

  const limit = 5;

  const onGridReady = useCallback(async params => {
    let data = await fetch(
      `http://localhost:3000/api/product?page=1&limit=${limit}`,
    );

    data = await data.json();

    const dataSource = {
      rowCount: undefined,
      getRows: async params => {
        const currentPageNumber = Math.floor(params.endRow / limit);
        let lastRow = -1;
        let list = data['products'][0] || [];

        if (currentPageNumber !== -1) {
          let nextPageData = await fetch(
            `http://localhost:3000/api/product?page=${currentPageNumber}&limit=${limit}`,
          );
          nextPageData = await nextPageData.json();

          list = nextPageData['products'][0] || [];
        }

        if (list?.length < limit) {
          lastRow = params?.startRow + list?.length;
        }

        list?.length
          ? params.successCallback(list, lastRow)
          : params.failCallback();
      },
    };
    params.api.setGridOption('datasource', dataSource);
  }, []);

  return (
    <div
      className="ag-theme-quartz"
      style={{ height: 300, width: 800, marginTop: 58 }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        rowModelType="infinite"
        onGridReady={onGridReady}
        cacheBlockSize={limit}
      />
    </div>
  );
}
