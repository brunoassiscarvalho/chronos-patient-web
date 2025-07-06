import { Button, Box } from '@mui/material';
import {IFormItem} from '../../organisms/form/FormItem';

interface IButtonUpload extends IFormItem {
  label: string
  id?: string,
  onChange?: (data:any)=>void;
  className?: any,
  fullWidth? : boolean,
  startIcon?: any
}

export default function ButtonUpload({ label, onChange, id, className, name, fullWidth=false, startIcon, inputRef }: IButtonUpload) {

  const readFile = (file: Blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const onFileChange = async (e: any) => {
    if (e?.target?.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      if (onChange) onChange({
        name: file.name,
        type: file.type,
        size: file.size,
        base64: imageDataUrl
      });
    }
  };

  return (
    <Box className={className}>
      <input type="file" onChange={onFileChange} accept="image/*" id={id || name} style={{ display: 'none' }} name={name} ref={inputRef}/>
      <label htmlFor={id || name}>
        <Button fullWidth={fullWidth} variant="contained" component="span" startIcon={startIcon}>          
          {label}
        </Button>
      </label>

    </Box>

  );
}
