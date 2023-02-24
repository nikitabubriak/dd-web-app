namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly StoreContext _context;
        public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext context)
        {
            _context = context;
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByNameAsync(loginDTO.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDTO.Password))
            {
                return Unauthorized();
            }

            var userCart = await LoadCart(loginDTO.Username);
            var anonCart = await LoadCart(Request.Cookies["customerId"]);

            if (anonCart != null)
            {
                if (userCart != null)
                {
                    _context.Carts.Remove(userCart);
                    anonCart.CustomerId = user.UserName;
                    Response.Cookies.Delete("customerId");
                    await _context.SaveChangesAsync();
                }
            }

            return new UserDTO
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Cart = anonCart != null ? anonCart.MapCartToDTO() : userCart?.MapCartToDTO()
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDTO registerDTO)
        {
            var user = new User
            {
                UserName = registerDTO.Username,
                Email = registerDTO.Email
            };

            var result = await _userManager.CreateAsync(user, registerDTO.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");
            return StatusCode(201);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            var userCart = await LoadCart(User.Identity.Name);

            return new UserDTO
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Cart = userCart?.MapCartToDTO()
            };
        }

        private async Task<Cart> LoadCart(string customerId)
        {
            if (string.IsNullOrEmpty(customerId))
            {
                Response.Cookies.Delete("customerId");
                return null;
            }
            return await _context.Carts.LoadCart(customerId);
        }
    }
}