export const httpService = {
  async request(url: string, options: RequestInit): Promise<any> {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        console.error(`Error in request: ${response.statusText}`);

        return await response.json();
      }

      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else if (
        contentType &&
        contentType.includes(
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
      ) {
        return response.blob();
      } else {
        return null;
      }
    } catch (error: any) {
      if (error instanceof TypeError) {
        console.error(`Network error catch in request: ${error.message}`);
      } else {
        console.error(`HTTP error catch in request: ${error.message}`);
      }

      return new Error(`Error catch in request: ${error.message}`);
    }
  },

  async get(url: string, headers?: Record<string, string>): Promise<any> {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
        ...headers,
      },
    };

    return this.request(url, options);
  },

  async post(
    url: string,
    body: any,
    headers?: Record<string, string>
  ): Promise<any> {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
        ...headers,
      },
      body: JSON.stringify(body),
    };

    return this.request(url, options);
  },

  async patch(
    url: string,
    body: any,
    headers?: Record<string, string>
  ): Promise<any> {
    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
        ...headers,
      },
      body: JSON.stringify(body),
    };

    return this.request(url, options);
  },

  async delete(url: string, headers?: Record<string, string>): Promise<any> {
    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
        ...headers,
      },
    };

    return this.request(url, options);
  },
};
