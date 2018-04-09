using Microsoft.EntityFrameworkCore;

namespace AgendaAngular.Model
{
    public class Contexto : DbContext
    {
        public Contexto(DbContextOptions<Contexto> options) : base(options)
        {
        }

        public virtual DbSet<Contato> Contatos { get; set; }
        public virtual DbSet<Telefone> Telefone { get; set; }
        public virtual DbSet<Email> Email { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Contato>().HasMany(c => c.TelefoneList).WithOne();
            builder.Entity<Contato>().HasMany(c => c.EmailList).WithOne();
            base.OnModelCreating(builder);
        }
    }
}
