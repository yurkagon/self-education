import { randomUUID } from 'node:crypto';

export type ArtistRow = { id: string; name: string; genre: string };

/** In-memory stand-in для `prisma.artist` без реального Prisma/pg. */
export function createMockPrismaForE2e() {
  const store = new Map<string, ArtistRow>();

  const prismaMock = {
    artist: {
      findMany: async (): Promise<ArtistRow[]> => [...store.values()],
      findUnique: async ({
        where,
      }: {
        where: { id: string };
      }): Promise<ArtistRow | null> => store.get(where.id) ?? null,
      create: async ({
        data,
      }: {
        data: { name: string; genre: string };
      }): Promise<ArtistRow> => {
        const row: ArtistRow = {
          id: randomUUID(),
          name: data.name,
          genre: data.genre,
        };
        store.set(row.id, row);
        return row;
      },
    },
    $connect: async (): Promise<void> => undefined,
    $disconnect: async (): Promise<void> => undefined,
  };

  return {
    prismaMock,
    resetPrismaStore: (): void => {
      store.clear();
    },
  };
}
