namespace Notification
{
  public interface INotificationService
  {
    Task<IResult> Get();
    Task<IResult> GetNotificationById(int id);
    Task<IResult> Post(NotificationRequest notification);
  }
}
