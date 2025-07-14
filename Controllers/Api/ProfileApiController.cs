using BooksHub_Platform.Models;
using BooksHub_Platform.Models.BooksHub_Platform.Data;
using Microsoft.AspNetCore.Mvc;

namespace BooksHub_Platform.Controllers.Api
{
    [ApiController]
    [Route("api/profile")]
    public class ProfileApiController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public ProfileApiController(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        [HttpPost("upload-image")]
        public async Task<IActionResult> UploadImage()
        {
            var userId = HttpContext.Session.GetInt32("UserId");
            if (userId == null)
                return Unauthorized("User not logged in.");

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound("User not found.");

            var file = Request.Form.Files.FirstOrDefault();
            var imageUrl = Request.Form["imageUrl"].ToString();
            string imagePath = null;

            if (file != null && file.Length > 0)
            {
                var allowedTypes = new[] { "image/jpeg", "image/png", "image/gif", "image/webp" };
                if (!allowedTypes.Contains(file.ContentType.ToLower()))
                {
                    return BadRequest("الملف لازم يكون صورة (jpg, png, gif, webp)");
                }

                var uploadsDir = Path.Combine(_env.WebRootPath, "uploads");
                if (!Directory.Exists(uploadsDir))
                    Directory.CreateDirectory(uploadsDir);

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(uploadsDir, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                imagePath = "/uploads/" + fileName;
            }
            else if (!string.IsNullOrWhiteSpace(imageUrl))
            {
                imagePath = imageUrl;
            }
            else
            {
                return BadRequest("من فضلك اختر صورة من الجهاز أو من الصور الجاهزة.");
            }

            user.ProfileImagePath = imagePath;
            await _context.SaveChangesAsync();

            return Ok(new { imagePath });
        }

        [HttpGet("me")]
        public IActionResult GetProfile()
        {
            var userId = HttpContext.Session.GetInt32("UserId");
            if (userId == null)
                return Unauthorized();

            var user = _context.Users.FirstOrDefault(u => u.Id == userId);
            if (user == null)
                return NotFound();

            return Ok(new
            {
                user.Name,
                user.Username,
                user.Email,
                user.ProfileImagePath
            });
        }
    }
}
