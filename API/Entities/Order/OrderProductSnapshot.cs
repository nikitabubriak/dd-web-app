namespace API.Entities.Order
{
    [Owned]
    public class OrderProductSnapshot
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
    }
}