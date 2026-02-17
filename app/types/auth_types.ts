import type { SignUpRequestBody, SingInRequestBody } from '#interfaces/auth_request_body_interfaces'

/**
 * Interface représentant les données de connexion d'un utilisateur
 * qui étend les données de la requête de connexion.
 * @interface
 * @property {string} email - L'email de l'utilisateur
 * @property {string} password - Le mot de passe de l'utilisateur
 * @property {string} ipAddress - L'adresse IP de l'utilisateur
 */
export interface SingInData extends SingInRequestBody {}

/**
 * Interface représentant les données d'inscription d'un utilisateur
 * @interface
 * @property {string} username - Le nom d'utilisateur
 * @property {string} email - L'email de l'utilisateur
 * @property {string} password - Le mot de passe de l'utilisateur
 */
export interface SignUpData extends SignUpRequestBody {}
