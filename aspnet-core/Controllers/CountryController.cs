using aspnet_core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace aspnet_core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetList()
        {
            
            List<Country> countryList = new List<Country>();

            countryList.Add(
                new Country 
                { 
                    Id=1,
                    Name="Bangladesh",
                    InternetCountryCode= "BD",
                    CountryCallingCode= "+880",
                    Nationality="Bangladeshi",
                    Flag= "assets/images/countries-flag/bd.flag.png"
                });

            return Ok(countryList);
        }
    }
}
