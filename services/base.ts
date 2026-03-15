// NEXT_PUBLIC_* required for client-side fetch (e.g. from "use client" components)
const proxy = process.env.NEXT_PUBLIC_PROXY ?? process.env.PROXY;
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL;


export class BaseService {
    /**
      * Make the `request` function generic.
      *
      * @param endpoint Represent values.
      * @param config Represent values.
      * @returns Instance fetch.
      */
    baseFetch = async <TResponse>(
        endpoint: string,
        config: RequestInit = {},
    ): Promise<TResponse> => {
        const response = await fetch(`${apiUrl}/${proxy}${endpoint}`, { ...config });
        const data = await response.json();
        return data as TResponse;
    };

    async get<TResponse>(endpoint: string): Promise<TResponse> {
        return await this.baseFetch<TResponse>(endpoint, { method: "GET" });
    }


}