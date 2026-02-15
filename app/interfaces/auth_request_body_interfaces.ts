/**
 * Interface pour le corps de la requête d'inscription
 * @interface
 * @property {string} username - Le nom d'utilisateur
 * @property {string} email - L'email de l'utilisateur
 * @property {string} password - Le mot de passe de l'utilisateur
 */
export interface SignUpRequestBody {
  username: string
  email: string
  password: string
}

/**
 * Interface pour le corps de la requête de connexion
 * @interface
 * @property {string} email - L'email de l'utilisateur
 * @property {string} password - Le mot de passe de l'utilisateur
 */
export interface SingInRequestBody {
  email: string
  password: string
}
