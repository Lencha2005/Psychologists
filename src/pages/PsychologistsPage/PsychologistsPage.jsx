import css from './PsychologistsPage.module.css'
import PsychologistsList from '../../components/PsychologistsList/PsychologistsList'

const PsychologistsPage = () => {
  return (
    <div className={css.page}>
      <PsychologistsList/>
    </div>
  )
}

export default PsychologistsPage