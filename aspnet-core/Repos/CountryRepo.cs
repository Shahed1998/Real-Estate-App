using aspnet_core.Data;
using aspnet_core.DTOs;
using aspnet_core.Models;
using aspnet_core.Repos.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace aspnet_core.Repos
{
    
    public class CountryRepo: ICountryRepo
    {
        public readonly DataContext _dataContext;
        public CountryRepo(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void Add(Country country)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Country>> Get()
        {
            return await _dataContext.countries.ToListAsync();
        }

        public Task<Country> Get(int id)
        {
            throw new NotImplementedException();
        }

        public void Update(Country country)
        {
            throw new NotImplementedException();
        }
    }
}
