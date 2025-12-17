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
	options.AddPolicy(myAllowedOrigins,
		policy => policy.WithOrigins(builder.Configuration["Cors:AllowedOrigins"] ?? "")
			.AllowAnyHeader()
			.AllowAnyMethod()
			.AllowCredentials()
	);
});

// Setting up Database connection
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
	var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
		?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
	options.UseSqlServer(connectionString);
});

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
	.AddEntityFrameworkStores<ApplicationDbContext>()
	.AddDefaultTokenProviders();


// ==================================================== //
// ================ JWT Authentication ================ //
// ==================================================== //
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
	// Allow JWTs to read from Cookies.
	options.Events = new JwtBearerEvents
	{
		OnMessageReceived = context =>
		{
			if (context.Request.Cookies.ContainsKey("AuthToken"))
			{
				context.Token = context.Request.Cookies["AuthToken"];
			}

			return Task.CompletedTask;
		}
	};
});

builder.Services.AddScoped<IMovieService, MovieService>(); // Register movie service

builder.Services.AddControllers();


// ==================================================== //
// ====================  Build App ==================== //
// ==================================================== //
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