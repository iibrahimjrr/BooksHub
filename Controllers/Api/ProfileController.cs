using BooksHub_Platform.Models.BooksHub_Platform.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BooksHub_Platform.Controllers
{
    public class ProfileController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public ProfileController(AppDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        public async Task<IActionResult> Index()
        {
            var userId = HttpContext.Session.GetInt32("UserId");

            if (userId == null)
                return RedirectToAction("Index", "Login");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
                return NotFound();

            return View(user);
        }

        [HttpGet]
        public IActionResult UploadImage()
        {
            var userId = HttpContext.Session.GetInt32("UserId");

            if (userId == null)
                return RedirectToAction("Index", "Login");

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> UploadImage(IFormFile profileImage, [FromForm] string profileImageUrl)
        {
            var userId = HttpContext.Session.GetInt32("UserId");
            if (userId == null)
                return RedirectToAction("Index", "Login");

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound();

            string savedPath = null;

            if (profileImage != null && profileImage.Length > 0)
            {
                var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(profileImage.FileName);
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await profileImage.CopyToAsync(stream);
                }

                savedPath = "/uploads/" + uniqueFileName;
            }
            else if (!string.IsNullOrEmpty(profileImageUrl))
            {
                savedPath = profileImageUrl;
            }

            if (savedPath != null)
            {
                user.ProfileImagePath = savedPath;
                await _context.SaveChangesAsync();
            }

            return RedirectToAction("Index");
        }
    }
}
