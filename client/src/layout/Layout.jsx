import { Box, Button, Stack, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableViewIcon from '@mui/icons-material/TableView';

export function Layout() {
  return (
    <Stack direction="row" padding="20px">
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
        <NavLink to="/dashboards">
          <Button
            startIcon={<DashboardIcon />}
            variant="contained"
            sx={{
              width: '100%',
              borderRadius: 1,
              bgcolor: 'secondary.main',
              '&:hover': {
                bgcolor: 'secondary.hover',
              },
            }}
          >
            Dashboards
          </Button>
        </NavLink>
        <NavLink to="/tables">
          <Button
            startIcon={<TableViewIcon />}
            variant="contained"
            sx={{
              width: '100%',
              borderRadius: 1,
              bgcolor: 'secondary.main',
              '&:hover': {
                bgcolor: 'secondary.hover',
              },
            }}
          >
            Tables
          </Button>
        </NavLink>
      </Stack>
      <Box>
        <Outlet></Outlet>
      </Box>
    </Stack>
  );
}
