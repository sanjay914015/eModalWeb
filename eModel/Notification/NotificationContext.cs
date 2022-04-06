using Microsoft.EntityFrameworkCore;

namespace Notification
{
  public class NotificationContext: DbContext
  {
    public NotificationContext(DbContextOptions<NotificationContext> options): base(options)
    {

    }
    public DbSet<Notification> Notifications { get; set; }
  }
}
