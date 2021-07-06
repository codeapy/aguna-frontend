// eslint-disable-next-line no-shadow
export enum ThemeStyle {
  MODERN = `modern`,
  STANDARD = `standard`,
}

// eslint-disable-next-line no-shadow
export enum ThemeStyleRadius {
  MODERN = 30,
  STANDARD = 4,
}

// eslint-disable-next-line no-shadow
export enum ThemeMode {
  LIGHT = `light`,
  SEMI_DARK = `semi-dark`,
  DARK = `dark`,
}

// eslint-disable-next-line no-shadow
export enum LayoutType {
  FULL_WIDTH = `full-width`,
  BOXED = `boxed`,
}

// eslint-disable-next-line no-shadow
export enum NavStyle {
  DEFAULT = `default`,
  MINI = `mini`,
  MINI_SIDEBAR_TOGGLE = `mini-sidebar-toggle`,
  STANDARD = `standard`,
  HEADER_USER = `user-header`,
  HEADER_USER_MINI = `user-mini-header`,
  DRAWER = `drawer`,
  BIT_BUCKET = `bit-bucket`,
  H_DEFAULT = `h-default`,
  HOR_LIGHT_NAV = `hor-light-nav`,
  HOR_DARK_LAYOUT = `hor-dark-layout`,
}

// eslint-disable-next-line no-shadow
export enum FooterType {
  FIXED = `fixed`,
  FLUID = `fluid`,
}

// eslint-disable-next-line no-shadow
export enum HeaderType {
  DARK = `dark`,
  LIGHT = `light`,
}

// eslint-disable-next-line no-shadow
export enum RouteTransition {
  NONE = `none`,
  FADE = `fade`,
  SLIDE_LEFT = `slideLeft`,
  SLIDE_RIGHT = `slideRight`,
  SLIDE_UP = `slideUp`,
  SLIDE_DOWN = `slideDown`,
}

// eslint-disable-next-line no-shadow
export enum Fonts {
  LIGHT = 300,
  REGULAR = 400,
  MEDIUM = 500,
  BOLD = 600,
  EXTRA_BOLD = 700,
}

// eslint-disable-next-line no-shadow
export enum AuthType {
  FIREBASE = `firebase`,
  AWS_COGNITO = `aws_cognito`,
  AUTH0 = `auth0`,
  JWT_AUTH = `jwt_auth`,
}
