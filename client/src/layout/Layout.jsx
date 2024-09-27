import { Box, Button, Stack, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableViewIcon from '@mui/icons-material/TableView';
import CustomButton from '../components/CustomButton/CustomButton';

export default function Layout() {
  return (
    <Stack direction="row" padding="40px" gap="50px">
      <Stack
        height="75vh"
        padding="20px"
        gap="15px"
        direction="column"
        sx={{
          borderRadius: 2,
          bgcolor: 'primary.main',
        }}
      >
        <Typography
          marginBottom="10px"
          alignSelf="center"
          variant="h3"
          sx={{
            color: 'text.main',
          }}
        >
          Menu
        </Typography>
        <NavLink to="/tables">
          <CustomButton
            icon={<TableViewIcon />}
            name={'Tables'}
            width={'100%'}
          ></CustomButton>
        </NavLink>
        <NavLink to="/dashboards">
          <CustomButton
            icon={<DashboardIcon />}
            name={'Dashboards'}
            width={'100%'}
          ></CustomButton>
        </NavLink>
      </Stack>
      <Box>
        <Outlet></Outlet>
      </Box>
    </Stack>
  );
}
