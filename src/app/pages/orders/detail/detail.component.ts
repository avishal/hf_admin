import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OrderService } from '../orders.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

/**
 * Invoices Detail component
 */
export class DetailComponent implements OnInit {

 // bread crumb items
 breadCrumbItems: Array<{}>;

 //constructor(private route: ActivatedRoute,) { }
 constructor(public formBuilder: FormBuilder, 
  private spservice:OrderService, private route: ActivatedRoute) { }
// typeValidationForm: FormGroup; // type validation form
// typesubmit: boolean;
// @Output() passEntry: EventEmitter<any> = new EventEmitter();
loading = false;
error = false;
errorMessage = ""
orderData:any = {};

  orderno;
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Invoices' }, { label: 'Detail', active: true }];
    this.orderno = this.route.snapshot.paramMap.get('id');
    this.getOrderData();
  }

 getOrderData(){

  this.loading = true;
    this.error = false;
    this.errorMessage = "";
    this.spservice.getOrder(this.orderno).subscribe( resp => {

      this.loading = false;
      this.error = false;
      this.errorMessage = ""

      this.orderData = resp.data;
      console.log(this.orderData);
      // this.type.id.setValue(this.customerData.id)
      // this.type.status.setValue(this.customerData.status)
      
    }, err=>{ 
      this.loading = false;
      this.error = true;
      this.errorMessage = "Something went wrong. Unable to get order";
      console.log("err", err)
    });

 }

 downloadpdf()
 {
   this.spservice.getInvoice().subscribe(resp => {

    console.log("test");

   }, err => {
    console.log("err")
   });
 }
}
