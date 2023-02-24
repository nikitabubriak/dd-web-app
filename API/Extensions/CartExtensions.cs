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

        public static async Task<Cart> LoadCart(this IQueryable<Cart> query, string customerId)
        {
            return await query
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(c => c.CustomerId == customerId);
        }
    }
}