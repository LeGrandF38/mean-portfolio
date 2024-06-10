import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  assets: any[] = [];
  asset: string = '';
  quantity: number = 0;
  value: number = 0;

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.loadPortfolio();
  }

  loadPortfolio() {
    this.portfolioService.getPortfolio().subscribe(
      res => {
        this.assets = res;
      },
      err => {
        console.error(err);
      }
    );
  }

  addAsset() {
    this.portfolioService.addAsset(this.asset, this.quantity, this.value).subscribe(
      res => {
        this.loadPortfolio();
        this.asset = '';
        this.quantity = 0;
        this.value = 0;
      },
      err => {
        console.error(err);
        alert('Failed to add asset');
      }
    );
  }
}
