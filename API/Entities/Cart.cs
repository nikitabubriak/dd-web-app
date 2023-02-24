namespace API.Entities
{
    public class Cart
    {
        public int Id { get; set; }
        public string CustomerId { get; set; }
        public List<CartItem> Items { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
            if (Items.All(item => product.Id != item.ProductId))
            {
                Items.Add(new CartItem { Product = product, Quantity = quantity });
            }

            var existingItem = Items.FirstOrDefault(item => product.Id == item.ProductId);
            if (existingItem != null) existingItem.Quantity += quantity;
        }

        public void RemoveItem(int productId, int quantity)
        {
            var item = Items.FirstOrDefault(item => productId == item.ProductId);
            if (item == null) return;

            item.Quantity -= quantity;
            if (item.Quantity == 0) Items.Remove(item);
        }
    }
}