import z from "zod";

export const MovieSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  year: z.number().int().min(1800).max(9999).nullable(),
  genre: z.string().nullable(),        // or z.array(z.string()).nullable()
  category: z.string().nullable(),
  description: z.string().nullable(),
  distribution: z.string().nullable()
});

export const MoviesListSchema = z.array(MovieSchema);

export type Movie = z.infer<typeof MovieSchema>;
export type MoviesList = z.infer<typeof MoviesListSchema>;
