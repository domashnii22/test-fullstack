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
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CustomButton from '../CustomButton/CustomButton';
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
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

  const gridRef = useRef(null);

  const [remove, { error: removeError }] = useDeleteCategoryMutation();
  const [add, { error: addError }] = useAddCategoryMutation();
  const [edit, { error: editError }] = useEditCategoryMutation();

  const onSelectionChanged = event => {
    setSelectedRows(event.api.getSelectedRows());
  };

  const handleClickOpen = mode => {
    setOpen(true);
    setAction(mode);
  };

  const handleClose = () => {
    setOpen(false);
    setAction('');
    setValue('');
  };

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleDelete = async () => {
    try {
      if (selectedRows.length !== 0) {
        await remove({ id: selectedRows[0]['category_id'] });
      }
    } catch {
      console.log(removeError);
    } finally {
      setOpen(false);
      setAction('');
      setValue('');
    }
  };

  const handleAdd = async () => {
    try {
      if (value) {
        await add({ category_name: value });
      }
    } catch {
      console.log(addError);
    } finally {
      setOpen(false);
      setAction('');
      setValue('');
    }
  };

  const handleEdit = async () => {
    try {
      if (value) {
        await edit({
          id: selectedRows[0]['category_id'],
          category_name: value,
        });
      }
    } catch {
      console.log(editError);
    } finally {
      setOpen(false);
      setAction('');
      setValue('');
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
        <Typography variant="subtitle2">
          First select a category in the table for delete and edit
        </Typography>
        <div className="ag-theme-quartz" style={{ height: '60vh', width: 400 }}>
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
        {(action === 'Add' || action === 'Edit') && (
          <>
            <DialogTitle id="alert-dialog-title">
              {action === 'Add' ? 'Add a new category' : 'Edit category'}
            </DialogTitle>
            <TextField
              sx={{
                padding: '15px',
              }}
              variant="standard"
              size="medium"
              onChange={handleChange}
              defaultValue={
                action === 'Edit' && selectedRows.length !== 0
                  ? selectedRows[0]['category_name']
                  : value
              }
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
          {action === 'Edit' && (
            <Button onClick={handleEdit} autoFocus>
              Yes
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
