import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function ErrorCard({ title, content, type }: { title?: string, content?: string, type?: 'error' | 'warning' }) {
  return (
    <Card className={cn("flex flex-col items-center justify-center w-48 h-36 text-center",
      type === 'error' || !type ? "bg-red-500" : "bg-amber-400",
    )}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title ? title : "Erro"}</CardTitle>
      </CardHeader>
      <CardDescription>
        <CardContent>
          <p className="text-foreground">
            {content ? content : "Algo deu errado"}
          </p>
        </CardContent>
      </CardDescription>
    </Card>
  );
}