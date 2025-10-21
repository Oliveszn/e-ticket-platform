"use client";
import {
  createEvent,
  editEventApi,
  getAllEvents,
  getAnEvent,
  getEventsByCategory,
  getPromoterEvent,
  getPromoterSingleEvent,
  getTrendingEvents,
  searchEventApi,
  trackEventView,
} from "@/api/endpoints/events";
import { handleApiError } from "@/utils/helperFunction";
import { FormSchema } from "@/utils/validationSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

///GET ALL PROMOTER EVENTS
export const usePromoterEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => getPromoterEvent(),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 2,
  });
};

//GET SINLE EVENT FOR PROMOTER
export const useSinglePromoterEvent = (eventId: string) => {
  return useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getPromoterSingleEvent(eventId),
    enabled: !!eventId,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 2,
  });
};

// export const useTrackEventView = (eventId: string | undefined) => {
//   const trackViewMutation = useMutation({
//     mutationFn: () => trackEventView(eventId!),
//     onError: (error) => {
//       console.error("Failed to track view:", error);
//     },
//   });

//   useEffect(() => {
//     if (eventId) {
//       trackViewMutation.mutate();
//     }
//   }, [eventId]);

//   return trackViewMutation;
// };
export const useTrackEventView = (eventId: string | undefined) => {
  return useQuery({
    queryKey: ["trackEventView", eventId],
    queryFn: () => trackEventView(eventId!),
    enabled: !!eventId, // only run when eventId exists
    retry: false, // optional — prevents retrying tracking if it fails
    staleTime: Infinity, // optional — we don’t want to refetch automatically
    gcTime: 0, // optional — no need to keep it cached
  });
};

///FOR PUBLIC VIEW
export const useGetEvents = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["events", page],
    queryFn: () => getAllEvents({ page, limit }),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 2,
  });
};

export const useGetAnEvent = (slug: string) => {
  return useQuery({
    queryKey: ["event", slug],
    queryFn: () => getAnEvent({ slug }),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 2,
  });
};

export const useEventsCategory = (
  category: string,
  page: number,
  limit: number
) => {
  return useQuery({
    queryKey: ["events", category, page],
    queryFn: () =>
      getEventsByCategory({
        category,
        page,
        limit,
      }),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 2,
  });
};

export const useTrendingEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => getTrendingEvents(),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (form: FormSchema) => createEvent(form),

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },

    onError: (error: unknown) => {
      const message = handleApiError(error);
      toast.error(message);
    },
  });
};

export const useEditEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId, form }: { eventId: string; form: FormSchema }) =>
      editEventApi(eventId, form),

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },

    onError: (error: unknown) => {
      const message = handleApiError(error);
      toast.error(message);
    },
  });
};

export const useSearchEvents = (keyword: string, options?: any) => {
  return useQuery({
    queryKey: ["search", keyword],
    queryFn: () => searchEventApi(keyword),
    enabled: (options?.enabled ?? true) && keyword.trim().length >= 2,
    staleTime: 1000, /////Consider data fresh for 1 second
    gcTime: 5 * 60 * 1000, /////Keep cached for 5 minutes
  });
};
