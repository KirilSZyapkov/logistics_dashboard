import { LayoutDashboard, List, BookMarked,FilePlus2, PencilLine} from "lucide-react";

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
    title: "Offers",
    url: "/offers",
    icon: BookMarked,
  },
  {
    title: "Create Shipment",
    url: "/create-shipment",
    icon: FilePlus2,
  },
  {
    title: "Create Offer",
    url: "/create-offer",
    icon: PencilLine,
  },
  
]