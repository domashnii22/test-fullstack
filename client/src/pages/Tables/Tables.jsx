import { CircularProgress, Stack } from '@mui/material';
import TableProducts from '../../components/TableProducts/TableProducts';
import TableCategories from '../../components/TableCategories/TableCategories';
import { useGetCategoriesQuery } from '../../utils/MainApi';

export default function Tables() {
  const { data, isLoading } = useGetCategoriesQuery({
    page: 1,
    limit: 100,
  });

  return isLoading ? (
    <CircularProgress size="3rem" />
  ) : (
    <Stack direction="row" gap="40px">
      <TableProducts></TableProducts>
      <TableCategories
        categories={data['categories'][0] || []}
      ></TableCategories>
    </Stack>
  );
}
