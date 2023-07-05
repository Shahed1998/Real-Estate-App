namespace aspnet_core.Models
{
    public class Country
    {
        public int Id { get; set; } = 0;
        public string? Name { get; set; }
        public string? InternetCountryCode { get; set; }
        public string? CountryCallingCode { get; set; }
        public string? Nationality { get; set; }
        public string? Flag { get; set; }
    }
}
