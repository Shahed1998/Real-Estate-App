﻿using System.ComponentModel.DataAnnotations;

namespace aspnet_core.DTOs.Country
{
    public class CreateUpdateCountryDTO
    {
        [Required]
        public string Name { get; set; } = "";
        [Required]
        public string InternetCountryCode { get; set; } = "";
        [Required]
        public string CountryCallingCode { get; set; } = "";
        [Required]
        public string Nationality { get; set; } = "";
        [Required]
        public string Flag { get; set; } = "";
    }
}
