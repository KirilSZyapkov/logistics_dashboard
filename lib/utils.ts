import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { shipmentsTable } from "@/drizzle/schemas/shipments";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export function mapingDateToYYYYMM(date: typeof shipmentsTable.$inferSelect[]) {
  let mapedDate = new Map();

  if (Array.isArray(date)) {
    date.forEach((item) => {
      const key = item.createdAt?.toString().slice(0, 7);
      if (key) {
        if (!mapedDate.has(key)) {
          if (item.status === "delivered") {
            mapedDate.set(key, { "delivered": [] });
          } else if (item.status === "delayed") {
            mapedDate.set(key, { "delayed": [] });
          };
        };
        if (item.status === "delivered") {
          mapedDate.get(key).delivered?.push(item);
        } else if (item.status === "delayed") {
          mapedDate.get(key).delayed?.push(item);
        };
      }
    })
  };

  return Array.from(mapedDate, ([key, value]) => ({ key, ...value }));
}
