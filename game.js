const question=document.querySelector('#question');
const choices=Array.from(document.querySelectorAll('.choice-text'));
const progressText=document.querySelector('#progressText');
const scoreText=document.querySelector('#score');
const progressBarFull=document.querySelector('#progressBarFull');

//this is an object
let currentQuestion={}
let acceptingAnswers=true
let score=0
let questionCounter=0
//this is an array
let availableQuestion=[]

//this is an array of multiple objects
let questions=[
    {
        question: "What is 2+ 2?",
        choice1:'2',
        choice2:'4',
        choice3:'21',
        choice4:'17',
        answer:2,
    },

    {
        question: "What is 25+ 2?",
        choice1:'27',
        choice2:'4',
        choice3:'61',
        choice4:'12',
        answer:1,
    },

    {
        question: "What is 2 x 2?",
        choice1:'2',
        choice2:'4',
        choice3:'21',
        choice4:'17',
        answer:2,
    },

    {
        question: "What is 90+70?",
        choice1:'21',
        choice2:'402',
        choice3:'160',
        choice4:'170',
        answer:3,
    }

]

const SCORE_POINTS =100
const MAX_QUESTIONS=4

startGame=() => {
    questionCounter=0
    score=0
    availableQuestions=[...questions]
    getNewQuestion()
}

getNewQuestion= () => {
    if(availableQuestions.length ===0 || questionCounter >MAX_QUESTIONS) {
        localStorage.setItem('mostResentScore', score)

        return window.location.assign('/end.html')
    }
    questionCounter++
    progressText.innerText= `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width= `${(questionCounter/MAX_QUESTIONS) *100}%`

    const questionIndex=Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number= choice.dataset ['number']
        choice.innerText= currentQuestion ['choice'+ number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers=true

}

choices.forEach( choice => {
    choice.addEventListener('click', e=> {
        if(!acceptingAnswers) return

        acceptingAnswers=false
        const selectedChoice=e.target
        const selectedAnswer= selectedChoice.dataset['number']

        let classToApply= selectedAnswer==currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply==='correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()


        }, 1000)
    })
})

incrementScore= num => {
    score +=num
    scoreText.innerText = score
}

startGame()