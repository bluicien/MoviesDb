using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MoviesApi.Data;
using MoviesApi.Services;
using MoviesApi.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

var myAllowedOrigins = "_myAllowedOrigins";
builder.Services.AddCors(options =>
{
	options.AddPolicy(
		name: myAllowedOrigins,
		policy =>
		{
			policy.WithOrigins(builder.Configuration["Cors:AllowedOrigins"] ?? "");
		}
	);
});

// Setting up Database connection
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
	var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
		?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
		Console.WriteLine(connectionString);
	options.UseSqlServer(connectionString);
});

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
	.AddEntityFrameworkStores<ApplicationDbContext>()
	.AddDefaultTokenProviders();

// JWT Authentication
builder.Services.AddAuthentication(options =>
{
	options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
	options.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuer = true,
		ValidateAudience = true,
		ValidateLifetime = true,
		ValidateIssuerSigningKey = true,
		ValidIssuer = builder.Configuration["Jwt:Issuer"],
		ValidAudience = builder.Configuration["Jwt:Audience"],
		IssuerSigningKey = new SymmetricSecurityKey(
			Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)
		)
	};
});

builder.Services.AddScoped<IMovieService, MovieService>(); // Register movie service

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors(myAllowedOrigins);
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();