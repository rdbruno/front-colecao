import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Colecionavel } from 'src/app/shared/models/colecionavel.model';
import { CollectionService } from 'src/app/shared/services/collection.service';

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrls: ['./collections-list.component.css']
})
export class CollectionsListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns = ['categoria', 'item', 'cadastro', 'acoes'];
  dataSource = new MatTableDataSource<Colecionavel>();
  
  public colecionaveis: Colecionavel[] = [];
  public listCategory = ['Embalagem', 'Selo', 'Ferromodelismo', 'Numismática'];

  public formSearch = this._formBuilder.group({
    nome: [null, [ Validators.maxLength(200) ]],
    categoria: [null]
  });

  constructor(
    public paginatorIntl: MatPaginatorIntl,
    private _formBuilder: FormBuilder,  
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _collectionService: CollectionService
  ) {
    this.paginatorIntl.itemsPerPageLabel = 'Itens por página';
    this.paginatorIntl.nextPageLabel     = 'Próxima página';
    this.paginatorIntl.previousPageLabel = 'Voltar página';
    this.paginatorIntl.lastPageLabel     = 'Última página';
    this.paginatorIntl.firstPageLabel    = 'Primeira página';
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;

    this.onLoadCollections();
  }

  public onLoadCollections(): void {
    let user     = localStorage.getItem('id') as unknown as number;
    let name     = this.formSearch.value.nome;
    let category = this.formSearch.value.categoria;

    if ((name == null) && (category == null)) {
      this._collectionService.listCollectionsByUser(user).subscribe((response) => {
        this.colecionaveis = response;
        this.dataSource.data = this.colecionaveis as Colecionavel[];
        if (this.colecionaveis.length === 0) {
          this._snackBar.open('Não foram encontrados registros!', 'Ok', { duration: 3000 });
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      if (name != null) {
        this._collectionService.listCollectionsByUserName(user, name).subscribe((response) => {
          this.colecionaveis = response;
          this.dataSource.data = this.colecionaveis as Colecionavel[];
          if (this.colecionaveis.length === 0) {
            this._snackBar.open('Não foram encontrados registros!', 'Ok', { duration: 3000 });
          }
        }, (error) => {
          console.log(error);
        });
      } else if (category != null) {
        this._collectionService.listCollectionsByUserCategory(user, category).subscribe((response) => {
          this.colecionaveis = response;
          this.dataSource.data = this.colecionaveis as Colecionavel[];
          if (this.colecionaveis.length === 0) {
            this._snackBar.open('Não foram encontrados registros!', 'Ok', { duration: 3000 });
          }
        }, (error) => {
          console.log(error);
        });
      }
    }    
  }

  public onCleanSearch(): void {
    this.formSearch.setValue({ nome: null, categoria: null });
    this.onLoadCollections();
  }

  public onLoadItem(id: string): void {
    this._router.navigate(['menu/colecoes/detalhes', id]);
  }

}
