import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/admin/utils/message.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ConsultaService } from '../../services/consulta/consulta.service';


export interface ConsultaModel {
  idconsulta: number;
  nombre_apellido: string;
  descripcion: string;
  documento: string;
  tipo: string;
  numero: string;
  consulta: string;
  fecha_insercion: Date;
  fecha_procesado: Date;
  estado: string;
}

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})

export class ConsultaComponent implements OnInit {

  constructor(private consultaService: ConsultaService, private messageService: MessageService, private msg: NzMessageService) { }

  listOfData: ConsultaModel[] = [];
  searchValue = '';
  visible = false;
  listOfDisplayData: ConsultaModel[] = [];
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
    this.listOfDisplayData = this.listOfData.filter((item: ConsultaModel) => item.estado.toUpperCase().indexOf(this.searchValue.toUpperCase()) !== -1);
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

  deleteRow(idconsulta: number): void {
    this.listOfData = this.listOfData.filter(d => d.idconsulta !== idconsulta);
    this.listOfDisplayData = this.listOfData;
    this.consultaService.deleteConsulta(idconsulta).subscribe((response) => {
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', response.detmensaje);
      } else {
        this.messageService.createMessage('success', response.detmensaje);
      }
    });
  }

  pendinRow(idconsulta: number): void {
    const index = this.listOfData.findIndex(item => item.idconsulta === idconsulta);
    this.listOfData[index].estado = "Pendiente";
    this.listOfData[index].fecha_procesado = new Date();
    //console.log(this.listOfData[index]);
    this.consultaService.updateConsulta(this.listOfData[index]).subscribe((response) => {
      //console.log(response);
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', "Error al anular");
      } else {
        this.messageService.createMessage('success', "Anulado satisfactoriamente");
      }
    });
  }

  anulaRow(idconsulta: number): void {
    const index = this.listOfData.findIndex(item => item.idconsulta === idconsulta);
    this.listOfData[index].estado = "Cancelado";
    this.listOfData[index].fecha_procesado = new Date();
    //console.log(this.listOfData[index]);
    this.consultaService.updateConsulta(this.listOfData[index]).subscribe((response) => {
      //console.log(response);
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', "Error al anular");
      } else {
        this.messageService.createMessage('success', "Anulado satisfactoriamente");
      }
    });
  }

  procesadoRow(idconsulta: number): void {
    const index = this.listOfData.findIndex(item => item.idconsulta === idconsulta);
    this.listOfData[index].estado = "Procesado"
    this.listOfData[index].fecha_procesado = new Date();
    //console.log(this.listOfData[index]);
    this.consultaService.updateConsulta(this.listOfData[index]).subscribe((response) => {
      //console.log(response);
      if (response.mensaje == 'error') {
        this.messageService.createMessage('error', "Error al intentar procesar");
      } else {
        this.messageService.createMessage('success', "Procesado satisfactoriamente");
      }
    });
  }

  convertirFecha(fecha: Date) {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    this.getAllConsulta();
  }

  getAllConsulta() {
    this.consultaService.getConsulta().subscribe({
      next: (response) => {
        console.log(response);
        if (response) {
          response.body.map((data: ConsultaModel) => {
            this.listOfData.push(data);
          });
          this.listOfDisplayData = [...this.listOfData];
        }
      },
    });
  }

}
