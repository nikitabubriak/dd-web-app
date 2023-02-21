namespace API.DTOs
{
    public class CartItemDTO
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public long Price { get; set; }
        public int Quantity { get; set; }
        public string Genre { get; set; }
        public string Theme { get; set; }
    }
}