class JWTService {
  private static  loginKey = "vercelCelebLoginToken";
    static saveLoginToken(token: string): void {
      if (token) {
        localStorage.setItem(this.loginKey, token);
      } else {
        console.error('Invalid token provided');
      }
    }
  
    static getToken(): string | null {
      return localStorage.getItem('jwtToken');
    }
  
    static removeToken(): void {
      localStorage.removeItem('jwtToken');
    }
  
    static isTokenValid(): boolean {
      const token = this.getToken();
      if (!token) return false;
  
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = payload.exp * 1000;
        return Date.now() < expirationTime;
      } catch (error) {
        console.error('Error decoding token:', error);
        return false;
      }
    }
  }
  
  export default JWTService;