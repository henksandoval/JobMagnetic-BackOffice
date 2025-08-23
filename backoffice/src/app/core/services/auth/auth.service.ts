import {Injectable, signal} from '@angular/core';
import {User} from './interfaces/user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Signal para el estado de autenticación
  isAuthenticated = signal(false);

  // Signal para el usuario actual
  currentUser = signal<User | null>(null);

  constructor(private router: Router) {
    // Verificar si hay una sesión almacenada al inicializar
    this.checkStoredAuth();
  }

  /**
   * Simula el proceso de login
   */
  async login(email: string, password: string): Promise<boolean> {
    try {
      // Simulación de validación (en una app real, esto sería una llamada HTTP)
      if (email && password) {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Usuario simulado
        const user: User = {
          id: '1',
          email: email,
          name: email.split('@')[0],
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        };

        // Actualizar el estado
        this.currentUser.set(user);
        this.isAuthenticated.set(true);

        // Guardar en localStorage para persistencia
        localStorage.setItem('auth_user', JSON.stringify(user));
        localStorage.setItem('auth_token', 'simulated_jwt_token');

        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  /**
   * Proceso de logout
   */
  logout(): void {
    // Limpiar el estado
    this.isAuthenticated.set(false);
    this.currentUser.set(null);

    // Limpiar localStorage
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');

    // Redirigir al login
    this.router.navigate(['/login']);
  }

  /**
   * Verificar autenticación almacenada
   */
  private checkStoredAuth(): void {
    const storedUser = localStorage.getItem('auth_user');
    const storedToken = localStorage.getItem('auth_token');

    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUser.set(user);
        this.isAuthenticated.set(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        this.clearStoredAuth();
      }
    }
  }

  /**
   * Limpiar autenticación almacenada
   */
  private clearStoredAuth(): void {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
  }

  /**
   * Obtener token (para futuras llamadas API)
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Verificar si el usuario está autenticado (método helper)
   */
  checkAuth(): boolean {
    return this.isAuthenticated();
  }
}
