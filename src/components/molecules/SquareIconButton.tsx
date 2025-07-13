import { ButtonBase, Paper, Alert, Theme, useMediaQuery } from '@mui/material';
import { FunctionComponent, ReactNode, SVGProps } from 'react';

interface ISquareIconButton {
  icon?:
    | string
    | FunctionComponent<
        SVGProps<SVGSVGElement> & { title?: string | undefined }
      >;
  children: ReactNode;
  onClick?: () => void;
}

export default function SquareIconButton(props: ISquareIconButton) {
  const isVerySmall: boolean = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  return (
    <ButtonBase onClick={props.onClick}>
      <Paper
        sx={{
          width: isVerySmall ? 30 : 35,
          height: isVerySmall ? 30 : 35,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {props.icon ? (
          <props.icon height={isVerySmall ? 20 : 30} color="red" />
        ) : (
          props.children
        )}
      </Paper>
    </ButtonBase>
  );
}
