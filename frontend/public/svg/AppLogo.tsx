import { IceCreamBowl, LucideProps } from "lucide-react";
import { ComponentProps } from "react";

export default function AppLogo(props: ComponentProps<"svg"> & LucideProps) {
  return <IceCreamBowl {...props}/>
}
