var _a;
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { b as getAdminPosts, e as duplicatePost, f as createTranslationTwin, h as bulkUpdatePostStatus, j as bulkDeletePosts, k as deletePost, l as getAdminPostById, m as createPost, u as updatePost } from "./blogAdminService-DtY0JHBt.js";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/features/blog/useAdminPosts.ts");
function useAdminPosts(params = {}) {
  return useQuery({
    queryKey: ["admin_posts", params],
    queryFn: () => getAdminPosts(params),
    staleTime: 1e3 * 30
  });
}
function useAdminPost(id) {
  return useQuery({
    queryKey: ["admin_post", id],
    queryFn: () => id ? getAdminPostById(id) : null,
    enabled: Boolean(id && id !== "new"),
    staleTime: 1e3 * 30
  });
}
function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, authorId }) => createPost(data, authorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["admin_categories"] });
    }
  });
}
function useUpdatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updatePost(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin_posts"] });
      queryClient.invalidateQueries({ queryKey: ["admin_post", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
    }
  });
}
function useDuplicatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => duplicatePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_posts"] });
      queryClient.invalidateQueries({ queryKey: ["admin_categories"] });
    }
  });
}
function useCreateTranslationTwin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => createTranslationTwin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_posts"] });
    }
  });
}
function useBulkUpdatePostStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ ids, status }) => bulkUpdatePostStatus(ids, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
  });
}
function useBulkDeletePosts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids) => bulkDeletePosts(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["admin_categories"] });
    }
  });
}
function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["admin_categories"] });
    }
  });
}
export {
  useDuplicatePost as a,
  useCreateTranslationTwin as b,
  useBulkUpdatePostStatus as c,
  useBulkDeletePosts as d,
  useDeletePost as e,
  useAdminPost as f,
  useCreatePost as g,
  useUpdatePost as h,
  useAdminPosts as u
};
