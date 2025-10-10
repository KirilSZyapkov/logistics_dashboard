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
          mapedDate.set(key, { Delivered: 0, Delayed: 0 });
        };
        if (item.status === "delivered") {
          mapedDate.get(key).Delivered +=1;
        } else if (item.status === "delayed") {
          mapedDate.get(key).Delayed +=1;
        };
      }
    })
  };

  return Array.from(mapedDate, ([key, value]) => ({ date:key, ...value }));
}
