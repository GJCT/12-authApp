import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  miFormulario: FormGroup = this.fb.group({
    email:    ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });
  
  
  constructor(private fb: FormBuilder,
              private router: Router,
              private authServices: AuthService){}


  login(){

    const {email, password} = this.miFormulario.value;
    this.authServices.login(email, password)
        .subscribe( resp =>{
      console.log(resp);
      if(resp === true){
        this.router.navigateByUrl('/dashboard');
      }else{
        Swal.fire(
          'Error', resp, 'error'
        )
      }
    });
  }

}
