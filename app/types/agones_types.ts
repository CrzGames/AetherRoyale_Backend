/**
 * Token de match encodé en base64.
 * Représente 16 bytes aléatoires générés par le backend.
 * Utilisé par Quilkin pour router les paquets UDP vers le bon GameServer.
 */
export type MatchTokenBase64 = string
