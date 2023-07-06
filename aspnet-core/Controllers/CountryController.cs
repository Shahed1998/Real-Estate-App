using aspnet_core.Data;
using aspnet_core.DTOs;
using aspnet_core.Models;
using aspnet_core.Repos;
using aspnet_core.Repos.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace aspnet_core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly ICountryRepo _countryRepo;

        public CountryController(ICountryRepo countryRepo)
        {
            _countryRepo = countryRepo;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Country, CountryDTO>();
            });

            var mapper = new Mapper(config);

            var dbObj = await _countryRepo.Get();

            return Ok(mapper.Map<List<CountryDTO>>(dbObj));
        }
    }
}
