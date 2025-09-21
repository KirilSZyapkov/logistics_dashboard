import {z} from 'zod';

export const shipmentSchema = z.object({
 clientName: z.string().min(1, {message: "Client name is required"}),
 tourNumber: z.string().optional(),
 price: z.string().min(1, {message: "Price is required"}),
 loadingFrom: z.string().min(1, {message: "Loading from is required"}),
 deliveryTo: z.string().min(1, {message: "Delivery to is required"}),
 loadingDate: z.string().optional(),
 deliveryDate: z.string().optional(),
});

export type Shipment = z.infer<typeof shipmentSchema>;

export const transportsSchema = z.object({
  transportCompanyName: z.string().min(1, {message: "Transport company name is required"}),
  shipmentId:z.string().min(1, {message: "Shipment ID is required"}),
  truckNumber: z.string().min(1, {message: "Truck number is required"}),
  loadingDay: z.string().min(1, {message: "Loading day is required"}),
  deliveryDay: z.string().min(1, {message: "Delivery day is required"}),
});

export type Transports = z.infer<typeof transportsSchema>;

export const userSchema = z.object({
  clerkId: z.string().min(1, {message: "User Clerk ID is required"}),
  name: z.string().min(1, {message: "Name is required"}),
  email: z.string().email({message: "Invalid email address"}),
  role: z.enum(["staff", "team_leader", "cio"]).optional(),
  organization: z.string().min(1, {message: "Organization is required"}),
});

export type User = z.infer<typeof userSchema>;