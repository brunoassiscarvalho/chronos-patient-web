import Content from '../../components/organisms/Content';

interface SymptomsLevelTwo {
  service?: any;
}

export default function SymptomsLevelTwo({ service }: SymptomsLevelTwo) {
  return (
    <Content title="Sintôma Leve" withoutGoBack>
      <>Sintoma leve! Não se preocupe, faça isso e isso que vai melhorar</>
    </Content>
  );
}
