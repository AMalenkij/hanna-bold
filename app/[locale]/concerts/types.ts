import type { ReactNode } from "react";
import { z } from "zod";

export interface ConcertCardProps {
  timestamptz: {
    date: string;
    month: string;
    year: string;
    time: string;
  };
  title: string;
  city: string;
  venueName: string;
  address: string;
  link?: string | null;
  children: ReactNode;
}

export interface Concert {
  id: string; // Уникальный идентификатор концерта (ObjectId)
  title: string; // Название концерта
  date: Date; // Дата и время концерта

  city: string; // Город (например, "Gdańsk")
  venueName: string; // Название площадки (например, "Plama GAK")
  address: string; // Полный адрес (например, "Pilotów 11, 80-460 Gdańsk")

  link?: string; // Опциональная ссылка (например, на билеты)
  isPublished: boolean; // Флаг публикации концерта
}

export type FormMode = "create" | "edit" | "del";

export const concertFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  city: z.string().min(1, "City is required"),
  venueName: z.string().min(1, "Venue name is required"),
  address: z.string().min(1, "Address is required"),
  link: z.string().optional(),
});

export type ConcertFormData = z.infer<typeof concertFormSchema>;
