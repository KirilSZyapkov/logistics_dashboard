import { LayoutDashboard, List, FilePlus2, PencilLine, Truck} from "lucide-react";

export const MENU = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Shipments",
    url: "/shipments",
    icon: List,
  },
  {
    title: "Transports",
    url: "/transports",
    icon: Truck,
  },
  
]

export const PROTECTED_MENU = [
  
  {
    title: "Create Shipment",
    url: "/create-shipment",
    icon: FilePlus2,
  },
  {
    title: "Create Transport",
    url: "/create-transport",
    icon: PencilLine,
  },
  
]