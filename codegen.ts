
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/graphql",
  documents: "app/**/*.{tsx,ts}",
  generates: {
    "app/gql/": {
      preset: "client",
      config: {
        enumsAsTypes: false, // Jeśli chcesz prawdziwe TS Enums zamiast unii stringów
        futureProofEnums: true,
      }
    }
  }
};

export default config;
