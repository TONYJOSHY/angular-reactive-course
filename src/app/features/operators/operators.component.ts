import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { Observable, combineLatest, map, of } from 'rxjs';
import { OperatorParams } from './models/operator-filter.interface';
import { OperatorService } from './service/operator.service';

@Component({
  selector: 'app-operators',
  standalone: true,
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatTableModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule, 
    MatPaginatorModule,
    MatProgressSpinnerModule
  ]
})
export class OperatorsComponent {

  displayedColumns = [ 'parent', 'certification', 'country', 'state' ];

  operatorParams: OperatorParams = { limit: 5, offset: 0, search: '', standard: '',
    country: '', state: '', blocked: false, approved: true }

  constructor(private operatorService: OperatorService){}

  operatorList$ = this.operatorService.operatorList$;
  standardList$ = this.operatorService.standardTreeList$;

  vm$ = combineLatest([
    this.operatorList$,
    this.standardList$,
    this.operatorService.loaderSubject$
  ]).pipe( map( ([ operators, standards, loader ]) => ({ operators, standards, loader }) ) )

  onSearch(search: Event){
    this.operatorParams = {
      ...this.operatorParams,
      search: (search.target as HTMLInputElement).value,
      offset: 0
    }
    this.operatorService.filterOperator(this.operatorParams)
  }

  onStandardChange(standard: MatSelectChange){
    this.operatorParams = {
      ...this.operatorParams,
      standard: standard.value,
      offset: 0
    }
    this.operatorService.filterOperator(this.operatorParams)
  }

  pageChange(page: PageEvent){
    this.operatorParams = {
      ...this.operatorParams,
      offset: page.pageSize * page.pageIndex,
      limit: page.pageSize
    }
    this.operatorService.filterOperator(this.operatorParams)
  }

}
