using aspnet_core.Models;

namespace aspnet_core.Repos.Interfaces
{
    public interface ICountryRepo
    {
        void Add(Country country);
        Task<List<Country>> Get();
        Task<Country> Get(int id);
        void Update(Country country);
        void Delete(int id);
    }
}
