using System;
using System.ComponentModel.DataAnnotations;

namespace MoviesApi.Models
{
  public class Movie
  {
    [Key] // Marks this as the primary key
    public Guid Id { get; set; }

    [Required] // Must be provided
    [StringLength(50)] // Limit length in DB and validation
    public string Genre { get; set; } = string.Empty;

    [Required]
    [StringLength(50)]
    public string Category { get; set; } = string.Empty;

    [Required]
    [StringLength(200)] // Titles can be long, but cap them
    public string Title { get; set; } = string.Empty;

    [Range(1888, 2100)] // Movies started around 1888, future-proof to 2100
    public int Year { get; set; }

    [StringLength(100)]
    public string Distribution { get; set; } = string.Empty;

    [StringLength(1000)] // Limit description size
    public string Description { get; set; } = string.Empty;

    [Url] // Validates proper URL format
    public string Url { get; set; } = string.Empty;

    [Url] // Cover photo should also be a valid URL
    public string CoverPhoto { get; set; } = string.Empty;
  }
}