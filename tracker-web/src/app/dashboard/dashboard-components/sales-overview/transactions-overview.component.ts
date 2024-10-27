import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexGrid,
  NgApexchartsModule
} from "ng-apexcharts";
import { BudgetTrackerModule } from "src/app/budget-tracker-module";
import {TransactionsHttpService} from "../../../../services/transactions-service";
import {Transaction} from "../../../transactions/transactions.component";
import {NgIf} from "@angular/common";

export interface ChartOptions {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  yaxis: ApexYAxis | any;
  xaxis: ApexXAxis | any;
  fill: ApexFill | any;
  tooltip: ApexTooltip | any;
  stroke: ApexStroke | any;
  legend: ApexLegend | any;
  grid: ApexGrid | any;
}

@Component({
  selector: "app-sales-overview",
  standalone: true,
  imports: [NgApexchartsModule, BudgetTrackerModule, NgIf],
  templateUrl: "./transactions-overview.component.html"
})
export class TransactionsOverviewComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public chartOptions: Partial<ChartOptions>;


  constructor(private transactionService: TransactionsHttpService ) {
    this.chartOptions = {};
  }

  dates: string[] = []; // Array for unique dates
  totalIncomePerDay: number[] = []; // Array for total income per day
  totalExpensePerDay: number[] = []; // Array for total expense per day

  ngOnInit(): void {
    this.transactionService.getCurrentUserTransactions().subscribe(response => {
      this.processTransactions(response);
      this.prepareChartData();
    });
  }

  processTransactions(transactions: Transaction[]) {
    if(transactions == null || transactions.length == 0)
      return;
    const incomeMap: { [key: string]: number } = {};
    const expenseMap: { [key: string]: number } = {};

    // Loop through each transaction and group the totals by date
    transactions.forEach(transaction => {
      const date = transaction.date;

      // Initialize date in income and expense maps if not present
      if (!incomeMap[date]) {
        incomeMap[date] = 0;
      }
      if (!expenseMap[date]) {
        expenseMap[date] = 0;
      }

      // Sum the amounts for income and expense
      if (transaction.type === 'INCOME') {
        incomeMap[date] += transaction.amount;
      } else if (transaction.type === 'EXPENSE') {
        expenseMap[date] += transaction.amount;
      }
    });

    // Get all unique dates from both incomeMap and expenseMap
    this.dates = Array.from(new Set([...Object.keys(incomeMap), ...Object.keys(expenseMap)]));

    // Map income and expense totals based on original date strings
    this.totalIncomePerDay = this.dates.map(date => incomeMap[date] || 0);
    this.totalExpensePerDay = this.dates.map(date => expenseMap[date] || 0);

    console.log('Dates:', this.dates);
    console.log('Total Income Per Day:', this.totalIncomePerDay);
    console.log('Total Expense Per Day:', this.totalExpensePerDay);
  }

  prepareChartData() {
    this.chartOptions = {
      series: [
        {
          name: "Income",
          data: this.totalIncomePerDay
        },
        {
          name: "Expense",
          data: this.totalExpensePerDay
        }
      ],
      chart: {
        type: "bar",
        fontFamily: "Poppins,sans-serif",
        height: 450,
      },
      xaxis: {
        type: 'datetime',  // Keep the x-axis as datetime
        categories: this.dates.map(date => Date.parse(date)),  // Convert date strings to timestamps
        tickAmount: 6,  // Control the number of ticks (fewer ticks means wider spacing)
        labels: {
          format: 'dd MMM yyyy',  // Display day, month, and year
          rotate: -45,  // Rotate labels for better spacing
          style: {
            fontSize: '12px'  // Control the font size of the labels
          }
        }
      },
      yaxis: {
        title: {
          text: 'Amount (SEK)'
        }
      },
      fill: {
        colors: ["#26c6da", "#1e88e5"],
        opacity: 1,
      },
      grid: {
        borderColor: "rgba(0,0,0,.2)",
        strokeDashArray: 3,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "30%",
          borderRadius: 8,
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
    };
  }
}
