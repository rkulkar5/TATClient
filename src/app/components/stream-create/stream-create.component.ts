import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { JRSS } from './../../model/jrss';
import { browserRefresh } from '../../app.component';

@Component({
  selector: 'app-stream-create',
  templateUrl: './stream-create.component.html',
  styleUrls: ['./stream-create.component.css']
})
export class StreamCreateComponent implements OnInit {
  public browserRefresh: boolean;
  streamCreateForm: FormGroup;
  JRSS:any = [];
  userName: String = "admin";
  submitted = false;
  optionsArray:Array<Object>=[];
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService,
    
  ) { 

    this.mainForm();
    this.readJrss();
  }

  ngOnInit(): void {
    this.browserRefresh = browserRefresh;
      if (this.browserRefresh) {
          if (window.confirm('Your account will be deactivated. You need to contact administrator to login again. Are you sure?')) {
             this.router.navigate(['/login-component']);
          }
      }
  }

  mainForm() {
    this.streamCreateForm = this.fb.group({
      JRSS: ['', [Validators.required]],
      technologyStream :['', [Validators.required]]
    })
  }


   // Get all Jrss
   readJrss(){
    this.apiService.getJRSS().subscribe((data) => {
    this.JRSS = data;
    })
  }

  // Choose designation with select dropdown
  updateJrssProfile(e){
    this.streamCreateForm.get('JRSS').setValue(e, {
      onlySelf: true
    })
  }


  // Getter to access form control
  get myForm(){
    return this.streamCreateForm.controls;
  }



  onSubmit() {
    this.submitted = true;
    if (!this.streamCreateForm.valid) {
      return false;
    } else {




      this.optionsArray=[];
      //alert('JRSS value==  '+this.JRSS);
      //alert('JRSS value==  '+this.streamCreateForm.value.selecctedJrssId);
      this.optionsArray.push({key:this.streamCreateForm.value.technologyStream,value:this.streamCreateForm.controls.technologyStream});
      this.streamCreateForm.value.technologyStream = this.optionsArray;

      //this.streamCreateForm.value.technologyStream.push(this.optionsArray);
      //this.streamCreateForm.value.JRSS = this.JRSS;
      this.apiService.updateTechStream('5ebae233bc98d83f8829fcef',this.JRSS).subscribe(res => {
        console.log('Technology stream updated successfully!');
        }, (error) => {
        console.log(error);
        })
      }

}

}
