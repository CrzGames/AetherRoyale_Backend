/**
 * Les données de la réponse de connexion.
 * @type {object} SignInResponse
 * @property {Server[]} listServers - La liste des serveurs de jeu auxquels l'utilisateur peut se connecter.
 * @property {string} keyEncryption - La clé d'encodage des paquets UDP pour la communication avec les serveurs de jeu.
 * @property {string} tokenJWT - Le jeton JWT d'authentification de l'utilisateur.
 */
export interface LoginSuccessResponseBody {
  keyEncryption: string
  tokenJWT: string
}
