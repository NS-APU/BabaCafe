
/**
 * @roxi/routify 2.18.8
 * File generated Wed Dec 07 2022 15:34:28 GMT+0900 (日本標準時)
 */

export const __version = "2.18.8"
export const __timestamp = "2022-12-07T06:34:28.210Z"

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes"

//imports


//options
export const options = {}

//tree
export const _tree = {
  "root": true,
  "children": [
    {
      "isIndex": true,
      "isPage": true,
      "path": "/index",
      "id": "_index",
      "component": () => import('../src/pages/index.svelte').then(m => m.default)
    },
    {
      "isDir": true,
      "ext": "",
      "children": [
        {
          "isIndex": true,
          "isPage": true,
          "path": "/user/index",
          "id": "_user_index",
          "component": () => import('../src/pages/user/index.svelte').then(m => m.default)
        }
      ],
      "path": "/user"
    }
  ],
  "path": "/"
}


export const {tree, routes} = buildClientTree(_tree)

