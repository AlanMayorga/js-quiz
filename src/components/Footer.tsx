import { useStore } from "@/store"
import { Button } from "@nextui-org/react"
import { ReloadIcon } from "./icons"

function Footer() {
    const questions = useStore((state) => state.questions)
    const reset = useStore((state) => state.reset)

    let correct = 0
    let incorrect = 0
    let unanswer = 0

    questions.forEach((q) => {
        const { userSelectedAnswer, isCorrectUserAnswer } = q
        if (isCorrectUserAnswer) correct++
        else if (userSelectedAnswer == undefined) unanswer++
        else incorrect++
    })

  return (
    <footer className="pb-4">
        <ul className="flex justify-center gap-4">
          <li>
            ✅ Correctas: { correct }
          </li>
          <li>
            ❌ Incorrectas: { incorrect }
          </li>
          <li>
            ❔ Sin responder: { unanswer }
          </li>
        </ul>
        <div className="mx-auto my-4 w-fit">
        <Button color="primary" variant="ghost" onClick={reset} endContent={<ReloadIcon />}>
            Reiniciar
        </Button>
        </div>
      </footer>
  )
}

export default Footer