import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Receipe } from '../../models/receipe';
import { ReceipeService } from '../../services/receipe.service';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-receipe-details',
  templateUrl: './receipe-details.component.html',
  styleUrls: ['./receipe-details.component.scss'],
})

export class ReceipeDetailsComponent {
  receipeId: number;
  receipe$: Observable<Receipe>;


  //ActivatedRoute permet de récupérer les paramètres de l'URL
  constructor(
    private route: ActivatedRoute,
    private receipeService: ReceipeService,
    private location: Location,
    public sanitizer: DomSanitizer
  ) {
    this.receipeId = +this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    if (this.receipeId) {
      this.receipe$ = this.receipeService.getById(this.receipeId);
    }
  }


  goBack() {
    this.location.back();
  }

  showReceivedValue(value: boolean) {
    console.log("value : " + value);
  }

}

