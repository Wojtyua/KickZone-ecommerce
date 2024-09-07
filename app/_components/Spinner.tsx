// app/_components/Spinner.tsx
import { Loader2 } from "lucide-react";

export default function Spinner({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <Loader2 className="h-8 w-8 animate-spin" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
