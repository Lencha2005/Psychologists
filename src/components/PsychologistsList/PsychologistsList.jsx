import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectorPsychologists } from '../../redux/psychologists/selectors'
import { fetchPsychologists } from '../../redux/psychologists/operations'

const PsychologistsList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPsychologists())
  }, [dispatch])

  const psychologists = useSelector(selectorPsychologists);
  console.log('psychologists: ', psychologists);
  return (
    <div>PsychologistsList</div>
  )
}

export default PsychologistsList