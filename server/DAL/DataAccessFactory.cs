using DAL.EF.Models;
using DAL.Interfaces;
using DAL.Repos;

namespace DAL
{
    public class DataAccessFactory
    {
        public static IRepo<Property> PropertyDataAccess()
        {
            return new PropertyRepo();
        }
    }
}