import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service'
import { AddToCartDTO } from '@shared/dto/cart.dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  standalone: false,
  styleUrls: ['./cart.css'],
})

export class CartComponent implements OnInit {
  cartItems: AddToCartDTO[] = [];
  newCart:  AddToCartDTO  = {cart_id: 0, user_id: 0, product_id: 0, model: '', precio_total:0, height: '', width: '', quantity: 0}
  toastr: any;

  constructor(private readonly cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getAllCartItems().subscribe({
      next: (items) => this.cartItems = items,
      error: (err) => console.error('Error cargando carrito:', err),
    });
  }

  addProductToCart(): void {
    if (!this.newCart.model || !this.newCart.height || !this.newCart.width || !this.newCart.quantity  || !this.newCart.quantity) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    const formData = new FormData();
    formData.append('Cart_Id', String(this.newCart.cart_id));
    formData.append('User_Id', String(this.newCart.user_id));
    formData.append('Product_Id', String(this.newCart.product_id));
    formData.append('modelo', String(this.newCart.model));
    formData.append('Alto', String(this.newCart.height));
    formData.append('Ancho', String(this.newCart.width));
    formData.append('Cantidad', String(this.newCart.quantity));
    formData.append('Precio total', String(this.newCart.precio_total));

    this.cartService.addToCart(formData).subscribe({
      next: () => {
        this.toastr.success('Producto agregado');
        this.fetchProducts();
        this.newProduct = { modelo: '', color: '', costo_m2: 0, img_Url: '', productType: ''};
        this.selectedFile = null;
        // ✅ Limpiar el input file
        this.clearFileInput();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al agregar producto:', error);
        this.toastr.error('Error al agregar producto', 'Error');
      }
    });
  }

  updateProduct(id: string): void {
    const updated: Partial<AddToCartDTO> = {
      quantity: 5,
      precio_total: 750
    };

    this.cartService.updateCart(id, updated).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error('Error actualizando producto:', err),
    });
  }

  deleteProduct(id: string): void {
    this.cartService.deleteCartItem(id).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error('Error eliminando producto:', err),
    });
  }
}
