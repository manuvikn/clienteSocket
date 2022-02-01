import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { interval } from 'rxjs';
import { GraficaService } from '../../services/grafica.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss']
})
export class GraficaComponent implements OnInit {
  
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  
  public lineChartData: ChartConfiguration['data'] = {datasets: []};
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
      {
        position: 'left',
      },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },
    
    plugins: {
      legend: { display: true }
    }
  };
  
  public lineChartType: ChartType = 'line';
  
  
  constructor(private graficaService: GraficaService) { }
  
  ngOnInit(): void {
    
    this.initComponent();
    // this.randomizeData();
    
  }
  
  initComponent(): void {
    
    this.graficaService.getGrafica()
      .subscribe(data => this.updateData(data));
    
    this.listenChanges();

  }
  
  listenChanges(): void {

    this.graficaService.listenChanges()
      .subscribe(data => this.updateData(data));

  }


  randomizeData(): void {

    interval( 3000 )
      .subscribe(() => {

        
        const newData: Array<any> = new Array(7).fill(0).map(() => Math.round(Math.random() * 100));
        this.lineChartData.datasets[0].data = newData;
        this.chart?.update();
        
      });

  }


  updateData(data: ChartConfiguration['data']): void {

    this.lineChartData = data;
    this.chart?.update();

  }




  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

}
