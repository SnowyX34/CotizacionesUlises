import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';
import { jwtDecode } from 'jwt-decode';

// ✅ Interfaz para el payload del token
interface TokenPayload {
  user_id: number;
  email: string;
  role: string;
  username: string;
  user_secondName: string;
  avatarUrl: string;
  exp: number;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  standalone: false
})
export class Navbar implements OnInit {
  
  isLoggedIn = false;
  showProfileMenu = false;
  userName = 'Usuario';
  avatarUrl = '';
  userInfo: TokenPayload | null = null;

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.checkAuthStatus();
    
    // ✅ Opcional: Escuchar cambios en el localStorage
    window.addEventListener('storage', (e) => {
      if (e.key === 'token') {
        this.checkAuthStatus();
      }
    });
  }

  private checkAuthStatus() {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        const currentTime = Date.now() / 1000;
        
        // ✅ Verificar si el token no ha expirado
        if (decoded.exp > currentTime) {
          this.isLoggedIn = true;
          this.userInfo = decoded;
          
          // ✅ Usar username del token (que corresponde a user_name del modelo)
          this.userName = decoded.username || 'Usuario';
          
          // ✅ CORRECCIÓN: Construir URL completa para el avatar
          if (decoded.avatarUrl) {
            // Si avatarUrl ya incluye el dominio completo, usarlo tal como está
            if (decoded.avatarUrl.startsWith('http')) {
              this.avatarUrl = decoded.avatarUrl;
            } else {
              // Si es una ruta relativa, construir la URL completa
              // Remover barras duplicadas
              const cleanEndpoint = environment.endpoint.replace(/\/$/, '');
              const cleanAvatarUrl = decoded.avatarUrl.startsWith('/') 
                ? decoded.avatarUrl 
                : `/${decoded.avatarUrl}`;
              this.avatarUrl = `${cleanEndpoint}${cleanAvatarUrl}`;
            }
          } else {
            // URL por defecto si no hay avatar
            this.avatarUrl = `${environment.endpoint.replace(/\/$/, '')}/uploads/default-user.png`;
          }
          
          console.log('Usuario logueado:', {
            username: this.userName,
            avatarUrl: this.avatarUrl,
            decodedAvatarUrl: decoded.avatarUrl,
            endpoint: environment.endpoint,
            userInfo: this.userInfo
          });
        } else {
          // ✅ Token expirado, limpiar
          console.warn('Token expirado, cerrando sesión automáticamente');
          this.logout();
        }
      } catch (error) {
        console.error('Error al decodificar token:', error);
        this.logout();
      }
    } else {
      this.isLoggedIn = false;
      this.userName = 'Usuario';
      this.avatarUrl = '';
      this.userInfo = null;
    }
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.showProfileMenu = false;
    this.userName = 'Usuario';
    this.avatarUrl = '';
    this.userInfo = null;
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  // ✅ Método mejorado para manejar errores de carga de imagen
  onImageError(event: any) {
    console.error('Error cargando imagen del avatar:', {
      originalSrc: event.target.src,
      avatarUrl: this.avatarUrl,
      userInfo: this.userInfo
    });
    
    // Intentar con la imagen por defecto
    const defaultImageUrl = `${environment.endpoint.replace(/\/$/, '')}/uploads/default-user.png`;
    
    // Evitar bucle infinito si la imagen por defecto también falla
    if (event.target.src !== defaultImageUrl) {
      event.target.src = defaultImageUrl;
    } else {
      // Si hasta la imagen por defecto falla, ocultar la imagen
      event.target.style.display = 'none';
      console.error('Imagen por defecto también falló, ocultando avatar');
    }
  }

  // ✅ Método para cerrar el menú al hacer clic fuera
  closeProfileMenu() {
    this.showProfileMenu = false;
  }
}