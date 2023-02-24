namespace API.DTOs
{
    public class CartDTO
    {
        public int Id { get; set; }
        public string CustomerId { get; set; }
        public List<CartItemDTO> Items { get; set; }
    }
}