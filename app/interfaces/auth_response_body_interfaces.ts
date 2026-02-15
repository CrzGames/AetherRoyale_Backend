/**
 * Les données de la réponse de connexion.
 * @type {object} LoginSuccessResponseBody
 * 
 * @property {object} token
 * Jeton d’accès opaque généré par AdonisJS (Access Tokens Guard).
 * Ce token doit être envoyé par le client dans l’en-tête HTTP :
 * Authorization: Bearer <token>
 *
 * @property {'bearer'} token.type
 * Type du token retourné par AdonisJS. Toujours "bearer".
 *
 * @property {string} token.value
 * Valeur publique du token (préfixée par "oat_").
 * Ce token est stocké côté serveur sous forme de hash et ne pourra plus être relu ensuite.
 *
 * @property {string|null} token.expiresAt
 * Date d’expiration du token au format ISO 8601, ou null si le token n’expire pas.
 * 
 * @property {string} quilkin_dns
 * DNS du service Quilkin exposant les GameServers Agones pour la communication UDP des clients.
 *
 * @property {number} quilkin_port
 * Port de communication UDP exposé par le service Quilkin pour les GameServers Agones.
 */
export interface LoginSuccessResponseBody {
  token: {
    type: 'bearer'
    value: string
    expiresAt: string | null
  },
  quilkin_dns: string,
  quilkin_port: number,
}
