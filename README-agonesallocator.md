# Agones Allocator

Cette section explique comment intégrer **Agones Allocator (gRPC)** dans le backend (AdonisJS) et comment générer / versionner les types TypeScript à partir des fichiers `.proto`.

<br /><br />

---

<br /><br />

## 1) Récupération des dépendances `.proto` depuis le dépôt Agones (recommandé)

Le fichier `allocation.proto` d’Agones dépend d’autres fichiers `.proto` (google/api et grpc-gateway).
Plutôt que de copier ces fichiers manuellement depuis plusieurs sources, on utilise **directement ceux fournis par le dépôt Agones**, afin de garantir :

* La compatibilité avec la version exacte d’Agones utilisée
* Aucun décalage de version
* Une reproductibilité simple

### Étape 1 — Cloner Agones avec ses submodules

```bash
git clone --branch v1.55.0 --recurse-submodules git@github.com:googleforgames/agones.git
```

Cela crée l’arborescence suivante :

```
agones/proto/
  allocation/
  googleapis/
  grpc-gateway/
  sdk/
```

### Étape 2 — Copier les dépendances nécessaires dans le backend

Le backend AdonisJS charge `allocation.proto` avec :

```ts
includeDirs: [allocationDir]
```

Donc toutes les dépendances doivent être résolues **relativement au dossier** :

```
agones-allocator/proto/allocation/
```

Il faut donc copier les fichiers requis depuis le dépôt Agones vers cette structure.

#### Google API

Depuis :

```
agones/proto/googleapis/google/api/
```

Copier :

```
annotations.proto
http.proto
```

Vers :

```
agones-allocator/proto/allocation/google/api/
```

#### grpc-gateway / OpenAPI v2

Depuis :

```
agones/proto/grpc-gateway/protoc-gen-openapiv2/options/
```

Copier :

```
annotations.proto
openapiv2.proto
```

Vers :

```
agones-allocator/proto/allocation/protoc-gen-openapiv2/options/
```

### Structure finale attendue

```
agones-allocator/proto/allocation/
  allocation.proto

  google/
    api/
      annotations.proto
      http.proto

  protoc-gen-openapiv2/
    options/
      annotations.proto
      openapiv2.proto
```

### Pourquoi cette étape est nécessaire ?

`allocation.proto` contient des imports comme :

```
import "google/api/annotations.proto";
import "protoc-gen-openapiv2/options/annotations.proto";
```

Au runtime, `@grpc/proto-loader` doit pouvoir résoudre ces chemins.

Comme le loader utilise :

```ts
includeDirs: [allocationDir]
```

il cherche automatiquement :

```
allocation/google/api/annotations.proto
allocation/protoc-gen-openapiv2/options/annotations.proto
```

Sans ces fichiers, le backend échoue au démarrage avec une erreur :

```
ENOENT: no such file or directory
google/api/annotations.proto
```

<br /><br />

---

<br /><br />

## 2) Générer les fichiers TypeScript depuis les `.proto`

### Pourquoi ?

Le `.proto` d’Agones importe des dépendances (`google/api/...`, `grpc-gateway/...`), donc il faut fournir les _include paths_.

### 2.1 Clone Agones au tag (avec submodules)

```bash
git clone --branch v1.55.0 --recurse-submodules git@github.com:googleforgames/agones.git
```

Cela crée un dossier :

```
agones/proto/
  allocation/
  googleapis/
  grpc-gateway/
  sdk/
```

### 2.2 Génération des `.ts` (dans le projet AdonisJS)

Depuis la racine du backend AdonisJS (`AetherRoyale_Backend/`) :

```powershell
.\node_modules\.bin\proto-loader-gen-types.cmd `
  --keepCase `
  --longs=String `
  --enums=String `
  --defaults `
  --oneofs `
  --includeComments `
  --grpcLib=@grpc/grpc-js `
  -I "C:\Users\Corentin\Desktop\OrganizationCrzGames\agones\proto" `
  -I "C:\Users\Corentin\Desktop\OrganizationCrzGames\agones\proto\googleapis" `
  -I "C:\Users\Corentin\Desktop\OrganizationCrzGames\agones\proto\grpc-gateway" `
  --outDir "agones-allocator/proto/generated" `
  "C:\Users\Corentin\Desktop\OrganizationCrzGames\agones\proto\allocation\allocation.proto"
```

Résultat attendu :

```
agones-allocator/proto/generated/
  allocation.ts
  allocation/
  google/
  grpc/
```

⚠️ `agones-allocator/proto/generated/` ne doit pas être lint/typechecké

<br /><br />

---

<br /><br />

## 3) Générer les fichiers `.d.ts` (types-only) et les versionner

### Objectif

- Ne pas importer les `.ts` générés dans le code (sinon ESM + extensions = enfer)
- Versionner uniquement des types (`.d.ts`)
- Consommer via `import type ...` + alias `#agones/*`

### 3.1 `tsconfig.agones-types.json`

Ce fichier compile uniquement les fichiers générés vers des `.d.ts` :

```json
{
  "compilerOptions": {
    "declaration": true,
    "emitDeclarationOnly": true,
    "declarationMap": false,
    "outDir": "agones-allocator/proto/generated-dts",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "skipLibCheck": true,
    "stripInternal": true
  },
  "include": ["agones-allocator/proto/generated/**/*.ts"]
}
```

### 3.2 Commande de génération `.d.ts`

```bash
npx tsc -p tsconfig.agones-types.json
```

Résultat attendu :

```
agones-allocator/proto/generated-dts/
  allocation.d.ts
  allocation/
    AllocationRequest.d.ts
    AllocationResponse.d.ts
    AllocationService.d.ts
    ...
  google/
  grpc/
```