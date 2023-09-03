import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import Header from "@components/Header";
import { ArrowLeftIcon, ArrowRightIcon, JavaScriptLogo } from "@components/icons";

import { useStore } from "./store";
import Footer from "@components/Footer";

function App() {
  const [questions, currentQuestion, selectAnswer, goPreviousQuestion, goNextQuestion] = useStore((state) => [
    state.questions,
    state.currentQuestion,
    state.selectAnswer,
    state.goPreviousQuestion,
    state.goNextQuestion
  ])
  const question = questions[currentQuestion]

  const handleSelectAnswer = (answerId: number) => () => {
    selectAnswer(question.id, answerId)
  }

  const handleNext = () => {
    goNextQuestion()
  }

  const handlePrevious = () => {
    goPreviousQuestion()
  }

  const getColor = (answerId: number) => {
    if (question?.userSelectedAnswer === answerId) {
      return question.isCorrectUserAnswer ? 'success' : 'danger'
    } else if (question.userSelectedAnswer && question.correctAnswer === answerId) {
      return 'success'
    }
    return 'default'
  }

  return (
    <>
      <Header />
      <main>
        <section className="w-4/5 max-w-screen-xl grid place-content-center m-auto py-6 text-center">
          <div className="m-[4px_auto]">
            <JavaScriptLogo size="12rem" />
          </div>

          <h1 className='text-4xl font-bold my-3'>JavaScript QUIZ</h1>

          <Card>
            <CardHeader className="flex justify-center gap-4">
              <Button isIconOnly variant="flat" onClick={handlePrevious} isDisabled={currentQuestion <= 0}><ArrowLeftIcon /></Button>
              <span>{currentQuestion + 1 + '/' + questions.length}</span>
              <Button isIconOnly variant="flat" onClick={handleNext} isDisabled={currentQuestion >= questions.length - 1}><ArrowRightIcon /></Button>
            </CardHeader>
            <Divider />
            <CardBody>
              <p className="mb-4">{question.question}</p>
              <SyntaxHighlighter language="Javascript" style={nightOwl}>
                {question.code}
              </SyntaxHighlighter>
            </CardBody>
            <Divider />
            <CardFooter className="p-0">
              <ul className="w-full">
                {
                  question.answers.map((answer, i) => (
                    <li key={`key-` + answer} className="w-full [&:not(:last-of-type)]:border-b border-black">
                      <Button
                        className="rounded-none w-full block"
                        onClick={handleSelectAnswer(i)}
                        color={getColor(i)}
                        isDisabled={question.userSelectedAnswer !== undefined}
                      >{answer}</Button>
                    </li>
                  ))
                }
              </ul>
            </CardFooter>
          </Card>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
