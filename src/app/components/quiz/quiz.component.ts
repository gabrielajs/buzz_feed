import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {

  titulo:string = ""

  questions:any
  questionSelected:any

  resposta:string[] = []
  respostaEscolhida:string = ""

  questionIndex:number = 0
  questaoMaxIndex:number = 0

  fim:boolean = false

  ngOnInit():void {
    if (quizz_questions) {
      this.fim = false
      this.titulo = quizz_questions.title
      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questaoMaxIndex = this.questions.length

    }
  }

  buttonPress(value:string){
    this.resposta.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex += 1

    if(this.questaoMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else {
      const respostaFinal:string = await this.checkResult(this.resposta)
      this.fim = true
      this.respostaEscolhida = quizz_questions.results[respostaFinal as keyof typeof quizz_questions.results]
    }
  }

  async checkResult(resposta:string[]){
    const result = resposta.reduce((previous, current, i, arr)=>{
      if (arr.filter(item => item === previous).length > arr.filter(item => item === current).length) {
        return previous
      } else {
        return current
      }
    })
    return result
  }

}
