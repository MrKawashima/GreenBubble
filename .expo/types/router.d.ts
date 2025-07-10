/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/login` | `/(auth)/onboarding` | `/(auth)/signup` | `/(auth)/welcome` | `/(tabs)` | `/(tabs)/` | `/(tabs)/challenges` | `/(tabs)/history` | `/(tabs)/profile` | `/(tabs)/progress` | `/_sitemap` | `/challenges` | `/history` | `/login` | `/onboarding` | `/profile` | `/progress` | `/signup` | `/welcome`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
