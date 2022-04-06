using Microsoft.EntityFrameworkCore;
using Notification;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<NotificationContext>(opt => opt.UseSqlServer(
    builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<INotificationService, NotificationService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors();

var app = builder.Build();

app.UseCors(c => c.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.MapGet("/notification", async (INotificationService notification) => await notification.Get());

app.MapPost("/notification", async (NotificationRequest notificationRequest, INotificationService notification) => await notification.Post(notificationRequest));

app.MapGet("/notification/{id}", async (int id, INotificationService notificationService) => await notificationService.GetNotificationById(id));
app.Run();
