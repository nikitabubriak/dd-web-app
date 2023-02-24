using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities.Order;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly StoreContext _context;
        public OrdersController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDTO>>> GetOrders()
        {
            return await _context.Orders
                .ProjectOrderToDTO()
                .Where(o => o.CustomerId == User.Identity.Name)
                .ToListAsync();
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDTO>> GetOrder(int id)
        {
            return await _context.Orders
                .ProjectOrderToDTO()
                .Where(o => o.CustomerId == User.Identity.Name && o.Id == id)
                .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder(PaymentMethod paymentMethod)
        {
            if (paymentMethod == PaymentMethod.Undefined)
                return BadRequest(new ProblemDetails { Title = "Missing payment method" });

            var cart = await _context.Carts.LoadCart(User.Identity.Name);
            if (cart == null) return BadRequest(new ProblemDetails { Title = "Cart not found" });

            var orderItems = new List<OrderItem>();
            foreach (var cartItem in cart.Items)
            {

                var product = await _context.Products.FindAsync(cartItem.ProductId);
                var productSnapshot = new OrderProductSnapshot
                {
                    ProductId = product.Id,
                    Name = product.Name,
                    Image = product.Image
                };
                var orderItem = new OrderItem
                {
                    Item = productSnapshot,
                    Price = product.Price,
                    Quantity = cartItem.Quantity
                };
                orderItems.Add(orderItem);
                product.QuantityInStock -= cartItem.Quantity;
            }

            var total = orderItems.Sum(i => i.Price * i.Quantity);

            var order = new Order
            {
                CustomerId = User.Identity.Name,
                Total = total,
                PaymentMethod = paymentMethod,
                OrderItems = orderItems
            };

            _context.Orders.Add(order);
            _context.Carts.Remove(cart);

            var result = await _context.SaveChangesAsync();
            if (result > 0) return CreatedAtRoute("GetOrder", new { id = order.Id }, order.Id);

            return BadRequest(new ProblemDetails { Title = "Couldn't create order" });
        }
    }
}