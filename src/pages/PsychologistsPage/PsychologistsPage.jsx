import PsychologistsList from '../../components/PsychologistsList/PsychologistsList'
import css from './PsychologistsPage.module.css'

const PsychologistsPage = () => {
  return (
    <div className={css.page}>
      <PsychologistsList/>
    </div>
  )
}

export default PsychologistsPage