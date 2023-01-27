using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.EF.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.EF.DataContext
{
    public class RealEstateContext: DbContext
    {
        public class OptionsBuild
        {
            public OptionsBuild()
            {
                settings = new AppConfiguration();
                opsBuilder = new DbContextOptionsBuilder<RealEstateContext>();
                opsBuilder.UseSqlServer(settings.sqlConnectionString);
                dbOptions = opsBuilder.Options;
            }
            public DbContextOptionsBuilder<RealEstateContext>? opsBuilder { get; set; }  
            public DbContextOptions<RealEstateContext>? dbOptions { get; set; }
            private AppConfiguration? settings { get; set; }
        }

        public static OptionsBuild ops = new OptionsBuild();

        public RealEstateContext(DbContextOptions<RealEstateContext> options) : base(options)
        {

        }

        public DbSet<Property> Properties { get; set; }
    }
}
