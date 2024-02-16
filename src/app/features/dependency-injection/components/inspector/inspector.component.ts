import { ChangeDetectionStrategy, Component, Self, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderService } from '../../service/leader.service';
import { NameService } from '../../service/name.service';

@Component({
  selector: 'app-inspector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: LeaderService, useValue: { leader: 'Developer' } },
    { provide: NameService, useValue: { name: 'Jomson' } }
  ]
})
export class InspectorComponent {

  constructor(public leaderService: LeaderService,
    @SkipSelf() public nameService: NameService){}

}
