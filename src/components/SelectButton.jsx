/* eslint-disable react/prop-types */
import { CheckCircleIcon, XCircleIcon } from './Icons'

export function SelectButton ({ option, answer, userAnswer, inciso }) {
  const defaultStyles = ' hover:bg-yellow-1 hover:border-yellow-1'
  const incorrectStyles = 'border-red-1 bg-red-1'
  const correctStyles = 'border-green-1 bg-green-1'

  const isAnswer = userAnswer?.answer === option
  const isSelected = userAnswer?.selected === option
  const isAnswered = userAnswer?.answered

  const handleClick = () => {
    answer(option)  
  }

  const buttonStyles = `
    flex flex-row items-center text-left gap-6 md:gap-12 rounded-xl px-5 py-3 mb-7 border-2 w-full group border-blue-70 
    ${isAnswer && correctStyles}
    ${!isAnswer && isSelected && incorrectStyles}
    ${!isAnswered && defaultStyles}
  `
  const textStyles = `
    ${isAnswer || isSelected ? 'text-white' : isAnswered ? 'text-blue-80' : 'text-blue-80 group-hover:text-white '}
  `

  const Icon = isAnswer ? <CheckCircleIcon /> : isSelected && <XCircleIcon />

  return (
    <button
      type='button'
      className={buttonStyles}
      onClick={handleClick}
    >
      <label className={`${textStyles} text-2xl uppercase font-medium`}>{inciso}</label>
      <p className={`${textStyles} text-lg font-medium`}>{option}</p>
      <span className={`${textStyles} ml-auto`}>{Icon}</span>
    </button>
  )
}
