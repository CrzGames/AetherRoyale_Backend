# Agones Allocator

Cette section explique comment intégrer **Agones Allocator (gRPC)** dans le backend (AdonisJS) et comment générer / versionner les types TypeScript à partir des fichiers `.proto`.

---

## 1) Récupérer `allocation.proto` (Agones)

Source officielle (tag à adapter si besoin) :
https://github.com/googleforgames/agones/blob/v1.55.0/proto/allocation/allocation.proto

Copier/coller le fichier dans :

```
agones-allocator/proto/allocation/allocation.proto
```

Astuce : tu peux déposer un fichier “marker” de version (ex: `v1.55.0-agones`) dans le dossier pour savoir quel tag tu utilises.

---

## 2) Générer les fichiers TypeScript depuis les `.proto`

### Pourquoi ?

Le `.proto` d’Agones importe des dépendances (`google/api/...`, `grpc-gateway/...`), donc il faut fournir les *include paths*.

---

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

---

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

---

## 3) Générer les fichiers `.d.ts` (types-only) et les versionner

### Objectif

* Ne pas importer les `.ts` générés dans le code (sinon ESM + extensions = enfer)
* Versionner uniquement des types (`.d.ts`)
* Consommer via `import type ...` + alias `#agones/*`

---

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

---

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