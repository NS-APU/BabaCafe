/**
 * @roxi/routify 2.18.8
 * File generated Sat Dec 10 2022 21:57:43 GMT+0900 (日本標準時)
 */

export const __version = "2.18.8";
export const __timestamp = "2022-12-10T12:57:43.519Z";

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes";

//imports

//options
export const options = {};

//tree
export const _tree = {
  root: true,
  ownMeta: {
    preload: "proximity",
  },
  children: [
    {
      isFallback: true,
      meta: {
        recursive: true,
        preload: "proximity",
        prerender: true,
      },
      path: "/_fallback",
      component: () =>
        import("../src/pages/_fallback.svelte").then((m) => m.default),
    },
    {
      isIndex: true,
      isPage: true,
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
      isDir: true,
      ext: "",
      children: [
        {
          isIndex: true,
          isPage: true,
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
      meta: {
        recursive: true,
        preload: "proximity",
        prerender: true,
      },
      path: "/login",
    },
    {
      isDir: true,
      ext: "",
      children: [
        {
          isIndex: true,
          isPage: true,
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
          isPage: true,
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
      meta: {
        recursive: true,
        preload: "proximity",
        prerender: true,
      },
      path: "/product",
    },
    {
      isDir: true,
      ext: "",
      children: [
        {
          isIndex: true,
          isPage: true,
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
      meta: {
        recursive: true,
        preload: "proximity",
        prerender: true,
      },
      path: "/reservation",
    },
    {
      isDir: true,
      ext: "",
      children: [
        {
          isIndex: true,
          isPage: true,
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
      meta: {
        recursive: true,
        preload: "proximity",
        prerender: true,
      },
      path: "/setting",
    },
    {
      isDir: true,
      ext: "",
      children: [
        {
          isIndex: true,
          isPage: true,
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
      meta: {
        recursive: true,
        preload: "proximity",
        prerender: true,
      },
      path: "/signup",
    },
  ],
  isLayout: true,
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
