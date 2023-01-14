import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Colecionavel } from 'src/app/shared/models/colecionavel.model';
import { CollectionService } from 'src/app/shared/services/collection.service';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent implements OnInit {

  public id: number;
  public colecionavel: Colecionavel = new Colecionavel();
  public edit = false;
  public listCategory = ['Embalagem', 'Selo', 'Ferromodelismo', 'Numismática'];

  public formItem = this._formBuilder.group({
    categoria: [null, [ Validators.required ]],
    nome: [null, [ Validators.required, Validators.maxLength(200) ]],
    descricao: [null, [ Validators.maxLength(250) ]],
    marca: [null, [ Validators.maxLength(200) ]],
    material: [null, [ Validators.maxLength(20) ]],
    modelo: [null, [ Validators.maxLength(150) ]],
    pais: [null, [ Validators.maxLength(200) ]],
    ano: [null, [ Validators.maxLength(4) ]]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _collectionService: CollectionService
  ) { }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params['id'];
    this.onSearchItem();
  }

  onSearchItem(): void {
    this._collectionService.findById(this.id).subscribe((response) => {
      this.colecionavel = response;
      this.onLoadItem();
    }, (error) => {
      console.log(error);
    });
  }

  onLoadItem(): void {
    this.formItem.setValue({
      categoria: this.colecionavel.categoria,
      nome:      this.colecionavel.nome,
      descricao: this.colecionavel.descricao,
      marca:     this.colecionavel.marca,
      material:  this.colecionavel.material,
      modelo:    this.colecionavel.modelo,
      pais:      this.colecionavel.pais,
      ano:       this.colecionavel.ano
    });
  }

}
