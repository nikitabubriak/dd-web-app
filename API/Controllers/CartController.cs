namespace API.Controllers
{
    public class CartController : BaseApiController
    {
        private readonly StoreContext _context;

        public CartController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetCart")]
        public async Task<ActionResult<CartDTO>> GetCart()
        {
            var cart = await LoadCart(GetCustomerId());

            if (cart == null) return NotFound();
            return cart.MapCartToDTO();
        }

        [HttpPost]
        public async Task<ActionResult<CartDTO>> AddItemToCart(int productId, int quantity)
        {
            var cart = await LoadCart(GetCustomerId());
            if (cart == null) cart = CreateCart();

            var product = await _context.Products.FindAsync(productId);
            if (product == null) return BadRequest(new ProblemDetails { Title = "Couldn't find this item to add to cart." });

            cart.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync();
            if (result > 0) return CreatedAtRoute("GetCart", cart.MapCartToDTO());

            return BadRequest(new ProblemDetails { Title = "Couldn't add item to cart" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveItemFromCart(int productId, int quantity)
        {
            var cart = await LoadCart(GetCustomerId());
            if (cart == null) return NotFound();

            cart.RemoveItem(productId, quantity);

            if (!cart.Items.Any())
                _context.Carts.Remove(cart);

            var result = await _context.SaveChangesAsync();
            if (result > 0) return Ok();

            return BadRequest(new ProblemDetails { Title = "Couldn't remove item from cart" });
        }

        private Cart CreateCart()
        {
            var customerId = User.Identity?.Name;
            if (string.IsNullOrEmpty(customerId))
            {
                customerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                Response.Cookies.Append("customerId", customerId, cookieOptions);
            }

            var cart = new Cart { CustomerId = customerId };
            _context.Carts.Add(cart);

            return cart;
        }

        private async Task<Cart> LoadCart(string customerId)
        {
            if (string.IsNullOrEmpty(customerId))
            {
                Response.Cookies.Delete("customerId");
                return null;
            }
            return await _context.Carts.LoadCart(customerId);
        }

        private string GetCustomerId()
        {
            return User.Identity?.Name ?? Request.Cookies["customerId"];
        }
    }
}