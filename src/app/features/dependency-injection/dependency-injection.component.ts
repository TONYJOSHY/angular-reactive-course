import { ChangeDetectionStrategy, Component, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderService } from './service/leader.service';
import { NameService } from './service/name.service';
import { ChildComponent } from "./components/child/child.component";
import { InspectorComponent } from './components/inspector/inspector.component';

@Component({
    selector: 'app-dependency-injection',
    standalone: true,
    templateUrl: './dependency-injection.component.html',
    styleUrls: ['./dependency-injection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, ChildComponent],
    // providers: [LeaderService, NameService],
    providers: [
      { provide: LeaderService, useValue: { leader: 'Lead Developer Full' } },
      { provide: NameService, useValue: { name: 'Shahabas' } }
    ],
    viewProviders: [
      { provide: LeaderService, useValue: { leader: 'Lead Developer mini' } },
      { provide: NameService, useValue: { name: 'Tony Joshy' } }
    ]
})
export class DependencyInjectionComponent {

  constructor(public leaderService: LeaderService,
    @SkipSelf() public nameService: NameService){}

}
