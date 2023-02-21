using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public long Price { get; set; }
        public int QuantityInStock { get; set; }
        public string Genre { get; set; }
        public string Theme { get; set; }
        public string Developer { get; set; }
        public DateOnly ReleaseDate { get; set; }
    }
}