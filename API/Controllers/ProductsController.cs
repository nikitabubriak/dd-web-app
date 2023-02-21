using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams pp)
        {
            var query = _context.Products
                .Sort(pp.OrderBy)
                .Search(pp.SearchTerm)
                .Filter(pp.Themes, pp.Genres)
                .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query, pp.PageNumber, pp.PageSize);

            Response.AddPaginationHeader(products.MetaData);

            return products;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var genres = await _context.Products.Select(p => p.Genre).Distinct().ToListAsync();
            var themes = await _context.Products.Select(p => p.Theme).Distinct().ToListAsync();

            return Ok(new { genres, themes });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;
        }
    }
}