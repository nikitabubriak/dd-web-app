using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            var cart = await LoadCart();

            if (cart == null) return NotFound();
            return MapCartToDTO(cart);
        }

        [HttpPost]
        public async Task<ActionResult<CartDTO>> AddItemToCart(int productId, int quantity)
        {
            var cart = await LoadCart();
            if (cart == null) cart = CreateCart();

            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();

            cart.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync();
            if (result > 0) return CreatedAtRoute("GetCart", MapCartToDTO(cart));

            return BadRequest(new ProblemDetails { Title = "Couldn't add item to cart" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveItemFromCart(int productId, int quantity)
        {
            var cart = await LoadCart();
            if (cart == null) return NotFound();

            cart.RemoveItem(productId, quantity);

            var result = await _context.SaveChangesAsync();
            if (result > 0) return Ok();

            return BadRequest(new ProblemDetails { Title = "Couldn't remove item from cart" });
        }

        private Cart CreateCart()
        {
            var customerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };

            var cart = new Cart { CustomerId = customerId };
            _context.Carts.Add(cart);

            Response.Cookies.Append("customerId", customerId, cookieOptions);

            return cart;
        }

        private async Task<Cart> LoadCart()
        {
            return await _context.Carts
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(c => c.CustomerId == Request.Cookies["customerId"]);
        }

        private CartDTO MapCartToDTO(Cart cart)
        {
            return new CartDTO
            {
                Id = cart.Id,
                CustomerId = cart.CustomerId,
                Items = cart.Items.Select(item => new CartItemDTO
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
    }
}