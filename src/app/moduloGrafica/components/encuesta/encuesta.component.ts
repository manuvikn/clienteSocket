import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { EncuestaService } from '../../services/encuesta.service';

@Component({
    selector: 'encuesta-component',
    templateUrl: './encuesta.component.html',
    styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {

    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

    public barChartOptions: ChartConfiguration['options'] = {
      responsive: true,
      // We use these empty structures as placeholders for dynamic theming.
      scales: {
        x: {},
        y: {
          min: 10
        }
      },
      plugins: {
        legend: {
          display: true,
        }
      }
    };
    public barChartType: ChartType = 'bar';
  
    public barChartData: ChartData<'bar'> = {
      datasets: [{ data: [] }]
    };

    constructor(private encuestaService: EncuestaService) {}


    ngOnInit(): void {
        this.initComponent();
    }

    initComponent(): void {

        this.encuestaService.getEncuesta()
            .subscribe(data => this.updateData(data));

        this.listenEncuesta();

    }

    updateData(data: ChartData<'bar'>): void {

        this.barChartData = data;
        this.chart?.update();

    }

    listenEncuesta(): void {

        this.encuestaService.listenChanges()
            .subscribe(data => this.updateData(data));

    }

}