import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { combineLatest, map, of } from 'rxjs';
import { OperatorService } from '../../service/operator.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { SubDivisionHelper } from '../../models/country.interface';

@Component({
  selector: 'app-add-operator',
  standalone: true,
  templateUrl: './add-operator.component.html',
  styleUrls: ['./add-operator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule, 
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class AddOperatorComponent {

  operatorTypeList$ = of([
    { id: 101, name: 'Mandator' },
    { id: 102, name: 'Contractor' }
  ])

  newOperatorForm: FormGroup = this.fb.group({
    operatorName: [ '', Validators.required ],
    operatorType: [ 101 , Validators.required ],
    primaryEmail: [ '', [ Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,10}$') ] ],
    contactPersonName: [ '', [ Validators.required, Validators.pattern('^[A-Za-z]*[A-Za-z. ]+') ] ],
    dial_code: [ '+91' , Validators.required ],
    contactNumber: [ '', [ Validators.required , Validators.pattern('[0-9]+') ] ],
    address: [ '', Validators.required ],
    country: [ 'India' , Validators.required ],
    state: [ 'Kerala', Validators.required ]
  });

  stateList: SubDivisionHelper[] = []
  
  constructor(private fb: FormBuilder,
    private operatorService: OperatorService,
    private dialogRef: MatDialogRef<AddOperatorComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any){}
    
  countryList$ = this.operatorService.countryList$;

  vm$ = combineLatest([
    this.countryList$,
    this.operatorTypeList$
  ]).pipe(
    map( ([country, type]) => ({ country, type }) )
  )

  countrySelected(country: MatSelectChange){
    this.newOperatorForm.get('country')?.setValue(country.value.id)
    this.stateList = [ ...country.value.sub_divisions ]
    console.log(country.value)
  }

  onSubmit(){
    this.newOperatorForm.markAllAsTouched();
    console.log(this.newOperatorForm.value)
    if(this.newOperatorForm.valid){

    }
  }

  cancel(){
    this.dialogRef.close()
  }


}
