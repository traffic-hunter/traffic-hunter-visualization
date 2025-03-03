/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as MembersSignupImport } from './routes/members/signup'
import { Route as MembersLoginImport } from './routes/members/login'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const MembersSignupRoute = MembersSignupImport.update({
  id: '/members/signup',
  path: '/members/signup',
  getParentRoute: () => rootRoute,
} as any)

const MembersLoginRoute = MembersLoginImport.update({
  id: '/members/login',
  path: '/members/login',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/members/login': {
      id: '/members/login'
      path: '/members/login'
      fullPath: '/members/login'
      preLoaderRoute: typeof MembersLoginImport
      parentRoute: typeof rootRoute
    }
    '/members/signup': {
      id: '/members/signup'
      path: '/members/signup'
      fullPath: '/members/signup'
      preLoaderRoute: typeof MembersSignupImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/members/login': typeof MembersLoginRoute
  '/members/signup': typeof MembersSignupRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/members/login': typeof MembersLoginRoute
  '/members/signup': typeof MembersSignupRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/members/login': typeof MembersLoginRoute
  '/members/signup': typeof MembersSignupRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/members/login' | '/members/signup'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/members/login' | '/members/signup'
  id: '__root__' | '/' | '/members/login' | '/members/signup'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  MembersLoginRoute: typeof MembersLoginRoute
  MembersSignupRoute: typeof MembersSignupRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  MembersLoginRoute: MembersLoginRoute,
  MembersSignupRoute: MembersSignupRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/members/login",
        "/members/signup"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/members/login": {
      "filePath": "members/login.tsx"
    },
    "/members/signup": {
      "filePath": "members/signup.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
