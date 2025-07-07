import {z} from 'zod';

export const shipmentSchema = z.object({
 createdBy: z.string().min(1),
 clientName: z.string().min(1),
 orderNumber: z.string().min(1),
 tourNumber: z.string().min(1),
 transportCompany: z.string().min(1),
 truckNumber: z.string().min(1),
 price: z.string().min(1),
 loadingFrom: z.string().min(1),
 deliveryTo: z.string().min(1),
 loadingDate: z.string().optional(),
 deliveryDate: z.string().optional(),
});

export type Shipment = z.infer<typeof shipmentSchema>;

export const offersSchema = z.object({
  createdBy: z.string().min(1),
  clientName: z.string().min(1),
  contactPerson: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  destination: z.string().min(1),
  cargoDetails: z.string().min(1),
  priceQuote: z.string().min(1),
  refusalReason: z.string().optional(),
});

export type Offers = z.infer<typeof offersSchema>;