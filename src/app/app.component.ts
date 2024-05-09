import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var paypal: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  
  @ViewChild('paypal', {static: true}) paypalElement!: ElementRef; 

  producto = {
    descripcion : 'crema antiarrugas',
    precio : 20,
    img : 'imagen del producto'
  }
  title = 'paypal-project';

  ngOnInit(){
    paypal
    .Buttons({
      createOrder: (data: any, actions: any) => { 
        return actions.order.create({
          purchase_units: [
            {
              description: this.producto.descripcion,
              amount :{
                currency_code: 'EUR',
                value: this.producto.precio
              }
            }
          ]
        })
      },
      onApprove: async (data: any, actions: any) => { 
        const order = await actions.order.capture();
        console.log(order);
      },
      onError: (err: any) => { 
        console.log(err);
      },
      fundingSource: paypal.FUNDING.PAYPAL, // Solo mostrar PayPal
      style: {
        layout: 'vertical', // Mostrar en un diseño vertical
        size: 'small' // Tamaño pequeño
      }
    })
    .render(this.paypalElement.nativeElement);
  }
}
