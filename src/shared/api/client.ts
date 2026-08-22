const BASE_URL = process.env.NEXT_PUBLIC_CONTENT_API_URL ?? "/api";

interface RequestOptions extends RequestInit {
  next?: NextFetchRequestConfig;
}

class ApiClient {
  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    const response = await fetch(`${BASE_URL}/${path}`, options);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return response.json();
  }
}

export const apiClient = new ApiClient();
