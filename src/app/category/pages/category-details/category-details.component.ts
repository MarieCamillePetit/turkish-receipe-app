import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit{

  categoryId: number;
  categorie$: Observable<Category>;

  constructor(private route: ActivatedRoute, private bouteilleService: CategoryService, private location: Location){
    // route.params.subscribe(params =>{
    //   this.categoryId = params['id'];
    // })
    this.categoryId = +this.route.snapshot.paramMap.get('id') ;
  }

  ngOnInit(): void{
    if (this.categoryId) {
      this.categorie$ = this.bouteilleService.getById(this.categoryId);
    }
  }

  goBack(){
    this.location.back();
  }

  showRecivedValue(value: boolean){
    console.log(value)
  }

}