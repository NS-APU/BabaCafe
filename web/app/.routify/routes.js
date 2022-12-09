/**
 * @roxi/routify 2.18.8
 * File generated Sat Dec 10 2022 01:09:53 GMT+0900 (日本標準時)
 */

export const __version = "2.18.8";
export const __timestamp = "2022-12-09T16:09:53.934Z";

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes";

//imports

//options
export const options = {};

//tree
export const _tree = {
  name: "root",
  filepath: "/",
  root: true,
  ownMeta: {},
  absolutePath: "src/pages",
  children: [
    {
      isFile: true,
      isDir: false,
      file: "_fallback.svelte",
      filepath: "/_fallback.svelte",
      name: "_fallback",
      ext: "svelte",
      badExt: false,
      absolutePath:
        "/Users/sugawarakei/Desktop/BabaCafe/web/app/src/pages/_fallback.svelte",
      importPath: "../src/pages/_fallback.svelte",
      isLayout: false,
      isReset: false,
      isIndex: false,
      isFallback: true,
      isPage: false,
      ownMeta: {},
      meta: {
        recursive: true,
        preload: false,
        prerender: true,
      },
      path: "/_fallback",
      id: "__fallback",
      component: () =>
        import("../src/pages/_fallback.svelte").then((m) => m.default),
    },
    {
      isFile: true,
      isDir: false,
      file: "index.svelte",
      filepath: "/index.svelte",
      name: "index",
      ext: "svelte",
      badExt: false,
      absolutePath:
        "/Users/sugawarakei/Desktop/BabaCafe/web/app/src/pages/index.svelte",
      importPath: "../src/pages/index.svelte",
      isLayout: false,
      isReset: false,
      isIndex: true,
      isFallback: false,
      isPage: true,
      ownMeta: {},
      meta: {
        recursive: true,
        preload: false,
        prerender: true,
      },
      path: "/index",
      id: "_index",
      component: () =>
        import("../src/pages/index.svelte").then((m) => m.default),
    },
    {
      isFile: false,
      isDir: true,
      file: "login",
      filepath: "/login",
      name: "login",
      ext: "",
      badExt: false,
      absolutePath:
        "/Users/sugawarakei/Desktop/BabaCafe/web/app/src/pages/login",
      children: [
        {
          isFile: true,
          isDir: false,
          file: "index.svelte",
          filepath: "/login/index.svelte",
          name: "index",
          ext: "svelte",
          badExt: false,
          absolutePath:
            "/Users/sugawarakei/Desktop/BabaCafe/web/app/src/pages/login/index.svelte",
          importPath: "../src/pages/login/index.svelte",
          isLayout: false,
          isReset: false,
          isIndex: true,
          isFallback: false,
          isPage: true,
          ownMeta: {},
          meta: {
            recursive: true,
            preload: false,
            prerender: true,
          },
          path: "/login/index",
          id: "_login_index",
          component: () =>
            import("../src/pages/login/index.svelte").then((m) => m.default),
        },
      ],
      isLayout: false,
      isReset: false,
      isIndex: false,
      isFallback: false,
      isPage: false,
      ownMeta: {},
      meta: {
        recursive: true,
        preload: false,
        prerender: true,
      },
      path: "/login",
    },
    {
      isFile: false,
      isDir: true,
      file: "product",
      filepath: "/product",
      name: "product",
      ext: "",
      badExt: false,
      absolutePath:
        "/Users/sugawarakei/Desktop/BabaCafe/web/app/src/pages/product",
      children: [
        {
          isFile: true,
          isDir: false,
          file: "index.svelte",
          filepath: "/product/index.svelte",
          name: "index",
          ext: "svelte",
          badExt: false,
          absolutePath:
            "/Users/sugawarakei/Desktop/BabaCafe/web/app/src/pages/product/index.svelte",
          importPath: "../src/pages/product/index.svelte",
          isLayout: false,
          isReset: false,
          isIndex: true,
          isFallback: false,
          isPage: true,
          ownMeta: {},
          meta: {
            recursive: true,
            preload: false,
            prerender: true,
          },
          path: "/product/index",
          id: "_product_index",
          component: () =>
            import("../src/pages/product/index.svelte").then((m) => m.default),
        },
        {
          isFile: true,
          isDir: false,
          file: "new.svelte",
          filepath: "/product/new.svelte",
          name: "new",
          ext: "svelte",
          badExt: false,
          absolutePath:
            "/Users/sugawarakei/Desktop/BabaCafe/web/app/src/pages/product/new.svelte",
          importPath: "../src/pages/product/new.svelte",
          isLayout: false,
          isReset: false,
          isIndex: false,
          isFallback: false,
          isPage: true,
          ownMeta: {},
          meta: {
            recursive: true,
            preload: false,
            prerender: true,
          },
          path: "/product/new",
          id: "_product_new",
          component: () =>
            import("../src/pages/product/new.svelte").then((m) => m.default),
        },
      ],
      isLayout: false,
      isReset: false,
      isIndex: false,
      isFallback: false,
      isPage: false,
      ownMeta: {},
      meta: {
        recursive: true,
        preload: false,
        prerender: true,
      },
      path: "/product",
    },
    {
      isFile: false,
      isDir: true,
      file: "reservation",
      filepath: "/reservation",
      name: "reservation",
      ext: "",
      badExt: false,
      absolutePath:
        "/Users/sugawarakei/Desktop/BabaCafe/web/app/src/pages/reservation",
      children: [
        {
          isFile: true,
          isDir: false,
          file: "index.svelte",
          filepath: "/reservation/index.svelte",
          name: "index",
          ext: "svelte",
          badExt: false,
          absolutePath:
            "/Users/sugawarakei/Desktop/BabaCafe/web/app/src/pages/reservation/index.svelte",
          importPath: "../src/pages/reservation/index.svelte",
          isLayout: false,
          isReset: false,
          isIndex: true,
          isFallback: false,
          isPage: true,
          ownMeta: {},
          meta: {
            recursive: true,
            preload: false,
            prerender: true,
          },
          path: "/reservation/index",
          id: "_reservation_index",
          component: () =>
            import("../src/pages/reservation/index.svelte").then(
              (m) => m.default
            ),
        },
        {
          isFile: true,
          isDir: false,
          file: "new.svelte",
          filepath: "/reservation/new.svelte",
          name: "new",
          ext: "svelte",
          badExt: false,
          absolutePath:
            "/Users/sugawarakei/Desktop/BabaCafe/web/app/src/pages/reservation/new.svelte",
          importPath: "../src/pages/reservation/new.svelte",
          isLayout: false,
          isReset: false,
          isIndex: false,
          isFallback: false,
          isPage: true,
          ownMeta: {},
          meta: {
            recursive: true,
            preload: false,
            prerender: true,
          },
          path: "/reservation/new",
          id: "_reservation_new",
          component: () =>
            import("../src/pages/reservation/new.svelte").then(
              (m) => m.default
            ),
        },
      ],
      isLayout: false,
      isReset: false,
      isIndex: false,
      isFallback: false,
      isPage: false,
      ownMeta: {},
      meta: {
        recursive: true,
        preload: false,
        prerender: true,
      },
      path: "/reservation",
    },
    {
      isFile: false,
      isDir: true,
      file: "signup",
      filepath: "/signup",
      name: "signup",
      ext: "",
      badExt: false,
      absolutePath:
        "/Users/sugawarakei/Desktop/BabaCafe/web/app/src/pages/signup",
      children: [
        {
          isFile: true,
          isDir: false,
          file: "index.svelte",
          filepath: "/signup/index.svelte",
          name: "index",
          ext: "svelte",
          badExt: false,
          absolutePath:
            "/Users/sugawarakei/Desktop/BabaCafe/web/app/src/pages/signup/index.svelte",
          importPath: "../src/pages/signup/index.svelte",
          isLayout: false,
          isReset: false,
          isIndex: true,
          isFallback: false,
          isPage: true,
          ownMeta: {},
          meta: {
            recursive: true,
            preload: false,
            prerender: true,
          },
          path: "/signup/index",
          id: "_signup_index",
          component: () =>
            import("../src/pages/signup/index.svelte").then((m) => m.default),
        },
      ],
      isLayout: false,
      isReset: false,
      isIndex: false,
      isFallback: false,
      isPage: false,
      ownMeta: {},
      meta: {
        recursive: true,
        preload: false,
        prerender: true,
      },
      path: "/signup",
    },
  ],
  isLayout: false,
  isReset: false,
  isIndex: false,
  isFallback: false,
  meta: {
    recursive: true,
    preload: false,
    prerender: true,
  },
  path: "/",
};

export const { tree, routes } = buildClientTree(_tree);
