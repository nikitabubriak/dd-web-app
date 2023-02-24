namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
        {
            query = orderBy switch
            {
                "priceAsc" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name)
            };

            return query;
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;
            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            query = query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));

            return query;
        }

        public static IQueryable<Product> Filter(this IQueryable<Product> query, string genres, string themes)
        {
            var genreList = new List<string>();
            var themeList = new List<string>();

            if (!string.IsNullOrEmpty(genres)) genreList.AddRange(genres.ToLower().Split(",").ToList());
            if (!string.IsNullOrEmpty(themes)) themeList.AddRange(themes.ToLower().Split(",").ToList());

            query = query.Where(p => genreList.Count == 0 || genreList.Contains(p.Theme.ToLower()));
            query = query.Where(p => themeList.Count == 0 || themeList.Contains(p.Genre.ToLower()));

            return query;
        }
    }
}