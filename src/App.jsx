import { useState, useEffect } from 'react'
import { SelectButton } from './components/SelectButton'

function App () {
  const [questions, setQuestions] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [userAnswer, setUserAnswer] = useState(null)
  const [nextQuestion, setNextQuestion] = useState(false)

  const reset = () => {
    setCurrentQuestion(0)
    setScore(0)
    setUserAnswer(null)
    setNextQuestion(false)
  }

  const handleAnswer = (option) => {
    setUserAnswer({
      selected: option,
      answer: questions[currentQuestion].correctAnswer,
      answered: true
    })
    setNextQuestion(true)
  }

  const next = () => {
    if (userAnswer.selected === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1)
    }
    setCurrentQuestion(prev => prev + 1)
    setNextQuestion(false)
    setUserAnswer(null)
  }

  const getNewQuestions = () => {
    return fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags')
      .then(res => res.json())
      .then(data => {
        const limitOfQuestions = 4
        const totalNumberOfCountries = 245 
        const numberOfOptions = 4
        const allQuestions = []
        for (let i = 0; i < limitOfQuestions; i++) {
          const numberOfCountry = Math.floor(Math.random() * totalNumberOfCountries)
          const countries = data.slice(numberOfCountry, numberOfCountry + numberOfOptions)
          // console.log(countries);
          const random = Math.floor(Math.random() * numberOfOptions)
          if (numberOfCountry % 2 === 0) {
            const oneQuestions = {
              flag: { img: countries[random].flags.svg, alt: countries[random].flags.alt },
              question: 'Which country does this flag belong to?  ',
              options: countries.map(country => country.name.official),
              correctAnswer: countries[random].name.official
            }
            allQuestions.push(oneQuestions)
          } else {
            const oneQuestions = {
              flag: {},
              question: `${countries[random].capital} is the capital of`,
              options: countries.map(country => country.name.official),
              correctAnswer: countries[random].name.official
            }
            allQuestions.push(oneQuestions)
          }
        }
        return allQuestions
      })
  }
  const handleClickNewQuestions = () => {
    reset()
    getNewQuestions()
      .then(data => {
        setQuestions(data)
      })
  }

  useEffect(() => {
    getNewQuestions()
      .then(data => {
        setQuestions(data)
      })
  }, [])

  return (
    <main>
      <section className='flex flex-col justify-center min-h-screen max-w-[488px] mx-auto p-6'>
        <div className='relative'>
          <h1 className='uppercase text-white-1 text-2xl md:text-4xl font-bold pb-3'>Country Quiz</h1>
          {
            currentQuestion !== questions?.length && (
              <img className='absolute top-0 right-0 w-1/3 ' src='/undraw_adventure_4hum_1.svg' alt='undraw_adventure_image' />
            )
          }
        </div>
        <article className='bg-white rounded-3xl px-8 pt-12 md:pt-16 pb-10'>
          {
            currentQuestion <= questions?.length - 1 && (
              <form>
                {
                  questions[currentQuestion]?.flag.img && (
                    <img className='w-1/2 md:w-1/3 pb-7' src={questions[currentQuestion]?.flag.img} alt={questions[currentQuestion]?.flag.alt} />
                  )
                }
                <h2 className='text-blue-1 text-2xl font-bold pb-8'>{questions[currentQuestion].question}</h2>
                {
                  questions[currentQuestion]?.options.map((option, i) => (
                    <SelectButton
                      key={option}
                      option={option}
                      answer={handleAnswer}
                      userAnswer={userAnswer}
                      inciso={String.fromCharCode(97 + i)}
                    />
                  ))
                }
                <button
                  type='button'
                  className={`flex flex-row text-white text-lg font-bold bg-yellow-1 py-4 px-9 mt-5 rounded-xl ml-auto ${nextQuestion ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  onClick={next}
                  disabled={!nextQuestion}
                >{currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                </button>
              </form>
            )
          }
          {
          currentQuestion === questions?.length && (
            <div className='text-center'>
              <img className='w-full' src='/undraw_winners_ao2o_2.svg' alt='winner image' />
              <h4 className='text-blue-2 text-5xl font-bold mt-16 mb-4'>Results</h4>
              <p className='text-blue-2 text-lg font-bold'>You got <span className='text-green-2 text-4xl font-bold'>{score}</span> correct answers</p>
              <button className='mt-10 px-16 py-5 border-2 border-blue-2 text-blue-2 text-lg font-semibold rounded-xl' onClick={reset}>Try again</button>
              <button className='mt-10 px-16 py-5 border-2 border-blue-2 text-blue-2 text-lg font-semibold rounded-xl' onClick={handleClickNewQuestions}>New questions </button>
            </div>
          )
          }
          {
          (currentQuestion < 0 || currentQuestion > questions?.length) && (
            <h3 className='text-4xl'>Algo salío mal</h3>
          )
        }
        </article>
      </section>
      <footer className='text-sm text-center py-6'>
        created by <span className='font-bold'>Quiiroz</span> - devChallenges.io
      </footer>
    </main>
  )
}

export default App
