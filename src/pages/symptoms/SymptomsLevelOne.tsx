import Content from '../../components/organisms/Content';

interface SymptomsLevelOne {
  service?: any;
}

export default function SymptomsLevelOne({ service }: SymptomsLevelOne) {
  return (
    <Content title="Sintôma Leve" withoutGoBack>
      <>Sintoma leve! Não se preocupe, faça isso e isso que vai melhorar</>
    </Content>
  );
}
