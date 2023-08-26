
using SampelToDo.Services;

using System.Data.Common;
using Microsoft.Data.SqlClient;

using TestForBTLab.Repositories.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using TestForBTLab.Data.Models;
using EFCore.NamingConventions.Internal;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Globalization;

namespace TestForBTLab
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            
            builder.Services.AddControllers();
            builder.Services.AddScoped<DbConnection, SqlConnection>();
            builder.Services.AddScoped(typeof(DbConnection), (_) => new SqlConnection(builder.Configuration.GetConnectionString("SQLServerExpress")));
            builder.Services.AddScoped(typeof(IRepository<>), typeof(ADORepository<>));
            builder.Services.AddScoped(typeof(INameRewriter), (_) => new SnakeCaseNameRewriter(CultureInfo.InvariantCulture));

            var app = builder.Build();

            

            app.UseStaticFiles();
            app.UseRouting();



            app.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}");



            app.Run();
        }
    }
}