using aspnet_core.Data;
using aspnet_core.DTOs;
using aspnet_core.Interfaces;
using aspnet_core.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace aspnet_core.Data.Repos
{

    public class CountryRepo : ICountryRepo
    {
        public readonly DataContext _dataContext;
        public CountryRepo(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void Add(Country country)
        {
             _dataContext.countries.Add(country);   
        }

        public void Delete(int id)
        {
            var country = _dataContext.countries.FirstOrDefault(x => x.Id == id);
            if(country != null)
            {
                _dataContext.countries.Remove(country);
            }
        }

        public async Task<List<Country>> Get()
        {
            return await _dataContext.countries.AsNoTracking().ToListAsync();
        }

        public async Task<Country> Get(int id)
        {
            throw new NotImplementedException();
        }

        public void Update(Country country)
        {
            throw new NotImplementedException();
        }
    }
}
