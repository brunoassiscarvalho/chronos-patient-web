import {
  Box,
  Typography,
  useMediaQuery,
  Theme,
  Breakpoint,
} from '@mui/material';
import { FunctionComponent, memo, ReactNode, SVGProps } from 'react';

interface IIconTextBelow {
  title: string;
  Icon:
    | string
    | FunctionComponent<
        SVGProps<SVGSVGElement> & { title?: string | undefined }
      >;
  color?: string;
  hideText?: Breakpoint;
}

export default memo(function IconTextBelow({
  title,
  Icon,
  color = 'white',
  hideText,
}: IIconTextBelow) {
  const isSmall: boolean = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );
  const hideTextBreakPoint: boolean =
    !!hideText &&
    useMediaQuery((theme: Theme) => theme.breakpoints.down(hideText));

  return (
    <Box display="flex" justifyContent="center" flexWrap="wrap" color={color}>
      <Icon fill={color} width={'100%'} height={isSmall ? 30 : 40} />
      {!hideTextBreakPoint && (
        <Typography sx={{ paddingTop: 2, color: 'secondary.main' }}>
          {title}
        </Typography>
      )}
    </Box>
  );
});
