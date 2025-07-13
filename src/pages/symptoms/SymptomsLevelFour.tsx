import Content from '../../components/organisms/Content';

interface SymptomsLevelFour {
  service?: any;
}

export default function SymptomsLevelFour({ service }: SymptomsLevelFour) {
  return (
    <Content title="Sintôma Grave" withoutGoBack>
      <>Sintoma Grave! Procure ajuda médica!</>
    </Content>
  );
}
