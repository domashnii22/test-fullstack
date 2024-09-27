import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CustomButton from '../CustomButton/CustomButton';
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} from '../../utils/MainApi';

export default function TableCategories({ categories }) {
  const [value, setValue] = useState('');
  const [action, setAction] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { field: 'category_id', headerName: 'Id' },
    { field: 'category_name', headerName: 'Category' },
  ]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = mode => {
    setOpen(true);
    setAction(mode);
  };

  const handleClose = () => {
    setOpen(false);
    setAction('');
    setValue('');
  };

  const gridRef = useRef(null);

  const [remove, { error: removeError }] = useDeleteCategoryMutation();
  const [add, { error: addError }] = useAddCategoryMutation();

  const onSelectionChanged = event => {
    setSelectedRows(event.api.getSelectedRows());
  };

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleDelete = async () => {
    try {
      if (selectedRows.length !== 0) {
        await remove({ id: selectedRows[0]['category_id'] });
        setOpen(false);
      }
    } catch {
      console.log(removeError);
    }
  };

  const handleAdd = async () => {
    try {
      if (value) {
        await add({ category_name: value });
        setOpen(false);
      }
    } catch {
      console.log(addError);
    }
  };

  return (
    <>
      <Stack direction="column" gap="20px">
        <Stack direction="row" justifyContent="space-between">
          <CustomButton
            name={'Delete'}
            icon={<DeleteIcon />}
            width={'30%'}
            onClick={() => handleClickOpen('Delete')}
          ></CustomButton>
          <CustomButton
            name={'Add'}
            icon={<AddIcon />}
            width={'30%'}
            onClick={() => handleClickOpen('Add')}
          ></CustomButton>
          <CustomButton
            name={'Edit'}
            icon={<EditIcon />}
            width={'30%'}
            onClick={() => handleClickOpen('Edit')}
          ></CustomButton>
        </Stack>
        <div className="ag-theme-quartz" style={{ height: '65vh', width: 400 }}>
          <AgGridReact
            ref={gridRef}
            rowData={categories}
            columnDefs={columnDefs}
            rowSelection={'single'}
            onSelectionChanged={onSelectionChanged}
          />
        </div>
      </Stack>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {action === 'Delete' && (
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete the selected category?
          </DialogTitle>
        )}
        {action === 'Add' && (
          <>
            <DialogTitle id="alert-dialog-title">
              Add a new category
            </DialogTitle>
            <TextField
              sx={{
                padding: '15px',
              }}
              id="standard-basic"
              variant="standard"
              size="medium"
              onChange={handleChange}
              value={value}
            />
          </>
        )}
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          {action === 'Delete' && (
            <Button onClick={handleDelete} autoFocus>
              Yes
            </Button>
          )}
          {action === 'Add' && (
            <Button onClick={handleAdd} autoFocus>
              Yes
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
