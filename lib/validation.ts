import {z} from 'zod';

export const shipmentSchema = z.object({
 clientName: z.string().min(1, {message: "Client name is required"}),
 orderNumber: z.string().min(1,{message: "Order number is required"}),
 tourNumber: z.string().min(1, {message: "Tour number is required"}),
 transportCompany: z.string().min(1, {message: "Transport company is required"}),
 truckNumber: z.string().min(1, {message: "Truck number is required"}),
 price: z.string().min(1, {message: "Price is required"}),
 loadingFrom: z.string().min(1, {message: "Loading from is required"}),
 deliveryTo: z.string().min(1, {message: "Delivery to is required"}),
 loadingDate: z.string().optional(),
 deliveryDate: z.string().optional(),
});

export type Shipment = z.infer<typeof shipmentSchema>;

export const offersSchema = z.object({
  clientName: z.string().min(1, {message: "Client name is required"}),
  contactPerson: z.string().min(1, {message: "Contact person is required"}),
  phone: z.string().min(1, {message: "Phone number is required"}),
  email: z.string().email(),
  destination: z.string().min(1, {message: "Destination is required"}),
  cargoDetails: z.string().min(1, {message: "Cargo details is required"}),
  priceQuote: z.string().min(1, {message: "Price quote is required"}),
  refusalReason: z.string().optional(),
});

export type Offers = z.infer<typeof offersSchema>;