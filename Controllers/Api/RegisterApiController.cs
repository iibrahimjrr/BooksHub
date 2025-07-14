using BooksHub_Platform.Models.BooksHub_Platform.Data;
using BooksHub_Platform.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace BooksHub_Platform.Controllers.Api
{
    [ApiController]
    [Route("api/register")]
    public class RegisterApiController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RegisterApiController(AppDbContext context)
        {
            _context = context;
        }

        public class RegisterApiRequest
        {
            public string Name { get; set; }
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        [HttpPost]
        public IActionResult Register([FromBody] RegisterApiRequest model)
        {
            if (string.IsNullOrEmpty(model.Name) || string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
                return BadRequest("الايميل ده موجود بالفعل اكتب واحد تاني ");

            if (_context.Users.Any(u => u.Email == model.Email || u.Username == model.Username))
                return Conflict("اليوزر ده موجود بالفعل اكتب واحد تاني ");

            string hashedPassword = HashPassword(model.Password);

            var user = new User
            {
                Name = model.Name,
                Username = model.Username,
                Email = model.Email,
                PasswordHash = hashedPassword,
                ProfileImagePath = ""
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            HttpContext.Session.SetInt32("UserId", user.Id);

            return Ok(new { userId = user.Id });
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
