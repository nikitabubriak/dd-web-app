using AutoMapper;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;
        public ProductsController(StoreContext context, IMapper mapper, ImageService imageService)
        {
            _imageService = imageService;
            _mapper = mapper;
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

        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm] CreateProductDTO productDTO)
        {
            var product = _mapper.Map<Product>(productDTO);

            if (productDTO.Image != null)
            {
                var imageResult = await _imageService.AddImageAsync(productDTO.Image);
                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

                product.Image = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }

            _context.Products.Add(product);

            var result = await _context.SaveChangesAsync();
            if (result > 0) return CreatedAtRoute("GetProduct", new { Id = product.Id }, product);

            return BadRequest(new ProblemDetails { Title = "Couldn't create product" });
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult<Product>> UpdateProduct([FromForm] UpdateProductDTO productDTO)
        {
            var product = await _context.Products.FindAsync(productDTO.Id);

            if (product == null) return NotFound();

            _mapper.Map(productDTO, product);

            if (productDTO.Image != null)
            {
                var imageResult = await _imageService.AddImageAsync(productDTO.Image);
                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

                if (!string.IsNullOrEmpty(product.PublicId))
                    await _imageService.DeleteImageAsync(product.PublicId);

                product.Image = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }

            var result = await _context.SaveChangesAsync();
            if (result > 0) return Ok(product);

            return BadRequest(new ProblemDetails { Title = "Couldn't update product" });
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            if (!string.IsNullOrEmpty(product.PublicId))
                await _imageService.DeleteImageAsync(product.PublicId);

            _context.Products.Remove(product);

            var result = await _context.SaveChangesAsync();
            if (result > 0) return Ok();

            return BadRequest(new ProblemDetails { Title = "Couldn't delete product" });
        }
    }
}