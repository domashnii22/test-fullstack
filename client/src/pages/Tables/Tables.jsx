import { CircularProgress, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import TableProducts from '../../components/TableProducts/TableProducts';
import TableCategories from '../../components/TableCategories/TableCategories';
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from '../../utils/MainApi';

export default function Tables() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const { data: dataOfProducts, isLoading: productsIsLoading } =
    useGetProductsQuery({
      page: currentPage,
      limit: currentLimit,
    });

  const { data: dataOfCategories, isLoading: categoriesIsLoading } =
    useGetCategoriesQuery({
      page: currentPage,
      limit: 100,
    });

  const isLoading = productsIsLoading || categoriesIsLoading;

  useEffect(() => {
    if (!isLoading) {
      setProducts(dataOfProducts['products'][0]);
      setCategories(dataOfCategories['categories'][0]);
    }
  }, [isLoading, dataOfProducts, dataOfCategories]);

  return isLoading ? (
    <CircularProgress size="3rem" />
  ) : (
    <Stack direction="row" gap="40px">
      <TableProducts products={products}></TableProducts>
      <TableCategories categories={categories}></TableCategories>
    </Stack>
  );
}
