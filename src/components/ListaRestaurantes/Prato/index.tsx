import IDish from 'interfaces/IDish';
import estilos from './Prato.module.scss';

interface PratoProps {
  prato: IDish
}

const Prato = ({ prato }: PratoProps) => {
  return (<div className={estilos.Prato}>
    <div className={estilos.Container}>
      <div>
        <div className={estilos.EfeitoTorcao}>
          <img src={prato.image} alt={prato.description}/>
        </div>
      </div>
    </div>
    <div className={estilos.Conteudo}>
      <h3>{prato.name}</h3>
      <div className={estilos.Tag}>
        {prato.tag}
      </div>
      <div>
        {prato.description}
      </div>
    </div>
  </div>)
}

export default Prato