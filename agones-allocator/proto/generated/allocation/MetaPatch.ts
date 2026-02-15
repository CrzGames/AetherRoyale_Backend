// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/allocation/allocation.proto


/**
 * MetaPatch is the metadata used to patch the GameServer metadata on allocation
 */
export interface MetaPatch {
  'labels'?: ({[key: string]: string});
  'annotations'?: ({[key: string]: string});
}

/**
 * MetaPatch is the metadata used to patch the GameServer metadata on allocation
 */
export interface MetaPatch__Output {
  'labels': ({[key: string]: string});
  'annotations': ({[key: string]: string});
}
