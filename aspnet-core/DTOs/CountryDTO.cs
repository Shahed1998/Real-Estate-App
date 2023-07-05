namespace aspnet_core.DTOs
{
    public class CountryDTO
    {
        public int Id { get; set; } = 0;
        public string? Name { get; set; }
        public string? InternetCountryCode { get; set; }
        public string? CountryCallingCode { get; set; }
        public string? Nationality { get; set; }
        public string? Flag { get; set; }
    }
}
