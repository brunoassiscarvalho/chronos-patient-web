import Content from '../../components/organisms/Content';

interface SymptomsLevelThree {
  service?: any;
}

export default function SymptomsLevelThree({ service }: SymptomsLevelThree) {
  return (
    <Content title="Sintôma Moderado" withoutGoBack>
      <>Sintoma Moderado! Faça isso e isso, caso não melhore procure ajuda</>
    </Content>
  );
}
