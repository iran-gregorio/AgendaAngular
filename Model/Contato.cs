using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgendaAngular.Model
{
    public enum Categoria
    {
        Casa = 1,
        Trabalho = 2,
        Outro = 3
    }

    public class Contato
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public virtual List<Email> EmailList { get; set; }

        public virtual List<Telefone> TelefoneList { get; set; }

        public string Endereco { get; set; }

        public string Empresa { get; set; }

    }
}
