import api from "./api";

import type { NotificationResponse } from "../types/notification";

export const getNotifications = async (): Promise<NotificationResponse> => {
  const response = await api.get<NotificationResponse>(
    "/notifications"
  );

  return response.data;
};