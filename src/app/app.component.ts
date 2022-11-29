import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( private http:HttpClient){

  }
  title = 'calculator';
  input ='';
  output :any= '';

  operand1!: number; // The first operand
  operand2!: number; // The second operand
  operator = ''; // The operator
  
  answered = false; 
  operatorSet = false;

  
  insert(key:string){
    if (key === '+' || key === '-' || key === '*' || key === '/') {
      const lastKey = this.input[this.input.length - 1];
      if (lastKey === '+' || lastKey === '-')  {
       return;
      }
      else if (lastKey=="*" ||lastKey == "/"){
        if(key == "-"){
          this.input += key;
        }
      this.operatorSet == true;
      }
     this.operatorSet == true;
      if ((this.operatorSet) || (this.input === '')) {
        return;
      }
      this.operand1 = parseFloat(this.input);
      this.operator = key;
      this.operatorSet = true;
   }
   this.input += key;
}

dot(ch:string){
  if (this.input !== ""){
  if(ch == "."){
    let dispvalue = this.input[this.input.length-1];
    if(dispvalue == "."){
      return;
    }
    this.input +=ch;
  }}}

equal(){
    this.operand2 = parseFloat(this.input.split(this.operator)[1]);
      if (this.operator == '+') {
        this.http.get('https://localhost:7193/api/Calculator/Add?number1='+ this.operand1+'&number2='+this.operand2)
          .subscribe((data)=>{
          this.output = data;
         })
       }
      else if (this.operator == '-') {
        this.http.get('https://localhost:7193/api/Calculator/Sub?number1='+ this.operand1+'&number2='+this.operand2)
           .subscribe((data)=>{
           this.output = data;
          })
        }
      else if (this.operator == '*') {
        this.http.get('https://localhost:7193/api/Calculator/Mul?number1='+ this.operand1+'&number2='+this.operand2)
            .subscribe((data)=>{
            this.output = data;
          })
        }
      else if (this.operator == '/') {
        if(this.operand2!== 0){
          this.http.get('https://localhost:7193/api/Calculator/Div?number1='+ this.operand1+'&number2='+this.operand2)
             .subscribe((data)=>{
             this.output = data;
           })}
      else {
            this.output = "Divided by Zero Exception"
            }
          }
      else {
      this.output = 'ERROR: Invalid Operation';
    }
    this.answered = true;
  }
  claer(){
    this.output ="";
    this.input = "";
    this.operatorSet = false;
    this.answered=false;
  }
}