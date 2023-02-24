using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public string CustomerId { get; set; }
        public string OrderStatus { get; set; }
        public DateTime OrderDate { get; set; }
        public long Total { get; set; }
        public string PaymentMethod { get; set; }
        public List<OrderItemDTO> OrderItems { get; set; }
    }
}