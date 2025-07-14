namespace BooksHub_Platform.Models
{
    public class Book 
    {
        public int    Id          { get; set; }
        public string Title       { get; set; }
        public string Description { get; set; }
        public string Author      { get; set; }
        public string ImageUrl    { get; set; }
        public string FileUrl     { get; set; }
        public int    UserId      { get; set; }
    }
}