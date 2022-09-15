package br.edu.utfpr.todoapi.repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.utfpr.todoapi.model.Pessoa;

public interface PessoaRepository 
    extends JpaRepository<Pessoa, UUID> {
    
    public List<Pessoa> findByNome(String nome);
    public List<Pessoa> findByNascimento(LocalDate nascimento);
}
