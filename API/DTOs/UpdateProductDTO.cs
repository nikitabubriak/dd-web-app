using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class UpdateProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
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