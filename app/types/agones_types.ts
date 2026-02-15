/**
 * Token de match encodé en base64.
 * Représente 16 bytes aléatoires générés par le backend.
 * Utilisé par Quilkin pour router les paquets UDP vers le bon GameServer.
 */
export type MatchTokenBase64 = string

/**
 * Clé de chiffrement symétrique XChaCha20-Poly1305 encodée en base64.
 * Générée par le backend pour chaque match.
 * Utilisée par le client et le GameServer pour chiffrer/déchiffrer les paquets UDP.
 */
export type UdpEncryptionKeyBase64 = string

/**
 * Données de sécurité retournées lors de l’allocation d’un GameServer.
 * Contient le token de routage Quilkin et la clé de chiffrement UDP du match.
 */
export interface AllocationSecurityData {
  matchTokenBase64: MatchTokenBase64
  udpEncryptionKeyBase64: UdpEncryptionKeyBase64
}
