namespace Notification
{
  public class Notification
  {
    public int id { get; set; }

    public string sendto_id { get; set; }

    public DateTime date { get; set; }

    public string description { get; set; }

    public Boolean status { get; set; }
  }
}
