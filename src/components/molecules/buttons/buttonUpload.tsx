import { Button, Box } from '@mui/material';
import { ChangeEvent } from 'react';
import { IFormItem } from '../../organisms/form/FormItem';

interface IButtonUpload extends IFormItem {
  label: string;
  id?: string;
  onChange?: (file: any) => void;
  fullWidth?: boolean;
  startIcon?: any;
  accept?: React.InputHTMLAttributes<HTMLInputElement>['accept'];
}

export default function ButtonUpload({
  label,
  onChange,
  id,
  name,
  fullWidth = true,
  startIcon,
  accept,
}: IButtonUpload) {
  const readFile = (file: Blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files && e.target.files.length > 0) {
      const file: File = e.target.files[0];
      if (onChange) {
        onChange(file);
      }

      console.log({ file });
      const imageDataUrl = await readFile(file);
      if (onChange)
        onChange({
          name: file.name,
          type: file.type,
          size: file.size,
          base64: imageDataUrl,
        });
    }
  };

  return (
    <Box>
      <input
        type="file"
        onChange={onFileChange}
        accept={accept}
        id={id || name}
        style={{ display: 'none' }}
        name={name}
      />
      <label htmlFor={id || name}>
        <Button fullWidth={fullWidth} component="span" startIcon={startIcon}>
          {label}
        </Button>
      </label>
    </Box>
  );
}
