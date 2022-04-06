namespace Notification
{
  public record NotificationRequest(int id, string sendto_id,DateTime date, string description, Boolean status);


}
