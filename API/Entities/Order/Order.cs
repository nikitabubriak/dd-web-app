namespace API.Entities.Order
{
    public class Order
    {
        public int Id { get; set; }
        public string CustomerId { get; set; }
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public long Total { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public List<OrderItem> OrderItems { get; set; }
    }
}