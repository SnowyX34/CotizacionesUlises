import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../../products/services/product.service';
import { AddToCartDTO } from '@shared/dto/cart.dto'; 
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
  standalone: false
})
export class CartComponent implements OnInit {
  cartItems: AddToCartDTO[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
  const userId = this.authService.getUserId();

  if (userId === null) {
    console.error('El usuario no está autenticado.');
    return; // o puedes redirigir al login
  }

  this.cartService.getCartByUser(userId).subscribe({
    next: (response: AddToCartDTO[]) => {
      this.cartItems = response;
    },
    error: (error: any) => {
      console.error('Error cargando carrito: ', error);
    }
  });
}

  getImageUrl(path: string): string {
    return this.productService.getImageUrl(path);
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.precio_total, 0);
  }

  updateQuantity(item: AddToCartDTO): void {
    const updatedItem = {
      ...item,
      precio_total: item.quantity * (item.product?.price || 0)
    };

    this.cartService.updateCart(updatedItem.cart_id, updatedItem).subscribe({
      next: () => {
        this.loadCart();
      },
      error: (err: any) => {
        console.error('Error al actualizar la cantidad:', err);
      }
    });
  }

  deleteFromCart(cartId: number): void {
    this.cartService.deleteCart(cartId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item.cart_id !== cartId);
      },
      error: (err: any) => {
        console.error('Error al eliminar el producto del carrito:', err);
      }
    });
  }
}
