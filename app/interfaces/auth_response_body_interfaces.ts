/**
 * Les données de la réponse de connexion.
 * @type {object} LoginSuccessResponseBody
 *
 * @property {string} keyEncryption
 * Clé de chiffrement symétrique unique générée à la connexion.
 * Elle est utilisée par le client pour chiffrer les paquets UDP (ex: XChaCha20-Poly1305)
 * lors de la communication avec les serveurs de jeu.
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
 */
export interface LoginSuccessResponseBody {
  keyEncryption: string
  token: {
    type: 'bearer'
    value: string
    expiresAt: string | null
  }
}
