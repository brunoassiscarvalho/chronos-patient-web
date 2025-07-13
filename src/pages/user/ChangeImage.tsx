import Content from '../../components/organisms/Content';
import PhotoEditor from '../../components/organisms/photo/PhotoEditor';

export default function ChangeImage() {
  const onSaveImage = (image: File) => {
    console.log({ image });
  };

  return (
    <Content title="Foto do Perfil" loadingListSize={9} maxWidth={1000}>
      <PhotoEditor onSaveImage={onSaveImage} />
    </Content>
  );
}
