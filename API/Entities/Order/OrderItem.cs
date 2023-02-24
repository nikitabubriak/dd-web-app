namespace API.Entities.Order
{
    public class OrderItem
    {
        public int Id { get; set; }
        public OrderProductSnapshot Item { get; set; }
        public long Price { get; set; }
        public int Quantity { get; set; }
    }
}