import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const button = document.getElementById("mostrar")!
    const input = document.getElementById("password")!
    button.addEventListener("click", ()=>{
      if (input.attributes["type"].value === 'password') {
        input.setAttribute('type', 'text')
        button.innerText = 'Ocultar'
    }else {
        input.setAttribute('type', 'password')
        button.innerText = 'Mostrar'
      }
    })

  }
}
