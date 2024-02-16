import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderService } from '../../service/leader.service';
import { NameService } from '../../service/name.service';
import { InspectorComponent } from '../inspector/inspector.component';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule, InspectorComponent],
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [  
    { provide: LeaderService, useValue: { leader: 'Lead Developer' } },
    { provide: NameService, useValue: { name: 'Tony' } }
  ],
  // viewProviders: [
  //   { provide: LeaderService, useValue: { leader: 'Lead Developer mini' } },
  //   { provide: NameService, useValue: { name: 'Tony Joshy' } }
  // ]
})
export class ChildComponent {

  constructor(public leaderService: LeaderService,
    public nameService: NameService){}

}
