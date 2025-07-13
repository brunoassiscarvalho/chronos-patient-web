import { useCallback, useState } from 'react';
import { Box, Button, Grid, Slider } from '@mui/material';
import { Stack } from '@mui/system';
import Cropper, { Area } from 'react-easy-crop';
import ButtonUpload from '../../molecules/buttons/buttonUpload';
import getCroppedImg from './CropImage';

interface IPhotoEditor {
  defaultImage?: any;
  onSaveImage?: (cropedImage: File) => void;
}

export default function PhotoEditor({
  defaultImage,
  onSaveImage,
}: IPhotoEditor) {
  const [imageSrc, setImageSrc] = useState<any>(defaultImage);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<any>(1);
  const [rotation, setRotation] = useState<any>(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onFileChange = async (imageDataUrl: any) => {
    setImageSrc(imageDataUrl.base64);
  };

  const saveCroppedImage = useCallback(async () => {
    return getCroppedImg(imageSrc, croppedAreaPixels, rotation);
  }, [croppedAreaPixels, rotation]);

  const onSaveAndReturn = useCallback(async () => {
    const croppedImage = await saveCroppedImage();
    if (onSaveImage) onSaveImage(croppedImage);
  }, [croppedAreaPixels, rotation]);

  return (
    <Grid container spacing={3}>
      {imageSrc && (
        <Grid item xs={6}>
          <Box sx={{ height: 500, position: 'relative' }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={1 / 1}
              onRotationChange={setRotation}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </Box>
        </Grid>
      )}

      <Grid item xs={6}>
        <Stack spacing={3}>
          {imageSrc && (
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e, value: any) => setZoom(value)}
            />
          )}
          <ButtonUpload
            accept=".jpg,.png,.jpeg"
            label="Editar Foto"
            name="phto-button"
            onChange={onFileChange}
          />

          {imageSrc && (
            <Button fullWidth onClick={() => onSaveAndReturn()}>
              Salvar
            </Button>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
