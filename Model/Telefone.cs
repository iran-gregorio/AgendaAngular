using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgendaAngular.Model
{
    public class Telefone
    {
        public int Id { get; set; }

        public string Numero { get; set; }

        public Categoria Categoria { get; set; }

        public int ContatoId { get; set; }
    }
}
