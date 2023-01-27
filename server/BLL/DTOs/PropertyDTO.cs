using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTOs
{
    public class PropertyDTO
    {
        [Key]
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string? Name { get; set; }

        [Required]
        public string? Description { get; set; }

        [Required, StringLength(50)]
        public string? Type { get; set; }

        [Required]
        public int Price { get; set; }
    }
}
