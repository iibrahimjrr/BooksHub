using BooksHub_Platform.Models.BooksHub_Platform.Data;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace BooksHub_Platform.Controllers.Api
{
    [ApiController]
    [Route("api/login")]
    public class LoginApiController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LoginApiController(AppDbContext context)
        {
            _context = context;
        }

        public class LoginRequest
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginRequest model)
        {
            if (string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
                return BadRequest("الإيميل والباسورد مطلوبين");

            string hashedPassword = HashPassword(model.Password);

            var user = _context.Users.FirstOrDefault(u => u.Email == model.Email && u.PasswordHash == hashedPassword);
            if (user == null)
                return Unauthorized("الإيميل أو كلمة المرور غير صحيحة");

            HttpContext.Session.SetInt32("UserId", user.Id);
            return Ok(new { message = "Login successful" });
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
    }
}
