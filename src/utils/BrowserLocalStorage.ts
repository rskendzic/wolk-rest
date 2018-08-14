import { SessionStorage } from '../model/SessionStorage';

export default class BrowserLocalStorage implements SessionStorage {
  private readonly _tokenKey: string;

  constructor() {
    this._tokenKey = 'wa-token';
  }

  /**
   * Get Token from Browser's Local Storage
   * @returns {String} Token
   */
  public getToken(): string {
    return localStorage.getItem(this._tokenKey) || '';
  }

  /**
   * Save token in Browser's Local Storage
   * @param {String} token Retrieved by register or login
   */
  public setToken(token: string): void {
    localStorage.setItem(this._tokenKey, `Bearer ${token}`);
  }

  /**
   * Delete token from Browser's Local Storage
   */
  public clearToken(): void {
    localStorage.removeItem(this._tokenKey);
  }
}