import ApiService from "./ApiService";

abstract class RestService<T> extends ApiService {
  protected abstract anchor: string;

  public async getAll(): Promise<T[]> {
    const response = await this.request<T[]>({
      url: this.anchor,
    });

    return response.data;
  }

  public async get(id: string): Promise<T> {
    const response = await this.request<T>({
      url: `${this.anchor}/${id}`,
    });

    return response.data;
  }

  public async delete(id: string): Promise<T> {
    const response = await this.request<T>({
      url: `${this.anchor}/${id}`,
      method: "delete",
    });

    return response.data;
  }

  public async update(id: string, data: Partial<T>): Promise<T> {
    const response = await this.request<T>({
      url: `${this.anchor}/${id}`,
      method: "put",
      data,
    });

    return response.data;
  }

  public async create(data: Partial<T>): Promise<T> {
    const response = await this.request<T>({
      url: this.anchor,
      method: "post",
      data,
    });

    return response.data;
  }
}

export default RestService;
