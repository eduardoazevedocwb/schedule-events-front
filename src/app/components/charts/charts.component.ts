import { SchedulingService } from 'src/app/services/scheduling.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexNonAxisChartSeries, ApexResponsive, ApexStroke, ApexTitleSubtitle, ApexXAxis, ChartComponent } from 'ng-apexcharts';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

//#region chart type
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
export type DonutOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};
export type PieOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
//#endregion

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit{

  @ViewChild('chartObj') chart: ChartComponent;
  public lineOptions: Partial<ChartOptions>;
  public barOptions: Partial<ChartOptions>;
  public donutOptions: Partial<DonutOptions>;
  public pieOptions: Partial<PieOptions>;

  ngOnInit(){
  }

  constructor() {
    SchedulingService.getParticPerMonth();

    this.lineOptions = {
      series: this.getLineValues(),
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "Jan",
          "Fev",
          "Mar",
          "Abr",
          "Mai",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Out",
          "Nov",
          "Dez"
        ]
      }
    };

    this.barOptions = {
      series: [
        {
          name: "Participações",
          data: this.getBarValues()
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      // title: {
      //   text: "Product Trends by Month",
      //   align: "left"
      // },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "Jan",
          "Fev",
          "Mar",
          "Abr",
          "Mai",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Out",
          "Nov",
          "Dez"
        ]
      }
    };

    this.donutOptions = {
        series: this.getDonutValues(),
        chart: {
          width: 380,
          type: "donut"
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          type: "gradient"
        },
        legend:
        {
          formatter: function(val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex];
          }
        },
        labels: this.getDonutLabels(),
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
    };

    this.pieOptions = {
      series: this.getPieValues(),
      chart: {
        width: 380,
        type: "pie"
      },
      labels: this.getPieLabels(),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  getBarValues() : number[] {
    var listValues :number[]= [];
    var list = SchedulingService.getParticPerMonth();
    list.forEach(item => {
      if(item != null && item != undefined)
        listValues.push(item);
      else
        listValues.push(0);
    });
    return listValues;
  }
  getDonutValues() : number[] {
    var listValues :number[]= [];
    var list = SchedulingService.getParticBestEvent();

    if(list == null || list == undefined){  return listValues; }

    list.forEach(item => {
        listValues.push(item.value);
    });

    return listValues;
  }
  getDonutLabels() : string[] {
    var listLabels : string []= [];
    var list = SchedulingService.getParticBestEvent();

    if(list == null || list == undefined){  return listLabels; }

    list.forEach(item => {
        listLabels.push(item.key);
    });

    return listLabels;
  }
  getPieValues() : number[]{
    var listValues :number[]= [];
    var list = SchedulingService.getSpaceBestUse();

    if(list == null || list == undefined){  return listValues; }

    list.forEach(item => {
        listValues.push(item.value);
    });

    return listValues;
  }
  getPieLabels() : string[]{
    var listLabels : string [] = [];
    var list = SchedulingService.getSpaceBestUse();

    if(list == null || list == undefined){  return listLabels; }

    list.forEach(item => {
        listLabels.push(item.key);
    });

    return listLabels;
  }
  getLineValues() {
    var listReturn = []; // space = title space | month | value = day used per month
    var list = SchedulingService.getSpaceUsePerMonth(); // space = title space | month | value = day used per month

    //create items with space and month values
    list.forEach(item => {
      var contains = listReturn.some(a=> a.name == item.space);
      if(!contains)
        listReturn.push({
          name: item.space,
          data: [0,0,0,0,0,0,0,0,0,0,0,0]
        });
    });

    //change the month value of the space
    list.forEach(item => {
      var listItem = listReturn.find(a => a.name == item.space);
      var itemData = listItem.data;
      itemData[item.month-1] = itemData[item.month-1] + item.value;
      listReturn.find(a => a.name == item.space).data = itemData;
    });

    return listReturn;
  }
}

