using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;

namespace DAL.EF.DataContext
{
    public class DatabaseContextFactory: IDesignTimeDbContextFactory<RealEstateContext>
    {
        public RealEstateContext CreateDbContext(string[] args)
        {
            AppConfiguration appConfig = new AppConfiguration();
            var opsBuilder = new DbContextOptionsBuilder<RealEstateContext>();
            opsBuilder.UseSqlServer(appConfig.sqlConnectionString);
            return new RealEstateContext(opsBuilder.Options);
        }
    }
}
