using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreateProductDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public IFormFile Image { get; set; }
        [Required]
        [Range(100, Double.PositiveInfinity)]
        public long Price { get; set; }
        [Required]
        [Range(0, 10000)]
        public int QuantityInStock { get; set; }
        [Required]
        public string Genre { get; set; }
        [Required]
        public string Theme { get; set; }
        [Required]
        public string Developer { get; set; }
        [Required]
        public DateOnly ReleaseDate { get; set; }
    }
}