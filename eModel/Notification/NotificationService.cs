namespace Notification
{
  public class NotificationService: INotificationService
  {
    private readonly NotificationContext _db;
    public NotificationService(NotificationContext db)
    {
      _db = db;
    }
    public async Task<IResult> Get()
    {
      return Results.Ok(_db.Notifications.ToList());
    }

    public async Task<IResult> GetNotificationById(int id)
    {
      var noti = await _db.Notifications.FindAsync(id);
      return noti != null ? Results.Ok(noti) : Results.NotFound();

    }

    public async Task<IResult> Post(NotificationRequest notification)
    {
      var createdNotification = _db.Notifications.Add(new Notification
      {
        sendto_id = notification.sendto_id,
        date = notification.date,
        description = notification.description,
        status = notification.status
      });
      await _db.SaveChangesAsync();
      return Results.Created($"/notifications/" + $"{createdNotification.Entity.id}", createdNotification.Entity);
    }

  }


}
