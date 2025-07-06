import { ArrowUpward, ArrowDownward, Delete,  } from '@mui/icons-material';
import { Grid, ButtonGroup, IconButton, Divider, Button } from '@mui/material';
import { useFieldArray } from 'react-hook-form';
import { GroupFormItems } from './GroupFormItems';

export default function FormArrayField({
  children,
  butonAddLabel = 'Adicionar',
  fieldArrayName,
  baseFormParams,
  formGroup,
  isMove = true,
  canEmpty = false,
}: any) {
  const baseArrayFormParams = useFieldArray<any>({
    control: baseFormParams.control,
    name: fieldArrayName,
  });

  const { fields, append, move, remove } = baseArrayFormParams;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={() => {
            append({});
          }}
        >
          {butonAddLabel}
        </Button>
      </Grid>

      {fields &&
        fields.map((field: Record<'id', string>, index: number) => (
          <Grid key={field.id} item xs={12} md={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={10}>
                <Grid container spacing={3}>
                  {formGroup ? (
                    formGroup({
                      field,
                      index,
                      children,
                      butonAddLabel,
                      baseFormParams,
                      baseArrayFormParams,
                      isMove,
                    })
                  ) : (
                    <GroupFormItems
                      butonAddLabel={butonAddLabel}
                      baseFormParams={baseFormParams}
                      baseArrayFormParams={baseArrayFormParams}
                    >
                      {children}
                    </GroupFormItems>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={2} style={{ paddingTop: 25 }}>
                <ButtonGroup
                  fullWidth
                  orientation="vertical"
                  aria-label="vertical contained primary button group"
                >
                  {!!isMove && index > 0 && (
                    <IconButton
                      aria-label="move"
                      type="button"
                      onClick={() => move(index, index - 1)}
                    >
                      <ArrowUpward />
                    </IconButton>
                  )}

                  {!!isMove && index < fields.length - 1 && (
                    <IconButton
                      aria-label="move"
                      type="button"
                      onClick={() => move(index, index + 1)}
                    >
                      <ArrowDownward />
                    </IconButton>
                  )}

                  {(canEmpty || fields.length > 1) && (
                    <Button
                      color="secondary"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <Delete /> Excluir
                    </Button>
                  )}
                </ButtonGroup>
              </Grid>
              <Grid item xs={12}>
                <Divider style={{ marginTop: 25, marginBottom: 25 }} />
              </Grid>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
}
