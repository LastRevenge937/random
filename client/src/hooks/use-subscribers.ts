import { useMutation } from "@tanstack/react-query";
import { api, type InsertSubscriber } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateSubscriber() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertSubscriber) => {
      // Client-side validation using the shared schema if needed before fetch
      const validated = api.subscribers.create.input.parse(data);

      const res = await fetch(api.subscribers.create.path, {
        method: api.subscribers.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 409) {
          throw new Error("You are already subscribed to our newsletter.");
        }
        if (res.status === 400) {
           // Try to parse validation error
           try {
             const errorData = await res.json();
             // Assuming structure matches errorSchemas.validation
             throw new Error(errorData.message || "Invalid email address");
           } catch {
             throw new Error("Invalid request");
           }
        }
        throw new Error("Failed to subscribe. Please try again later.");
      }

      return api.subscribers.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Welcome aboard!",
        description: "You've successfully subscribed to our newsletter.",
        variant: "default", 
        className: "bg-primary text-primary-foreground border-primary"
      });
    },
    onError: (error) => {
      toast({
        title: "Subscription failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
