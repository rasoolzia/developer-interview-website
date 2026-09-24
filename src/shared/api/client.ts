import type { z } from "zod";

const BASE_URL = process.env.NEXT_PUBLIC_CONTENT_API_URL ?? "/api";

interface RequestOptions extends RequestInit {
  next?: NextFetchRequestConfig;
}

class ApiClient {
  async get<T>(
    path: string,
    schema: z.ZodType<T>,
    options?: RequestOptions,
  ): Promise<T> {
    const response = await fetch(`${BASE_URL}/${path}`, options);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data: unknown = await response.json();

    return schema.parse(data);
  }
}

export const apiClient = new ApiClient();
