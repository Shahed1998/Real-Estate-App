using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;

namespace aspnet_core.Middlewares
{
    public class GlobalExceptionHandlingMiddleware : IMiddleware
    {
        private readonly ILogger<GlobalExceptionHandlingMiddleware> _logger;

        public GlobalExceptionHandlingMiddleware(ILogger<GlobalExceptionHandlingMiddleware> logger)
        {
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                var status = (int)HttpStatusCode.InternalServerError;

                context.Response.StatusCode = status;

                ProblemDetails problemDetails = new ()
                {
                    Status = status,
                    Type = "Server Error",
                    Title = "Server Error",
                    Detail = ex.Message
                };

                string json = JsonSerializer.Serialize(problemDetails);

                context.Response.ContentType = "application/json";

                await context.Response.WriteAsync(json);

            }
        }
    }
}
