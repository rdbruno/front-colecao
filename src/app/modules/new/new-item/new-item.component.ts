import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

import { Colecionavel } from 'src/app/shared/models/colecionavel.model';
import { CollectionService } from 'src/app/shared/services/collection.service';
import { FilesService } from 'src/app/shared/services/files.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  public imagePath;
  public imgUrl: any;
  public message: string;
  public fileAttr = 'Escolha um arquivo';
  public currentFile: File;

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
    private _collectionService: CollectionService,
    private _filesService: FilesService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  public preview(files, event: any) {
    if (files.length === 0) {
      return;
    }

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Apenas imagens são suportadas.';
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    this.fileAttr = files[0].name;
    this.currentFile = event.target.files[0];
    console.log(this.currentFile);
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgUrl = reader.result;
    }
  }

  onSaveNewItem(): void {
    let colecionavel: Colecionavel = new Colecionavel();
    colecionavel.categoria = this.formItem.value.categoria;
    colecionavel.nome      = this.formItem.value.nome;
    colecionavel.descricao = this.formItem.value.descricao;
    colecionavel.marca     = this.formItem.value.marca;
    colecionavel.material  = this.formItem.value.material;
    colecionavel.modelo    = this.formItem.value.modelo;
    colecionavel.pais      = this.formItem.value.pais;
    colecionavel.ano       = this.formItem.value.ano;
    colecionavel.usuario   = localStorage.getItem('id') as unknown as number;
    let day = new Date();
    let fromDay = moment(day, 'YYYY-MM-DD');
    colecionavel.dataCadastro = fromDay.format('YYYY-MM-DD');

    this._collectionService.newItem(colecionavel).subscribe((response) => {
      let itemId = response.id;

      this._filesService.upload(itemId, this.currentFile).subscribe(
        (event: any) => {

        }, (err: any) => {
          console.log(err);
        }
      )
      this._snackBar.open('Colecionável cadastrado com Sucesso!', 'Ok', { duration: 3000 });
    }, (error) => {
      this._snackBar.open(error.error.errors[0].fieldName + ' - ' + error.error.errors[0].message, 'Ok', { duration: 3000 });
    });
  }

}
