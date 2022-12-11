/**
 * @roxi/routify 2.18.8
 * File generated Sun Dec 11 2022 13:32:09 GMT+0900 (日本標準時)
 */

export const __version = "2.18.8";
export const __timestamp = "2022-12-11T04:32:09.263Z";

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes";

//imports

//options
export const options = {};

//tree
export const _tree = {
  name: "_layout",
  filepath: "/_layout.svelte",
  root: true,
  ownMeta: {
    preload: "proximity",
  },
  absolutePath:
    "/Users/sugawarakei/Desktop/BabaCafe/web/app/src/pages/_layout.svelte",
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
        preload: "proximity",
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
        preload: "proximity",
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
            preload: "proximity",
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
        preload: "proximity",
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
            preload: "proximity",
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
            preload: "proximity",
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
        preload: "proximity",
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
            preload: "proximity",
            prerender: true,
          },
          path: "/reservation/index",
          id: "_reservation_index",
          component: () =>
            import("../src/pages/reservation/index.svelte").then(
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
        preload: "proximity",
        prerender: true,
      },
      path: "/reservation",
    },
    {
      isFile: false,
      isDir: true,
      file: "setting",
      filepath: "/setting",
      name: "setting",
      ext: "",
      badExt: false,
      absolutePath:
        "/Users/sugawarakei/Desktop/BabaCafe/web/app/src/pages/setting",
      children: [
        {
          isFile: true,
          isDir: false,
          file: "index.svelte",
          filepath: "/setting/index.svelte",
          name: "index",
          ext: "svelte",
          badExt: false,
          absolutePath:
            "/Users/sugawarakei/Desktop/BabaCafe/web/app/src/pages/setting/index.svelte",
          importPath: "../src/pages/setting/index.svelte",
          isLayout: false,
          isReset: false,
          isIndex: true,
          isFallback: false,
          isPage: true,
          ownMeta: {},
          meta: {
            recursive: true,
            preload: "proximity",
            prerender: true,
          },
          path: "/setting/index",
          id: "_setting_index",
          component: () =>
            import("../src/pages/setting/index.svelte").then((m) => m.default),
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
        preload: "proximity",
        prerender: true,
      },
      path: "/setting",
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
            preload: "proximity",
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
        preload: "proximity",
        prerender: true,
      },
      path: "/signup",
    },
  ],
  isLayout: true,
  isReset: false,
  isIndex: false,
  isFallback: false,
  isPage: false,
  isFile: true,
  file: "_layout.svelte",
  ext: "svelte",
  badExt: false,
  importPath: "../src/pages/_layout.svelte",
  meta: {
    preload: "proximity",
    recursive: true,
    prerender: true,
  },
  path: "/",
  id: "__layout",
  component: () => import("../src/pages/_layout.svelte").then((m) => m.default),
};

export const { tree, routes } = buildClientTree(_tree);
