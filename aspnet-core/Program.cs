using aspnet_core.Data;
using aspnet_core.Helpers;
using aspnet_core.Interfaces;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using System.Net;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//services cors, with any origins, not secure, for dev only
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

// database builder
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<DataContext>(opt => opt.UseSqlServer(connectionString));

// Dependency Inversion
// Repositorties
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// Automapper services
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

// Newtonsoft
builder.Services.AddControllers().AddNewtonsoftJson();

// Middlewares
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    // Handles Unhandled Exception during production
    app.UseExceptionHandler(
        options =>
        {
            options.Run(
                async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    var ex = context.Features.Get<IExceptionHandlerFeature>();
                    if(ex != null)
                    {
                        await context.Response.WriteAsync(ex.Error.Message);
                    }
                });
        });
}

// Cors
app.UseCors("corsapp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
