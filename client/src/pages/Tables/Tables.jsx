import { CircularProgress, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import TableProducts from '../../components/TableProducts/TableProducts';
import TableCategories from '../../components/TableCategories/TableCategories';
import { useGetCategoriesQuery } from '../../utils/MainApi';

export default function Tables() {
  const [categories, setCategories] = useState([]);

  const { data, isLoading } = useGetCategoriesQuery({
    page: 1,
    limit: 100,
  });

  useEffect(() => {
    if (data) {
      setCategories(data['categories'][0]);
    }
  }, []);

  return isLoading ? (
    <CircularProgress size="3rem" />
  ) : (
    <Stack direction="row" gap="40px">
      <TableProducts></TableProducts>
      <TableCategories categories={categories}></TableCategories>
    </Stack>
  );
}
