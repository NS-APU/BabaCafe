import type { TResponse } from "./_type";

export async function baseAPI<
  T extends Record<string, unknown> | Array<Record<string, unknown>> | void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  B = Record<string, any>
>({
  endpoint,
  method = "GET",
  body,
}: {
  endpoint: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: B;
}): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 10 * 1000); // デフォルトでは10秒でタイムアウト

  const res = await fetch(`http://localhost:3000/${endpoint}`, {
    method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    signal: controller.signal,
    ...(body && { body: JSON.stringify(body) }),
  }).finally(() => clearTimeout(timeoutId));

  if (!res.ok) {
    let err: TResponse;
    try {
      err = await res.json();
    } catch {
      err = {
        statusCode: res.status,
        message: res.statusText,
      };
    }
    throw err;
  }

  try {
    return await res.json();
  } catch {
    return {} as T;
  }
}
