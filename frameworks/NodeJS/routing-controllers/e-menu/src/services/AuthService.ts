import ApiService from "abstracts/ApiService";

class AuthService extends ApiService {
  public async getUser(): Promise<IUser> {
    const response = await this.request<IUser>({
      url: "/auth/user",
    });

    return response.data;
  }

  public async signIn(data: ISignInData): Promise<IUser> {
    const response = await this.request<IAuthData>({
      url: "/auth/sign_in",
      method: "post",
      data,
    });

    const { token, user } = response.data;

    this.tokenStorage.set(token);

    return user;
  }

  public async signUp(data: ISignUpData): Promise<IUser> {
    const response = await this.request<IUser>({
      url: "/auth/sign_up",
      method: "post",
      data,
    });

    return response.data;
  }

  public async confirmEmail(token: string): Promise<IUser> {
    const response = await this.request<IUser>({
      url: `/auth/confirmation/${token}`,
      method: "patch",
    });

    return response.data;
  }

  public signOut(): void {
    this.tokenStorage.remove();
  }

  public async updateProfile(data: Partial<IUser>): Promise<IUser> {
    const response = await this.request<IUser>({
      url: "/auth/user",
      method: "put",
      data,
    });

    return response.data;
  }
}

const instance = new AuthService();

export default instance;
