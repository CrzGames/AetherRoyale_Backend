/**
 * Interface pour le corps de la requête de connexion
 * @interface
 * @property {string} email - L'email de l'utilisateur
 * @property {string} password - Le mot de passe de l'utilisateur
 * @property {string} ipAddress - L'adresse IP de l'utilisateur
 */
export interface SingInRequestBody {
  email: string
  password: string
}
