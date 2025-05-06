import { Stack, Box, Flex, Text, Image, Icon } from "@chakra-ui/react";
import { doc, getDoc, deleteDoc, writeBatch } from "firebase/firestore";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseConfig";
import { useAuthModalState } from "@/atoms/authModalAtom";
import { collection } from "firebase/firestore";

const PostItem: React.FC<PostItemProps> = ({ post, userIsCreator, userVoteValue, onVote, onDeletePost, onSelectPost }) => {
  const router = useRouter();
  const setPostStateValue = useSetRecoilState(postState);
  const [error, setError] = useState("");
  const [user] = useAuthState(auth);
  const setAuthModalState = useAuthModalState((state) => state.setAuthModalState);

  const isSinglePost = router.pathname === "/r/[community]";

  const onDeletePost = async (post: Post) => {
    try {
      // Check if post exists
      const postDocRef = doc(firestore, "posts", post.id);
      const postDoc = await getDoc(postDocRef);
      
      if (!postDoc.exists()) {
        throw new Error("Post not found");
      }

      // Delete post
      await deleteDoc(postDocRef);

      // Update local state
      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));

      // If on single post page, redirect to community
      if (isSinglePost) {
        router.push(`/r/${post.communityId}`);
      }
    } catch (error: any) {
      console.log("Error deleting post", error);
      setError(error.message);
    }
  };

  const onVote = async (event: React.MouseEvent<SVGElement, MouseEvent>, post: Post, vote: number, communityId: string) => {
    event.stopPropagation();
    
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    try {
      const { voteStatus } = post;
      const existingVote = voteStatus?.find((vote) => vote.userId === user?.uid);

      const batch = writeBatch(firestore);
      const updatedPost = { ...post };
      const updatedPosts = [...setPostStateValue.posts];
      let voteChange = vote;

      // New vote
      if (!existingVote) {
        const postVoteRef = doc(collection(firestore, `users/${user?.uid}/postVotes`));
        
        const newVote = {
          id: postVoteRef.id,
          postId: post.id,
          communityId,
          voteValue: vote,
        };

        batch.set(postVoteRef, newVote);

        updatedPost.voteStatus = [...post.voteStatus, { userId: user?.uid, voteValue: vote }];
        voteChange = vote;
      }
      // Existing vote - same vote
      else if (existingVote.voteValue === vote) {
        const postVoteRef = doc(firestore, `users/${user?.uid}/postVotes/${existingVote.id}`);
        
        batch.delete(postVoteRef);

        updatedPost.voteStatus = post.voteStatus.filter(
          (vote) => vote.userId !== user?.uid
        );
        voteChange = -vote;
      }
      // Existing vote - flip vote
      else {
        const postVoteRef = doc(firestore, `users/${user?.uid}/postVotes/${existingVote.id}`);
        
        batch.update(postVoteRef, {
          voteValue: vote,
        });

        updatedPost.voteStatus = post.voteStatus.map((voteItem) =>
          voteItem.userId === user?.uid ? { ...voteItem, voteValue: vote } : voteItem
        );
        voteChange = 2 * vote;
      }

      // Update post document
      const postRef = doc(firestore, "posts", post.id);
      batch.update(postRef, {
        voteStatus: updatedPost.voteStatus,
      });

      await batch.commit();

      // Update state
      const postIdx = setPostStateValue.posts.findIndex(
        (item) => item.id === post.id
      );
      updatedPosts[postIdx] = updatedPost;
      
      setPostStateValue((prev) => ({
        ...prev,
        posts: updatedPosts,
      }));

      if (setPostStateValue.selectedPost) {
        setPostStateValue((prev) => ({
          ...prev,
          selectedPost: updatedPost,
        }));
      }
    } catch (error) {
      console.log("onVote error", error);
    }
  };

  return (
    <Flex
      border="1px solid"
      borderColor="gray.300"
      bg="white"
      borderRadius={4}
      _hover={{ borderColor: "gray.500" }}
      cursor="pointer"
      onClick={() => onSelectPost && onSelectPost(post)}
    >
      <Flex
        direction="column"
        align="center"
        bg="gray.100"
        p={2}
        width="40px"
        borderRadius={4}
      >
        // ... existing code ...
      </Flex>
      <Flex direction="column" width="100%">
        // ... existing code ...
        <Stack
          direction="row"
          spacing={0.6}
          align="center"
          fontSize="9pt"
          color="gray.500"
        >
          // ... existing code ...
        </Stack>
      </Flex>
    </Flex>
  );
}; 