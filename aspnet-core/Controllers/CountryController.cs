using aspnet_core.Data;
using aspnet_core.DTOs.Country;
using aspnet_core.Interfaces;
using aspnet_core.Models;
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
        private readonly IUnitOfWork _uow; 

        private static MapperConfiguration config = new(cfg =>
        {
            cfg.CreateMap<Country, CountryDTO>();
            cfg.CreateMap<CreateUpdateCountryDTO, Country>();
        });

        private Mapper mapper = new(config);

        public CountryController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            var dbObj = await _uow.CountryRepo.Get();
            return Ok(mapper.Map<List<CountryDTO>>(dbObj));
        }

        [HttpPost]
        public async Task<IActionResult> AddCountry(CreateUpdateCountryDTO dto)
        {
            var dbObj = mapper.Map<Country>(dto);
            _uow.CountryRepo.Add(dbObj);
            if(await _uow.SaveAsync()) {
                return StatusCode(201);
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCountry(int id)
        {
            _uow.CountryRepo.Delete(id);

            if (await _uow.SaveAsync())
            {
                return Ok(new { id });
            }
            return BadRequest("Country does not exist");
        }
    }
}
