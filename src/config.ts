export interface IProcessEnv {
  NEXT_PUBLIC_AUTH_URL: string;
  NEXT_PUBLIC_AUTH_REALM: string;
  NEXT_PUBLIC_AUTH_CLIENT: string;
  NEXT_PUBLIC_GRAPHQL_URL: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends IProcessEnv {}
  }
}
