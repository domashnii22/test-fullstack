import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from '../../utils/MainApi';

export default function Dashboards() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const { data: dataOfProducts, isLoading: productsIsLoading } =
    useGetProductsQuery({
      page: 1,
      limit: 100,
    });

  const { data: dataOfCategories, isLoading: categoriesIsLoading } =
    useGetCategoriesQuery({
      page: 1,
      limit: 100,
    });

  const isLoading = productsIsLoading || categoriesIsLoading;

  useEffect(() => {
    if (dataOfProducts && dataOfCategories) {
      setProducts(dataOfProducts['products'][0]);
      setCategories(dataOfCategories['categories'][0]);
    }
  }, []);

  const prices = products.map(item => item['product_price']);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return isLoading ? (
    <CircularProgress size="3rem" />
  ) : (
    <Stack gap="40px">
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Number of products
          </Typography>
          <Typography variant="h7" sx={{ color: 'text.secondary' }}>
            {products.length}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Number of сategories
          </Typography>
          <Typography variant="h7" sx={{ color: 'text.secondary' }}>
            {categories.length}
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Maximum product price
          </Typography>
          <Typography variant="h7" sx={{ color: 'text.secondary' }}>
            {maxPrice} dollars
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Minimum product price
          </Typography>
          <Typography variant="h7" sx={{ color: 'text.secondary' }}>
            {minPrice} dollars
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
