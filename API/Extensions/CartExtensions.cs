using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Extensions
{
    public static class CartExtensions
    {
        public static CartDTO MapCartToDTO(this Cart cart)
        {
            return new CartDTO
            {
                Id = cart.Id,
                CustomerId = cart.CustomerId,
                Items = cart.Items.Select(item => new CartItemDTO
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Image = item.Product.Image,
                    Price = item.Product.Price,
                    Quantity = item.Quantity,
                    Genre = item.Product.Genre,
                    Theme = item.Product.Theme
                }).ToList()
            };
        }
    }
}