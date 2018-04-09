using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AgendaAngular.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AgendaAngular.Controllers
{
    [Route("api/[controller]")]
    public class ContatoController : Controller
    {
        private readonly Contexto _context;

        public ContatoController(Contexto context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public Contato ObterPorId(int id)
        {
            var contato = _context.Contatos
                .Where(c => c.Id == id)
                .Select(
                c => new Contato()
                {
                    Id = c.Id,
                    Nome = c.Nome,
                    Endereco = c.Endereco,
                    Empresa = c.Empresa,
                    TelefoneList = c.TelefoneList.AsQueryable().ToList(),
                    EmailList = c.EmailList.AsQueryable().ToList()
                }).SingleOrDefault();

            return contato;
        }

        [HttpGet("[action]")]
        public IEnumerable<Contato> ObterListaContatos(string filter)
        {
            var list = _context.Contatos.Select(
                c => new Contato()
                {
                    Id = c.Id,
                    Nome = c.Nome,
                    Endereco = c.Endereco,
                    Empresa = c.Empresa,
                    TelefoneList = c.TelefoneList.AsQueryable().ToList(),
                    EmailList = c.EmailList.AsQueryable().ToList()
                }).ToList();

            if (!String.IsNullOrEmpty(filter))
            {
                list = list.Where(c => c.TelefoneList.Where(t => t.Numero.Contains(filter)).Any() ||
                                       c.EmailList.Where(e => e.Endereco.ToLower().Contains(filter)).Any() ||
                                       c.Nome.ToLower().Contains(filter))
                    .Select(c => new Contato()
                    {
                        Id = c.Id,
                        Nome = c.Nome,
                        TelefoneList = c.TelefoneList.Where(t => t.Numero.Contains(filter)).Any() ? c.TelefoneList.Where(t => t.Numero.Contains(filter)).ToList() : c.TelefoneList,
                        EmailList = c.EmailList.Where(e => e.Endereco.ToLower().Contains(filter)).Any() ? c.EmailList.Where(e => e.Endereco.ToLower().Contains(filter)).ToList() : c.EmailList
                    }).ToList();
            }

            return list.OrderBy(c => c.Nome).ToList();
        }

        [HttpPost("[action]")]
        public Contato Salvar([FromBody] Contato contato)
        {
            if (contato.Id == 0)
            {
                _context.Contatos.Add(contato);
            }
            else
            {
                var contatoOriginal = _context.Contatos.Where(c => c.Id == contato.Id).SingleOrDefault();
    
                _context.Entry(contatoOriginal).CurrentValues.SetValues(contato);

                // Delete telefone
                var telefoneOriginal = _context.Telefone.Where(t => t.ContatoId == contato.Id).ToList();
                foreach (var telOrig in telefoneOriginal)
                {
                    if (!contato.TelefoneList.Any(c => c.Id == telOrig.Id))
                        _context.Telefone.Remove(telOrig);
                }

                // Update and Insert telefone
                foreach (var telEnv in contato.TelefoneList)
                {
                    var existTel = _context.Telefone
                        .Where(t => t.Id == telEnv.Id)
                        .SingleOrDefault();

                    if (existTel != null)
                        // Update child
                        _context.Entry(existTel).CurrentValues.SetValues(telEnv);
                    else
                    {
                        _context.Telefone.Add(telEnv);
                        //contatoOriginal.TelefoneList.Add(telEnv);
                    }
                }

                // Delete email
                var emailOriginal = _context.Email.Where(t => t.ContatoId == contato.Id).ToList();
                foreach (var emailOrig in emailOriginal)
                {
                    if (!contato.EmailList.Any(c => c.Id == emailOrig.Id))
                        _context.Email.Remove(emailOrig);
                }

                // Update and Insert email
                foreach (var emailEnv in contato.EmailList)
                {
                    var existEmail = _context.Email
                        .Where(t => t.Id == emailEnv.Id)
                        .SingleOrDefault();

                    if (existEmail != null)
                        // Update child
                        _context.Entry(existEmail).CurrentValues.SetValues(emailEnv);
                    else
                    {
                        _context.Email.Add(emailEnv);
                        //contatoOriginal.EmailList.Add(emailEnv);
                    }
                }
            }

            _context.SaveChanges();

            return contato;
        }

        [HttpDelete("[action]")]
        public void Excluir(int id)
        {
            Response.StatusCode = 200;
            
            _context.Contatos.Remove(new Contato() {  Id = id });

            _context.SaveChanges();
        }
    }
}
