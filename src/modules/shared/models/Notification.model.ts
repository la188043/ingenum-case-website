export type NotificationType = 'success' | 'warning' | 'error' | 'info';

export interface Notification {
  text: string;
  type: NotificationType;
  id: string;
}
