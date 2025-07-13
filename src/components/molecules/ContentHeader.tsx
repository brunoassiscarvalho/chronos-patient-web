import { ArrowBack } from '@mui/icons-material';
import {
  Grid,
  Typography,
  Link as MUILink,
  Divider,
  Box,
  IconButton,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

interface IContentHeader {
  title: string;
  previous?: () => void;
  withoutGoBack?: boolean;
}

export default function ContentHeader({
  previous,
  title,
  withoutGoBack = false,
}: IContentHeader): JSX.Element {
  const navigate = useNavigate();
  if (!previous) previous = () => navigate(-1);

  return (
    <Grid container spacing={6}>
      <Grid item xs={2} md={2} sm={2}>
        {!withoutGoBack && (
          <IconButton onClick={previous} color="secondary">
            <ArrowBack />
          </IconButton>
        )}
      </Grid>
      <Grid item xs={8} md={8} sm={8}>
        <Typography
          variant="h5"
          textAlign="center"
          color="secondary.main"
          gutterBottom
        >
          {title}
        </Typography>
      </Grid>
      <Grid item xs={2} md={2} sm={2}></Grid>
    </Grid>
  );
}
