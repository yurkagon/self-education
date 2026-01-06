import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";
import merge from "deepmerge";
import TokenStorage from "utils/TokenStorage";
import Configuration from "utils/Configuration";

const config = new Configuration();

abstract class ApiService {
  private static tokenStorage = new TokenStorage();

  private static readonly api: AxiosInstance = axios.create({
    baseURL: config.apiUrl,
  });

  protected get tokenStorage(): TokenStorage {
    return ApiService.tokenStorage;
  }

  protected request<ResponseType = any>(
    inputConfig: AxiosRequestConfig
  ): Promise<AxiosResponse<ResponseType>> {
    let outputConfig = inputConfig;

    const token = this.tokenStorage.get();
    if (token) {
      outputConfig = merge(outputConfig, {
        headers: { Authorization: token },
      });
    }

    return ApiService.api(outputConfig);
  }
}

export default ApiService;
