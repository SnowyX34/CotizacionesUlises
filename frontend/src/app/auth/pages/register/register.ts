import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../services/error.service';
import { Register } from '../../../../../../backend/src/domain/dto/register.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { ImageUploadService } from '../../services/image.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  standalone: false,
  styleUrls: ['./register.css']
})
export class SignInComponent implements OnInit {
  user_name: string = '';
  user_secondName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  phone_number: string = '';
  role: string = 'user';
  avatarUrl: string = '';
  loading: boolean = false;
  agreeToTerms: boolean = false;

  // Propiedades para el manejo de imágenes
  avatarPreview: string | null = null;
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  maxFileSize: number = 5 * 1024 * 1024; // 5MB
  allowedFileTypes: string[] = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  constructor(
    private readonly toastr: ToastrService,
    private readonly _userService: RegisterService,
    private readonly router: Router,
    private readonly _errorService: ErrorService,
    private readonly _imageUploadService: ImageUploadService
  ) {}

  ngOnInit(): void {}

  togglePassword(inputId: string, toggleId: string) {
    const passwordInput = document.getElementById(inputId) as HTMLInputElement | null;
    const toggleButton = document.getElementById(toggleId);

    if (passwordInput && toggleButton) {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      toggleButton.classList.toggle('show-password', isPassword);
      toggleButton.classList.toggle('hide-password', !isPassword);
    }
  }

  /**
   * Maneja la selección de imagen
   * @param event - Evento del input file
   */
  async onImageSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // Validar archivo usando el servicio
    const validation = this._imageUploadService.validateImageFile(file);
    if (!validation.isValid) {
      this.toastr.error(validation.error!, 'Error');
      return;
    }

    try {
      // Opcional: redimensionar la imagen antes de mostrar la vista previa
      const resizedFile = await this._imageUploadService.resizeImage(file, 400, 400, 0.9);
      this.selectedFile = resizedFile;
      this.createImagePreview(resizedFile);
    } catch (error) {
      console.error('Error al procesar la imagen:', error);
      this.selectedFile = file;
      this.createImagePreview(file);
    }
  }

  /**
   * Crea una vista previa de la imagen seleccionada
   * @param file - Archivo de imagen seleccionado
   */
  private createImagePreview(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.avatarPreview = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  /**
   * Remueve la imagen seleccionada
   */
  removeAvatar() {
    this.selectedFile = null;
    this.avatarPreview = null;
    this.avatarUrl = '';
    this.uploadProgress = 0;
    
    // Limpiar el input file
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  /**
   * Sube la imagen al servidor
   * @returns Promise<string> - URL de la imagen subida
   */
  private async uploadImage(): Promise<string> {
    if (!this.selectedFile) return '';

    return new Promise((resolve, reject) => {
      this._imageUploadService.uploadAvatar(this.selectedFile!).subscribe({
        next: (event) => {
          this.uploadProgress = event.progress;
          
          if (event.response) {
            // Subida completada
            resolve(event.response.url);
          }
        },
        error: (error) => {
          this.uploadProgress = 0;
          console.error('Error uploading image:', error);
          reject(error);
        }
      });
    });
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    if (this.password !== this.confirmPassword) {
      this.toastr.error('Las contraseñas no coinciden', 'Error');
      return;
    }

    if (!this.agreeToTerms) {
      this.toastr.error('Debe aceptar los términos y condiciones', 'Error');
      return;
    }

    this.addUser();
  }

  async addUser() {
    if (
      this.user_name.trim() === '' ||
      this.user_secondName.trim() === '' ||
      this.email.trim() === '' ||
      this.password.trim() === '' ||
      this.confirmPassword.trim() === '' ||
      this.phone_number.trim() === ''
    ) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.toastr.error('Las contraseñas ingresadas son distintas', 'Error');
      return;
    }

    this.loading = true;

    try {
      // Subir imagen si fue seleccionada
      if (this.selectedFile) {
        this.avatarUrl = await this.uploadImage();
      }

      const user: Register = {
        user_name: this.user_name,
        user_secondName: this.user_secondName,
        email: this.email,
        password: this.password,
        phone_number: this.phone_number,
        role: this.role,
        avatarUrl: this.avatarUrl
      };

      this._userService.signIn(user).subscribe({
        next: () => {
          this.loading = false;
          this.toastr.success(`Usuario ${this.user_name} registrado con éxito`, 'Registro exitoso');
          this.router.navigate(['/Home']);
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false;
          this._errorService.msjError(e);
        }
      });
    } catch (error) {
      this.loading = false;
      this.toastr.error('Error al subir la imagen', 'Error');
      console.error('Error uploading image:', error);
    }
  }

  /**
   * Valida si el archivo es una imagen válida
   * @param file - Archivo a validar
   * @returns boolean
   */
  private isValidImageFile(file: File): boolean {
    return this.allowedFileTypes.includes(file.type) && file.size <= this.maxFileSize;
  }

  /**
   * Formatea el tamaño del archivo para mostrar
   * @param bytes - Tamaño en bytes
   * @returns string - Tamaño formateado
   */
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}