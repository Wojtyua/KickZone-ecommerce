"use client";

import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useFavoritesStore } from "@/app/_store/favoritesStore";

interface FavoriteButtonProps {
  productId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ productId }) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const { favorites, isLoading, addFavorite, removeFavorite } =
    useFavoritesStore();

  const isFavorite = favorites.includes(productId);

  const handleToggleFavorite = useCallback(async () => {
    if (!session) {
      toast({
        title: "Error",
        description: "Please log in to add favorites",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isFavorite) {
        await removeFavorite(productId);
        toast({
          title: "Success",
          description: "Removed from favorites",
        });
      } else {
        await addFavorite(productId);
        toast({
          title: "Success",
          description: "Added to favorites",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error updating favorites",
        variant: "destructive",
      });
    }
  }, [session, isFavorite, productId, addFavorite, removeFavorite, toast]);

  return (
    <Button
      onClick={handleToggleFavorite}
      variant="outline"
      size="icon"
      disabled={isLoading}
    >
      <Heart className={isFavorite ? "fill-current text-red-500" : ""} />
    </Button>
  );
};

export default FavoriteButton;
