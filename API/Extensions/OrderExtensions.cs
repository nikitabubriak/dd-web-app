namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDTO> ProjectOrderToDTO(this IQueryable<Order> query)
        {
            return query
                .Select(o => new OrderDTO
                {
                    Id = o.Id,
                    CustomerId = o.CustomerId,
                    OrderStatus = o.OrderStatus.ToString(),
                    OrderDate = o.OrderDate,
                    Total = o.Total,
                    PaymentMethod = o.PaymentMethod.ToString(),
                    OrderItems = o.OrderItems.Select(i => new OrderItemDTO
                    {
                        ProductId = i.Item.ProductId,
                        Name = i.Item.Name,
                        Image = i.Item.Image,
                        Price = i.Price,
                        Quantity = i.Quantity
                    }).ToList()
                });
        }
    }
}