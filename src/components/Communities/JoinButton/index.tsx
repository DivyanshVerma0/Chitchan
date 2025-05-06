import React, { useState, useEffect } from "react";
import { doc, writeBatch, increment, getDoc } from "firebase/firestore";
import { useAuth } from "../../../contexts/AuthContext";
import { useCommunitySnippets } from "../../../contexts/CommunitySnippetsContext";
import { useAuthModalState } from "../../../atoms/authModalAtom";
import { firestore } from "../../../firebase/clientApp";
import { Button } from "@chakra-ui/react";

const JoinButton: React.FC<{ communityId: string; communityImageURL?: string }> = ({ communityId, communityImageURL }) => {
  const { user } = useAuth();
  const { setSnippetState, snippetState } = useCommunitySnippets();
  const setAuthModalState = useAuthModalState((state) => state.setAuthModalState);
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    
    const checkIfJoined = async () => {
      try {
        const snippetDoc = await getDoc(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
        );
        setIsJoined(!!snippetDoc.exists());
      } catch (error) {
        console.log("checkIfJoined error", error);
      }
    };
    
    checkIfJoined();
  }, [user, communityId]);

  const onJoinOrLeaveCommunity = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    setLoading(true);
    try {
      const batch = writeBatch(firestore);

      if (isJoined) {
        // Leave community
        batch.delete(doc(firestore, `users/${user?.uid}/communitySnippets`, communityId));
        
        batch.update(doc(firestore, "communities", communityId), {
          numberOfMembers: increment(-1),
        });

        await batch.commit();

        // Update local state
        setSnippetState((prev) => ({
          ...prev,
          mySnippets: prev.mySnippets.filter(
            (item) => item.communityId !== communityId
          ),
        }));
        setIsJoined(false);
      } else {
        // Join community
        const newSnippet = {
          communityId,
          isModerator: false,
          imageURL: communityImageURL || "",
        };

        batch.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityId),
          newSnippet
        );

        batch.update(doc(firestore, "communities", communityId), {
          numberOfMembers: increment(1),
        });

        await batch.commit();

        // Update local state
        setSnippetState((prev) => ({
          ...prev,
          mySnippets: [...prev.mySnippets, newSnippet],
        }));
        setIsJoined(true);
      }
    } catch (error) {
      console.log("onJoinOrLeaveCommunity error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      height="30px"
      pr={6}
      pl={6}
      isLoading={loading}
      onClick={onJoinOrLeaveCommunity}
      variant={isJoined ? "outline" : "solid"}
    >
      {isJoined ? "Joined" : "Join"}
    </Button>
  );
};

export default JoinButton; 