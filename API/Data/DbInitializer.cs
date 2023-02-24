namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "mykyta",
                    Email = "mykyta@gmail.com"
                };

                await userManager.CreateAsync(user, "$$$123Abc");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@gmail.com"
                };

                await userManager.CreateAsync(admin, "$$$123Abc");
                await userManager.AddToRolesAsync(admin, new[] { "Member", "Admin" });
            }

            if (context.Products.Any()) return;
            var products = new List<Product>
            {
                new Product
                {
                    Name = "Factorio",
                    Description = "Factorio is a game about building and creating automated factories to produce items of increasing complexity, within an infinite 2D world. Use your imagination to design your factory, combine simple elements into ingenious structures, and finally protect it from the creatures who don't really like you.",
                    Image = "/images/products/factorio.jpg",
                    Price = 3000,
                    QuantityInStock = 100,
                    Genre = "Simulation",
                    Theme = "Sci-fi",
                    Developer = "Wube Software LTD.",
                    ReleaseDate = new DateOnly(2020,8,14)
                },
                new Product
                {
                    Name = "Cities: Skylines",
                    Description = "Cities: Skylines is a modern take on the classic city simulation. The game introduces new game play elements to realize the thrill and hardships of creating and maintaining a real city whilst expanding on some well-established tropes of the city building experience.",
                    Image = "/images/products/cities-skylines.jpg",
                    Price = 3790,
                    QuantityInStock = 100,
                    Genre = "Simulation",
                    Theme = "Realistic",
                    Developer = "Colossal Order Ltd.",
                    ReleaseDate = new DateOnly(2015,3,10)
                },
                new Product
                {
                    Name = "Crypt of the NecroDancer",
                    Description = "Crypt of the NecroDancer is an award winning hardcore roguelike rhythm game. Move to the music and deliver beatdowns to the beat! Groove to the epic Danny Baranowsky soundtrack, or select songs from your own MP3 collection!",
                    Image = "/images/products/crypt-of-the-necrodancer.jpg",
                    Price = 3250,
                    QuantityInStock = 100,
                    Genre = "Roguelike",
                    Theme = "Fantasy",
                    Developer = "Brace Yourself Games",
                    ReleaseDate = new DateOnly(2015,4,23)
                },
                new Product
                {
                    Name = "Darkest Dungeon®",
                    Description = "Darkest Dungeon is a challenging gothic roguelike turn-based RPG about the psychological stresses of adventuring. Recruit, train, and lead a team of flawed heroes against unimaginable horrors, stress, disease, and the ever-encroaching dark. Can you keep your heroes together when all hope is lost?",
                    Image = "/images/products/darkest-dungeon.jpg",
                    Price = 5150,
                    QuantityInStock = 100,
                    Genre = "Roguelike",
                    Theme = "Fantasy",
                    Developer = "Red Hook Studios",
                    ReleaseDate = new DateOnly(2016,1,19)
                },
                new Product
                {
                    Name = "Don't Starve",
                    Description = "Don’t Starve is an uncompromising wilderness survival game full of science and magic. Enter a strange and unexplored world full of strange creatures, dangers, and surprises. Gather resources to craft items and structures that match your survival style.",
                    Image = "/images/products/dont-starve.jpg",
                    Price = 1690,
                    QuantityInStock = 100,
                    Genre = "Adventure",
                    Theme = "Fantasy",
                    Developer = "Klei Entertainment",
                    ReleaseDate = new DateOnly(2013,4,23)
                },
                new Product
                {
                    Name = "Enter the Gungeon",
                    Description = "Enter the Gungeon is a bullet hell dungeon crawler following a band of misfits seeking to shoot, loot, dodge roll and table-flip their way to personal absolution by reaching the legendary Gungeon’s ultimate treasure: the gun that can kill the past.",
                    Image = "/images/products/enter-the-gungeon.jpg",
                    Price = 3250,
                    QuantityInStock = 100,
                    Genre = "Roguelike",
                    Theme = "Sci-fi",
                    Developer = "Dodge Roll",
                    ReleaseDate = new DateOnly(2016,4,5)
                },
                new Product
                {
                    Name = "Ori and the Blind Forest",
                    Description = "Ori and the Blind Forest tells the tale of a young orphan destined for heroics, through a visually stunning action-platformer crafted by Moon Studios for PC.",
                    Image = "/images/products/ori-and-the-blind-forest.jpg",
                    Price = 4150,
                    QuantityInStock = 100,
                    Genre = "Adventure",
                    Theme = "Fantasy",
                    Developer = "Moon Studios GmbH",
                    ReleaseDate = new DateOnly(2015,3,11)
                },
                new Product
                {
                    Name = "RimWorld",
                    Description = "A sci-fi colony sim driven by an intelligent AI storyteller. Generates stories by simulating psychology, ecology, gunplay, melee combat, climate, biomes, diplomacy, interpersonal relationships, art, medicine, trade, and more.",
                    Image = "/images/products/rimworld.jpg",
                    Price = 4690,
                    QuantityInStock = 100,
                    Genre = "Simulation",
                    Theme = "Sci-fi",
                    Developer = "Ludeon Studios",
                    ReleaseDate = new DateOnly(2018,10,17)
                },
                new Product
                {
                    Name = "Rogue Legacy",
                    Description = "Rogue Legacy is a genealogical rogue-LITE where anyone can be a hero. Each time you die, your child will succeed you. Every child is unique. One child might be colorblind, another might be a dward with have vertigo. But that's OK, because no one is perfect, and you don't have to be to succeed.",
                    Image = "/images/products/rogue-legacy.jpg",
                    Price = 3250,
                    QuantityInStock = 100,
                    Genre = "Roguelike",
                    Theme = "Fantasy",
                    Developer = "Cellar Door Games",
                    ReleaseDate = new DateOnly(2013,6,27)
                },
                new Product
                {
                    Name = "Sid Meier's Civilization® V",
                    Description = "Create, discover, and download new player-created maps, scenarios, interfaces, and more!",
                    Image = "/images/products/sid-meiers-civilization-v.jpg",
                    Price = 3890,
                    QuantityInStock = 100,
                    Genre = "Strategy",
                    Theme = "Historical",
                    Developer = "Firaxis Games",
                    ReleaseDate = new DateOnly(2010,9,23)
                },
                new Product
                {
                    Name = "Starbound",
                    Description = "You’ve fled your home, only to find yourself lost in space with a damaged ship. Your only option is to beam down to the planet below, repair your ship and set off to explore the universe...",
                    Image = "/images/products/starbound.jpg",
                    Price = 3250,
                    QuantityInStock = 100,
                    Genre = "Adventure",
                    Theme = "Sci-fi",
                    Developer = "Chucklefish",
                    ReleaseDate = new DateOnly(2016,7,22)
                },
                new Product
                {
                    Name = "Stardew Valley",
                    Description = "You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these overgrown fields into a thriving home?",
                    Image = "/images/products/stardew-valley.jpg",
                    Price = 2290,
                    QuantityInStock = 100,
                    Genre = "Simulation",
                    Theme = "Fantasy",
                    Developer = "ConcernedApe",
                    ReleaseDate = new DateOnly(2016,2,26)
                },
                new Product
                {
                    Name = "Terraria",
                    Description = "Dig, fight, explore, build! Nothing is impossible in this action-packed adventure game. Four Pack also available!",
                    Image = "/images/products/terraria.jpg",
                    Price = 1690,
                    QuantityInStock = 100,
                    Genre = "Adventure",
                    Theme = "Fantasy",
                    Developer = "Re-Logic",
                    ReleaseDate = new DateOnly(2011,5,16)
                },
                new Product
                {
                    Name = "The Elder Scrolls V: Skyrim",
                    Description = "Winner of more than 200 Game of the Year Awards, Skyrim brings the epic fantasy to life in stunning detail.",
                    Image = "/images/products/the-elder-scrolls-v-skyrim.jpg",
                    Price = 6490,
                    QuantityInStock = 100,
                    Genre = "Adventure",
                    Theme = "Fantasy",
                    Developer = "Bethesda Game Studios",
                    ReleaseDate = new DateOnly(2016,10,28)
                },
                new Product
                {
                    Name = "The Witcher® 3: Wild Hunt",
                    Description = "You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy, a living weapon that can alter the shape of the world.",
                    Image = "/images/products/the-witcher-3-wild-hunt.jpg",
                    Price = 5390,
                    QuantityInStock = 100,
                    Genre = "Adventure",
                    Theme = "Fantasy",
                    Developer = "CD PROJEKT RED",
                    ReleaseDate = new DateOnly(2015,5,18)
                },
                new Product
                {
                    Name = "Hearts of Iron IV",
                    Description = "Victory is at your fingertips! Your ability to lead your nation is your supreme weapon, the strategy game Hearts of Iron IV lets you take command of any nation in World War II; the most engaging conflict in world history.",
                    Image = "/images/products/hearts-of-iron-iv.jpg",
                    Price = 4790,
                    QuantityInStock = 100,
                    Genre = "Strategy",
                    Theme = "Historical",
                    Developer = "Paradox Development Studio",
                    ReleaseDate = new DateOnly(2016,6,6)
                },
                new Product
                {
                    Name = "Europa Universalis IV",
                    Description = "Europa Universalis IV gives you control of a nation through four dramatic centuries. Rule your land and dominate the world with unparalleled freedom, depth and historical accuracy. Write a new history of the world and build an empire for the ages.",
                    Image = "/images/products/europa-universalis-iv.jpg",
                    Price = 4790,
                    QuantityInStock = 100,
                    Genre = "Strategy",
                    Theme = "Historical",
                    Developer = "Paradox Development Studio",
                    ReleaseDate = new DateOnly(2013,8,13)
                },
                new Product
                {
                    Name = "Stellaris",
                    Description = "Explore a galaxy full of wonders in this sci-fi grand strategy game from Paradox Development Studios. Interact with diverse alien races, discover strange new worlds with unexpected events and expand the reach of your empire. Each new adventure holds almost limitless possibilities.",
                    Image = "/images/products/stellaris.jpg",
                    Price = 4790,
                    QuantityInStock = 100,
                    Genre = "Strategy",
                    Theme = "Sci-fi",
                    Developer = "Paradox Development Studio",
                    ReleaseDate = new DateOnly(2016,5,9)
                },

                // new Product
                // {
                //     Name = "placeholder",
                //     Description = "Description",
                //     Image = "/images/products/image.jpg",
                //     Price = 3500,
                //     QuantityInStock = 100,
                //     Genre = "Genre",
                //     Theme = "Theme",
                //     Developer = "Developer",
                //     ReleaseDate = new DateOnly(2010,12,30)
                // },
            };

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
    }
}