export abstract class NotificationRepository {
  abstract sendEmail(
    from: string,
    to: string,
    subject: string,
    text: string,
  ): Promise<{ accepted: []; rejected: [] }>;
}
