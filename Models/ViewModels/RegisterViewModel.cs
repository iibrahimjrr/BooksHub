using System.ComponentModel.DataAnnotations;
namespace BooksHub_Platform.Models.ViewModels
{
    public class RegisterViewModel
    {
        [Required]
        public string Name     { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        [EmailAddress] 
        public string Email { get; set; }

        [Required]
        [MinLength(8), MaxLength(12)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

    }
}