import { User } from './../../user/user';
import { UserService } from 'src/app/user/user.service';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    
  }
  
  myForm: FormGroup = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(2)
    ]],
    alias: ['', [
      Validators.required,
      Validators.minLength(2)
    ]],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(5)
    ]],
    confirmPassword: ['', [
      Validators.required,
      this.checkPasswords(this.password)
    ]]
    
  }, )

  
  checkPasswords(passwordValue): ValidatorFn{ 
    
    
    return (control: AbstractControl): {[key: string]: boolean} | null => {
      if(this.password != null)
      if(control.value != this.password.value){
        console.log(control.value);
        console.log(this.password.value);
        return {'NotSame': true};
      }

      return null;
    }
  }

  get email(){
    return this.myForm.get('email');
  }

  get name(){
    return this.myForm.get('name');
  }

  get password(){
    try{
      return this.myForm.get('password');
    }catch{
    }
    return null;
  }

  get confirmPassword(){
    return this.myForm.get('confirmPassword');
  }

  get alias(){
    return this.myForm.get('alias');
  }

  async register() {
    let user: User = {
      id: null,
      name: this.name.value,
      alias: this.alias.value,
      email: this.email.value,
      password: this.password.value
    };
    this.userService.register(user).subscribe((res)=> {
      console.log(res);
    },(err) => {
      console.log(err);
    })

  }



}
