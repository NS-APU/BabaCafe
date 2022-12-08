/**
 * @roxi/routify 2.18.8
 * File generated Thu Dec 08 2022 12:59:14 GMT+0900 (日本標準時)
 */

export const __version = "2.18.8";
export const __timestamp = "2022-12-08T03:59:14.114Z";

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes";

//imports

//options
export const options = {};

//tree
export const _tree = {
  root: true,
  children: [
    {
      isIndex: true,
      isPage: true,
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
          path: "/reservation/index",
          id: "_reservation_index",
          component: () =>
            import("../src/pages/reservation/index.svelte").then(
              (m) => m.default
            ),
        },
      ],
      path: "/reservation",
    },
  ],
  path: "/",
};

export const { tree, routes } = buildClientTree(_tree);
