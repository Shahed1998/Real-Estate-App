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
        private readonly IMapper _mapper;

        public CountryController(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            var dbObj = await _uow.CountryRepo.Get();
            return Ok(_mapper.Map<IEnumerable<CountryDTO>>(dbObj));
        }

        [HttpPost]
        public async Task<IActionResult> AddCountry(CreateUpdateCountryDTO dto)
        {
            var dbObj = _mapper.Map<Country>(dto);
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
