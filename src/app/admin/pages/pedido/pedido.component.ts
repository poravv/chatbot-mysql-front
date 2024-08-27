import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/admin/utils/message.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PedidoService } from '../../services/pedido/pedido.service';

export interface DetPedidosModel {
  iddet_pedido: number;
  producto: string;
  cantidad: string;
}

export interface PedidoModel {
  idpedido: number;
  cliente: string;
  ruc: string;
  numero: string;
  fecha_insercion: Date;
  fecha_proceso: Date;
  estado:string;
  DetPedidos: DetPedidosModel[]
}

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})

export class PedidoComponent implements OnInit {

  constructor(private pedidoService: PedidoService, private messageService: MessageService,private msg: NzMessageService) { }

  listOfData: PedidoModel[] = [];
  export: PedidoModel[] = [];
  searchValue = '';
  visible = false;
  listOfDisplayData: PedidoModel[] = [];
  expandSet = new Set<number>();

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: PedidoModel) => item.estado.toUpperCase().indexOf(this.searchValue.toUpperCase()) !== -1);
  }

  searchTotal(search: string) {
    const targetValue: any[] = [];
    this.listOfData.forEach((value: any) => {
      let keys = Object.keys(value);
      for (let i = 0; i < keys.length; i++) {
        if (value[keys[i]] && value[keys[i]].toString().toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
          targetValue.push(value);
          break;
        }
      }
    });
    this.listOfDisplayData = targetValue;
  }

  deleteRow(idpedido: number): void {
    this.listOfData = this.listOfData.filter(d => d.idpedido !== idpedido);
    this.listOfDisplayData = this.listOfData;
    this.pedidoService.deletePedido(idpedido).subscribe((response) => {
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', response.detmensaje);
      } else {
        this.messageService.createMessage('success', response.detmensaje);
      }
    });
  }

  anulaRow(idpedido:number):void {
    const index = this.listOfData.findIndex(item => item.idpedido === idpedido);
    this.listOfData[index].estado="Anulado"
    //console.log(this.listOfData[index]);
    this.pedidoService.updatePedido(this.listOfData[index]).subscribe((response) => {
      //console.log(response);
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', "Error al anular");
      } else {
        this.messageService.createMessage('success', "Anulado satisfactoriamente");
      }
    });
  }

  procesadoRow(idpedido:number):void {
    const index = this.listOfData.findIndex(item => item.idpedido === idpedido);
    this.listOfData[index].estado="Procesado"
    //console.log(this.listOfData[index]);
    this.pedidoService.updatePedido(this.listOfData[index]).subscribe((response) => {
      //console.log(response);
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', "Error al intentar procesar");
      } else {
        this.messageService.createMessage('success', "Procesado satisfactoriamente");
      }
    });
  }

  ngOnInit(): void {
    this.getAllPedido();
    this.getAllPedidoSql();
  }

  getAllPedido() {
    this.pedidoService.getPedido().subscribe({
      next: (response) => {
        console.log(response);
        if (response) {
          response.body.map((data: PedidoModel) => {
            this.listOfData.push(data);
          });
          this.listOfDisplayData = [...this.listOfData];
        }
      },
    });
  }

  getAllPedidoSql() {
    this.pedidoService.getSql().subscribe({
      next: (response) => {
        console.log(response);
        if (response) {
          response.body.map((data: PedidoModel) => {
            this.export.push(data);
          });
        }
      },
    });
  }
}
