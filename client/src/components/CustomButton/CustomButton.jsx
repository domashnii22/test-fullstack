import { Button } from '@mui/material';

export default function CustomButton({ name, icon, width, onClick }) {
  return (
    <Button
      onClick={onClick}
      startIcon={icon}
      variant="contained"
      sx={{
        width: width,
        borderRadius: 1,
        bgcolor: 'secondary.main',
        '&:hover': {
          bgcolor: 'secondary.hover',
        },
      }}
    >
      {name}
    </Button>
  );
}
