import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type Question } from '@/types'

import json from '../data.json'

interface State {
    questions: Question[],
    currentQuestion: number,
    selectAnswer: (questionId: number, answerId: number) => void,
    goNextQuestion: () => void,
    goPreviousQuestion: () => void,
    reset: () => void
}

const LIMIT = 10

function setQuestions(limit: number) {
    const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
    return questions
}

export const useStore = create<State>()(persist((set, get) => ({
    questions: setQuestions(LIMIT),
    currentQuestion: 0,

    selectAnswer: (questionId: number, answerId: number) => {
        const { questions } = get()
        const newQuestions = structuredClone(questions)

        const questionIndex = newQuestions.findIndex((q) => q.id === questionId)

        const question = newQuestions[questionIndex]

        question.userSelectedAnswer = answerId
        question.isCorrectUserAnswer = question.correctAnswer === answerId

        console.log(question)

        set({ questions: newQuestions })
    },

    goNextQuestion: () => {
        const { questions, currentQuestion } = get()
        const length = questions.length

        if (currentQuestion < length) {
            set({ currentQuestion: currentQuestion + 1 })
        }
    },

    goPreviousQuestion: () => {
        const { currentQuestion } = get()

        if (currentQuestion > 0) {
            set({ currentQuestion: currentQuestion - 1 })
        }
    },

    reset: () => {
        set({ currentQuestion: 0, questions: setQuestions(LIMIT) })
    }
}), {
    name: "questions"
}))
