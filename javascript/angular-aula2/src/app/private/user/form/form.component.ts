import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      nome: new FormControl('', Validators.required),
      sobrenome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
  }

  public salvar() {
    console.log(this.form);

    // acionar a API para salvar o
  }

}
