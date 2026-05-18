import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpDemoService {
  private readonly logger = new Logger(HttpDemoService.name);

  constructor(private readonly http: HttpService) {}

  async fetchPost(id: number): Promise<PlaceholderPost> {
    const { data } = await firstValueFrom(
      this.http.get<PlaceholderPost>(`/posts/${id}`),
    );
    this.logger.log(`placeholder post ${data.id}: ${data.title.slice(0, 40)}…`);
    return data;
  }
}

export type PlaceholderPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
